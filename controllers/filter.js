const Product = require('../models/Product');

// Thay vì phải khai báo rồi export ra, thì t dùng hàm này để 
// lấy ra thông tin product mới nhất
exports.getNewArrivals = async (req, res) => {
	const sortBy = req.query.sortBy ? req.query.sortBy : 'desc'; // tìm kiếm theo giá trị giảm dần
	const limit = req.query.limit ? parseInt(req.query.limit) : parseInt(3);  // Lấy ra 3 sản phẩm mới nhất

	try {
		const newArrivals = await Product.find({})
			.sort({ createdAt: sortBy })
			.limit(limit); // lấy ra 3 sản phẩm mới nhất

		res.json({
			newArrivals, // trả về danh sách sản phẩm mới nhất
		});
	} catch (err) {
		console.log(err, 'filter Controller.getNewArrivals error');
		res.status(500).json({
			errorMessage: 'Please try again later', // Lỗi thì trả về lỗi
		});
	}
};

// Thay vì phải khai báo rồi export ra, thì t dùng hàm này để lấy ra thông tin 
exports.searchByQueryType = async (req, res) => {
	const { type, query } = req.body; // type, query là tên của input trong form

	try {
		let products; 

		switch (type) {
			case 'text':
				// $text và $search là các thuộc tính của mongoose để tìm kiếm theo text
				products = await Product.find({ $text: { $search: query } });
				break; // tìm kiếm theo text
			case 'category':
				products = await Product.find({ productCategory: query });
				break; // tìm kiếm theo category
		}

		if (!products.length > 0) {
			products = await Product.find({}); // nếu không tìm thấy thì trả về tất cả sản phẩm
		}

		res.json({ products });
	} catch (err) {
		console.log(err, 'filter Controller.searchByQueryType error');
		res.status(500).json({
			errorMessage: 'Please try again later', // Lỗi thì trả về lỗi
		});
	}
};
