---
title: ES6-字符串扩展-padStart，padEnd字符串补全长度的功能
date: 2020-10-07 21:29:59
tags: ES6
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 语法
padStart(len, str)
- 根据给定长度自动在字符串的前面补充想补充的字符串（只返回修改后的字符串，不修改原字符串）
- len 给定的长度，转换后
- str 想补充的字符串

padStart() 用于`头部补全`；
padEnd() 用于`尾部补全`。
```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'
'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```
# 用法
<!-- more -->
上面代码中，padStart 和 padEnd 一共接受2个参数，第一个是用来指定字符串的最小长度，第二个参数是用来补全长度的字符串。

1. 如果原字符串长度等于或大于指定得最小长度，则返回原字符串。
```js
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'
```
2. 如果用来补齐的字符串与原字符串两者的长度之和超过了指定的最小长度，则会截取超过位数的补全字符串。
```js
'abc'.padStart(5, '123')  // 12abc
'abc'.padEnd(5, '123') // abc12
```
3. 如果省略第二个参数，默认使用空格补全。下面的代码是生成10位的数值字符串。
```js
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '
```

4. padStart() 常见的用途是为数值补全指定位数。
```js
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
```
5. padStart() 另一个常用的是提示字符串格式。
```js
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```
# 兼容性

![1.png](1.png)