
var fs = require('fs')

/**
 * open
 * fs.open(path,flags,[mode],cb)
 * path:路径
 * flag:打开方式,读写
 * mode:权限 读/写/执行 4/2/1  0777
 * cb :读完回调
 *  err : 文件打开失败的内容存储
 *  fd : 被打开文件的标识
 */
var { log } = require('./common')
// fs.open('./file.txt', 'r', (err, fd) => {
//     // log(err)
//     // log(fd)
//     if (err) {
//         log('文件打开失败')
//     }
//     else {
//         log(fd)
//         log('文件打开成功')
//     }
// })
// fs.open('./file.txt', 'r', (err, fd) => {
//     log(fd)
// })
// log('哈哈,我先执行了')

// var fileTxt = fs.openSync('./file2.txt','r')
// log(fileTxt)
// log('呜呜,我要最后执行')

fs.open('./file.txt', 'r+', (err, fd) => {
    if (err) {
        log('读取出错')
    }
    else {
        /**
         * 读取文件
         * fs.read(fd,buffer,offset,length,position,cb)
         * fd : 标识
         * buffer:buffer对象
         * offset:从buffer对象第几位填充
         * length:将buffer填充几位
         * position:从文件第几位开始读
         * cd:读完回调  
         *  err : 错误
         *  bufferLen:buffer长度
         *  buffer:buffer的内容
         */
        var bf = new Buffer(10)
        log(bf)
        fs.read(fd, bf, 0, 6, 3, (err, bfLen, bfContent) => {
            log(bfContent)
            log(bf.toString())
        })
        /**
         * 写入文件
         * fd
         * buffer : 要写入的数据的暂时容器
         * offset : 写入容器的起始位置
         * length : 要写入的长度
         * position : fd的起始位置
         * cb : 回调
         *  
         */
        // var writeBf = new Buffer('李白')
        // fs.write(fd, writeBf,0, 6, 0, (err) => {
        //     if (err) {
        //         log(err)
        //         log('写入失败')
        //     }
        //     else {

        //     }
        // })
        fs.write(fd,'helloworld',6,'utf-8')
        fs.close(fd,(err,data)=>{
            log(err)
            log(data)
        })

    }
})
