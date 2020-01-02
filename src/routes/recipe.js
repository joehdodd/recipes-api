import { Router } from 'express';
import JWTAuth from '../middleware/JWTAuth';

const router = Router();

router.get('/', async (req, res) => {
  const recipes = await req.context.models.Recipe.findAll();
  return res.status(200).json({ message: 'Ok!', data: recipes });
});

router.get('/:recipeId', JWTAuth, async (req, res) => {
  const recipe = await req.context.models.Recipe.findById(req.params.recipeId);
  return res.status(200).json({ message: 'Ok!', data: recipe });
});

router.post('/', JWTAuth, async (req, res) => {
  const { instructionsArray, ingredientsArray, title, description } = req.body;
  const recipe = await req.context.models.Recipe.create({
    title,
    description,
    userId: req.user.dataValues.id,
    ingredients: ingredientsArray,
    instructions: instructionsArray
  });
  return res.status(200).json({ message: 'Ok!', data: recipe });
});

router.put('/:recipeId', JWTAuth, async (req, res) => {
  const { instructionsArray, ingredientsArray, title, description } = req.body;
  req.context.models.Recipe.update(
    {
      title,
      description,
      userId: req.user.dataValues.id,
      ingredients: ingredientsArray,
      instructions: instructionsArray
    },
    { returning: true, where: { id: req.params.recipeId } }
  )
    .then(function([rowsUpdated, [recipe]]) {
      return res.status(200).json({ message: 'Ok!', data: recipe });
    })
    .catch(err => console.log(err));
});

export default router;
