import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import models, { sequelize } from './models';
import { context } from './middleware';
import routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(context);

app.use('/session', routes.session);
// app.use('/users', routes.user);
// app.use('/recipes', routes.recipe);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});

// app.post("/createUser", (req, res) => {
//   const { username, email, firstName, lastName } = req.body;
//   if (!firstName || !lastName || !username || !email) {
//     return res
//       .status(400)
//
//       .json({ error: true, message: "You must provide a user to create!" });
//   } else {
//     User.findOrCreate({
//       where: { username, email, firstName, lastName }
//     }).spread((user, created) => {
//       console.log(
//         user.get({
//           plain: true
//         })
//       );
//       console.log(created);
//       if (!!created) {
//         return res.status(200).json({
//           error: false,
//           message: `User ${firstName} ${lastName} created.`
//         });
//       } else {
//         return res.status(400).json({
//           error: true,
//           message: `User taken.`
//         });
//       }
//     });
//   }
// });
//
// app.get("findUser");
