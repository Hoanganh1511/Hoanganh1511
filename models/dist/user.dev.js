"use strict";

var _mongoose$Schema;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require('mongoose'); //User Schema: Cấu trúc cho model


var UserSchema = mongoose.Schema((_mongoose$Schema = {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Number
  },
  phone: {
    type: Number
  },
  status: {
    type: Boolean,
    "default": true
  },
  avatar: {
    type: String
  }
}, _defineProperty(_mongoose$Schema, "status", {
  type: String,
  "default": "Hoạt động"
}), _defineProperty(_mongoose$Schema, "checkblock", {
  type: Boolean,
  "default": false
}), _mongoose$Schema));
var User = module.exports = mongoose.model('User', UserSchema);