---
title: 你不知道的Generator函数
date: 2021-03-12 10:55:44
tags: ES6
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 一、什么是Generator函数
Generator 函数是 ES6 提供的一种`异步编程解决方案`，语法行为与传统函数完全不同。  
由于JavaScript是单线程语言，因此传统的函数`程序开始执行直到运行结束`才会停止，在此期间是不会被其他代码片段打断的。但是generator函数能够利用它独有的特性`yield表达式`去控制程序的运行的状态，暂停还是继续。

**Generator和普通函数的区别**
1. 写法的不同，Generator函数function后要加上`星号`，Generator函数是可以`暂停执行`的。  
例子：
<!--more-->
```js
// 普通函数写法
function fn(){}

// Generator函数的写法
function* generator(){}
```
2. Generator函数体内使用`yield`语句，可以定义不同的内部状态；状态其实就是数据。使用yield进行暂停操作，和async await异步处理中的`await`效果一样。

# 二、next方法

next的特性  
- next方法是通过配合yield，去为了将generator函数去进行迭代，通过next方法去获取yield表达式后面的数据。  
- 每次程序运行到yield表达式，就会将程序的状态设为`暂停`，也就是`暂时停止执行后面的一系列操作`，并将在该yield表达式后面的值，作为返回的对象数据中的`value`字段的属性值；
    ```js
    function* generator() {
        yield 'a';
    }
    let gen = generator();
    console.log(gen.next());    // { value: 'a', done: false }
    ```
- next方法所返回的数据是一个对象，对象里面有两个属性，一个是`value`，一个是`done`。   
`value`代表`yield后面表达式的值`，`done`代表`是否遍历结束`，true表示遍历结束，false表示未结束。  
    ```js
    function* generator() {
        yield 'a';
        yield 'b';
    }
    let gen = generator();
    console.log(gen.next());    // { value: 'a', done: false }
    console.log(gen.next());    // { value: 'b', done: false }
    console.log(gen.next());    // { value: undefined, done: true }
    ```
- 下一次调用next方法时，再继续往下执行，直到遇到`下一个yield表达式`或者将generator函数执行结束；
- 没有再遇到新的yield表达式，就`一直运行到函数结束`，如果遇到return会将`return语句`后面的表达式的`值`，作为返回的对象的`value属性值`，效果和yield是一样的；
    ```js
    function* generator() {
        yield 'a';
        return 'b';
    }
    let gen = generator();
    console.log(gen.next());    // { value: 'a', done: false }
    console.log(gen.next());    // { value: 'b', done: true }
    ```
- 如果该函数没有return语句或者yield表达式，则返回的对象的value属性值为undefined；
    ```js
    function* generator() {}
    let gen = generator();
    console.log(gen.next());    // { value: undefined, done: true }
    ```
- 一般情况下，使用next方法的次数要比yield表达式多一个，因为next是遇到yield表达式部分去停止的，这个停止是在`语句中间终止`的，也就是包含该yield表达式的代码片段。想要执行完该代码片段必须要在调用一次next方法才能更将上次yield表达式所出的代码片段执行完。   

下面的例子就有点复杂了，但要记住上面的next的特性就好理解一些
```js
function* foo(x) {
    var y = 2 * (yield (x + 1));
    console.log(y);
    var z = yield (y / 3);
    console.log(z);
    yield (x + y + z);
}
var a = foo(5);

console.log(a.next());
/*
    第一次next()结果
    { value: 6, done: false }
*/

console.log(a.next());
/*
    第二次next()结果
    NaN
    { value: NaN, done: false }
*/

console.log(a.next());
/*
    第三次next()结果
    undefined
    { value: NaN, done: false }
*/
```
第一次的next()的结果很好理解    
第二次的next()就有点魔幻了，下面好好解释一下：  
- y为什么成了NaN？  
因为`y=2 * undefined`。  
- 但为什么第二次执行next()，yield(x+1)变成了undefined？ 
因为第一次只是执行到`yield(x+1)`就停止了，只是把x+1的结果返回给next了，并不知道yield(x+1)的结果是多少，因为`next()是遇到yield表达式会执行完就停止`，所以第二次执行next()的时候，根本就不知道第一次的next()的执行结果是什么，因为`第一次没有执行到给y赋值的时候`，所以就变成了`var y = 2 * undefined`了。    
同理，第三次next()的执行结果是因为第二次next()只是执行到了yield(y/3)就停止了，所以第三次的next()执行结果就为5+NaN+undefined，结果为NaN

