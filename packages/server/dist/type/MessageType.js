'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _NodeInterface = require('../interface/NodeInterface');

var _UserType = require('./UserType');

var _UserType2 = _interopRequireDefault(_UserType);

var _loader = require('../loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Message',
  description: 'message data',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Message'),
      _id: {
        type: _graphql.GraphQLString,
        resolve: function resolve(message) {
          return message._id;
        }
      },
      owner: {
        type: _UserType2.default,
        resolve: function resolve(_ref, args, context) {
          var owner = _ref.owner;
          return _loader.UserLoader.load(context, owner);
        }
      },
      text: {
        type: _graphql.GraphQLString,
        resolve: function resolve(message) {
          return message.text;
        }
      }
    };
  },
  interfaces: function interfaces() {
    return [_NodeInterface.NodeInterface];
  }
});