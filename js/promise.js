var p=new Promise(function(resolve,reject){
    console.log("123");
    setTimeout(function(){
        resolve();
    },2000);
});


//到底什么是promise
// 我去餐厅吃饭，没有位置，工作人员给我拿了一个号，这个号就是promise，代表了你将来的座位
// 过了一段时间，这个promise 决议了，以值为21决议的，难么你就走向21号桌吃饭就好了，这就
// 是promise