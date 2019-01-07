'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _UserType = require('../type/UserType');

var _UserType2 = _interopRequireDefault(_UserType);

var _loader = require('../loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'ChangePassword',
  inputFields: {
    oldPassword: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    },
    password: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
      description: 'user new password'
    }
  },
  mutateAndGetPayload: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, _ref3) {
      var oldPassword = _ref2.oldPassword,
          password = _ref2.password;
      var user = _ref3.user;
      var correctPassword;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (user) {
                _context.next = 2;
                break;
              }

              throw new Error('invalid user');

            case 2:
              correctPassword = user.authenticate(oldPassword);

              if (correctPassword) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', {
                error: 'INVALID_PASSWORD'
              });

            case 5:

              user.password = password;
              _context.next = 8;
              return user.save();

            case 8:
              return _context.abrupt('return', {
                error: null
              });

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function mutateAndGetPayload(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),
  outputFields: {
    error: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_ref4) {
        var error = _ref4.error;
        return error;
      }
    },
    me: {
      type: _UserType2.default,
      resolve: function resolve(obj, args, context) {
        return _loader.UserLoader.load(context, context.user.id);
      }
    }
  }
});