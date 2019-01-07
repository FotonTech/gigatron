'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    hidden: true
  },
  email: {
    type: String,
    required: false,
    index: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  collection: 'user'
});

Schema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this.encryptPassword(this.password);
  }

  return next();
});

Schema.methods = {
  authenticate: function authenticate(plainTextPassword) {
    return _bcryptjs2.default.compareSync(plainTextPassword, this.password);
  },
  encryptPassword: function encryptPassword(password) {
    return _bcryptjs2.default.hashSync(password, 8);
  }
};

exports.default = _mongoose2.default.model('User', Schema);