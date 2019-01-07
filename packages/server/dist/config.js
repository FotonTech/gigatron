'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtSecret = exports.graphqlPort = exports.databaseConfig = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dotenvSafe = require('dotenv-safe');

var _dotenvSafe2 = _interopRequireDefault(_dotenvSafe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = _path2.default.join.bind(undefined, __dirname, '../');

_dotenvSafe2.default.load({
  path: root('.env')
});

// Database Settings
var dBdevelopment = process.env.MONGO_URL || 'mongodb://localhost/fotonChat';
var dBproduction = process.env.MONGO_URL || 'mongodb://localhost/fotonChat';

// Test Database Settings
// const test = 'mongodb://localhost/awesome-test';

// Export DB Settings
var databaseConfig = exports.databaseConfig = process.env.NODE_ENV === 'production' ? dBproduction : dBdevelopment;

// Export GraphQL Server settings
var graphqlPort = exports.graphqlPort = process.env.GRAPHQL_PORT || 5000;
var jwtSecret = exports.jwtSecret = process.env.JWT_KEY || 'secret_key';