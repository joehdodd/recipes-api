// export default (sequelize, DataTypes) => {
//     const RecipeIngredients = sequelize.define('recipeIngredients', {
//       recipeId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'Recipe',
//           key: 'id'
//         }
//       },
//       ingredientId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'Ingredient',
//           key: 'id'
//         }
//       }
//     });
//     return RecipeIngredients;
//   };