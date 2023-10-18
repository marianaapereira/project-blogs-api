const helperFunctions = require('./helperFunctions');

const { HTTP_BAD_REQUEST_STATUS } = require('../consts/httpStatusCodes');

const validateDisplayName = (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ 
      message: '"displayName" length must be at least 8 characters long', 
    });
  }
  
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  const emailIsInvalid = !helperFunctions.emailIsValid(email);

  if (emailIsInvalid) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ 
      message: '"email" must be a valid email', 
    });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ 
      message: '"password" length must be at least 6 characters long', 
    });
  }

  next();
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
};