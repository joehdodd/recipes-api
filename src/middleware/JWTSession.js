import passport from 'passport';

export default passport.authenticate('JWTSession', { session: false });
