const express = require('express');

const router = express.Router();

const loginController = require('../controllers/login.controller');

const { loginParamsValidation } = require('../middlewares/loginParamsValidation.middlewares');

// rotas /login

router.post(
  '/',
  loginParamsValidation,
  loginController.loginValidation,
);

module.exports = router;