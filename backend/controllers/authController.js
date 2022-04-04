const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


let refreshTokens = [];

const authController = {
    //REGISTER
    registerUser : async(req,res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // CREATE NEW USER
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });

            // SAVE NEW USER
            const  user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message : "Error registering user"
            })
        }
    },
    //GENERATE ACCESS TOKEN
    generateAccessToken : (user) => {
        // Hàm này để set thời gian cho token trong vòng 2h
        // Biến user được truyền vô bên dưới nha
        return jwt.sign({
            // id hay admin nằm ở sau được khai báo dưới đây là mấy cái schema
            // mà mình đã khởi tạo ở bên model User nha, nhớ nha
            id: user.id,
            admin: user.admin
        },
            process.env.JWT_SECRET_KEY_ACCES,
            {expiresIn: "2h"
        });
    },
    //GENERATE REFRESH TOKEN
    generateRefreshToken : (user) => {
        return jwt.sign({
            id: user.id,
                        admin: user.admin
                    },
                    process.env.JWT_REFRESH_KEY_ACCES,
                    {expiresIn: "365d"
        });
    },
    //LOGIN
    loginUser: async(req,res) => {
        try{
            const user = await User.findOne({username: req.body.username});
            if(!user){
                return res.status(404).json("Wrong username!!");
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword){
                return res.status(404).json("Wrong password!!");
            }
            
            if(user && validPassword){
                
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                
                refreshTokens.push(refreshToken);
                res.cookie('refreshToken', refreshToken,{
                    httpOnly: true,
                    // Cái thằng secure này trong quá trình đang code thì để false nha
                    // Sau khi xong thì set true lên, tại sao thì giải thích ở dưới các 
                    // loại tấn công rồi đó
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                })

                // Chỗ này để khi lộ token cũng không lộ mật khẩu
                // Loại password ra ngoài để không show lên khi get 
                const {password, ...others} = user._doc;
                res.status(200).json({...others,accessToken});
            }

        }catch(err){
            res.status(500).json(err);
        }
    },
    requestRefreshToken: async(req,res) => {
        refreshToken.push(refreshToken);
        // Get refresh token from headers - user
        // Lấy từ cookie và cái tên như đã đặt ở trên
        // là ''refreshToken'' nha
        const refreshToken = req.cookies.refreshToken;
        //res.status(200).json(refreshToken);
        if(!refreshToken)return res.status(401).json("You are not authenticated"); 
        // Kiểm tra nếu token đó không phải của mình thì báo lỗi
        if(!refreshTokens.includes(refreshToken))return res.status(403).json("Refresh token is invalid");

            jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY_ACCES, (err, user) => {
                if(err){
                    console.log(err);
                }
                refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
                //Nếu không lỗi thì tạo token mới 
                const newAccessToken = authController.generateAccessToken(user);
                const newRefreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(newRefreshToken);
                res.cookie('refreshToken', newRefreshToken,{
                    httpOnly: true,
                    // Cái thằng secure này trong quá trình đang code thì để false nha
                    // Sau khi xong thì set true lên, tại sao thì giải thích ở dưới các 
                    // loại tấn công rồi đó
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                res.status(200).json({accessToken: newAccessToken});
            });
        
    },
    //LOGOUT
    userLogout: async(req,res) => {
        res.clearCookie('refreshToken');
        refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
        res.status(200).json("Logout success");
    }
}

//STORE TOKEN (Có 3 loại lưu token)
// 1- LOCAL STOGARE trong tab Application DevTool đó || Dễ bị tấn công theo phương thức XSS
// 2- COOKIE || này thì biết rồi nên khỏi giải thích nha || Dễ bị tấn công theo phương thức CSRF || fix được bằng HTTPOnly SameSite
// 3- REDUX STORE này để lưu accesstoken ( Xài cái này nha)
// Lấy token được gửi về rồi lưu
// https://dev.to/cotter/localstorage-vs-cookies-all-you-need-to-know-about-storing-jwt-tokens-securely-in-the-front-end-15id

module.exports = authController;