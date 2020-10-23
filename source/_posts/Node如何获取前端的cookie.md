---
title: Node如何获取前端的cookie
date: 2020-06-19 15:16:32
tags: Node
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 实现代码
下面的代码实现使用的是express框架
## 获取cookie
核心代码<font color="#f40">req.headers.cookie</font>
```
router.get("/init",(req,res)=>{
res.header("Content-Type", "application/json; charset=utf-8");
var cookies = req.headers.cookie;
console.log(cookies)
})
```
<!-- more -->
运行结果：
![1.png](1.png)
前端cookie：
![2.png](2.png)

# 把cookie以字符串的形式切割成了对象
```
router.get("/init",(req,res)=>{
res.header("Content-Type", "application/json; charset=utf-8");
var cookies = req.headers.cookie;
console.log(cookies)
// 判断cookie是否存在
if (cookies) {
    let arr = cookies.split(";")
    let cookiesObj = {}; //对象形式的cookie
    arr.forEach(item => {
        let objArr = item.split("=");
        cookiesObj[objArr[0].trim()] = objArr[1].trim()
    })
    console.log(cookiesObj)
}
})
```