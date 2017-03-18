
var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	contentid:String,
	addtime:{
		type:Date,
		default :new Date
	},
	content:String
})