import models from '../models';

const context = async (req, res, next) => {
  req.context = {
    models,
    user: await models.User.findByLogin('joe')
  };
  next();
};

export { context };
