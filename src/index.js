import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import 'dotenv/config';
import models, { sequelize } from './models';
import { context } from './middleware';
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

const ExtractJwT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.KEY;

const tokenStrategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  const user = models.User.findById(jwt_payload.id);
  if (user) {
    next(null, user);
  } else {
    next(null, { msg: 'You are not authorized!' });
  }
});

passport.use(tokenStrategy);

app.use(passport.initialize());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(context);

app.post('/session', async function(req, res, next) {
  const { username, password } = req.body;
  if (username && password) {
    const user = await models.User.findByLogin(username);
    if (!user) {
      res.status(401).json({ msg: 'User not found', user });
    }
    if (user.password === password) {
      const payload = { id: user.id };
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.status(200).json({ msg: 'Ok', token });
    } else {
      res.status(401).json({ msg: 'Incorrect password' });
    }
  } else {
    res.status(401).json({ msg: 'Username and password reqiured.' });
  }
});

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
    createUsersWithRecipes();
  }

  app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}! 💻`);
  });
});

const createUsersWithRecipes = async () => {
  await models.User.create(
    {
      username: 'joe',
      recipes: [
        {
          title: 'Taco Salad'
        },
        {
          title: 'Chili'
        },
        {
          title: 'Pasta Salad'
        },
        {
          title: 'Greek Salad'
        },
        {
          title: 'Brownies'
        }
      ]
    },
    {
      include: [models.Recipe]
    }
  );

  await models.User.create(
    {
      username: 'wiley',
      recipes: [
        {
          title: 'Pizza'
        },
        {
          title: 'Hot Dogs'
        },
        {
          title: 'Oatmeal'
        },
        {
          title: 'Waffles'
        },
        {
          title: 'Spaghetti'
        }
      ]
    },
    {
      include: [models.Recipe]
    }
  );
};
