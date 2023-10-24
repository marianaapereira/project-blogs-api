const { paramIsInvalid } = require('./helperFunctions');

const { HTTP_BAD_REQUEST_STATUS } = require('../consts/httpStatusCodes');

const paramsCompletionValidation = (req, res, next) => {
  const { title, content } = req.body;

  if (
    paramIsInvalid(title)
    || paramIsInvalid(content)
  ) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ 
      message: 'Some required fields are missing', 
    });
  }

  next();
};

module.exports = {
  paramsCompletionValidation,
};