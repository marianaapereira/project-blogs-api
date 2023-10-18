const userService = require('../services/user.service');
const loginController = require('./login.controller');

const { HTTP_CREATED_STATUS, HTTP_CONFLICT_STATUS } = require('../consts/httpStatusCodes');

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

module.exports = {
  addNewUser,
};