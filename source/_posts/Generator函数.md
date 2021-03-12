---
title: Generator函数
date: 2021-03-12 10:55:44
tags: ES6
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 一、什么是Generator函数
Generator 函数是 ES6 提供的一种`异步编程解决方案`，语法行为与传统函数完全不同。  

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

# next()

Generator函数配合yield的使用，想要获取到yield的数据，要使用`next()`进行迭代获取。  
next()返回的是一个对象，对象里面有两个属性，一个是`value`，一个是`done`。   
`value`代表`yield后面表达式的值`，`done`代表`是否遍历结束`，true表示遍历结束，false表示未结束。     
下面的例子中第四次打印的value为undefined是因为yield已经遍历结束。
```js
function* generator() {
    yield 'a';
    yield 'b';
    return 'c';
}
let gen = generator();
console.log(gen.next());    // { value: 'a', done: false }
console.log(gen.next());    // { value: 'b', done: false }
console.log(gen.next());    // { value: 'c', done: false }
console.log(gen.next());    // { value: undefined, done: true }
```
next（）方法允许逻辑

- 遇到yield表达式，就`暂停执行后面的操作`，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值；
- 下一次调用next方法时，再继续往下执行，直到遇到`下一个yield表达式`；
- 没有再遇到新的yield表达式，就`一直运行到函数结束`，`直到return语句为止`，并将`return语句`后面的表达式的`值`，作为返回的对象的`value属性值`；
- 如果该函数没有return语句，则返回的对象的value属性值为undefined；

下面的例子就有点复杂了，但要记住上面的next()方法的逻辑就好理解一些
```js
function* foo(x) {
    var y = 2 * (yield (x + 1));
    console.log(y);
    var z = yield (y / 3);
    console.log(z);
    yield (x + y + z);
}
var a = foo(5);

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
console.log(a.next());
```
第一次的next()的结果很好理解    
第二次的next()就有点魔幻了，下面好好解释一下：  
- y为什么成了NaN？  
因为`y=2 * undefined`。  
- 但为什么第二次执行next()，yield(x+1)变成了undefined？ 
因为第一次只是执行了`yield(x+1)`，甚至连乘以2的操作都没执行到，因为`next()是遇到yield表达式就会执行完停止`，所以第二次执行next()的时候，根本就不知道第一次的next()的执行结果是什么，因为`第一次没有执行到给y赋值的时候`，所以就变成了`var y = 2 * undefined`了。    
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
// { value: 6, done: false }
console.log(a.next());
/*
    24
    { value: 8, done: false }
*/
console.log(a.next(12));
/*
    13
    { value: 42, done: false }
*/
console.log(a.next(13));
```
第一次next()的value是`5+1=6`  
第二次next()的value为8是因为next()的有参数，参数变成上一次yield的返回值，也就是说`var y = 2 * 12;`，然后到yield(y/3)执行完停止，所以value为8  
第三次next()的value为42因为next()有参数，上一次的yield开始，变成了`var z = 13`,到yield(x+y+z)结束，所以value等于`x+y+z = 5+24+13 = 42`