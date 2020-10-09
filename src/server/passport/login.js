import passport from 'passport';
import jwt from 'jsonwebtoken';

export default function login(req, res, next) {
  return passport.authenticate('local', function (err, user) {
    if (user == false) {
      return false;
    } else {
      const payload = {
        userId: user._id,
        login: user.login,
      };

      const token = jwt.sign(payload, process.env.AUTH_SECRET);

      return {
        userId: user._id,
        login: user.login,
        token: 'JWT ' + token,
      };
    }
  })(req, res, next);
}
