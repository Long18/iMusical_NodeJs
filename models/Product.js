const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

// Khởi tạo schema mang tên Product || m có thể hiểu đây là một bảng trong cơ sở dữ liệu
const ProductSchema = new mongoose.Schema(
	{
		fileName: {
			type: 'String',
			required: true,
		},
		productName: {
			type: 'String',
			required: true,
			trim: true,
			maxlength: 60,
		},
		productDesc: {
			type: 'String',
			trim: true,
		},
		productPrice: {
			type: Number,
			required: true,
		},
		productCategory: {
			type: ObjectId,
			ref: 'Category', // Ở phía bên models/Category.js thì đã khai báo ref là Category
			required: true, // nên ở đây nhớ khai báo y tên như vậy để nó hiểu được 2 schema này liên quan nhau || liên kết nhau
		},
		productQty: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

ProductSchema.index({ productName: 'text' });
// Khai báo schema Product
const Product = mongoose.model('Product', ProductSchema);
// export ra để sử dụng
module.exports = Product;
