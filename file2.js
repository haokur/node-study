
var { log } = require('./common')
var fs = require('fs')

// fs.writeFile('./file3.txt','hello',()=>{
//   log('写入成功')  
// })

// fs.appendFile('./file3.txt','窗前明玉功',()=>{
//     log('写入成功')
// })

var filename = './file5.txt'
// fs.exists(filename, (isExists) => {
//     if (!isExists) { // 如果存在
//         fs.writeFile(filename,'miaov',(err)=>{
//             if(err){
//                 console.log("创建失败")
//             }
//             else {
//                 console.log('初次写入成功')
//             }
//         })
//     }
//     else {
//         fs.appendFile(filename,'-附件内容',(err)=>{
//             if(err){
//                 log(err)
//             }
//             else{
//                 log('追加成功')
//             }
//         })
//     }
// })



// var p1 = new Promise(resolve => {
//     fs.exists(filename, (isExists) => {
//         if (isExists) {
//             resolve(true)
//         }
//         else {
//             throw new Error("文件不存在"); 
//         }
//     })
// })
// .then(data=>{
//     log(data)
// })
// .catch(err=>{
//     log('hello')
//     // log(err)
// })

// 返回文件信息状态
// fs.stat('file2.txt', function () {
//     log(arguments)
// })

// fs.watch('file2.txt', (ev, filename) => {
//     log(ev)
//     if (filename) {
//         log(`${filename}发生了改变`)
//     }
//     else {
//         log('错误了')
//     }
// })

/**
 * 操作文件夹
 */
// fs.mkdir('./test',(err,data)=>{
//     if(err){
//         log(err)
//     }
//     else{
//         log(data)
//     }    
// })

// fs.rmdir('./test',function(){
//     log(arguments)
// })

// fs.readdir('./a',function(){
//     log(arguments)
// })


fs.readdir('./a',(err,fileList)=>{
    if(err){
        log(err)
    }
    else{
        fileList.map(f=>{
            log(f)
            fs.stat(`./a/${f}`,(err,data)=>{
                if(err){
                    log(err)
                }
                else {
                    // log(data)
                    if(data.mode===33206){
                        log('this is a single file')
                    }
                    else if(data.mode===16822){
                        log('this is a file dir')
                    }
                }
            })
        })
    }
})