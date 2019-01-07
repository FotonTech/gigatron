'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _NodeInterface = require('../interface/NodeInterface');

var _UserType = require('./UserType');

var _UserType2 = _interopRequireDefault(_UserType);

var _MessageType = require('./MessageType');

var _MessageType2 = _interopRequireDefault(_MessageType);

var _loader = require('../loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Conversation',
  description: 'Conversation data',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Conversation'),
      _id: {
        type: _graphql.GraphQLString,
        resolve: function resolve(conversation) {
          return conversation._id;
        }
      },
      owner: {
        type: _UserType2.default,
        resolve: function resolve(_ref, args, context) {
          var owner = _ref.owner;
          return _loader.UserLoader.load(context, owner);
        }
      },
      otherUser: {
        type: _UserType2.default,
        resolve: function resolve(_ref2, args, context) {
          var otherUser = _ref2.otherUser;
          return _loader.UserLoader.load(context, otherUser);
        }
      },
      lastMessage: {
        type: _graphql.GraphQLString,
        resolve: function resolve(conversation) {
          return conversation.lastMessage;
        }
      },
      updatedAt: {
        type: _graphql.GraphQLString,
        resolve: function resolve(conversation) {
          return conversation.updatedAt;
        }
      },
      messages: {
        type: _MessageType2.default,
        resolve: function resolve(_ref3, args, context) {
          var owner = _ref3.owner;
          return _loader.MessageLoader.load(context, owner);
        }
      }
    };
  },
  interfaces: function interfaces() {
    return [_NodeInterface.NodeInterface];
  }
});