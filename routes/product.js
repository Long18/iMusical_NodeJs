const express = require('express');
const router = express.Router();
const { authenticatateJWT } = require('../middleware/authenticator');
const upload = require('../middleware/multer');
const productController = require('../controllers/product');

router.post(
	'/',
	authenticatateJWT, // middleware check token
	upload.single('productImage'), // upload picture 
	productController.create // create product
);

router.get('/', productController.getAll); // get all products
router.get('/count', productController.getByCount); // get products by count || Show in menu
router.get('/:productId', productController.get); // get product by id

router.put(
	'/:productId',
	authenticatateJWT, // middleware check token
	upload.single('productImage'), // update picture
	productController.update // update product
);

router.delete('/:productId', authenticatateJWT, productController.delete); // delete product

// export router để sử dụng
module.exports = router;
