const postService = require('../services/post.service');

const { HTTP_OK_STATUS, HTTP_CREATED_STATUS,
  HTTP_NOT_FOUND_STATUS, 
  HTTP_NO_CONTENT_STATUS, 
  HTTP_UNAUTHORIZED_STATUS } = require('../consts/httpStatusCodes');

const { decodeToken } = require('../auth/decodeToken');
const { valueIsUndefined } = require('../middlewares/helperFunctions');

const getAllPosts = async (_req, res) => {
  const allPosts = await postService.getAllPosts();

  return res.status(HTTP_OK_STATUS).json(allPosts); 
};

const addNewBlogPost = async (req, res) => {
  const token = req.header('Authorization');
  const userId = decodeToken(token);

  const { title, content } = req.body;

  const newBlogPost = await postService.addNewBlogPost(title, content, userId);
  
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

const updateBlogPost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  const blogpost = await postService.getByPostId(postId);

  if (blogpost.userId !== userId) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Unauthorized user' });
  }

  const { title, content } = req.body;
  const updatedBlogPost = await postService.updateBlogPost(postId, title, content);

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