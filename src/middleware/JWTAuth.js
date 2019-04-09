import passport from 'passport';

export default passport.authenticate('JWTAuth', { session: false });
