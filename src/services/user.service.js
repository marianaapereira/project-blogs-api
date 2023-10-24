const { User, BlogPost } = require('../models');

const getAllUsers = async () => 
  User.findAll({ attributes: { exclude: ['password'] } });

const getByUserId = async (id) =>
  User.findByPk(id, { attributes: { exclude: ['password'] } });

const getByLoginInfo = async (email, password) => 
  User.findOne({ where: { email, password } });

const addNewUser = async (displayName, email, password, image) =>
  User.create({ displayName, email, password, image });

const getByEmail = async (email) => 
  User.findOne({ where: { email } });

const deleteUser = async (id) => {
  BlogPost.destroy({ where: { userId: id } });
  User.destroy({ where: { id } });
};

module.exports = {
  getAllUsers,
  getByUserId,
  getByLoginInfo,
  addNewUser,
  getByEmail,
  deleteUser,
};