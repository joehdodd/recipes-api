import session from './session';
import user from './user';
import recipe from './recipe';

export default app => {
  app.use('/session', session);
  app.use('/users', user);
  app.use('/recipes', recipe);
};
