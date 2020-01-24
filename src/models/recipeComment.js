const recipeComment = (sequelize, DataTypes) => {
  const RecipeComment = sequelize.define('recipeComment', {
    comment: { type: DataTypes.TEXT }
  });

  RecipeComment.associate = models => {
    RecipeComment.belongsTo(models.Recipe);
    RecipeComment.belongsTo(models.User);
  }

  RecipeComment.findById = async id => {
    let recipeComment = await RecipeComment.findOne({
      where: { id }
    });

    return recipeComment
  };

  RecipeComment.findRecipeId = async recipeId => {
    const comments = await Instruction.findAll({
      where: { recipeId }
    });
    return comments;
  };

  return RecipeComment;
};

export default recipeComment;
