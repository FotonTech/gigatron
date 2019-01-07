'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _model = require('../model');

var _auth = require('../auth');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'LoginEmail',
  inputFields: {
    email: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    },
    password: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    }
  },
  mutateAndGetPayload: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
      var email = _ref2.email,
          password = _ref2.password;
      var user, correctPassword;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _model.User.findOne({ email: email.toLowerCase() });

            case 2:
              user = _context.sent;

              if (user) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', {
                token: null,
                error: 'INVALID_EMAIL_PASSWORD'
              });

            case 5:
              correctPassword = user.authenticate(password);

              if (correctPassword) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', {
                token: null,
                error: 'INVALID_EMAIL_PASSWORD'
              });

            case 8:
              return _context.abrupt('return', {
                token: (0, _auth.generateToken)(user),
                error: null
              });

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function mutateAndGetPayload(_x) {
      return _ref.apply(this, arguments);
    };
  }(),
  outputFields: {
    token: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_ref3) {
        var token = _ref3.token;
        return token;
      }
    },
    error: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_ref4) {
        var error = _ref4.error;
        return error;
      }
    }
  }
});