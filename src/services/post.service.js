const { Op } = require('sequelize');

const { sequelize, BlogPost, User, Category, PostCategory } = require('../models');

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

const addNewBlogPost = async (title, content, userId, categoryIds) => {
  const newBlogPost = await BlogPost.create(
    { 
      title, 
      content, 
      userId, 
      published: new Date(), 
      updated: new Date(), 
    },
  );

  await Promise.all(
    categoryIds.map(async (categoryId) => {
      await PostCategory.create({
        postId: newBlogPost.id,
        categoryId,
      });
    }),
  );

  return newBlogPost; 
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

const getPostBySearch = async (query) => BlogPost.findAll({
  where: {
    [Op.or]: [
      { title: { [Op.like]: `%${query}%` } },
      { content: { [Op.like]: `%${query}%` } }],
  },
  include: [
    {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      where: { postId: sequelize.col('BlogPost.id') },
      through: { attributes: [] },
    },
  ],
});

module.exports = {
  getAllPosts,
  getByPostId,
  deletePost,
  updateBlogPost,
  getPostBySearch,
  addNewBlogPost,
};