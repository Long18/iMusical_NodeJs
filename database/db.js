const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Khai báo cái này để sử dụng file .env nha
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true,
    });

    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB Can't connect");
    process.exit(1);
  }
};

module.exports = connectDB;
