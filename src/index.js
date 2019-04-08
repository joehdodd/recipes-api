import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import 'dotenv/config';
import models, { sequelize } from './models';
import { context } from './middleware';
import seed from './util/seed';
import router from './routes';

const app = express();

let corsOptions = {
  origin: function(origin, cb) {
    if (process.env.WHITELIST.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error('Origin not whitlisted. Blocked by CORS! ☠️'));
    }
  }
};

const JwtStrategy = passportJWT.Strategy;

app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cookieParser());
app.use(passport.initialize());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(context);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: req => {
        console.log('request cookies', req.cookies);
        return req.cookies.jwt;
      },
      secretOrKey: process.env.KEY
    },
    function(jwt_payload, next) {
      console.log('payload received', jwt_payload);
      const user = models.User.findById(jwt_payload.id);
      if (user) {
        next(null, user);
      } else {
        next(null, { msg: 'You are not authorized!' });
      }
    }
  )
);

app.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).json({ msg: 'Authed' });
  }
);

router(app);

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    seed();
  }

  app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}! 💻`);
  });
});
