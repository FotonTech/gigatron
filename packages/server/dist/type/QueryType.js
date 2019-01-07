'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _UserType = require('./UserType');

var _UserType2 = _interopRequireDefault(_UserType);

var _PetType = require('./PetType');

var _PetType2 = _interopRequireDefault(_PetType);

var _ConversationType = require('./ConversationType');

var _ConversationType2 = _interopRequireDefault(_ConversationType);

var _NodeInterface = require('../interface/NodeInterface');

var _loader = require('../loader');

var _UserConnection = require('../connection/UserConnection');

var _UserConnection2 = _interopRequireDefault(_UserConnection);

var _PetConnection = require('../connection/PetConnection');

var _PetConnection2 = _interopRequireDefault(_PetConnection);

var _ConversationConnection = require('../connection/ConversationConnection');

var _ConversationConnection2 = _interopRequireDefault(_ConversationConnection);

var _MessageConnection = require('../connection/MessageConnection');

var _MessageConnection2 = _interopRequireDefault(_MessageConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: function fields() {
    return {
      node: _NodeInterface.NodeField,
      me: {
        type: _UserType2.default,
        resolve: function resolve(root, args, context) {
          return context.user ? _loader.UserLoader.load(context, context.user._id) : null;
        }
      },
      pet: {
        type: _PetType2.default,
        args: {
          petId: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
          }
        },
        resolve: function resolve(root, args, context) {
          return _loader.PetLoader.load(context, args.petId);
        }
      },
      pets: {
        type: _PetConnection2.default.connectionType,
        args: _extends({}, _graphqlRelay.connectionArgs),
        resolve: function resolve(obj, args, context) {
          return _loader.PetLoader.loadPets(context, args);
        }
      },
      conversation: {
        type: _ConversationType2.default,
        args: {
          conversationId: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
          }
        },
        resolve: function resolve(root, args, context) {
          return _loader.ConversationLoader.load(context, args.conversationId);
        }
      },
      conversations: {
        type: _ConversationConnection2.default.connectionType,
        args: _extends({}, _graphqlRelay.connectionArgs),
        resolve: function resolve(obj, args, context) {
          return _loader.ConversationLoader.loadConversations(context, args);
        }
      },
      messages: {
        type: _MessageConnection2.default.connectionType,
        args: _extends({}, _graphqlRelay.connectionArgs),
        resolve: function resolve(obj, args, context) {
          return _loader.MessageLoader.loadMessages(context, args);
        }
      },
      user: {
        type: _UserType2.default,
        args: {
          id: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
          }
        },
        resolve: function resolve(obj, args, context) {
          return _loader.UserLoader.load(context, (0, _graphqlRelay.fromGlobalId)(args.id).id);
        }
      },
      users: {
        type: _UserConnection2.default.connectionType,
        args: _extends({}, _graphqlRelay.connectionArgs, {
          search: {
            type: _graphql.GraphQLString
          }
        }),
        resolve: function resolve(obj, args, context) {
          return _loader.UserLoader.loadUsers(context, args);
        }
      }
    };
  }
});