import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/entities/User';

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

export default jwtStrategy;
