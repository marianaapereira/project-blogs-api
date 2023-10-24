const postService = require('../services/post.service');
const categoryService = require('../services/category.service');

const { HTTP_OK_STATUS, HTTP_CREATED_STATUS,
  HTTP_NOT_FOUND_STATUS, 
  HTTP_NO_CONTENT_STATUS, 
  HTTP_UNAUTHORIZED_STATUS, 
  HTTP_BAD_REQUEST_STATUS } = require('../consts/httpStatusCodes');

const { valueIsUndefined } = require('../middlewares/helperFunctions');

const getAllPosts = async (_req, res) => {
  const allPosts = await postService.getAllPosts();

  return res.status(HTTP_OK_STATUS).json(allPosts); 
};

const getByPostId = async (req, res) => {
  try {
    const { id } = req.params;

    const blogPost = await postService.getByPostId(id);

    return res.status(HTTP_OK_STATUS).json(blogPost);
  } catch ({ message }) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message });
  }
};

const categoryIdsValidation = async (categoryIds) => {
  const allCategories = await categoryService.getAllCategories();

  categoryIds.forEach((categoryId) => {
    const test = allCategories.some((category) => category.id !== categoryId);

    if (test) {
      throw new Error('one or more "categoryIds" not found');
    }
  });
};

const addNewBlogPost = async (req, res) => {
  try {
    const userId = req.user.id;
  
    const { title, content, categoryIds } = req.body;
  
    await categoryIdsValidation(categoryIds);
  
    const newBlogPost = {
      title,
      content,
      userId,
      updated: new Date(),
      published: new Date(),
    };
  
    const createdBlogPost = await postService.addNewBlogPost(newBlogPost);
    
    return res.status(HTTP_CREATED_STATUS).json(createdBlogPost); 
  } catch ({ message }) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message }); 
  }
};

const updateBlogPost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  const blogpost = await postService.getByPostId(postId);

  if (blogpost.userId !== userId) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Unauthorized user' });
  }

  const { title, content } = req.body;
  await postService.updateBlogPost(postId, title, content);

  const updatedBlogPost = await postService.getByPostId(postId);

  console.log(updateBlogPost);

  return res.status(HTTP_OK_STATUS).json(updatedBlogPost);
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const blogpost = await postService.getByPostId(postId);

    if (valueIsUndefined(blogpost)) {
      return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Post does not exist' });
    }

    if (blogpost.userId !== userId) {
      return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Unauthorized user' });
    }

    await postService.deletePost(postId);

    return res.status(HTTP_NO_CONTENT_STATUS).json();
  } catch ({ message }) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message });
  }
};

module.exports = {
  getAllPosts,
  addNewBlogPost,
  getByPostId,
  deletePost,
  updateBlogPost,
};