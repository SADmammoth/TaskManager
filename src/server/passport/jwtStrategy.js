const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/entities/User');

var params = {};
params.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
params.secretOrKey = process.env.AUTH_SECRET;

const jwtStrategy = new JwtStrategy(params, (payload, done) => {
  User.findOne({ login: payload.login })
    .then((user = null) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, null);
    });
});

module.exports = jwtStrategy;
