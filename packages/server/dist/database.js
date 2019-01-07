'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectDatabase;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connectDatabase() {
  return new Promise(function (resolve, reject) {
    _mongoose2.default.Promise = global.Promise;
    _mongoose2.default.connection.on('error', function (error) {
      return reject(error);
    }).on('close', function () {
      return console.log('Database connection closed.');
    }).once('open', function () {
      return resolve(_mongoose2.default.connections[0]);
    });

    _mongoose2.default.connect(_config.databaseConfig);
  });
}