
var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    // 关联字段 -内容分类的id
    category:{
        // 类型
        type:mongoose.Schema.Types.ObjectId,
        // 引用
        ref:'Category'
    },
    title:String,
    description:{
        type:String,
        default:''
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    addtime:{
        type:Date,
        default:new Date()
    },
    views:{
        type:Number,
        default:0
    },
    content:{
        type:String,
        default:''
    },
})
