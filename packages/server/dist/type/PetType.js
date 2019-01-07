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
  name: 'Pet',
  description: 'Pet data',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Pet'),
      _id: {
        type: _graphql.GraphQLString,
        resolve: function resolve(pet) {
          return pet._id;
        }
      },
      image: {
        type: _graphql.GraphQLString,
        resolve: function resolve(pet) {
          return pet.image;
        }
      },
      owner: {
        type: _UserType2.default,
        resolve: function resolve(_ref, args, context) {
          var owner = _ref.owner;
          return _loader.UserLoader.load(context, owner);
        }
      },
      name: {
        type: _graphql.GraphQLString,
        resolve: function resolve(pet) {
          return pet.name;
        }
      },
      gender: {
        type: _graphql.GraphQLString,
        resolve: function resolve(pet) {
          return pet.gender;
        }
      },
      port: {
        type: _graphql.GraphQLString,
        resolve: function resolve(pet) {
          return pet.port;
        }
      },
      birthDate: {
        type: _graphql.GraphQLString,
        resolve: function resolve(pet) {
          return pet.birthDate;
        }
      },
      color: {
        type: _graphql.GraphQLString,
        resolve: function resolve(pet) {
          return pet.color;
        }
      },
      castrated: {
        type: _graphql.GraphQLBoolean,
        resolve: function resolve(pet) {
          return pet.castrated;
        }
      },
      alergic: {
        type: new _graphql.GraphQLList(_graphql.GraphQLString),
        resolve: function resolve(pet) {
          return pet.alergic;
        }
      },
      race: {
        type: _graphql.GraphQLString,
        resolve: function resolve(pet) {
          return pet.race;
        }
      },
      type: {
        type: _graphql.GraphQLString,
        resolve: function resolve(pet) {
          return pet.type;
        }
      }
    };
  },
  interfaces: function interfaces() {
    return [_NodeInterface.NodeInterface];
  }
});