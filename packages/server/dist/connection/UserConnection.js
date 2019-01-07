'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _UserType = require('../type/UserType');

var _UserType2 = _interopRequireDefault(_UserType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'User',
  nodeType: _UserType2.default,
  connectionFields: {
    count: {
      type: _graphql.GraphQLInt
    }
  }
});