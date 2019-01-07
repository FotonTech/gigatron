'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _model = require('../model');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'PetDelete',
  inputFields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    }
  },
  mutateAndGetPayload: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, _ref3) {
      var id = _ref2.id;
      var user = _ref3.user;
      var pet;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (user) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', {
                error: 'Unauthenticated',
                message: 'Oops me parece que você não esta logado! Por Favor Refaça o Login',
                status: false
              });

            case 2:
              pet = _model.Pet.findOne({
                _id: id
              });
              _context.next = 5;
              return pet.update({
                active: false
              });

            case 5:
              return _context.abrupt('return', {
                error: null,
                message: 'Seu pet foi removido com sucesso!!',
                status: true
              });

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function mutateAndGetPayload(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),
  outputFields: {
    status: {
      type: _graphql.GraphQLBoolean,
      resolve: function resolve(_ref4) {
        var status = _ref4.status;
        return status;
      }
    },
    message: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_ref5) {
        var message = _ref5.message;
        return message;
      }
    },
    error: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_ref6) {
        var error = _ref6.error;
        return error;
      }
    }
  }
});