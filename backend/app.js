const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
app.use(fileUpload());

// config
dotenv.config({
    path:"backend/config/.env"
})

// Route imports
const product = require("./Routes/ProductRoute");
// const user = require("./Routes/UserRoute");
// const order = require("./Routes/OrderRoute");
// const payment = require("./Routes/PaymentRoute");

app.use("/api/v1",product);

// app.use("/api/v1",user);

// app.use("/api/v1",order);

// app.use("/api/v1",payment);


// it's for errorHandeling
app.use(ErrorHandler);

module.exports = app