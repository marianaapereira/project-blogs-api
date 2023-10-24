const express = require('express');

const router = express.Router();

const postController = require('../controllers/post.controller');

const { tokenValidation } = require('../auth/validateJWT');

const newPostMiddlewares = require('../middlewares/newPostParamsValidation.middlewares');

const updatePostMiddlewares = require('../middlewares/updatePostParamsValidation.middlewares');

// rotas /post

router.post(
  '/',
  tokenValidation,
  newPostMiddlewares.paramsCompletionValidation,

  postController.addNewBlogPost,
);

router.get(
  '/',
  tokenValidation,

  postController.getAllPosts,
);

router.get(
  '/:id',
  tokenValidation,

  postController.getByPostId,
);

router.put(
  '/:id',
  tokenValidation,
  updatePostMiddlewares.paramsCompletionValidation,

  postController.updateBlogPost,
);

router.delete(
  '/:id',
  tokenValidation,

  postController.deletePost,
);

router.get(
  '/search',
  tokenValidation,

  postController.getPostBySearch,
);

module.exports = router;