'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _ConversationType = require('../type/ConversationType');

var _ConversationType2 = _interopRequireDefault(_ConversationType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'Conversation',
  nodeType: _ConversationType2.default,
  connectionFields: {
    count: {
      type: _graphql.GraphQLInt
    }
  }
});