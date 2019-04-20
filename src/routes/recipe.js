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

router.post('/', JWTAuth, async (req, res) => {
  const { instructions, ingredients } = req.body;
  console.log(instructions.trim());
  let ingredientsArray = ingredients.split(',').map(s => s.trim());
  let instructionsArray = instructions.split(',').map(s => s.trim());
  console.log(ingredientsArray);
  console.log(instructionsArray);
  // const recipe = await req.context.models.Recipe.create({
  //   title: req.body.title,
  //   description: req.body.description,
  //   userId: req.user.dataValues.id
  // });
  // console.log('create recipe', recipe);
  // return res.status(200).json({ message: 'Ok!', data: recipe });
});
export default router;
