/**
 * 用于操作二进制的数据流
 * 1.new 之后给了长度,长度就已经固定
 * 2.一个中文字符占三个字节
 * 3.write下标从1开始,toString下标从0开始
 */

var {log} = require('./common')

// var bf = new Buffer(5)
// bf[1]=2

// var bf = new Buffer([1,2,3])

// var bf = new Buffer('miaov','utf-8')

// for (var i = 0; i < bf.length; i++) {
//     var element = bf[i];
//     log(element.toString(16))
//     log(String.fromCharCode(element))
// }

// var str1 = 'miaov'
// var bf1 = new Buffer(str1)
// log(str1.length)
// log(bf1.length)

// var str = '妙味'
// var bf = new Buffer(str)
// log(str.length)
// log(bf.length)

// log(bf)
// log(bf[0])

var str = 'miaov'
var bf = new Buffer(5)
// log(bf)

// bf.write(str)
// bf.write(str,1)
bf.write(str,1,2) // 从第一位开始写两位
log(bf)
log(bf.toString())

log('-------------')
var bf2 = new Buffer('hello world')
log(bf2.toString('utf-8',0,1))

log(bf2.toJSON())
var bf3 = bf2.slice(0,3);
log(bf3.toString())
log(bf2.toString())
bf3[0] = 108 
log(bf2.toString())

var bf4 = new Buffer(10)
bf2.copy(bf4,1,1) // bf2拷贝给bf4 ,呵呵
log(bf2)
log(bf4)
bf4[1] = 10 
log(bf2.toString())

log(Buffer.isEncoding('utf-8'))
log(Buffer.isBuffer(bf2))

var str5 = 'miaov'
log(Buffer.byteLength(str5))
var str6 = '妙味'
log(Buffer.byteLength(str6,'ascii'))

var arr = [new Buffer('妙味'),new Buffer('miaov')]
var bf5 = Buffer.concat(arr)
log(bf5)