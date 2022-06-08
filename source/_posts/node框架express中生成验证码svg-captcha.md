---
title: node框架express中生成验证码svg-captcha
date: 2020-09-23 09:20:38
tags: [Node,express]
categories: 后端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 前提说明
本文章采用了svg-captcha方法去实现验证码功能，后端是express，前端是vue。  
实现方式：
1. 通过后端生成验证码，把验证码的值存到`session`中;
2. 再把验证码发到前端，前端去接收并把验证码在界面中显示出来;
3. 前端输入验证码后提交到后端，和后端session中保存的验证码做对比，看是否一致。

# svg-captcha使用步骤
1. 安装svg-captcha
<!-- more -->
```
 npm i svg-captcha -S
```
2. 后端生成验证码

```js
const express = require("express");
const router = express.Router();
const svgCaptcha = require('svg-captcha'); // 引入svg-captcha模块
router.get("/captchapng", function (req, res) {
    const cap = svgCaptcha.create(); // 此时创建的图形验证码默认为四个字符和一根干扰线条，背景色默认无
    console.log(cap); // {text: 'adfd', data: '<svg>.......<svg/>'}
    req.session.captcha = cap.text; // 把验证码的值存到session中
    res.type('svg')
    res.status(200).send(cap.data);
})
```
3. 前端接收

```
<!-- html部分 -->
<div ref="svg"></div>
<!-- script部分 -->
mounted() {
this.$axios({
  method: "get",
  url: "/captchapng",
})
  .then(res => {
    this.imgSrc=res.data;
    this.$refs.svg.innerHTML = res.data
  })
  .catch(err => console.log(err));
},
```

运行效果：  
![1.png](/node框架express中生成验证码svg-captcha/1.png)

#  API
## svgCaptcha.create(options)
如果未传递任何选项，则将获得一个随机字符串，该字符串包含四个字符和相应的svg。
- `size`：4 //随机字符串的大小
- `ignoreChars`：'0o1i'//过滤掉一些字符，例如0o1i
- `noise`：1 //噪声线数
- `color`：true //字符将具有不同的颜色而不是灰色，如果设置了背景选项，则为true
- `background`：'＃cc9966'// SVG图片的背景颜色

此函数返回具有以下属性的对象：
- `data`：字符串// svg路径数据
- `text`：字符串//验证码文本

## svgCaptcha.createMathExpr(options)
与创建api类似，您可以使用上述选项以及3个其他选项：
- `mathMin`：1 //数学表达式可以为的最小值
- `mathMax`：9 //数学表达式可以为的最大值
mathOperator：+ //要使用+，-或的运算符+-（对于random +或-）

此函数返回具有以下属性的对象：
- `data`：string //数学表达式的svg
- `text`：string //数学表达式的答案

## svgCaptcha.loadFont(url)
加载您自己的字体并覆盖默认字体。
ps: 这个api真心没弄懂
- `url`：string // 字体的路径此api是opentype.js的loadFont api的包装。
您可能需要围绕各种选项进行实验，以使自己的字体可访问。

## svgCaptcha.options
访问全局设置对象。它用于create和createMathExpr api作为默认选项。

除了大小，噪点，颜色和背景之外，您还可以设置以下属性：
- `width`：数字//验证码的宽度
- `height`：数字//验证码的高度
- `fontSize`：数字//验证码文字大小
- `charPreset`：字符串//随机字符预设

## svgCaptcha.randomText([size|options])
返回一个随机字符串。

## svgCaptcha(text, options)
根据提供的文本返回svg验证码。

在1.1.0之前的版本中，您必须调用这两个函数，
现在您可以调用create（）保存一些按键；）。

# 根据api来设置options来实现api中的功能
根据之前的例子来进行举例：

多个干扰线，字体多种也是
```js
const express = require("express");
const router = express.Router();
const svgCaptcha = require('svg-captcha'); // 引入svg-captcha模块
router.get("/captchapng", function (req, res) {
   let options = {
        noise: 5,
        color: true
    }
    const cap = svgCaptcha.create(options); // 此时创建的图形验证码默认为四个字符和一根干扰线条，背景色默认无
    console.log(cap); // {text: 'adfd', data: '<svg>.......<svg/>'}
    req.session.captcha = cap.text; // 把验证码的值存到session中
    res.type('svg')
    res.status(200).send(cap.data);
})
```
运行效果：
![2.png](/node框架express中生成验证码svg-captcha/2.png)


数学表达式验证码

```
let options = {
            noise: 5,
            color: true
        }
const cap = svgCaptcha.createMathExpr(options);
```

运行效果：
![3.png](/node框架express中生成验证码svg-captcha/3.png)