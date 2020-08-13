import passport from 'passport';
import jwtStrategy from './jwtStrategy';
import localStrategy from './localStrategy';

export default function passportInit() {
  passport.use('local', localStrategy);
  passport.use('jwt', jwtStrategy);
}
