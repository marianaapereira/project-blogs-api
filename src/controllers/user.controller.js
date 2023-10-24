const userService = require('../services/user.service');
const loginController = require('./login.controller');

const { decodeToken } = require('../auth/decodeToken');

const { 
  HTTP_CREATED_STATUS, HTTP_CONFLICT_STATUS, HTTP_OK_STATUS,
  HTTP_NOT_FOUND_STATUS, HTTP_NO_CONTENT_STATUS, 
} = require('../consts/httpStatusCodes');

const getByUserId = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getByUserId(id);

  if (!user) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ 
      message: 'User does not exist', 
    });
  }

  return res.status(HTTP_OK_STATUS).json(user);
};

const getAllUsers = async (_req, res) => {
  const allUsers = await userService.getAllUsers();

  return res.status(HTTP_OK_STATUS).json(allUsers); 
};

const addNewUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const emailExists = await userService.getByEmail(email);
  
  if (emailExists) {
    return res.status(HTTP_CONFLICT_STATUS).json({ 
      message: 'User already registered', 
    });
  }

  const newUser = await userService.addNewUser(displayName, email, password, image);

  const token = loginController.generateToken(newUser);

  return res.status(HTTP_CREATED_STATUS).json({ token });
};

const deleteMe = async (req, res) => {
  const token = req.header('Authorization');

  const currentUserId = decodeToken(token);

  await userService.deleteUser(currentUserId);

  return res.status(HTTP_NO_CONTENT_STATUS).json();
};

module.exports = {
  getByUserId,
  getAllUsers,
  addNewUser,
  deleteMe,
};