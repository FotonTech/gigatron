'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _model = require('../model');

var _ConversationType = require('../type/ConversationType');

var _ConversationType2 = _interopRequireDefault(_ConversationType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'StartConversation',
  inputFields: {
    email: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    }
  },
  mutateAndGetPayload: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, _ref3) {
      var email = _ref2.email;
      var user = _ref3.user;

      var conversation, otherUser, newConversation, _id;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _model.Conversation.findOne({ email: email.toLowerCase() });

            case 2:
              conversation = _context.sent;
              _context.next = 5;
              return _model.User.findOne({ email: email.toLowerCase() });

            case 5:
              otherUser = _context.sent;

              if (!conversation) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', {
                error: 'Conversation already exists',
                id: conversation._id
              });

            case 8:
              newConversation = new _model.Conversation({
                owner: user,
                otherUser: otherUser
              });
              _context.next = 11;
              return newConversation.save();

            case 11:
              _id = newConversation._id;
              _context.next = 14;
              return _model.Conversation.findOne({ _id: _id });

            case 14:
              _context.t0 = _context.sent;
              return _context.abrupt('return', {
                error: null,
                message: 'Your conversation started',
                status: true,
                conversation: _context.t0
              });

            case 16:
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
    status: {
      type: _graphql.GraphQLBoolean,
      resolve: function resolve(_ref4) {
        var status = _ref4.status;
        return status;
      }
    },
    message: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_ref5) {
        var message = _ref5.message;
        return message;
      }
    },
    error: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_ref6) {
        var error = _ref6.error;
        return error;
      }
    },
    conversation: {
      type: _ConversationType2.default,
      resolve: function resolve(_ref7) {
        var conversation = _ref7.conversation;
        return conversation;
      }
    }
  }
});