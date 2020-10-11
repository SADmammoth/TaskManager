import express from 'express';
import UserController from '../controllers/UserController';

var authRouter = express.Router();

authRouter.post('/users', UserController.requestRegistration);

authRouter.post('/users/login', UserController.login);

// authRouter.get('/echo', authenticate, function (req, res) {
//   res.json({ userId: req.user._id });
// });

export default authRouter;
