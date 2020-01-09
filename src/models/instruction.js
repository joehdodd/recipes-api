const instruction = (sequelize, DataTypes) => {
  const Instruction = sequelize.define('instruction', {
    instruction: { type: DataTypes.TEXT },
    order: { type: DataTypes.INTEGER }
  });

  Instruction.associate = models => {
    Instruction.belongsTo(models.Recipe);
  }

  Instruction.findById = async id => {
    let instruction = await Instruction.findOne({
      where: { id }
    });

    return instruction
  };

  Instruction.findRecipeId = async recipeId => {
    const instructions = await Instruction.findAll({
      where: { recipeId }
    });
    return instructions;
  };

  return Instruction;
};

export default instruction;
