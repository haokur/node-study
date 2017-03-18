/**
 * 搭建服务器
 */

var http = require('http')

http.createServer((req,res)=>{
   res.write('hello world')
   res.end()
})
.listen(3000)