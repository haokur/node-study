
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

// var db = mongoose.connect("mongodb://127.0.0.1:27017/blog");
var userSchema = require('../schemas/users')


module.exports = mongoose.model('User',userSchema)