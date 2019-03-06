const recipe = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('recipe', {
    title: { type: DataTypes.STRING }
  });

  Recipe.associate = models => {
    Recipe.belongsTo(models.User);
  };

  return Recipe;
};

export default recipe;
