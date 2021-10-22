"use strict";

var mongoose = require('mongoose'); //Category Schema: Cấu trúc cho model


var EvaluateProductSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});
var EvaluateProduct = module.exports = mongoose.model('EvaluateProduct', EvaluateProductSchema);