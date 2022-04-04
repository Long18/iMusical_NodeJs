const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Get routes from routes folder
//const productRoute = require("./routers/product");

const authRoute = require("./routers/auth");
const userRoute = require("./routers/user");

// config này để sử dụng được file .env nha
dotenv.config();

//Giới hạn giữa các request khoảng 50mb
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("common"));

//Route
//app.use("/v1/product", productRoute);

app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

// Connect DB
mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connected to DB");
});

// Authentication - So sánh tài khoản mật khẩu có giống với trong db hay không

// Authorization - Kiểm tra quyền truy cập, chức năng phân quyền ở đây

//Demo Hello world, m có thể gọi trên browser hoặc bên postman cũng được, nó sẽ trả về dạng json
// http://localhost:8000/api | kiểu như này nha, tại tạo ở port 8000 mà
// app.get("/api", (req, res) => {
//     res.status(200).json("Welcome to the API");
// });

app.listen(3000, () => {
  console.log("server is running...");
});


//JSON WEB TOKEN
