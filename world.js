
/**
 * 
 * @param {*人名} name 
 * @param {*食物} food 
 */
function eat(name,food){
    console.log('he is eating now')
}

/**
 * 
 */
function run(){
    console.log('he is runing now')
}
// module.exports  = {
//     eat ,
//     run
// }

exports.run = run ;
exports.eat = eat ;
console.log(exports)

console.log(module.exports===exports)