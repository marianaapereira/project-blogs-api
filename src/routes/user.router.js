const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');

const userInfoValidation = require('../middlewares/userInfoValidation.middleware');

// rotas /user

router.post(
  '/',
  userInfoValidation.validateDisplayName,
  userInfoValidation.validateEmail,
  userInfoValidation.validatePassword,

  userController.addNewUser,
);

module.exports = router;