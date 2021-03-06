import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  logging: false
});

const models = {
  User: sequelize.import('./user'),
  Recipe: sequelize.import('./recipe'),
  Ingredient: sequelize.import('./ingredient'),
  Instruction: sequelize.import('./instruction'),
  RecipeComment: sequelize.import('./recipeComment')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
