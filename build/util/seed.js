'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return models.User.create({
            username: 'joe',
            recipes: [{
              title: 'Taco Salad'
            }, {
              title: 'Chili'
            }, {
              title: 'Pasta Salad'
            }, {
              title: 'Greek Salad'
            }, {
              title: 'Brownies'
            }]
          }, {
            include: [models.Recipe]
          });

        case 2:
          _context.next = 4;
          return models.User.create({
            username: 'wiley',
            recipes: [{
              title: 'Pizza'
            }, {
              title: 'Hot Dogs'
            }, {
              title: 'Oatmeal'
            }, {
              title: 'Waffles'
            }, {
              title: 'Spaghetti'
            }]
          }, {
            include: [models.Recipe]
          });

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));
//# sourceMappingURL=seed.js.map