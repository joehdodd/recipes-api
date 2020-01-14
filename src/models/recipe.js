const recipe = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('recipe', {
    title: { type: DataTypes.TEXT },
    description: { type: DataTypes.TEXT }
    // ingredients: { type: DataTypes.ARRAY(DataTypes.TEXT) },
    // instructions: { type: DataTypes.ARRAY(DataTypes.TEXT) }
  });

  Recipe.associate = models => {
    Recipe.belongsTo(models.User);
    // Recipe.belongsToMany(models.Ingredient, {
    //   through: 'recipeIngredients',
    //   as: 'ingredients',
    //   foreingKey: 'recipeId'
    // });
    Recipe.hasMany(models.Ingredient);
    Recipe.hasMany(models.Instruction);
    Recipe.hasMany(models.RecipeComment, { as: 'comments' });
  };

  Recipe.findById = async id => {
    let recipe = await Recipe.findOne({
      where: { id }
    });

    return recipe;
  };

  Recipe.findByUserId = async userId => {
    const recipes = await Recipe.findAll({
      where: { userId }
    });
    return recipes;
  };

  return Recipe;
};

export default recipe;
