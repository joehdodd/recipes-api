import { Router } from 'express';
import JWTAuth from '../middleware/JWTAuth';

const router = Router();

router.get('/', JWTAuth, async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.status(200).json({ message: 'Ok', data: users });
});

router.get('/:userId', JWTAuth, async (req, res) => {
  const user = await req.context.models.User.findById(req.params.userId);
  return res.status(200).json({ message: 'Ok', data: user });
});

export default router;
