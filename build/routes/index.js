'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _recipe = require('./recipe');

var _recipe2 = _interopRequireDefault(_recipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.use('/session', _session2.default);
  app.use('/users', _user2.default);
  app.use('/recipes', _recipe2.default);
};
//# sourceMappingURL=index.js.map