import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.status(200).json({ message: 'Ok', data: users });
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findById(req.params.userId);
  return res.status(200).json({ message: 'Ok', data: user });
});

export default router;
