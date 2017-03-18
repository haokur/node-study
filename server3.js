
var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')
var querystring =require('querystring')

var { log } = require('./common')

var HtmlDir = path.resolve(__dirname,'src')
log(HtmlDir)
var server = 
    http.createServer()
        .listen(3000)
        .on('request',(req,res)=>{
            let urlStr = url.parse(req.url)
            reqToResponse(urlStr.pathname,req,res)
        })

function reqToResponse(module,req,res){
    if(module.indexOf('/api/')!='-1') { //处理get或者post请求
        module = 'request'
        api(req)
    }
    else {
        module = module.substring(1) || 'index'
    }
    sendHtml(`${module}.html`,res)
}

function sendHtml(file,res){
    let _fullPath = path.resolve(HtmlDir,file)
    fs.readFile(_fullPath,(err,data)=>{
        if(err){
            res.writeHead(404,{
                'content-type':'text/html,charset=utf-8'
            })
            res.write('404 not found')
        }
        else {
            res.writeHead(200,{
                'content-type':'text/html,charset=utf-8'
            })
            res.write(data.toString())
        }
        res.end()
    })
}

function api(req){
    // 如果请求方式是post
    let _query = '' 
    let _method = req.method.toLowerCase()
    if(_method==='post') {
        req.on('data',chunk=>{
            _query+=chunk
        })
        req.on('end',()=>{
            log(querystring.parse(_query))
        })
    }
    else if(_method==='get'){
        _query = url.parse(req.url).query
        log(querystring.parse(_query))
    }
}