'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('now-env');

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