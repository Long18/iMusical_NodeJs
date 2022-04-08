const express = require('express');
const router = express.Router();
const {
    signupValidator,
    signinValidator,
    validatorResult,
} = require('../middleware/validator');
const { signupController,googlelogin, signinController } = require('../controllers/auth');

// Router đăng kí và đăng nhập || kèm theo các middleware là Validate của nó
router.post('/signup', signupValidator, validatorResult, signupController); 
router.post('/signin', signinValidator, validatorResult, signinController);


// export router để sử dụng
module.exports = router;
