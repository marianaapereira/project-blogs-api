const jwt = require('jsonwebtoken');

const { extractToken } = require('./validateJWT');

const secret = process.env.JWT_SECRET;

const decodeToken = (token) => {
  const formattedToken = extractToken(token);
  const decodedToken = jwt.verify(formattedToken, secret);

  const { userId } = decodedToken.data;

  return userId;
};

module.exports = {
  decodeToken,
};