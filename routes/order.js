const express = require("express");
const { createOrder } = require("../controllers/order");
const { validatorResult } = require("../middleware/validator");
const router = express.Router();

router.route("order/new").post(createOrder);

module.exports = router;
