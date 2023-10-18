const { User } = require('../models');

const getByLoginInfo = async (email, password) => User.findOne({ where: { email, password } });

module.exports = {
  getByLoginInfo,
};