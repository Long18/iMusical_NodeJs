const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const { authenticatateJWT } = require('../middleware/authenticator');

// Trong router này t có gán thằng authenticatateJWT là middleware
// để kiểm tra token có tồn tại hay không, nếu không tồn tại thì sẽ báo lỗi 401 || Phải là admin
router.post('/', authenticatateJWT, categoryController.create);
// Còn thằng này thì đơn giản rồi, user có thể coi được tất cả product để họ mua mà
router.get('/', categoryController.getAll);

// export router để sử dụng
module.exports = router;
