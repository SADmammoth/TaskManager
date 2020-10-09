import passport from 'passport';
import { StatusCodes } from 'http-status-codes';
import User from '../models/entities/User';
import DataController from './DataController';
import isEmptyObject from '../../helpers/isEmptyObject';

const UserController = {
  register: async function (login, password) {
    let user = await User.findOne({ login });

    if (isEmptyObject(user)) {
      user = await User.create({
        login,
        password,
      });
    }

    return user._id;
  },
  requestRegistration: async function (req, res) {
    const { login, password } = req.body;
    const userId = await this.register(login, password);
    DataController.initUser(userId);

    res.send(`User ${login} registered`);
  },

  login: async function (req, res, next) {
    let credentials = this.login(req, res, next);
    if (credentials) {
      res.json(credentials);
    } else {
      res.send(StatusCodes.UNAUTHORIZED);
    }
  },
};

export default UserController;
