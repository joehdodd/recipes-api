const ingredient = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('ingredient', {
    ingredient: { type: DataTypes.TEXT },
    amount: { type: DataTypes.TEXT },
    order: { type: DataTypes.INTEGER }
  });

  Ingredient.associate = models => {
    Ingredient.belongsTo(models.Recipe);
  }

  Ingredient.findById = async id => {
    let ingredient = await Ingredient.findOne({
      where: { id }
    });

    return ingredient;
  };

  Ingredient.findRecipeId = async recipeId => {
    const ingredients = await Ingredient.findAll({
      where: { recipeId }
    });
    return ingredients;
  };

  return Ingredient;
};

export default ingredient;
