const postService = require('../services/post.service');

const { HTTP_OK_STATUS, HTTP_CREATED_STATUS } = require('../consts/httpStatusCodes');

const getAllPosts = async (_req, res) => {
  const allPosts = await postService.getAllPosts();

  return res.status(HTTP_OK_STATUS).json(allPosts); 
};

const addNewBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const newBlogPost = await postService.addNewBlogPost(title, content, categoryIds);

  return res.status(HTTP_CREATED_STATUS).json(newBlogPost); 
};

module.exports = {
  getAllPosts,
  addNewBlogPost,
};