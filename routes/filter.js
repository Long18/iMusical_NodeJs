const express = require('express');
const router = express.Router();
const filterController = require('../controllers/filter');

router.get('/', filterController.getNewArrivals); // Lấy sản phẩm mới nhất
router.post('/search', filterController.searchByQueryType); // Tìm kiếm theo text hoặc category

// export router để sử dụng
module.exports = router;
