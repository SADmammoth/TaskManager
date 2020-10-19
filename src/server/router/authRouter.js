const express = require('express');
const UserController = require('../controllers/UserController');

const authRouter = express.Router();

authRouter.post('/users', UserController.requestRegistration);

authRouter.post('/users/login', UserController.login);

module.exports = authRouter;
