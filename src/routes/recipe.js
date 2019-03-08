import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const recipes = await req.context.models.Recipe.findAll();
  return res.status(200).json({ message: 'Ok!', data: recipes });
});

router.get('/:recipeId', async (req, res) => {
  const recipe = await req.context.models.Recipe.findById(req.params.recipeId);
  return res.status(200).json({ message: 'Ok!', data: recipe });
});

export default router;
