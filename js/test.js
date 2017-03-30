var f1=function(){
    console.log("f1");
}

var f2=f1;
var f3=f2;

f2=function(){
    console.log("f2");
}

f3();
f2();