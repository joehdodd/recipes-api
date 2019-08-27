'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _JWTAuth = require('../middleware/JWTAuth');

var _JWTAuth2 = _interopRequireDefault(_JWTAuth);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = (0, _express.Router)();

router.get('/', _JWTAuth2.default, function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.context.models.User.findAll();

          case 2:
            users = _context.sent;
            return _context.abrupt('return', res.status(200).json({ message: 'Ok', data: users }));

          case 4:
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

router.get('/:userId', _JWTAuth2.default, function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return req.context.models.User.findById(req.params.userId);

          case 2:
            user = _context2.sent;
            return _context2.abrupt('return', res.status(200).json({ message: 'Ok', user: user.dataValues }));

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

router.get('/:userId/recipes', _JWTAuth2.default, function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var userId, recipes;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userId = req.params.userId;
            _context3.next = 3;
            return req.context.models.Recipe.findByUserId(userId);

          case 3:
            recipes = _context3.sent;
            return _context3.abrupt('return', res.status(200).json({ message: 'Ok!', data: recipes }));

          case 5:
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

router.post('/', function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body, username, password, existingUser;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            _context4.next = 3;
            return req.context.models.User.findByLogin(username);

          case 3:
            existingUser = _context4.sent;

            if (!existingUser) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt('return', res.status(400).json({ message: 'That username is taken. Please choose another.' }));

          case 8:
            _bcrypt2.default.hash(password, 10).then(function (hashedPassword) {
              req.context.models.User.create({
                username: username,
                password: hashedPassword
              }).then(function (user) {
                console.log('user created', user);
                return res.status(200).json({ message: 'User created!' });
              });
            });

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

exports.default = router;
//# sourceMappingURL=user.js.map