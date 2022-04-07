const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');

// Authenticate user bằng thư viện JSON Web Token (JWT) 
exports.authenticatateJWT = (req, res, next) => {
    const token = req.cookies.token; // Lấy token từ cookie

    if (!token) {
        return res.status(401).json({
            errorMessage: 'No token. Authorization denied', // Check token có tồn tại chưa
        });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret); // Decode token

        req.user = decoded.user; // Lưu user vào req.user để sử dụng cho các middleware khác

        next();
    } catch (err) {
        console.log('jwt error: ', err);
        res.status(401).json({
            errorMessage: 'Invalid token',
        });
    }
};
