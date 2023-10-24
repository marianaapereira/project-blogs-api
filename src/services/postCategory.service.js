const { PostCategory } = require('../models');

const categoryService = require('./category.service');

const getCategoriesByPostId = async (id) => {
  const allPostCategories = await PostCategory.findAll({ where: { postId: id } });

  const categoriesInfoPromises = allPostCategories.map(
    async (category) => {
      const { categoryId } = category.dataValues;
      return categoryService.getByCategoryId(categoryId);
    },
  );

  const allPostsWithCategoriesInfo = await Promise.all(categoriesInfoPromises);

  return allPostsWithCategoriesInfo;
};

const addPostCategories = async (postId, categoryIds) => {
  const postCategoriesPromises = categoryIds.map(async (categoryId) => {
    try {
      const postCategoryPromise = await PostCategory.create({ postId, categoryId });
      console.log(postCategoryPromise);
      return postCategoryPromise;
    } catch ({ message }) {
      console.error({ message });
      return null;
    }
  });

  const postCategories = await Promise.all(postCategoriesPromises);

  // return postCategories;
  return postCategories.filter((postCategory) => postCategory !== null);
};

module.exports = {
  getCategoriesByPostId,
  addPostCategories,
};