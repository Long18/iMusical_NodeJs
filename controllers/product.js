const Product = require('../models/Product');
const fs = require('fs');

// Thay vì phải khai báo rồi export ra, có thể dùng hàm này để khởi tạo một đối tượng mới
// import rồi mới sử dụng được nha
exports.create = async (req, res) => {
	const { filename } = req.file; // req.file là một đối tượng của multer
	// mình sẽ lấy ra tên của file đó để gán vào biến filename
	const {
		productName, 
		productDesc,
		productPrice,
		productCategory,
		productQty,
	} = req.body; // req.body là một đối tượng của body-parser
	// mình sẽ lấy các kết quả trả về từ body-parser và gán vào các biến

	try {
		let product = new Product(); // khởi tạo một đối tượng mới
		product.fileName = filename; // gán tên file vào biến fileName trong db
		product.productName = productName; // gán tên sản phẩm vào biến productName trong db
		product.productDesc = productDesc; // gán mô tả sản phẩm vào biến productDesc trong db
		product.productPrice = productPrice; // gán giá sản phẩm vào biến productPrice trong db
		product.productCategory = productCategory; // gán danh mục sản phẩm vào biến productCategory trong db
		product.productQty = productQty; // gán số lượng sản phẩm vào biến productQty trong db

		await product.save(); // lưu vào database

		res.json({
			successMessage: `${productName} was created`, // trả về thông báo thành công
			product,
		});
	} catch (err) {
		console.log(err, 'productController.create error'); // trả về thông báo lỗi
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

// Thay vì phải khai báo rồi export ra, có thể dùng hàm này để lấy toàn bộ đối tượng
// import rồi mới sử dụng được nha
exports.getAll = async (req, res) => {
	try {
		// populate là một hàm của mongoose để lấy ra các thuộc tính của 1 đối tượng 
		const products = await Product.find({}).populate(
			'productCategory', // Ở đây là lấy ra các thuộc tính của productCategory
			'category' // Ở đây là lấy ra các thuộc tính của category
		); // lấy toàn bộ đối tượng trong collection

		res.json({ products }); // trả về đối tượng products theo kiểu json
	} catch (err) {
		console.log(err, 'productController.getAll error'); // trả về thông báo lỗi
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

// Thay vì phải khai báo rồi export ra, có thể dùng hàm này để lấy ra menu
// import rồi mới sử dụng được nha
exports.getByCount = async (req, res) => {
	try {
		// populate là một hàm của mongoose để lấy ra các thuộc tính của 1 đối tượng
		const products = await Product.find({}).populate(
				'productCategory', // Ở đây là lấy ra các thuộc tính của productCategory
				'category' // Ở đây là lấy ra các thuộc tính của category
				).limit(6);  // lấy 6 đối tượng

		res.json({ products }); // trả về đối tượng products theo kiểu json
	} catch (err) {
		console.log(err, 'productController.getByCount error'); // trả về thông báo lỗi
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

// Thay vì phải khai báo rồi export ra, có thể dùng hàm này để lấy ra từng đối tượng
// import rồi mới sử dụng được nha
exports.get = async (req, res) => {
	try {
		const productId = req.params.productId; // lấy ra id của đối tượng cần lấy ra
		const product = await Product.findById(productId); // lấy ra đối tượng theo id

		res.json(product); // trả về đối tượng product theo kiểu json
	} catch (err) {
		console.log(err, 'productController.get error'); // trả về thông báo lỗi
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

// Thay vì phải khai báo rồi export ra, có thể dùng hàm này để update đối tượng
// import rồi mới sử dụng được nha
exports.update = async (req, res) => {
	const productId = req.params.productId; // lấy ra id của đối tượng cần update

	if (req.file !== undefined) { // nếu có file ảnh
		req.body.fileName = req.file.filename; // lấy ra tên file ảnh
	}

	const oldProduct = await Product.findByIdAndUpdate(productId, req.body); // update đối tượng theo id

	// nếu có file ảnh mới và tên file ảnh mới khác tên file ảnh cũ
	if (req.file !== undefined && req.file.filename !== oldProduct.fileName) { 
		// fs.unlink là không đồng bộ || fs.unlinkSync là đồng bộ 
		// fs là một module của nodejs để xử lý file được tích hợp sẵn
		// fs.unlinkSync gọi đồng bộ sẽ khiến code bị chặn và đợi cho đến khi tệp đã được xóa
		// fs.unlink không đồng bộ sẽ không chặn code và sẽ gọi hàm gọi lại sau khi tệp đã bị xóa
		fs.unlink(`uploads/${oldProduct.fileName}`, err => { // xóa file ảnh cũ
			if (err) throw err; // nếu có lỗi thì throw lỗi
			console.log('Image deleted from the filesystem');
		});
	}

	res.json({
		successMessage: 'Product successfully updated', // trả về thông báo thành công
	});
};

// Thay vì phải khai báo rồi export ra, có thể dùng hàm này để xoá đối tượng
// import rồi mới sử dụng được nha
exports.delete = async (req, res) => {
	try {
		const productId = req.params.productId; // lấy ra id của đối tượng cần xoá
		const deletedProduct = await Product.findByIdAndDelete(productId); // xoá đối tượng theo id

		// fs.unlink là không đồng bộ || fs.unlinkSync là đồng bộ 
		// fs là một module của nodejs để xử lý file được tích hợp sẵn
		// fs.unlinkSync gọi đồng bộ sẽ khiến code bị chặn và đợi cho đến khi tệp đã được xóa
		// fs.unlink không đồng bộ sẽ không chặn code và sẽ gọi hàm gọi lại sau khi tệp đã bị xóa
		fs.unlink(`uploads/${deletedProduct.fileName}`, err => { // xóa file ảnh cũ
			if (err) throw err;
			console.log(
				'Image successfully deleted from filesystem: ', // trả về thông báo thành công
				deletedProduct.fileName 
			);
		});

		res.json(deletedProduct); // trả về đối tượng đã xoá
	} catch (err) {
		console.log(err, 'productController.delete error'); 
		res.status(500).json({
			errorMessage: 'Please try again later', // trả về thông báo lỗi
		});
	}
};
