const jwt = require("jsonwebtoken");

const middlewareController = {
  //Verify Token
  verifyToken: (req, res, next) => {
    // Lấy token từ headers, refresh token từ cookie
    const token = req.headers.token;
    const refreshToken = req.cookies.refreshToken;
    if (token) {
      // Ban đầu sẽ có một cữ là Bearer kèm theo token phía sau
      // Ví dụ : Bearer abc123
      // Slipt ra để lấy token
      const accessToken = token.split(" ")[1];

      jwt.verify(accessToken, process.env.JWT_SECRET_KEY_ACCES, (err, user) => {
        if (err) {
          res.status(403).json("Token is not valid"); // For bidden ( 403)
        }
        // Trả về user và đi tiếp
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authorize"); // Unauthorized ( 401)
    }
  },
  // Verify Token and User Auth
  verifyTokenAndUserAuthorization: (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You're not allowed to do that!");
      }
    });
  },

  //Verify Admin
  verifyTokenAdmin: (req, res, next) => {
    this.verifyToken(req, res, () => {
      // Nếu user là admin thì toàn quyền
      // Nếu user không phải admin thì chỉ tương tác được
      // Với quyền của bản thân || Ví dụ: Xoá, sửa chính mình
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        res.status(403).json("You are not allowed"); // For bidden ( 403)
      }
    });
  },
};

module.exports =  middlewareController;
