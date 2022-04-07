const mongoose = require('mongoose');

// Khởi tạo schema mang tên Category || m có thể hiểu đây là một bảng trong cơ sở dữ liệu
const categorySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },
    },
    { timestamps: true }
);

// Khai báo schema Category, nhớ cái tên để qua Product có cái ref ở trong productCategory
// nó liên kết với nhau đó nha
const Category = mongoose.model('Category', categorySchema);

// export ra để sử dụng
module.exports = Category;
