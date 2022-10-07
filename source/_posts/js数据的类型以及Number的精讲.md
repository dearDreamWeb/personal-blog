---
title: js数据的类型以及Number的精讲
date: 2020-07-22 08:08:48
tags: JavaScript
categories: 前端
---


# js中的数据类型
- 基本数据类型
  + Number
  + String
  + Boolean
  + Null
  + Undefined
  + Symbol
  + BigInt
<!-- more -->
- 引用数据类型
  + object
    + 普通对象  {a:1}
    + 数组对象  [1,2]
    + 正则对象  /\w/g
    + 日期对象  new Date()
    + Math数学函数 Math.random()
    + ...
  + function

## 为什么说function单独的引用数据类型？
所有对象都有__proto__属性，是用来通过__proto__找到它的原型即prototype，<font color="#f40">function声明的变量的__proto__指向Function的prototype，其它对象的__proto__指向Object的prototype</font>。

# 数据类型检测
- <font color="#f40">typeof</font>    检测数据类型的逻辑运算
- <font color="#f40">instanceof </font>   检测是否为某个类的实例
- <font color="#f40">constructor</font>   检测构造函数
- <font color="#f40">Object.prototype.toString.call</font> 检测数据类型的

# Number详情
## Number的类型
NaN/isNaN/Infinity/parseInt/Number

- <font color="#f40">NaN</font>: 全称Not A Number，<font color="#f40">不是有效数字</font>，<font color="#f40">NaN和谁都不相等，包括它自己</font>
- <font color="#f40">isNaN</font>： 检测是否为非有效数字，如果不是有效数字返回true，是有效数字返回false。
    + <font color="#f40">要处理的值不是Number类型时，先转换成Number再检测</font>，比如isNaN("10px") => isNaN(Number("10px")) => isNaN(NaN) => true
- <font color="#f40">Infinity</font>：默认是无穷大，加负号为无穷小
- <font color="#f40">parseInt</font>：处理的值是字符串，从字符串左侧开始查找有效数字（遇到非有效数字就停止查找），<font color="#f40">如果处理的值不是字符串，会先转换成字符串再开始查找有效数字</font>
- <font color="#f40">Number</font>： 直接调用浏览器最底层的数据类型机制来完成的
    + <font color="#f40">true为1   false 为0</font> 
    + <font color="#f40">null为0   undefined为 NaN</font>
    + <font color="#f40">空字符串为0</font>
    + <font color="#f40">处理的值为字符串时，必须保证都是有效数字才会转换成数字，否则都是NaN</font>，比如Number("100")为100，Number("100px")为NaN

## Number的测试题
```js
parseInt("")    // NaN
Number("")      // 0
isNaN("")       // false  先把""转换成数字，isNaN(0)
parseInt(null)  // NaN，先把null转换成字符串，parseInt("null")
Number(null)    // 0
isNaN(null)     // false，isNaN(0)
parseInt("10px") // 10
Number("10px")  // NaN
isNaN("10px")   // true，isNaN(NaN)
parseFloat("1.6px")+parseInt("1.2px")+typeof parseInt(null); // "2.6number"，1.6+1+"number"
isNaN(Number(!!parseInt("0.8")))  // false
typeof !parseInt(null) + !isNaN(null)   // "booleantrue"，typeof true + !false => "boolean" + true
```



