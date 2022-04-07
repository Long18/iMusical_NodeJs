const { check, validationResult } = require('express-validator');

// Thay vì phải khai báo rồi export ra, có thể dùng hàm này để check các trường dữ liệu
// mình có thể gọi cái hàm signupValidator này để sử dụng luôn, nhớ là luôn phải
// import rồi mới sử dụng được nha
exports.signupValidator = [
    check('username').not().isEmpty().trim().withMessage('All fields required'), // Cái dòng này là check trống thì báo
    check('email').isEmail().normalizeEmail().withMessage('Invalid email'), // Dòng này là check email có đúng định dạng chưa 
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'), // 3 cái dòng này là giới hạn password có ít nhất 6 ký tự
];

// Dưới đây cũng vậy, chỉ cần gọi hàm signinValidator ra để sử dụng thôi
// // import rồi mới sử dụng được nha
exports.signinValidator = [
    check('email').isEmail().normalizeEmail().withMessage('Invalid email'), // Dòng này là check email có đúng định dạng chưa 
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'), // 3 cái dòng này là giới hạn password có ít nhất 6 ký tự
];

// Dưới đây cũng vậy, chỉ cần gọi hàm validatorResult ra để sử dụng thôi
// // import rồi mới sử dụng được nha
exports.validatorResult = (req, res, next) => {
    const result = validationResult(req); // 2 dòng này là check các trường dữ liệu 
    const hasErrors = !result.isEmpty(); // đã được check chưa và nếu không có lỗi xác thực thì next

    if (hasErrors) {
        const firstError = result.array()[0].msg; // lấy ra lỗi đầu tiên để hiển thị ra màn hình
        return res.status(400).json({
            errorMessage: firstError, // trả về lỗi đầu tiên 
        });
    }

    next();
};
