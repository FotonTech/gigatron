'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeField = exports.NodeInterface = undefined;

var _graphqlRelay = require('graphql-relay');

var _UserLoader = require('../loader/UserLoader');

var _UserLoader2 = _interopRequireDefault(_UserLoader);

var _loader = require('../loader');

var _UserType = require('../type/UserType');

var _UserType2 = _interopRequireDefault(_UserType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(
// A method that maps from a global id to an object
function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(globalId, context) {
    var _fromGlobalId, id, type;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId), id = _fromGlobalId.id, type = _fromGlobalId.type;

            // console.log('id, type: ', type, id, globalId);

            if (!(type === 'User')) {
              _context.next = 5;
              break;
            }

            _context.next = 4;
            return _loader.UserLoader.load(context, id);

          case 4:
            return _context.abrupt('return', _context.sent);

          case 5:
            return _context.abrupt('return', null);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(),
// A method that maps from an object to a type
function (obj) {
  // console.log('obj: ', typeof obj, obj.constructor);
  if (obj instanceof _UserLoader2.default) {
    return _UserType2.default;
  }
  return null;
}),
    nodeField = _nodeDefinitions.nodeField,
    nodeInterface = _nodeDefinitions.nodeInterface;

var NodeInterface = exports.NodeInterface = nodeInterface;
var NodeField = exports.NodeField = nodeField;