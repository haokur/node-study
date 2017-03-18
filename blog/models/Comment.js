
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')


var commentSchema = require('../schemas/comment')

module.exports = mongoose.model('Comment',commentSchema)