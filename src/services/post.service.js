const { BlogPost } = require('../models');

const userService = require('./user.service');
const postCategoryService = require('./postCategory.service');

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

// const addNewBlogPost = async (title, content, categoryIds) => {
//   const newBlogPost = BlogPost.create({ title, content });

//   // const 
// };

module.exports = {
  getAllPosts,
  // addNewBlogPost,
};