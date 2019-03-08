import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
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

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(context);

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
