'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _graphql = require('graphql');

var _QueryType = require('./type/QueryType');

var _QueryType2 = _interopRequireDefault(_QueryType);

var _MutationType = require('./type/MutationType');

var _MutationType2 = _interopRequireDefault(_MutationType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = new _graphql.GraphQLSchema({
  query: _QueryType2.default,
  mutation: _MutationType2.default
});