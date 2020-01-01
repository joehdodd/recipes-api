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
  const { instructions, ingredients } = req.body;
  console.log(instructions.trim());
  let ingredientsArray = ingredients.split(',').map(s => s.trim());
  let instructionsArray = instructions.split(',').map(s => s.trim());
  const recipe = await req.context.models.Recipe.create({
    title: req.body.title,
    description: req.body.description,
    userId: req.user.dataValues.id,
    ingredients: ingredientsArray,
    instructions: instructionsArray
  });
  console.log('create recipe', recipe);
  return res.status(200).json({ message: 'Ok!', data: recipe });
});

router.put('/:recipeId', JWTAuth, async (req, res) => {
  const { instructions, ingredients } = req.body;
  console.log('***', Array.isArray(instructions), '***', Array.isArray(ingredients));
  let ingredientsArray = Array.isArray(ingredients) ? ingredients : ingredients.split(',').map(s => s.trim());
  let instructionsArray = Array.isArray(instructions) ? instructions : instructions.split(',').map(s => s.trim());
  req.context.models.Recipe.update(
    {
      title: req.body.title,
      description: req.body.description,
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
