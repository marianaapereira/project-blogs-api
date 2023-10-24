const { Category } = require('../models');

const getByCategoryId = async (id) =>
  Category.findByPk(id);

const addNewCategory = async (name) => 
  Category.create({ name });

const getAllCategories = async () =>
  Category.findAll();

const getAllCategoriesIds = async () => {
  const categoriesIdsObjs = await Category.findAll({ attributes: ['id'], raw: true });

  const onlyCategoriesIds = categoriesIdsObjs.map((category) => category.id);

  return onlyCategoriesIds;
};

module.exports = {
  getByCategoryId,
  addNewCategory,
  getAllCategories,
  getAllCategoriesIds,
};