**next的参数**
next方法可以带一个参数，该`参数会成为上一个yield的返回值，并从上一次yield开始，直到下一个yield停止`。 
例子：
```js
function* foo(x) {
    var y = 2 * (yield (x + 1));
    console.log(y);
    var z = yield (y / 3);
    console.log(z);
    yield (x + y + z);
}
var a = foo(5);

console.log(a.next());
// { value: 6, done: false }

console.log(a.next(12));
/*
    24
    { value: 8, done: false }
*/

console.log(a.next(13));
/*
    13
    { value: 42, done: false }
*/
```
第一次next()的value是`5+1=6`  
第二次next()的value为8是因为next()的有参数，参数12变成foo函数中的上一次yield的返回值，也就是说`var y = 2 * 12;`，然后到yield(y/3)执行完停止，所以value为8  
第三次next()的value为42因为next()有参数，上一次的yield开始，变成了`var z = 13`,到yield(x+y+z)结束，所以value等于`x+y+z = 5+24+13 = 42`

# 三、iterable
iterable意为可迭代的，是ES6引入一个新类型，可以通过`for...of`来循环遍历，如`Array`、`Set`、`Map`都是属于iterable类型。Generator函数`运行时`返回一个iterable类型的迭代器。  
下面是浏览器控制台上Set和Generator函数运行时原型上截图
![Set](/你不知道的Generator函数/0.png)
![Generator](/你不知道的Generator函数/1.png)
`for...of循环是会寻找并调用目标的Symbol.iterator函数来构建一个迭代器。`  
例子：
```js
function* gen(){
    yield 1;
    yield 2;
    yield 3;
}
for(let val of gen()){
    console.log(val);
}
// 1
// 2
// 3
```
注意：generator函数gen不是迭代器，gen()会产生一个迭代器。

# 四、Generator函数在异步中的使用
常用异步场景是向服务器发送请求。先从ajax使用说起，在ajax异步请求中是通过回调去接收返回数据，这就容易造成经常听说的`回调地狱`。  
ajax正常的场景：
```js
function request(callback){
    ajax('http://xxx.com/xxx/xxx',callback)
}
request(function(err,data){
    if(!err){
        console.log(data);
    }
    console.log(err);
})
```
总所周知，一旦request这种请求函数多起来就很容易造成回调地狱这种局面，我们耳熟能详的解决方案是`async、await搭配promise`的解决方案，generator函数也是能达到同样的效果。
```js
function request(){
    ajax('http://xxx.com/xxx/xxx',function(err,data){
        if(!err){
            // 将yield结果data返回，让res接收到data数据
            g.next(data);
        }
        console.log(err);
    })
}
function* gen(){
    // 获取请求结果
    let res = yield request();
    console.log(res);
};
let g = gen();
g.next(); // 开始运行
```
**注意：** 第一次g.next()仅仅是启动gen函数，运行到ajax中的`yield request()`停止，然后调用request函数去通过ajax发送请求，此时`res`还不知道yield的结果，通过调用`g.next(data)`将yield结果返回给res。  

