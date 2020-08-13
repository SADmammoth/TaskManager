import passport from 'passport';
import User from '../models/entities/User';
import DataController from './DataController';
import jwt from 'jsonwebtoken';

let user = null;

exports._register = async (login, password) => {
  user = await User.findOne({ login: login });
  if (!user || Object.keys(user).length === 0) {
    user = await User.create({
      login,
      password,
    });
  }

  return user._id;
};

exports.register = async (req, res) => {
  let { login, password } = req.body;
  let userId = await exports._register(login, password);
  DataController._init(userId);

  res.send(`User ${login} registered`);
};

exports.login = async (req, res, next) => {
  await passport.authenticate('local', function (err, user) {
    if (user == false) {
      res.status(403);
      res.send('Login failed');
    } else {
      const payload = {
        userId: user._id,
        login: user.login,
      };

      const token = jwt.sign(payload, process.env.AUTH_SECRET);

      res.json({
        userId: user._id,
        login: user.login,
        token: 'JWT ' + token,
      });
    }
  })(req, res, next);
};
