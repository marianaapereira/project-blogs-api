const { User } = require('../models');

const getAllUsers = async () => 
  User.findAll({ attributes: { exclude: ['password'] } });

const getByUserId = async (id) =>
  User.findByPk(id);

const getByLoginInfo = async (email, password) => 
  User.findOne({ where: { email, password } });

const addNewUser = async (displayName, email, password, image) =>
  User.create({ displayName, email, password, image });

const getByEmail = async (email) => 
  User.findOne({ where: { email } });

module.exports = {
  getAllUsers,
  getByUserId,
  getByLoginInfo,
  addNewUser,
  getByEmail,
};