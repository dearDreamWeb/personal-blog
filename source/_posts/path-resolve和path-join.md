---
title: path.resolve和path.join
date: 2020-08-20 20:03:23
tags: Node
categories: 后端
---


# 一、path模块的引入
需要引入path模块才能使用path.resolve()和path.join()
```
const path = require('path');
```
# 二、path.resolve([from...],to)
作用：把一个路径或路径片段的序列解析为一个绝对路径。相当于执行cd操作。   
`path.resolve 中 'doc' 和 './doc' 等价，代表当前文件夹下。但是'/doc'代表的是根目录下的doc`
<!-- more -->
## Node的path.resolve(__dirname，'./src')
这个问题可以拆分为两个知识点：
1. path.resolve( )方法
2. __dirname变量  
__dirname是__directory+name的缩写，顾名思义，是目录名的意思，代表当前文件的绝对路径。

```
const path = require("path");
console.log(__dirname)
console.log(path.resolve(__dirname,"/aaa/bbb"))
console.log(path.resolve(__dirname,"./aaa/bbb"))
console.log(path.resolve(__dirname,"aaa/bbb"))
console.log(path.resolve("aaa"))
```
运行结果：

```
c:\Users\m1883\Desktop\webpack-test\src
c:\aaa\bbb
c:\Users\m1883\Desktop\webpack-test\src\aaa\bbb
c:\Users\m1883\Desktop\webpack-test\src\aaa\bbb
c:\aaa
```

注意：  
1. 只传入__dirname也可以自动调用path.resolve方法
2. 可以拼接路径字符串，**但是不调用path.resolve()方法<font color="#f40">拼接失败</font>**
```
const path = require("path");
console.log(__dirname)
console.log(__dirname+"aaa")
console.log(__dirname+"/aaa")
```
运行结果：
看看第二个和第三个的结果是错误的路径
```
c:\Users\m1883\Desktop\webpack-test\src
c:\Users\m1883\Desktop\webpack-test\srcaaa
c:\Users\m1883\Desktop\webpack-test\srcaaa
```

如果没有用__dirname,直接传值的话，那么值会覆盖上级的路径

```
const path = require("path");
console.log(path.resolve("aaa"))
console.log(path.resolve(__dirname,"aaa"))
```
运行结果：

```
c:\Users\m1883\Desktop\webpack-test\aaa
c:\Users\m1883\Desktop\webpack-test\src\aaa
```



# 三、path.join(path1，path2，path3.......)
 作用：将路径片段使用特定的分隔符（window：\）连接起来形成路径，并规范化生成的路径。若任意一个路径片段类型错误，会报错。  
` path.join 中 'doc' 、'/doc' 和 './doc' 三者等价，代表当前目录下。`
```
const path = require("path");
console.log(__dirname)
console.log(path.join(__dirname,"/aaa/bbb"))
console.log(path.join(__dirname,"./aaa/bbb"))
console.log(path.join(__dirname,"aaa/bbb"))
console.log(path.join("aaa"))
```
运行结果：

```
c:\Users\m1883\Desktop\webpack-test\src
c:\Users\m1883\Desktop\webpack-test\src\aaa\bbb
c:\Users\m1883\Desktop\webpack-test\src\aaa\bbb
c:\Users\m1883\Desktop\webpack-test\src\aaa\bbb
aaa
```

# path.resolve()和path.join()的区别
join()只是拼接各个path片段，并不像resolve()一样除了拼接各个字段`还拼接了工作目录的路径`。  

例子：

```
const path = require("path");
console.log(path.join("aaa"))
console.log(path.resolve("aaa"))
```
运行结果：

```
aaa
c:\Users\m1883\Desktop\webpack-test\aaa
```