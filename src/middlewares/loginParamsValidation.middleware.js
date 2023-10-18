const { valueIsUndefined } = require('./helperFunctions');

const { HTTP_BAD_REQUEST_STATUS } = require('../consts/httpStatusCodes');

const loginParamsValidation = (req, res, next) => {
  const { email, password } = req.body;

  if (
    valueIsUndefined(email) 
    || valueIsUndefined(password) 
    || email === '' 
    || password === ''
  ) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ 
      message: 'Some required fields are missing', 
    });
  }

  next();
};

module.exports = {
  loginParamsValidation,
};