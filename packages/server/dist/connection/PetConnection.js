'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _PetType = require('../type/PetType');

var _PetType2 = _interopRequireDefault(_PetType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'Pet',
  nodeType: _PetType2.default,
  connectionFields: {
    count: {
      type: _graphql.GraphQLInt
    }
  }
});