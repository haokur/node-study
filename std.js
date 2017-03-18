// process.stdout.write('hello')

// process.stdin.resume();

// process.stdin.on('data', (chunk) => {
//     console.log('用户输入了:' + chunk);
// })

var a ;
var b ;

process.stdout.write('请输入a的值');
process.stdin.resume();

process.stdin.on('data',chunk=>{
    console.log(chunk)
    if(!a){
        a = Number(chunk);
        process.stdout.write('请输入b的值');
    }
    else{
        b = Number(chunk);
        process.stdout.write(`a+b的结果是${a+b}`);
    }
})


