const jwt = require('jsonwebtoken');

const userService = require('../services/user.service');

const { HTTP_UNAUTHORIZED_STATUS } = require('../consts/httpStatusCodes');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}

module.exports = async (req, res, next) => {
  const bearerToken = req.header('Authorization');

  if (!bearerToken) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token not found' });
  }

  const token = extractToken(bearerToken);

  try {
    const decoded = jwt.verify(token, secret);

    const user = await userService.getByUserId(decoded.data.userId);

    if (!user) {
      return res.status(HTTP_UNAUTHORIZED_STATUS)
        .json({ message: 'Expired or invalid token' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Expired or invalid token' });
  }
};