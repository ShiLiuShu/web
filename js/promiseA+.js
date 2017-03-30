function Taxi(){
    var _state=0,
    _value,
    _onFulfills=[],
    _onRejects=[];


    //对象方法done实现
    this.done=function(onFulfilled,onRejected){
        if(_state===0){
            _onFulfills.push(onFulfilled);
            _onRejects.push(onRejected);
        }else{
            setTimeout(function(){
                if(_state===1){
                    if(typeof onFulfilled==='function'){
                        onFulfilled(_value);
                    }
                }else{
                    if(typeof onRejected==='function'){
                        onRejected(_value);
                    }
                }
            },0);
        }
    }

    //_complete内部方法用于对象方法fulfill和reject实现
    function _compelete(state,value){
        if(!_state){
            _state=state;
            _value=value;

            setTimeout(function(){
                var handlers=state==1?_onFulfills:_onRejects;
                handlers.forEach(function(fn){
                    if(typeof fn==='function'){
                        fn(value);
                    }
                });
                _onFulfills=null;
                _onRejects=null;
            },0);
        }
    }

    this.fulfill=function(value){
        _compelete(1,value);
    }

    this.reject=function(value){
        _compelete(2,value);
    }


}


Taxi.prototype={
    constructor:Taxi,
    catch:function(onRejected){
        this.then(null,onRejected);
    },
    then:function(onFulfilled,onRejected){
        //then必须返回一个promise
        var taxi=new Taxi();
        //下面的这个function(x)被存入到了当前promise的_onFulfilled数组当中
        this.done(function(x){
            //执行then函数后执行到存入function(x)后就停止了
            if(typeof onFulfilled==='function'){
                try{
                    resolve(taxi,onFulfilled(x));
                }catch(e){
                    taxi.reject(e);
                }
            }else{
                taxi.fulfill(x);
            }
        },function(x){
            if(typeof onRejected==='function'){
                try{
                    resolve(taxi,onRejected(x));
                }catch(e){
                    taxi.reject(e);
                }
            }else{
                taxi.reject(x);
            }
        });
        return taxi;
    }
}





function foo(){
    var p=new Taxi();
    setTimeout(function(){
        console.log("promise fulfill foo");
        p.fulfill(600);

        //以上这个promise是以600作为值决议的
    },3000);
    return p;
}

function bar(){
    var p=new Taxi();
    setTimeout(function(){
        console.log("promise fulfill bar");
        p.fulfill(800);
    },3000);
    return p;
}

foo().then(function(x){
    console.log(x*2);
    return bar();
},function(err){
    console.log(err);
}).then(function(x){console.log(x)});


//resolve是promise的解析过程，以一个promise和一个值作为参数
function resolve(promise,x){
    console.log("resolve once");
    if(promise===x){
        return promise.reject(new TypeError('The promise and its value refer to the same object'));
    }
    if(x&&(typeof x==='function'||typeof x==='object')){
        var called=false,
        then;

        try{
            then=x.then;
            if(typeof then==='function'){
                then.call(x,function(y){
                    if(!called){
                        called=true;
                        resolve(promise,y);
                    }
                },function(r){
                    if(!called){
                        called=true;
                        promise.reject(r);
                    }
                });
            }else{
                promise.fulfill(x);
            }
        }catch(e){
            if(!called){
                called=true;
                promise.reject(e);
            }
        }

    }else{
        //下句的意思是当前promise已经决议，决议的值为1
        promise.fulfill(x);
    }
}


//then函数，如果promise还没有决议，就将两个参数存储起来，如果已经决议，则根据决议结果立即执行