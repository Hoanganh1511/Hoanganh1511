"use strict";

var mongoose = require('mongoose'); //Category Schema: Cấu trúc cho model


var SizeSchema = mongoose.Schema({
  size: {
    type: String,
    required: true
  },
  slug: {
    type: String
  }
});
var Size = module.exports = mongoose.model('Size', SizeSchema);