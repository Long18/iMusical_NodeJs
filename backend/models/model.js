const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  products: [
    {
      // Liên kết với một Schema mới để có thể get ví dụ tên, email,...
      // Type là một dạng Object Id trong một schema mới | _id:123
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
  },
  brands: {
    type: [String],
  },
  user: {
    // Liên kết với một Schema mới để có thể get ví dụ tên, email,...
    // Type là một dạng Object Id trong một schema mới | _id:123
    type: mongoose.Schema.Types.ObjectId,
    // ref là User vì khai báo ở dưới kìa, đặt tên như nào thì nhớ ghi như vậy
    ref: "User",
  },
});

let Product = mongoose.model("Product", productSchema);
let User = mongoose.model("User", userSchema);

module.exports = {
  Product,
  User,
};
