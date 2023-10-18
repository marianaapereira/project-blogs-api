const { valueIsUndefined } = require('./helperFunctions');

const { HTTP_UNAUTHORIZED_STATUS } = require('../consts/httpStatusCodes');

const tokenValidation = (req, res, next) => {
  const { token } = req;

  if (valueIsUndefined(token)) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ 
      message: 'Token not found', 
    });
  }

  // if (/*token inválido */) {
  //   return res.status(HTTP_UNAUTHORIZED_STATUS).json({ 
  //     message: "Expired or invalid token", 
  //   });
  // }

  next();
};

module.exports = {
  tokenValidation,
};