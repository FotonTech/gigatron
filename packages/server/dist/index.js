'use strict';

require('babel-polyfill');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var info;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _database2.default)();

        case 3:
          info = _context.sent;

          console.log('Connected to ' + info.host + ':' + info.port + '/' + info.name);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context['catch'](0);

          console.error('Unable to connect to database');
          process.exit(1);

        case 11:
          _context.next = 13;
          return _app2.default.listen(_config.graphqlPort);

        case 13:
          console.log('Server started on port ' + _config.graphqlPort);

        case 14:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[0, 7]]);
}))();