/**
 * 应用程序的启动入口
 */
var express = require('express')
var app = new express()

/**
 * 设置静态文件托管
 */
app.use('/public',express.static(__dirname+'/public'))

/**
 * 定义当前应用所使用的模板引擎
 * 1.模版后缀
 * 2.模版引擎
 */
var swig = require('swig')
app.engine('html',swig.renderFile)
swig.setDefaults({cache:false})
/**
 * views 固定,相当键名
 * views 模板放置的路径
 */
app.set('views','./views')
/**
 * 注册模板引擎
 */
app.set('view engine','html')

/**
 * 处理post过来的数据(body-parser)
 */
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
/**
 * cookie
 */
var Cookies = require('cookies')
var User = require('./models/User')
app.use((req,res,next)=>{
    req.cookies = new Cookies(req,res)
    req.userinfo = {}

    var cookieUserinfo = req.cookies.get('userinfo')
    if(cookieUserinfo){
        try{
            req.userinfo = JSON.parse(cookieUserinfo)
            User.findById(req.userinfo._id)
                .then((userinfo)=>{
                    if(userinfo){
                        req.userinfo.isAdmin = Boolean(userinfo.isAdmin)
                    }
                    else {
                        req.userinfo.isAdmin = false
                    }
                    next()
                })
        }catch(e){
            next()
        }
    }
    else{
        next()
    }
})
/**
 * 根据不同的功能划分模块
 */
app.use('/admin',require('./routers/admin'))
app.use('/api',require('./routers/api'))
app.use('/',require('./routers/main'))

/**
 * 连接数据库
 * 
 */
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/blog',err=>{
    if(err){
        console.log('数据库连接失败')
    }
    else {
        console.log('数据库连接成功')
        app.listen(8081)
    }
})
// app.get('/',(req,res,next)=>{
//     /**
//      * 解析并返回给客户端
//      * 1.模板文件名
//      * 2.传递给模板使用的数据
//      */
//     res.render('index')
// })
