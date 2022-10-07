---
title: css中实现单行居中，多行居左
date: 2020-11-17 20:57:06
tags: css
categories: 前端
---


正常情况下对齐方式只能是按照一个方向排列，如：
```html
<!-- css -->
<style>
    .father {
        margin: 10px;
        padding: 10px;
        width: 200px;
        text-align: center;
        border: 1px solid #ccc;
    }
</style>

<!-- html  -->
<div class="father">
    <p class="child">我是单行居中显示</p>
</div>

<div class="father">
    <p class="child">我是多行居中显示我是多行居中显示</p>
</div>
```
运行结果：
<!-- more -->
![1.png](/css中实现单行居中，多行居左/1.png)

想要实现单行居中，多行居左。步骤如下：
1. 把子元素转化为`行内块级元素`，因为行内块级元素会`受到父元素的text-align属性的影响`，而且行内块级元素不设置width的情况下，它的width是由它的内容所决定的。
2. 子元素将文本向左对齐

例子：
```html
<!-- css -->
<style>
    .father {
        margin: 10px;
        padding: 10px;
        width: 200px;
        text-align: center;
        border: 1px solid #ccc;
    }
    .child {
        display: inline-block;
        text-align: left;
    }
</style>

<!-- html  -->
<div class="father">
    <p class="child">我是单行居中显示</p>
</div>

<div class="father">
    <p class="child">我是多行居中显示我是多行居中显示</p>
</div>
```
运行结果：
![2.png](/css中实现单行居中，多行居左/2.png)