const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');

const userInfoValidation = require('../middlewares/userInfoValidation.middleware');

const tokenValidation = require('../auth/validateJWT');

// rotas /user

router.post(
  '/',
  userInfoValidation.validateDisplayName,
  userInfoValidation.validateEmail,
  userInfoValidation.validatePassword,

  userController.addNewUser,
);

router.get(
  '/',
  tokenValidation,

  userController.getAllUsers,
);

module.exports = router;