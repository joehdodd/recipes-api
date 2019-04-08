import { Router } from 'express';
import jwt from 'jsonwebtoken';

export default app => {
  const router = Router();

  router.post('/', async function(req, res, next) {
    const { username, password } = req.body;

    if (username && password) {
      const user = await req.context.models.User.findByLogin(username);

      if (user === null || !user) {
        res.status(401).json({ msg: 'User not found', user });
      }

      if (user && user.password === password) {
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.KEY);
        res.cookie('jwt', token, { httpOnly: true, secure: false });
        res.status(200).send({ isAuthenticated: true });
      } else {
        res.status(401).json({ msg: 'Incorrect password' });
      }
    } else {
      res.status(401).json({ msg: 'Username and password reqiured.' });
    }
  });

  return router;
};
