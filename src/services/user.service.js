const { User } = require('../models');

const getByLoginInfo = async (email, password) => 
  User.findOne({ where: { email, password } });

const addNewUser = async (displayName, email, password, image) =>
  User.create({ displayName, email, password, image });

const getByEmail = async (email) => 
  User.findOne({ where: { email } });

module.exports = {
  getByLoginInfo,
  addNewUser,
  getByEmail,
};