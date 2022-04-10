const express = require('express');
const {
    signupValidator,
    signinValidator,
    validatorResult,
} = require('../middleware/validator');
const { addAddress, getAddress } = require('../controller/address');
const router = express.Router();


router.post('/user/address/create', signinValidator, validatorResult, addAddress);
router.post('/user/getaddress', signinValidator, validatorResult, getAddress);

module.exports = router;