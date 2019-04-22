'use strict';

require('regenerator-runtime/runtime');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

require('dotenv/config');

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _middleware = require('./middleware');

var _seed = require('./util/seed');

var _seed2 = _interopRequireDefault(_seed);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = (0, _express2.default)();

var corsOptions = {
  origin: function origin(_origin, cb) {
    if (process.env.WHITELIST.indexOf(_origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error('Origin not whitlisted. Blocked by CORS! ☠️'));
    }
  }
};

var JwtStrategy = _passportJwt2.default.Strategy;
var ExtractJwt = _passportJwt2.default.ExtractJwt;

app.use(function (req, res, next) {
  var headers = req.headers;

  console.log('request headers', headers);
  res.header('Access-Control-Allow-Origin', headers.origin);
  res.header('Access-Control-Allow-Headers', headers);
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use((0, _cookieParser2.default)());
app.use(_passport2.default.initialize());
app.use((0, _cors2.default)(corsOptions));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_middleware.context);

_passport2.default.use('JWTAuth', new JwtStrategy({
  jwtFromRequest: function jwtFromRequest(req) {
    return req.cookies.JWTAuth;
  },
  secretOrKey: process.env.KEY
}, function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(jwt_payload, done) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models2.default.User.findById(jwt_payload.id);

          case 2:
            user = _context.sent;

            if (user) {
              done(null, user);
            } else {
              done(null, false, { message: 'Not authorized!' });
            }

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));

// const session = passport.use(
//   'JWTSession',
//   new JwtStrategy(
//     {
//       jwtFromRequest: req => req.cookies.JWTSession,
//       secretOrKey: process.env.KEY
//     },
//     function(jwt, done) {
//       console.log('JWTSession', jwt);
//       if (new Date(jwt.exp * 1000).getTime() < new Date().getTime()) {
//         return done(null, false, { message: 'Your session has expired!' });
//       } else {
//         return done(null, {});
//       }
//     }
//   )
// );

// const sessionMiddleware = (req, res, next) => {
//   if (req.url === '/session') {
//     next();
//   } else {
//     const { session } = req.cookies;
//     console.log('session cookie', session);
//     next();
//   }
// };

// app.use(sessionMiddleware);

(0, _routes2.default)(app);

var eraseDatabaseOnSync = false;
_models.sequelize.sync({ force: eraseDatabaseOnSync }).then(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (eraseDatabaseOnSync) {
            (0, _seed2.default)();
          }

          app.listen(process.env.PORT, function () {
            console.log('App listening on port ' + process.env.PORT + '! \uD83D\uDCBB');
          });

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));
//# sourceMappingURL=index.js.map