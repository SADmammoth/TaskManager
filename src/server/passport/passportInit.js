const passport = require('passport');
const jwtStrategy = require('./jwtStrategy');
const localStrategy = require('./localStrategy');

module.exports = function passportInit() {
  passport.use('local', localStrategy);
  passport.use('jwt', jwtStrategy);
};
