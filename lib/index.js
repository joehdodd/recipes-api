import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: true
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const User = sequelize.define("users", {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
});

User.findAll({
  where: {
    lastName: {
      [Op.iLike]: "%dod%"
    }
  }
}).then(users => {
  // console.log('users from db', users)
});

app.get("/", (req, res) => {
  res.status(200).send({
    success: "true",
    statusText: "hello world!"
  });
});

app.post("/createUser", (req, res) => {
  const { username, email, firstName, lastName } = req.body;
  if (!firstName || !lastName || !username || !email) {
    return res
      .status(400)

      .json({ error: true, message: "You must provide a user to create!" });
  } else {
    User.findOrCreate({
      where: { username, email, firstName, lastName }
    }).spread((user, created) => {
      console.log(
        user.get({
          plain: true
        })
      );
      console.log(created);
      if (!!created) {
        return res.status(200).json({
          error: false,
          message: `User ${firstName} ${lastName} created.`
        });
      } else {
        return res.status(400).json({
          error: true,
          message: `User taken.`
        });
      }
    });
  }
});

app.get("findUser");

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Recipes API running on port ${PORT}. 💻`);
});
