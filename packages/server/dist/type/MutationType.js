'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _LoginEmailMutation = require('../mutation/LoginEmailMutation');

var _LoginEmailMutation2 = _interopRequireDefault(_LoginEmailMutation);

var _RegisterEmailMutation = require('../mutation/RegisterEmailMutation');

var _RegisterEmailMutation2 = _interopRequireDefault(_RegisterEmailMutation);

var _ChangePasswordMutation = require('../mutation/ChangePasswordMutation');

var _ChangePasswordMutation2 = _interopRequireDefault(_ChangePasswordMutation);

var _PetAddMutation = require('../mutation/PetAddMutation');

var _PetAddMutation2 = _interopRequireDefault(_PetAddMutation);

var _StartConversationMutation = require('../mutation/StartConversationMutation');

var _StartConversationMutation2 = _interopRequireDefault(_StartConversationMutation);

var _PetDeleteMutation = require('../mutation/PetDeleteMutation');

var _PetDeleteMutation2 = _interopRequireDefault(_PetDeleteMutation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: function fields() {
    return {
      // auth
      LoginEmail: _LoginEmailMutation2.default,
      RegisterEmail: _RegisterEmailMutation2.default,
      ChangePassword: _ChangePasswordMutation2.default,

      // conversation
      StartConversation: _StartConversationMutation2.default,

      // pet
      PetAdd: _PetAddMutation2.default,
      PetDelete: _PetDeleteMutation2.default
    };
  }
});