const User = require('../models/entities/User');
const DataController = require('./DataController');
const isEmptyObject = require('../../helpers/isEmptyObject');
const login = require('../passport/login');

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

  login,
};

module.exports = UserController;
