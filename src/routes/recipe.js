import { Router } from 'express';
import Sequelize from 'sequelize';
import JWTAuth from '../middleware/JWTAuth';

const router = Router();
const Op = Sequelize.Op;

router.get('/', async (req, res) => {
  const recipes = await req.context.models.Recipe.findAll({
    attributes: ['title', 'id']
  });
  return res.status(200).json({ message: 'Ok!', data: recipes });
});

// router.get('/:query', async (req, res) => {
//   const { query } = req.params;
//   console.log('query', query);
//   const recipes = await req.context.models.Recipe.findAll({
//     where: {
//       [Op.or]: [
//         { title: { [Op.iLike]: '%' + query + '%' } },
//         { description: { [Op.iLike]: '%' + query + '%' } }
//       ]
//     },
//     include: [
//       {
//         model: req.context.models.Ingredient,
//         as: 'ingredients'
//       },
//       {
//         model: req.context.models.Instruction,
//         as: 'instructions'
//       }
//     ]
//   });
//   console.log('recipes', recipes);
//   return res.status(200).json({ message: 'Ok!', data: recipes });
// });

router.get('/:recipeId', JWTAuth, async (req, res) => {
  console.log('req.params', req.params);
  const recipe = await req.context.models.Recipe.findOne({
    where: { id: parseInt(req.params.recipeId) },
    include: [
      {
        model: req.context.models.Ingredient,
        as: 'ingredients'
      },
      {
        model: req.context.models.Instruction,
        as: 'instructions'
      },
      {
        model: req.context.models.RecipeComment,
        as: 'comments',
        include: [{ model: req.context.models.User }]
      }
    ]
  });
  console.log('recipe', recipe);
  return res.status(200).json({ message: 'Ok!', data: recipe });
});

router.post('/', JWTAuth, async (req, res) => {
  const { instructionsArray, ingredientsArray, title, description } = req.body;
  const recipe = await req.context.models.Recipe.create(
    {
      title,
      description,
      userId: req.user.dataValues.id
    },
    { returning: true }
  ).then(function(res) {
    ingredientsArray.forEach((ing, i) => {
      req.context.models.Ingredient.create({
        ingredient: ing,
        order: i + 1,
        recipeId: res.dataValues.id
      });
    });
    instructionsArray.forEach((inst, i) => {
      req.context.models.Instruction.create({
        instruction: inst,
        order: i + 1,
        recipeId: res.dataValues.id
      });
    });
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
