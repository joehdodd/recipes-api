import models from '../models';

const context = async (req, res, next) => {
  req.context = {
    models
  };
  next();
};

export { context };
