---
title: Date获取指定月份的总天数
date: 2021-07-15 09:55:33
tags: JavaScript
categories: 前端
---


# new Date()使用手册 
new Date()的参数：
- new Date();  
实例化时刻的日期和时间
- new Date(value);  
value是个时间戳，value的类型必须是Number类型的值，以毫秒数计算的。
<!--more-->
- new Date(dateString);  
dateString表示日期的字符串值，必须是正确的日期字符串才行，否则报错。  
例子：
```js
console.log(new Date('2021-6-1'))
// Tue Jun 01 2021 00:00:00 GMT+0800 (中国标准时间)

console.log(new Date('2021-6-0'))
// Invalid Date
```

- new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds);   
    - year(必选)   
表示年份的整数值。 
    - monthIndex(必选)  
表示月份的整数值。
    - date(可选)   
表示一个月中的第几天的整数值，从1开始。默认值为1。
    - hours (可选)   
表示一天中的小时数的整数值 (24小时制)。默认值为0（午夜）。
    - minutes (可选)   
表示一个完整时间（如 01:10:00）中的分钟部分的整数值。默认值为0。
    - seconds (可选)   
表示一个完整时间（如 01:10:00）中的秒部分的整数值。默认值为0。
    - milliseconds (可选)   
表示一个完整时间的毫秒部分的整数值。默认值为0。


# 获取指定月份的总天数的方法
要用到`new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)`的方法去获取指定月份总天数。  
当day参数为0时就会跳转到上个月的最后一天，再通过getDate()方法去获取上个月总天数即可。  
例子：
```js
console.log(new Date(2021,6,0))
//  Wed Jun 30 2021 00:00:00 GMT+0800 (中国标准时间)

console.log(new Date(2021,6,0).getDate())
//  30
```