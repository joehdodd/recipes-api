import { Router } from 'express';
import JWTAuth from '../middleware/JWTAuth';

const router = Router();

router.get('/', async (req, res) => {
  let recipes = [];
  if (req.query && req.query.user) {
    const { id } = req.user.dataValues;
    recipes = await req.context.models.Recipe.findByUserId(id);
  } else {
    recipes = await req.context.models.Recipe.findAll();
  }
  return res.status(200).json({ message: 'Ok!', data: recipes });
});

router.get('/:recipeId', JWTAuth, async (req, res) => {
  const recipe = await req.context.models.Recipe.findById(req.params.recipeId);
  return res.status(200).json({ message: 'Ok!', data: recipe });
});

export default router;
