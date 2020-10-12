import express from 'express';
import UserController from '../controllers/UserController';

const authRouter = express.Router();

authRouter.post('/users', UserController.requestRegistration);

authRouter.post('/users/login', UserController.login);

export default authRouter;
