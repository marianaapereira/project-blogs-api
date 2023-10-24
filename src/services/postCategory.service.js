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

// const addPostCategories = async (postId, categoriesIds) => {

// }

module.exports = {
  getCategoriesByPostId,
};