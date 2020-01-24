import session from './session';
import user from './user';
import recipe from './recipe';
import comment from './comment';

export default app => {
  app.use('/session', session);
  app.use('/users', user);
  app.use('/recipes', recipe);
  app.use('/comments', comment)
};
