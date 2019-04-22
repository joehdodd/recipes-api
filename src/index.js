import 'regenerator-runtime/runtime';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
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
const ExtractJwt = passportJWT.ExtractJwt;

app.use((req, res, next) => {
  const { headers } = req;
  res.header('Access-Control-Allow-Origin', headers.origin);
  res.header('Access-Control-Allow-Headers', headers);
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
  'JWTAuth',
  new JwtStrategy(
    {
      jwtFromRequest: req => req.cookies.JWTAuth,
      secretOrKey: process.env.KEY
    },
    async function(jwt_payload, done) {
      const user = await models.User.findById(jwt_payload.id);
      if (user) {
        done(null, user);
      } else {
        done(null, false, { message: 'Not authorized!' });
      }
    }
  )
);

// const session = passport.use(
//   'JWTSession',
//   new JwtStrategy(
//     {
//       jwtFromRequest: req => req.cookies.JWTSession,
//       secretOrKey: process.env.KEY
//     },
//     function(jwt, done) {
//       console.log('JWTSession', jwt);
//       if (new Date(jwt.exp * 1000).getTime() < new Date().getTime()) {
//         return done(null, false, { message: 'Your session has expired!' });
//       } else {
//         return done(null, {});
//       }
//     }
//   )
// );

// const sessionMiddleware = (req, res, next) => {
//   if (req.url === '/session') {
//     next();
//   } else {
//     const { session } = req.cookies;
//     console.log('session cookie', session);
//     next();
//   }
// };

// app.use(sessionMiddleware);

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
