import { Router } from 'express';
import JWTAuth from '../middleware/JWTAuth';

const router = Router();

router.get('/', JWTAuth, async (req, res) => {
  let recipes = [];
  if (req.query && req.query.userId) {
    recipes = await req.context.models.Recipe.findByUserId(req.query.userId);
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
