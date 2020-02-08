import User from "../model/entities/User";
import DataController from "./DataController";

let user = null;

exports._register = async (login, password) => {
  user = await User.findOne({ login: login }).exec();
  if (!user || Object.keys(user).length === 0) {
    user = await User.create({
      login: login,
      password: password
    });
  }
};
exports.registerNew = async (req, res) => {
  console.log("3w");
  exports._register(req.body.login, req.body.password);
  DataController.init();
};

exports._isLoggedIn = () => user !== null;
exports.isLoggedIn = (req, res) => {
  res.json({ result: _isLoggedIn() });
};

exports._getToken = () => user["_id"];
exports.getToken = (req, res) => {
  res.json({ result: user["_id"] });
};
