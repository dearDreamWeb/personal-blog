---
title: 'Express处理前端动态请求（/:id）'
date: 2020-04-29 16:01:18
tags: express
categories: 后端
---


# 一、app.get()、app.post()
配置客户端路由（请求地址）。
```
app.post('/get_json/:id', function (req, res) {
  // 响应块代码
})
```
这里配置了一个POST请求的地址。将app.post()改成app.get()也是可以的，只是请求类型会变成get。
<!-- more -->

# 2. req.params
一个对象，其包含了一系列的属性，这些属性和在路由中命名的参数名是一一对应的。例如，如果你有/user/<font color="#f40">:name</font>路由，name属性可通过<font color="#f40">req.params.name的方式获取到</font>，这个对象默认值为{}。   
例子：
```
//前端代码
this.$axios({
method:"get",
url:`http://localhost:3333/aabbb`
}).then(res=>{
console.log(res)
}).catch(err=>{
console.log(err)
})
//后端代码
app.use('/:id',(req,res)=>{
    console.log(req.params)
    res.send('ok')  
})   
```
运行结果
![1.png](/Express处理前端动态请求（-id）/1.png)

或者也可以这样写（只是修改了后端代码）
```
//后端代码
app.use('/aa:id',(req,res)=>{
    console.log(req.params)
    res.send('ok')  
})
```
运行结果
![2.png](/Express处理前端动态请求（-id）/2.png)