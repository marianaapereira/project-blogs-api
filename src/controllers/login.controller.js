const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const { valueIsUndefined } = require('../middlewares/helperFunctions');

const userService = require('../services/user.service');

const { HTTP_BAD_REQUEST_STATUS, HTTP_OK_STATUS } = require('../consts/httpStatusCodes');

const userIsInvalid = (user, email, password) => (
  valueIsUndefined(user) 
  || user.email !== email 
  || user.password !== password
);

const generateToken = (user) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({
    data: {
      userId: user.id,
    },
  }, secret, jwtConfig);

  return token;
};

const loginValidation = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.getByLoginInfo(email, password);

  if (userIsInvalid(user, email, password)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ 
      message: 'Invalid fields', 
    });
  }

  // const jwtConfig = {
  //   expiresIn: '7d',
  //   algorithm: 'HS256',
  // };

  // const token = jwt.sign({
  //   data: {
  //     userId: user.id,
  //   },
  // }, secret, jwtConfig);

  const token = generateToken(user);

  return res.status(HTTP_OK_STATUS).json({ token });
};

module.exports = {
  loginValidation,
  generateToken,
};
