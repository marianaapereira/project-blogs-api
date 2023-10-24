const express = require('express');

const router = express.Router();

const postController = require('../controllers/post.controller');

const { tokenValidation } = require('../auth/validateJWT');

// rotas /post

router.post(
  '/',
  tokenValidation,

  postController.addNewBlogPost,
);

router.get(
  '/',
  tokenValidation,

  postController.getAllPosts,
);

module.exports = router;