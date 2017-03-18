var fs = require('fs')
var { log } = require('./common')

var projectData = {
    name:"miaov",
    files:[
        {name:'js',type:'dir'},
        {name:'image',type:'dir'},
        {name:'css',type:'dir'},
        {name:'index.html',type:'file',
content:
`<html>
    <head></head>
    <body>
        <h1>hello world!</h1>
    </body>
</html>`
        },
    ]
}

var proName = projectData.name
if(proName){
    fs.mkdir(proName)

    var files = projectData.files 

    if(files) {
        files.map(f=>{
            if(f.type==='dir') {
                fs.mkdir(`${proName}/${f.name}`)
            }
            else if(f.type==='file'){
                var fileName = `${proName}/${f.name}`
                fs.writeFile(fileName,f.content,(err,data)=>{
                    if(err){
                        log('写入失败')
                    }
                    else {
                        log('写入成功')
                    }
                })
                // fs.open(fileName,'r+',(err,fd)=>{
                //     if(err){
                //         log(err)
                //     }
                //     else {
                //         if(f.content){
                //         }
                //     }
                // })
                // fs.mkdir(`${proName}/{f.name}`)
            }
        })
    }

}