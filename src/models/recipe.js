const recipe = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('recipe', {
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    ingredients: { type: DataTypes.ARRAY(DataTypes.JSON) },
    instructions: { type: DataTypes.ARRAY(DataTypes.JSON) }
  });

  Recipe.associate = models => {
    Recipe.belongsTo(models.User);
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
