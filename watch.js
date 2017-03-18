
var fs = require('fs')

var { log } = require('./common')

var filedir = './miaov/src'

fs.watch(filedir,function(ev,file){

    log(ev+'/'+file)
})