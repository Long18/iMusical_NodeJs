const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  //Create and update time
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
