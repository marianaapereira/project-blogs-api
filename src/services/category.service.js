const { Category } = require('../models');

const getByCategoryId = async (id) =>
  Category.findByPk(id);

const addNewCategory = async (name) => 
  Category.create({ name });

module.exports = {
  getByCategoryId,
  addNewCategory,
};