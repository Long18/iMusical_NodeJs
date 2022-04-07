const Category = require('../models/Category');

// Thay vì phải khai báo rồi export ra, thì t dùng hàm này để tạo ra 1 category mới
exports.create = async (req, res) => {
	const { category } = req.body; // category là tên của input trong form

	try {
		const categoryExist = await Category.findOne({ category }); // tìm xem category đã tồn tại chưa
		if (categoryExist) {
			return res.status(400).json({
				errorMessage: `${category} already exists`, // Tồn tại rồi thì trả về lỗi
			});
		}

		let newCategory = new Category(); // khởi tạo 1 category mới
		newCategory.category = category; // gán giá trị cho category

		newCategory = await newCategory.save(); // lưu vào database

		res.status(200).json({
			category: newCategory,
			successMessage: `${newCategory.category} was created!`, // Tạo thành công thì trả về thông báo
		});
	} catch (err) {
		console.log('category create error: ', err);
		res.status(500).json({
			errorMessage: 'Please try again later', // Lỗi thì trả về lỗi
		});
	}
};
// Thay vì phải khai báo rồi export ra, thì t dùng hàm này để lấy ra danh sách category
exports.getAll = async (req, res) => {
	try {
		const categories = await Category.find({}); // lấy ra tất cả category

		res.status(200).json({
			categories, // trả về danh sách category
		});
	} catch (err) {
		console.log('category error: ', err);
		res.status(500).json({
			errorMessage: 'Please try again later', // Lỗi thì trả về lỗi
		});
	}
};
