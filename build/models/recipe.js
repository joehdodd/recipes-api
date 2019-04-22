'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var recipe = function recipe(sequelize, DataTypes) {
  var Recipe = sequelize.define('recipe', {
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }
  });

  Recipe.associate = function (models) {
    Recipe.belongsTo(models.User);
  };

  Recipe.findById = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
      var recipe;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Recipe.findOne({
                where: { id: id }
              });

            case 2:
              recipe = _context.sent;
              return _context.abrupt('return', recipe);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  Recipe.findByUserId = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userId) {
      var recipes;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Recipe.findAll({
                where: { userId: userId }
              });

            case 2:
              recipes = _context2.sent;
              return _context2.abrupt('return', recipes);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  return Recipe;
};

exports.default = recipe;
//# sourceMappingURL=recipe.js.map