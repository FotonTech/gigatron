'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _NodeInterface = require('../interface/NodeInterface');

exports.default = new _graphql.GraphQLObjectType({
  name: 'User',
  description: 'User data',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('User'),
      _id: {
        type: _graphql.GraphQLString,
        resolve: function resolve(user) {
          return user._id;
        }
      },
      name: {
        type: _graphql.GraphQLString,
        resolve: function resolve(user) {
          return user.name;
        }
      },
      email: {
        type: _graphql.GraphQLString,
        resolve: function resolve(user) {
          return user.email;
        }
      },
      active: {
        type: _graphql.GraphQLBoolean,
        resolve: function resolve(user) {
          return user.active;
        }
      }
    };
  },
  interfaces: function interfaces() {
    return [_NodeInterface.NodeInterface];
  }
});