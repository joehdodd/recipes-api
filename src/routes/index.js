import session from './session';
import user from './user';
import recipe from './recipe';

export default app => {
  app.options('/*', (req, res) => {
    console.log('request', req);
    // const origin = req.headers.origin;
    // console.log('origin', origin);
    // res.header('Access-Control-Allow-Credentials', true);
    // res.header('Access-Control-Allow-Origin', origin);
    // const headers = req.headers['access-control-request-headers'];
    // res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    // res.header('Access-Control-Allow-Headers', headers);
    // res.end();
  });
  app.use('/session', session(app));
  app.use('/users', user);
  app.use('/recipes', recipe);
};
