### 内置fs(FileSystem文件系统)模块
0.引入核心
```javascript
    var fs = require('fs)
```
1.判断是否存在
```javascript
    fs.isExists(filename,(err,data)=>{
        if(err)log(errr)
        if(data)log('文件存在')
    })
```
2.打开文件
```javascript
    fs.open(filename,(err,data)=>{
        
    })
```


