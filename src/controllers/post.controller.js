const postService = require('../services/post.service');

const { HTTP_OK_STATUS, HTTP_CREATED_STATUS,
  HTTP_NOT_FOUND_STATUS } = require('../consts/httpStatusCodes');

const getAllPosts = async (_req, res) => {
  const allPosts = await postService.getAllPosts();

  return res.status(HTTP_OK_STATUS).json(allPosts); 
};

const addNewBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const newBlogPost = await postService.addNewBlogPost(title, content, categoryIds);

  return res.status(HTTP_CREATED_STATUS).json(newBlogPost); 
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

module.exports = {
  getAllPosts,
  addNewBlogPost,
  getByPostId,
};