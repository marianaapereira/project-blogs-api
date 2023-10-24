const express = require('express');

const router = express.Router();

const categoryController = require('../controllers/category.controller');

const { tokenValidation } = require('../auth/validateJWT');

const { categoryNameValidation } = require('../middlewares/categoryNameValidation.middlewares');

// rotas / categories;

router.post(
  '/',
  tokenValidation,
  categoryNameValidation,

  categoryController.addNewCategory,
);

router.get(
  '/',
  tokenValidation,

  categoryController.getAllCategories,
);

router.get(
  '/:id',
  tokenValidation,

  categoryController.getByCategoryId,
);

module.exports = router;