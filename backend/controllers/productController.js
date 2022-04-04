const { Product, User } = require("../models/model");

const productController = {
  /**
   * ADD A PRODUCT
   * @param {*} req là yêu cầu phía client gửi đi
   * @param {*} res là yêu cầu phía server trả về
   */
  addAProduct: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      if (req.body.user) {
        // Chỗ này nó sẽ tìm user có id trùng với lại nhau nó sẽ chui vô đây
        const user = await User.findById(req.body.user);
        // Thêm id của product vào user
        await user.updateOne({ $push: { products: savedProduct._id } });
      }
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  /**
   * GET ALL PRODUCTS
   * @param {*} req là yêu cầu phía client gửi đi
   * @param {*} res là yêu cầu phía server trả về
   */
  getAllProducts: async (req, res) => {
    try {
      const allProducts = await Product.find();
      res.status(200).json(allProducts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  /**
   * GET A PRODUCT
   * @param {*} req là yêu cầu phía client gửi đi
   * @param {*} res là yêu cầu phía server trả về
   */
  getAProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate("user");
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  /**
   * UPDATE A PRODUCT
   * @param {*} req là yêu cầu phía client gửi đi
   * @param {*} res là yêu cầu phía server trả về
   */
  updateAProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      await product.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  /**
   * DELETE A PRODUCT
   * @param {*} req là yêu cầu phía client gửi đi
   * @param {*} res là yêu cầu phía server trả về
   */
  deleteAProduct: async (req, res) => {
    try {
      await User.updateMany(
        { products: req.params.id },
        { $pull: { products: req.params.id } }
      );
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = productController;
