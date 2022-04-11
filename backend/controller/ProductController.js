const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Features = require("../utils/Features");

// create Product --Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = Product.create(req.body);

  // let images = [];

  //  if (typeof req.body.images === "string") {
  //    images.push(req.body.images);
  //  } else {
  //    images = req.body.images;
  //  }

  //  const imagesLinks = [];

  //  for (let i = 0; i < images.length; i++) {
  //    const result = await cloudinary.v2.uploader.upload(images[i], {
  //      folder: "products",
  //    });

  //    imagesLinks.push({
  //      public_id: result.public_id,
  //      url: result.secure_url,
  //    });
  //  }

  //  req.body.images = imagesLinks;
  //  req.body.user = req.user.id;

  res.status(201).json({
    success: true,
    product,
  });
});

// get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 7;

  const productsCount = await Product.countDocuments();

  const feature = new Features(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await feature.query;
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
  });
});

// Update Product ---Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  //     let images = [];

  //     if (typeof req.body.images === "string") {
  //       images.push(req.body.images);
  //     } else {
  //       images = req.body.images;
  //     }

  //     if(images !== undefined){

  //       // Delete image from cloudinary
  //       for (let i = 0; i < product.images.length; i++) {
  //         await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  //       }

  //       const imagesLinks = [];

  //       for (let i = 0; i < images.length; i++) {
  //         const result = await cloudinary.v2.uploader.upload(images[i],{
  //           folder:"products",
  //         });
  //       imagesLinks.push({
  //         public_id: result.public_id,
  //         url: result.secure_url,
  //       })
  //     }
  //     req.body.images = imagesLinks;
  //    }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  //  // Deleting images from cloudinary
  // for (let i = 0; 1 < product.images.length; i++) {
  //   const result = await cloudinary.v2.uploader.destroy(
  //     product.images[i].public_id
  //   );
  // }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted succesfully",
  });
});

// get a Product details
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
