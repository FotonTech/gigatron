'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema({
  image: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  port: {
    type: String,
    required: true
  },
  birthDate: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  castrated: {
    type: Boolean,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  alergic: {
    type: [String],
    required: false,
    default: []
  },
  doctor: {
    type: String,
    required: false
  },
  race: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  }
}, {
  collection: 'pet',
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

exports.default = _mongoose2.default.model('Pet', Schema);