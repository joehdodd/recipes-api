import user from './user';
import recipe from './recipe';

export default app => {
  app.options('/*', (req, res) => {
    console.log('request', req);
  });

  app.use('/users', user);
  app.use('/recipes', recipe);
};
