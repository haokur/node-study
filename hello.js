
/**
 * 优先加载顺序
 * require('./a')
 * 1.不带后缀的a
 * 2.带js后缀的a
 * 3.a目录下的index.js
 * 4.继续查找.json  .node后缀的文件
 * 
 * require('a')
 * 1.nodejs自带
 * 2.node_modules下面的的a.js
 */


// const {eat,run} = require('./world')
// eat()
// run()
const { log } = require('./common')
let t = new Date(); 
log(`${t.getFullYear()}年-${t.getMonth()+1}月-${t.getDate()}日`)
log(__dirname)
log(__filename)
log(process.argv)
