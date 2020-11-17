---
title: Express实现文件上传原理 form enctype属性  path模块  multer模块
date: 2020-08-17 08:37:43
tags: [Node,express]
categories: 后端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 一、要实现文件上传原理要用到的知识点
- form enctype属性
- multer模块
- path模块

# 二、form enctype属性
## 注意
`用form提交数据时，要提交的数据input标签都要有name属性，否则该值提交无效。`
<!--- more -->
正常情况，form标签的enctype默认属性是   `application/x-www-form-urlencoded`   是以字符串形式传输的，这次实现文件上传要用到  `multipart/form-data`
```html
<form action="http://localhost:3000" method="post" enctype="multipart/form-data">
    <input type="file" name="file" id="file">
    <input type="submit" value="提交" class="btn btn-primary">
</form>
```
## 语法
`<form enctype="value">`
## 属性值
| 属性                              | 描述                                                           |
| :-------------------------------- | :------------------------------------------------------------- |
| application/x-www-form-urlencoded | 在发送前编码所有`字符`（默认）                                 |
| multipart/form-data               | 不对字符编码。在使用包含`文件上传`控件的表单时，必须使用该值。 |
| text/plain                        | 空格转换为 "+" 加号，但不对特殊字符编码。                      |

# 三、multer模块
先安装 `cnpm i multer --save`
该模块是以中间件的形式存在的  
用来接收form表单中的以文件形式上传的文件  
例如：
```js
const multer = require('multer');
server.listen(3000);
server.use(multer().any());
```
`.any()`代表可以接受任何文件类型  
可以用`req.files`来查看接收的文件  
例如：(req.files接收到的数据)
```js
[ { fieldname: 'file',  // from表单中的name属性的属性值
    originalname: 'Adobe CC.ico',  // 上传的文件名字
    encoding: '7bit',      //文件编码
    mimetype: 'image/x-icon',    //文件的 MIME 类型
    destination: './save/',       //保存路径
    filename: '8b3222e43d3cbbe7ab159589256d1552',  //保存在 destination 中的文件名
    path: 'save\\8b3222e43d3cbbe7ab159589256d1552',//已上传文件的完整路径
    size: 36462   //文件大小（字节单位）   
    } ]
```
接收的文件是以数组的形式发送到后端的，数组里面只有一项，是对象  

| 属性         | 描述                          |
| :----------- | :---------------------------- |
| fieldname    | Field name 由表单指定         |
| originalname | 用户计算机上的文件的名称      |
| encoding     | 文件编码                      |
| mimetype     | 文件的 MIME 类型              |
| size         | 文件大小（字节单位）          |
| destination  | 保存路径                      |
| filename     | 保存在 destination 中的文件名 |
| path         | 已上传文件的完整路径          |
| buffer       | 一个存放了整个文件的 Buffer   |

`multer({dest:'地址'})`  自动帮你储存 - `名字自动改成hash值` 防止重名   
缺点：没有后缀  
例子：
```js
const mysql = require('mysql');
const express = require('express');
const multer = require('multer');
const app = express();
app.listen(3000)
app.use(multer({dest:'./images'}).any())
app.use('/files',(req,res)=>{
    console.log(req.files)
})
```
打印的信息：
```js
[ 
    { fieldname: 'f1',
    originalname: 'web.txt',
    encoding: '7bit',
    mimetype: 'text/plain',
    destination: './images',
    filename:'3e49baaa770dfd21acdfe64d6312b7dd', //转化成hash值
    path: 'images\\33ac0bc106b02c443e6096f45de68c14',
    size: 121 } 
]
```
效果图：
![1.png](1.png)

# 四、path模块
先安装 `cnpm i path --save`  
path.parse(string)用来解析文件路径
```js
const path = require('path');
let str = path.parse('C:\Users\m1883\Pictures\Icons\Adobe CC.ico');
console.log(str);
```
运行结果
```js
{ root: 'C:',
  dir: 'C:',
  base: 'Usersm1883PicturesIconsAdobe CC.ico',
  ext: '.ico',
  name: 'Usersm1883PicturesIconsAdobe CC' 
  }   
```
各个属性的描述
- `root`  在什么根目录
- `dir` 绝对地址
- `base` 文件名+后缀
- `ext` 后缀
- `name` 文件名

# 五、最终代码
前端
```html
<form action="http://localhost:3000" method="post" enctype="multipart/form-data">
    <input type="file" name="file" id="file">
    <input type="submit" value="提交" class="btn btn-primary">
</form>
```
后端
```js
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const server = express();
server.listen(3000);
server.use(multer({ dest: './save/' }).any());
server.use((req, res) => {
    fs.rename(req.files[0].path, req.files[0].path + path.parse(req.files[0].originalname).ext, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.send('ok')
        }
    })
})
```
运行结果
![2.png](2.png)
![3.png](3.png)

若想要往数据库里传真正的文件名字需要，否则含有路径
```js
path.parse(src).name+path.parse(req.files[0].originalname).ext;
```
## 第二种：直接在请求中完成
```js
// 前端编辑页面上传的商品图片
const multer = require('multer');
const path = require("path");
//解析图片文件,并保存位置
const upload = (multer({ dest: path.resolve(__dirname, "../../static/product") }).any());
useRouter.post("/productIamge_upload", upload, (req, res) => {
    console.log(req.files)
    res.json({
        status: 0
    })
})
```