'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = (0, _express.Router)();

router.post('/', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, username, password, user, passwordMatch, payload, token, domain;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password;

            if (!(username && password)) {
              _context.next = 21;
              break;
            }

            _context.next = 4;
            return req.context.models.User.findByLogin(username);

          case 4:
            user = _context.sent;

            if (!(user === null || !user)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', res.status(401).json({ message: 'User not found', user: user }));

          case 7:
            _context.next = 9;
            return _bcrypt2.default.compare(password, user.password);

          case 9:
            passwordMatch = _context.sent;

            if (!passwordMatch) {
              _context.next = 18;
              break;
            }

            payload = { id: user.id };
            token = _jsonwebtoken2.default.sign(payload, process.env.KEY);
            domain = process.env.NODE_ENV === 'production' ? 'recipes.casa' : 'localhost';

            res.cookie('JWTAuth', token, {
              domain: domain,
              maxAge: 604800000
            });
            return _context.abrupt('return', res.status(200).send({ user: user }));

          case 18:
            return _context.abrupt('return', res.status(401).json({ message: 'Incorrect password', error: true }));

          case 19:
            _context.next = 22;
            break;

          case 21:
            return _context.abrupt('return', res.status(401).json({ message: 'Username and password reqiured.' }));

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = router;
//# sourceMappingURL=session.js.map