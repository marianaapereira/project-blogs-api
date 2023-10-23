const { Category } = require('../models');

const getByCategoryId = async (id) =>
  Category.findByPk(id);

const addNewCategory = async (name) => 
  Category.create({ name });

const getAllCategories = async () =>
  Category.findAll();

module.exports = {
  getByCategoryId,
  addNewCategory,
  getAllCategories,
};