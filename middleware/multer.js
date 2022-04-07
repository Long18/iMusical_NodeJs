const multer = require('multer');

// multer là thư viện hỗ trợ upload file || nó mã hoá dưới dạng multipart/form-data
// giống như bên php ấy, khác ở đây nóp là một middleware của express để xử lỷ dữ liệu
// dễ dàng hơn, nói chung là tiện thì dùng
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Uploads ảnh vào thẳng folder uploads trong src luôn nha
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.png`); // Lấy thời gian hiện tại (mili giây) đặt tên cho ảnh để tránh trùng tên và đuôi là png
    },
});

// khai báo biến upload ở đây
var upload = multer({ storage });

// Export biến upload để sử dụng
module.exports = upload;
