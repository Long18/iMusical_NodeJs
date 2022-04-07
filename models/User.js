const mongoose = require('mongoose');

// Khởi tạo schema mang tên User || m có thể hiểu đây là một bảng trong cơ sở dữ liệu
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// Khai báo schema User
const User = mongoose.model('User', UserSchema);

// export ra để sử dụng
module.exports = User;
