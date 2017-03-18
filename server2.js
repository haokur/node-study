
var http = require('http')
var url = require('url')

var { log } = require('./common')

log(url.parse('http://www.haokur.com:8080/index.html?articleId=1&user=1'))
http
    .createServer()
    .listen(3000)
    .on('request',(req,res)=>{
        // let _response = JSON.stringfy(req)
        // log(req.url)
        // var urlStr = url.parse(req.url)
        // log(urlStr)
        res.writeHead(200,{
            'content-type':'text/html;charset=utf-8'
        })
        res.write('_response')
        res.end()
    })
    .on('error',error=>{

    })
