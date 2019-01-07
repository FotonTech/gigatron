'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema({
  text: {
    type: String,
    required: true
  },
  owner: {
    type: _mongoose2.default.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  conversation: {
    type: _mongoose2.default.Schema.ObjectId,
    ref: 'Conversation',
    required: true
  }
}, {
  collection: 'message',
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

exports.default = _mongoose2.default.model('Message', Schema);