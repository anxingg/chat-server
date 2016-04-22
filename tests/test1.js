var fun1;
var fun2 = function (){
    return fun1;
}
fun1 = function(){
    console.log("fun1");
}
fun2();
