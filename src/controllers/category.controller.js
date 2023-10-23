const categoryService = require('../services/category.service');

const { HTTP_CREATED_STATUS, HTTP_OK_STATUS } = require('../consts/httpStatusCodes');

const addNewCategory = async (req, res) => {
  const { name } = req.body;

  const newCategory = await categoryService.addNewCategory(name);

  return res.status(HTTP_CREATED_STATUS).json(newCategory);
};

const getAllCategories = async (_req, res) => {
  const allUsers = await categoryService.getAllCategories();

  return res.status(HTTP_OK_STATUS).json(allUsers); 
};

module.exports = {
  addNewCategory,
  getAllCategories,
};