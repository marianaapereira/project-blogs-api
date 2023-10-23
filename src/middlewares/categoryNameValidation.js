const { valueIsUndefined } = require('./helperFunctions');

const { HTTP_BAD_REQUEST_STATUS } = require('../consts/httpStatusCodes');

const categoryNameValidation = (req, res, next) => {
  const { name } = req.body;

  if (valueIsUndefined(name) || name === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ 
      message: '"name" is required', 
    });
  }

  next();
};

module.exports = {
  categoryNameValidation,
};