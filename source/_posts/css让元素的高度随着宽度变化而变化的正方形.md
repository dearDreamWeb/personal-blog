---
title: css让元素的高度随着宽度变化而变化的正方形
date: 2020-03-02 22:52:09
tags: css
categories: 前端
---


## css样式
```css
div {
    width：100%;     /*必须是100%*/ 
    height:0;
    padding-top:100%  /*padding-bottom:100% 也行*/ 
}
```
这样会使元素的高度等于宽度，形成一个正方形。 
 
<!-- more -->

注意：  
- width必须为100%，不能为具体值;   
- 父元素的宽度必须有具体指,如：width:100px

例子：
``` css
 <style>
    #wrapper {
      width: 100px
    }

    #wrapper #app {
      width: 100%;
      height: 0;
      padding-top: 100%;
      background: red;
    }
  </style>

  /* html代码 */
    <div id="wrapper">
    <div id="app"></div>
    </div>
```
运行效果:  
![](/css让元素的高度随着宽度变化而变化的正方形/6.png)