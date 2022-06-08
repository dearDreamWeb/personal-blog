---
title: js检验对象类型的方法instanceof操作符Object.prototype.toString.call
date: 2020-08-02 08:17:16
tags: JavaScript
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

用typeof能区别出`string` ， `number` ， `boolean` ， `undefined` ，`object`  

# instanceof
但是想要知道object是什么类型就要用` instanceof` 操作符了  
`数组（Array）`，`对象（Object）`，`正则（RegExp）`，`null` ，`Function`  都属于对象
```js
let arr = [1, 2, 3],
   obj = {},
   reg = /n$/,
   fun = function(){};
console.log(arr instanceof Array);
console.log(obj instanceof Object);
console.log(reg instanceof RegExp);
console.log(fun instanceof Function);
```
结果图：
<!-- more -->
![1.png](/js检验对象类型的方法instanceof操作符Object.prototype.toString.call/1.png)

- instanceof  `用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置`
  + 解读：`用于判断某个对象是不是某个构造函数的一个实例，或者是不是某个构造函数的一个后代实例`
  + 语法：`对象 instanceof 数据类型（或者构造函数名）:返回true/false`

- 即比较对象.__proto__和数据类型（构造函数）.prototype,如果相等就为true,
  不同就继续跟着对象的原型链，比较对象隐式原型里的隐式原型与数据类型（构造函数）.prototype
  根据原型链的知识直到`原型链的最终`，指向`Object.prototype.__proto__---为null`

判断两个函数是不是在同一条原形链
```js
var Student = function (score) {
        this.score = score;
    }

    Student.prototype = new Person("小李");
    var stu = new Student(100);

    console.log(stu instanceof Student); //true  stu.__proto__ == Student.prototype很易理解
    console.log(stu instanceof Person);  //true
    
    // 根据原型链：stu.__proto__ == Student.prototype == new Person
    // stu.__proto__.__proto__ == new Person.__proto__ == Person.prototype
```

# Object.prototype.toString.call()
用法：`Object.prototype.toString.call(value)`
这是`对象的一个原生原型扩展函数，用来精确的区分数据类型…`
toString方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串。
- 数值：返回`[object Number]`。
- 字符串：返回`[object String]`。
- 布尔值：返回`[object Boolean]`。
- undefined：返回`[object Undefined]`。
- null：返回`[object Null]`。
- 数组：返回`[object Array]`。
- arguments对象：返回`[object Arguments]`。
- 函数：返回`[object Function]`。
- Error对象：返回`[object Error]`。
- Date对象：返回`[object Date]`。
- RegExp对象：返回`[object RegExp]`。
- 其他对象：返回`[object Object]`。

```js
console.log(Object.prototype.toString.call(123)) //object Number]
console.log(Object.prototype.toString.call('123')) //object String]
console.log(Object.prototype.toString.call(true)) //object Boolean]
console.log(Object.prototype.toString.call(undefined)) //object Undefined]
console.log(Object.prototype.toString.call([]) //object Array]
console.log(Object.prototype.toString.call(function(){})) //object Function]
console.log(Object.prototype.toString.call({})) //object Object]
```