const { BlogPost } = require('../models');

const userService = require('./user.service');
const postCategoryService = require('./postCategory.service');
const { valueIsUndefined } = require('../middlewares/helperFunctions');

const getAllPostsUsers = async (allPosts) => allPosts.map(
  async ({ dataValues }) => {
    const { userId } = dataValues;
    const user = await userService.getByUserId(userId);

    const postWithUser = { ...dataValues, user };

    return postWithUser;
  },
);

const getAllPostsCategories = async (allPosts) => allPosts.map(
  async (post) => {
    const { id } = post;
    const categories = await postCategoryService.getCategoriesByPostId(id);

    const postWithCategories = { ...post, categories };

    return postWithCategories;
  },
);

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll();

  const postsWithUsersPromises = await getAllPostsUsers(allPosts);
  const allPostsWithUsers = await Promise.all(postsWithUsersPromises);

  const postsWithCategoriesPromises = await getAllPostsCategories(allPostsWithUsers);
  const allPostsWithCategories = await Promise.all(postsWithCategoriesPromises);

  return allPostsWithCategories;
};

const getPostUser = async (post) => {
  const postInfo = post.dataValues;
  const { userId } = postInfo;
  const { dataValues } = await userService.getByUserId(userId);

  const postWithUser = { ...postInfo, user: dataValues };

  return postWithUser;
};

const getByPostId = async (id) => {
  const blogPost = await BlogPost.findByPk(id);

  if (valueIsUndefined(blogPost)) {
    throw new Error('Post does not exist');
  }

  const postWithUser = await getPostUser(blogPost);
  const categories = await postCategoryService.getCategoriesByPostId(postWithUser.id);
  
  const postWithCategoriesInfo = { ...postWithUser, categories };

  return postWithCategoriesInfo;
};

const addNewBlogPost = async ({ title, content, userId, updated, published }) => {
  const { dataValues } = await BlogPost.create({ title, content, userId, updated, published });

  console.log(dataValues);

  // const { dataValues } = await userService.getByUserId(userId);
  // const postWithUser = { ...newBlogPost, user: dataValues };

  return dataValues; 
};

const updateBlogPost = async (postId, title, content) => {
  const [updatedBlogPost] = await BlogPost.update(
    { title, content },
    { where: { id: postId } },
  );

  return updatedBlogPost;
};

const deletePost = async (id) => {
  BlogPost.destroy({ where: { id } });
};

module.exports = {
  getAllPosts,
  getByPostId,
  addNewBlogPost,
  deletePost,
  updateBlogPost,
};