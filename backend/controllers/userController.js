const User = require("../models/User");

const userController = {
  /**
   * ADD A USER
   * @param {*} req là yêu cầu phía client gửi đi
   * @param {*} res là yêu cầu phía server trả về
   */
  addUser: async (req, res) => {
    //res.status(200).json(req.body);
    try {
      //Server chỉ nhận những thứ đã khai báo trong Schema
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      // Đợi client nhập xong và server xử lý xong sẽ trả về
      res.status(200).json(savedUser);
      // status 200 có nghĩa là thành công
    } catch (err) {
      res.status(500).json({
        // status 500 có nghĩa là lỗi server
        message: err.message,
      });
    }
  },

  /**
   * GET ALL USERS
   * @param {*} req là yêu cầu phía client gửi đi
   * @param {*} res là yêu cầu phía server trả về
   */
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  /**
   * GET AN USER
   * @param {*} req là yêu cầu phía client gửi đi
   * @param {*} res là yêu cầu phía server trả về
   */
  getAnUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("products");
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  /**
   * UPDATE AN USER
   * @param {*} req là yêu cầu phía client gửi đi
   * @param {*} res là yêu cầu phía server trả về
   */
  updateAnUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  /**
   * DELETE AN USER
   * @param {*} req là yêu cầu phía client gửi đi
   * @param {*} res là yêu cầu phía server trả về
   */
  deleteAnUser: async (req, res) => {
    try {
      // await Product.updateMany({user: req.params.id}, {$set: {user: null}});
      // await User.findByIdAndDelete(req.params.id);

      // Cái này xoá để popup thông báo thôi nha không xoá thật
      const user = User.findById(req.params.id);

      // Cái này mới xoá thật
      // const user = await User.findByIdAndDelete(req.params.id);

      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

//Cái này để export ra ngoài rồi qua bên router để sử dụng nha
module.exports = userController;
