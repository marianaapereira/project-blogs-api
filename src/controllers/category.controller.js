const categoryService = require('../services/category.service');

const { HTTP_CREATED_STATUS } = require('../consts/httpStatusCodes');

const addNewCategory = async (req, res) => {
  const { name } = req.body;

  const newCategory = await categoryService.addNewCategory(name);

  return res.status(HTTP_CREATED_STATUS).json(newCategory);
};

module.exports = {
  addNewCategory,
};