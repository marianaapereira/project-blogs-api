const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');

const userInfoValidation = require('../middlewares/userInfoValidation.middlewares');

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

router.get(
  '/:id',
  tokenValidation,

  userController.getByUserId,
);

module.exports = router;