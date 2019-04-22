'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _JWTAuth = require('../middleware/JWTAuth');

var _JWTAuth2 = _interopRequireDefault(_JWTAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = (0, _express.Router)();

router.get('/', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var recipes, id;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            recipes = [];

            if (!(req.query && req.query.user)) {
              _context.next = 8;
              break;
            }

            id = req.user.dataValues.id;
            _context.next = 5;
            return req.context.models.Recipe.findByUserId(id);

          case 5:
            recipes = _context.sent;
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return req.context.models.Recipe.findAll();

          case 10:
            recipes = _context.sent;

          case 11:
            return _context.abrupt('return', res.status(200).json({ message: 'Ok!', data: recipes }));

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

router.get('/:recipeId', _JWTAuth2.default, function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var recipe;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return req.context.models.Recipe.findById(req.params.recipeId);

          case 2:
            recipe = _context2.sent;
            return _context2.abrupt('return', res.status(200).json({ message: 'Ok!', data: recipe }));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

router.post('/', _JWTAuth2.default, function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, instructions, ingredients, ingredientsArray, instructionsArray, recipe;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, instructions = _req$body.instructions, ingredients = _req$body.ingredients;

            console.log(instructions.trim());
            ingredientsArray = ingredients.split(',').map(function (s) {
              return s.trim();
            });
            instructionsArray = instructions.split(',').map(function (s) {
              return s.trim();
            });
            _context3.next = 6;
            return req.context.models.Recipe.create({
              title: req.body.title,
              description: req.body.description,
              userId: req.user.dataValues.id,
              ingredients: ingredientsArray,
              instructions: instructionsArray
            });

          case 6:
            recipe = _context3.sent;

            console.log('create recipe', recipe);
            return _context3.abrupt('return', res.status(200).json({ message: 'Ok!', data: recipe }));

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
exports.default = router;
//# sourceMappingURL=recipe.js.map