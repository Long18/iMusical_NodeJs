const productController = require("../controllers/productController");

const router = require("express").Router();

//ADD A PRODUCT
router.post('/', productController.addAProduct);

//GET ALL PRODUCTS
router.get('/', productController.getAllProducts);

//GET A PRODUCT
router.get('/:id', productController.getAProduct);

//UPDATE A PRODUCT
router.put('/:id', productController.updateAProduct);

//DELETE A PRODUCT
router.delete('/:id', productController.deleteAProduct);

module.exports = router;