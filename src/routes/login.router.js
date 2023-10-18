const express = require('express');

const router = express.Router();

const loginController = require('../controllers/login.controller');

const { loginParamsValidation } = require('../middlewares/loginParamsValidation.middleware');

// rotas /login

router.post(
  '/',
  loginParamsValidation,
  loginController.loginValidation,
);

module.exports = router;