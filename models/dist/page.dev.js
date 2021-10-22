"use strict";

var mongoose = require('mongoose'); //Page Schema: Cấu trúc cho model


var PageSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  sorting: {
    type: Number,
    required: true
  }
});
var Page = module.exports = mongoose.model('Page', PageSchema);