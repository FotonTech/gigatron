'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema({
  messages: {
    type: [_mongoose2.default.Schema.ObjectId],
    ref: 'Message',
    required: false
  },
  owner: {
    type: _mongoose2.default.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  otherUser: {
    type: _mongoose2.default.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  lastMessage: {
    type: String,
    required: false
  }
}, {
  collection: 'conversation',
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

exports.default = _mongoose2.default.model('Conversation', Schema);