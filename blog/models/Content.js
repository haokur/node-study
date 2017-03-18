
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

var contentSchema = require('../schemas/content')

module.exports = mongoose.model('Content',contentSchema)