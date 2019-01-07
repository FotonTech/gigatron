'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('isomorphic-fetch');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _kcors = require('kcors');

var _kcors2 = _interopRequireDefault(_kcors);

var _koaGraphql = require('koa-graphql');

var _koaGraphql2 = _interopRequireDefault(_koaGraphql);

var _koaGraphqlBatch = require('koa-graphql-batch');

var _koaGraphqlBatch2 = _interopRequireDefault(_koaGraphqlBatch);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _language = require('graphql/language');

var _schema = require('./schema');

var _config = require('./config');

var _auth = require('./auth');

var _loader = require('./loader');

var loaders = _interopRequireWildcard(_loader);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = new _koa2.default();
var router = new _koaRouter2.default();

app.keys = _config.jwtSecret;

var graphqlSettingsPerReq = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req) {
    var _ref2, user, dataloaders;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _auth.getUser)(req.header.authorization);

          case 2:
            _ref2 = _context.sent;
            user = _ref2.user;
            dataloaders = Object.keys(loaders).reduce(function (dataloaders, loaderKey) {
              return _extends({}, dataloaders, _defineProperty({}, loaderKey, loaders[loaderKey].getLoader()));
            }, {});
            return _context.abrupt('return', {
              graphiql: process.env.NODE_ENV !== 'production',
              schema: _schema.schema,
              context: {
                user: user,
                req: req,
                dataloaders: dataloaders
              },
              // eslint-disable-next-line
              extensions: function extensions(_ref3) {
                var document = _ref3.document,
                    variables = _ref3.variables,
                    operationName = _ref3.operationName,
                    result = _ref3.result;

                console.log((0, _language.print)(document));
                console.log(variables);
                console.log(result);
              },
              formatError: function formatError(error) {
                console.log(error.message);
                console.log(error.locations);
                console.log(error.stack);

                return {
                  message: error.message,
                  locations: error.locations,
                  stack: error.stack
                };
              }
            });

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function graphqlSettingsPerReq(_x) {
    return _ref.apply(this, arguments);
  };
}();

var graphqlServer = (0, _koaConvert2.default)((0, _koaGraphql2.default)(graphqlSettingsPerReq));

// graphql batch query route
router.all('/graphql/batch', (0, _koaBodyparser2.default)(), (0, _koaGraphqlBatch2.default)(graphqlServer));

// graphql standard route
router.all('/graphql', graphqlServer);

app.use((0, _koaLogger2.default)());
app.use((0, _kcors2.default)());
app.use(router.routes()).use(router.allowedMethods());

exports.default = app;