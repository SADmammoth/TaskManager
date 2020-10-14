import { StatusCodes } from 'http-status-codes';
import User from '../models/entities/User';
import DataController from './DataController';
import isEmptyObject from '../../helpers/isEmptyObject';
import login from '../passport/login';

const UserController = {
  requestRegistration: async function (req, res) {
    const { login, password } = req.body;
    let user = await User.findOne({ login });

    if (isEmptyObject(user)) {
      user = await User.create({
        login,
        password,
      });
    }

    const userId = user._id;
    DataController.initUser(userId);

    res.send(`User ${login} registered`);
  },

  login: function (req, res, next) {
    login(req, res, next);
    // console.log(credentials);
    // if (credentials) {
    //   res.json(credentials);
    // } else {
    //   res.status(StatusCodes.UNAUTHORIZED);
    //   res.send('Not authorized');
    // }
  },
};

export default UserController;
