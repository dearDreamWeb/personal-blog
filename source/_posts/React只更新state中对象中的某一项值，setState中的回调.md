---
title: React只更新state中对象中的某一项值，setState中的回调
date: 2020-08-09 09:06:24
tags: React
categories: 前端
---


# 只更新state中对象中的某一项值
要用到`Object.assign()`方法   
例子：

```
this.state = {
count: [
    { num: 0, title: "用户总数", background: "#66ef66" },
    { num: 0, title: "商品总数", background: "#f9cb4a" },
    { num: 0, title: "订单总数", background: "#f93232" }
]
}
```
<!-- more -->
想要更新count数组每一项中第一个对象中的num值

```
this.setState({
    count:[
              Object.assign({},this.state.count[0],{num:1}),
              Object.assign({},this.state.count[1],{num:2}),
              Object.assign({},this.state.count[2],{num:3})
    ]
})
```

# setState中的回调
## 问题：  
由于有时候setState是异步操作的，这就导致了，setState时获取state值时有可能还没更新。
例子：

```
this.state ={value:1}
this.setState({
    value: 2
})
console.log(this.state.value)  // 1
```

## 解决方案
setState的参数：setState(updater, [callback])   
用setState的回调方法。

```
this.state ={value:1}
this.setState({
    value: 2
}, () => {
    console.log(this.state.value) //2
})
```
