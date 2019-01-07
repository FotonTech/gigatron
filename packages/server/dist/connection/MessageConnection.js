'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _MessageType = require('../type/MessageType');

var _MessageType2 = _interopRequireDefault(_MessageType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'Message',
  nodeType: _MessageType2.default,
  connectionFields: {
    count: {
      type: _graphql.GraphQLInt
    }
  }
});