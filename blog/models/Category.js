
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

var categorySchema = require('../schemas/categories')


module.exports = mongoose.model('Category',categorySchema)