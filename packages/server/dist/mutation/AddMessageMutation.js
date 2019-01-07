'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _model = require('../model');

var _MessageType = require('../type/MessageType');

var _MessageType2 = _interopRequireDefault(_MessageType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'AddMessage',
  inputFields: {
    conversation: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
    },
    text: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    }
  },
  mutateAndGetPayload: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, _ref3) {
      var conversation = _ref2.conversation,
          text = _ref2.text;
      var user = _ref3.user;

      var currentConversation, newMessage, _id;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _model.Conversation.findOne({ id: conversation });

            case 2:
              currentConversation = _context.sent;

              if (!_model.Message) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', {
                error: 'Message already exists',
                id: _model.Message._id
              });

            case 5:
              newMessage = new _model.Message({
                owner: user._id,
                text: text,
                conversation: conversation
              });
              _context.next = 8;
              return newMessage.save();

            case 8:
              _context.next = 10;
              return _model.Conversation.findByIdAndUpdate({ id: conversation }, { messages: [newMessage].concat(_toConsumableArray(currentConversation.messages)) });

            case 10:
              _id = newMessage._id;
              _context.next = 13;
              return _model.Message.findOne({ _id: _id });

            case 13:
              _context.t0 = _context.sent;
              return _context.abrupt('return', {
                error: null,
                status: true,
                Message: _context.t0
              });

            case 15:
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
    error: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_ref5) {
        var error = _ref5.error;
        return error;
      }
    },
    message: {
      type: _MessageType2.default,
      resolve: function resolve(_ref6) {
        var Message = _ref6.Message;
        return Message;
      }
    }
  }
});