# 五、Generator函数和Promise结合
上诉的发送请求是ajax，如今常用的发送请求的方式基本都是基于`Promise`的，其中常用的是[axios](https://axios-http.com/)。
Axios搭配Generator函数基础用法：
```js
function request(){
   return axios.get('http://xxx.com/xxx/xxx')
}

function* getData(){
    const res = yield request()
    console.log(res)
}
let g = getData();
const p1 = g.next().value
p1.then(function(data){
        g.next(data); // 将request请求返回的数据给yield
    }).catch(function(err){
        console.log(err);
    })
```
通过第一次`g.next()`将value值，也就是promise返回给`p1`，让p1通过`then`获取返回数据，然后再`yield`给getData函数中的`res赋值返回数据`。 
> 这时候就会有个疑问： 
> 看起来Generator函数配合Promise也没节省什么操作？  

一旦请求躲起来就要一直next调用，一直手动迭代，所以不会节省什么效率，那么把Generator函数封装成可以一直把yield迭代完的方法岂不妙哉。
接下来的封装代码来自`《你不知道的JavaScript中卷》`一书中：
```js
function run(gen){
    var args = [].slice.call(arguments,1);
    var it;
    // 在当前上下文中初始化生成器
    it = gen.apply(this,args);

    // 返回一个Promise用于生成器完成
    return Promise.resolve()
    .then(function handleNext(value){
        // 对于下一个yield出的值运行
        var next = it.next(value);

        // 立即执行函数
        return (
            function handleResult(next){
                // 生成器运行完毕了吗？
                if(next.done){
                    return next.value;
                }
                // 是否继续
                else{
                    return Promise.resolve(next.value)
                    .then(
                        handleNext,
                        function handleErr(err){
                            return Promise.resolve(item.throw(err))
                            .then(handleResult)
                        }
                    )
                }
            }
        )(next)
    })
}
```
通过promise和generator函数封装就有了这个`run`这个工具。基本用法如下：
```js
function *gen(){
    ...
}
run(gen)
```
这样就会`自动异步运行Generator函数所生成的迭代器，直到结束`。  
> 看起来也没什么了不起的呀？
接下来假设一个业务场景：  
有request、request1、request2三个请求。但是需要request和request1这两个请求返回的数据作为request2请求参数发送到服务端。   

下面是promise的实现方法
```js
function request(){
   return axios.get('http://xxx.com/xxx/xxx')
}
function request1(){
   return axios.get('http://xxx.com/xxx/xxx')
}
function request2(data){
   return axios.get('http://xxx.com/xxx/xxx',{params:data})
}
function getData(){
    request().then(function(data){
        console.log(data); // 打印返回结果
        // request1请求
        request1().then(function(request1Data){
            // request2请求
            return request2({param:data,param1:request1Data})
        }).then(function(allData){
            console.log(allData)
        })
    }).catch(function(err){
        console.log(err);
    })
}
getData()
```
promise确实是能实现的，但是有多个请求的情况并且下面的请求需要用到上面多个请求所返回的数据就会导致代码臃肿，可能造成回调地狱。

Generator函数搭配刚才的run工具就可以很好的解决这个问题。如：
```js
function request(){
   return axios.get('http://xxx.com/xxx/xxx')
}
function request1(){
   return axios.get('http://xxx.com/xxx/xxx')
}
function request2(data){
   return axios.get('http://xxx.com/xxx/xxx',{params:data})
}

function* gen(){
    const res = yield request();
    const res1 = yield request1();
    const res2 = yield request2({
        param:res,
        param1:res
    })
    console.log(res2)
}
run(gen)
```
这样是不是一气呵成？  
用过[dvajs](https://dvajs.com/)的应该已经看的出来了这个工具和dvajs的model中的effects使用方式是大同小异的。

# 六、async、await和Generator函数的区别
看到这里你可能看感觉很疑惑，感觉Generator函数的使用是并不多的，相反感觉刚才的那些业务场景async搭配await也能实现。  
其实async和await就是Generator函数的语法糖，`async`相当于`*`，`await`相当于`yield`。