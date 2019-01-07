'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = undefined;

var getUser = exports.getUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
    var decodedToken, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (token) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', { user: null });

          case 2:
            _context.prev = 2;
            decodedToken = _jsonwebtoken2.default.verify(token.substring(4), _config.jwtSecret);
            _context.next = 6;
            return _model.User.findOne({ _id: decodedToken.id });

          case 6:
            user = _context.sent;
            return _context.abrupt('return', {
              user: user
            });

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](2);
            return _context.abrupt('return', { user: null });

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 10]]);
  }));

  return function getUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.generateToken = generateToken;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _model = require('./model');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function generateToken(user) {
  return 'JWT ' + _jsonwebtoken2.default.sign({ id: user._id }, _config.jwtSecret);
}