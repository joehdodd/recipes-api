import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/', async function(req, res, next) {
  const { username, password } = req.body;

  if (username && password) {
    const user = await req.context.models.User.findByLogin(username);
    console.log('user returned', user)
    if (user === null || !user) {
      return res.status(401).json({ message: 'User not found', user });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.KEY);
      // const domain =
      //   process.env.NODE_ENV === 'production' ? 'recipes.casa' : 'localhost';
      res.cookie('JWTAuth', token, {
        maxAge: 604800000
      });
      const { username, firstName, lastName, email, id, favoriteRecipes } = user;
      return res
        .status(200)
        .send({ user: { username, firstName, lastName, email, id, favoriteRecipes } });
    } else {
      return res
        .status(401)
        .json({ message: 'Incorrect password', error: true });
    }
  } else {
    return res.status(401).json({ message: 'Username and password reqiured.' });
  }
});

export default router;
