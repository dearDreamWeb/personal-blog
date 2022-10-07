---
title: css3中hover的使用及细节
date: 2020-02-26 15:33:35
tags: css3
categories: 前端
---


## 首先第一条很重要
 元素添加hover伪类选择器时候一定要<font color="#f40">紧贴这hover</font>，不能有<font color="#f40">空格</font>，有空格的话表示给该元素的所有子元素设置里hover样式。

<!-- more -->

错误例子：
```css html
ul :hover{} //ul的所有子元素设置了hover样式

```
正确例子：
```css html
ul:hover{} // ul会显示出想要的效果

```
## 第二
当想要在父元素添加hover在指定的子元素的实现效果
<font color="#f40">子元素应该写在hover后面空格隔开</font>
```css html
<style>
    li{
               width: 100px;
               height: 100px;
               border:1px solid #000;
               transition:transfrom 2s linear;
          }
          ul:hover .one{            // 子元素写在hover后面空格隔开
               transform:rotateY(90deg);
          }
          ul:hover .two{
               transform:rotateY(0deg);
          }
          ul:hover .thr{
               transform:rotateY(360deg);
          }
</style>
<body>
    <div style="width: 300px;height : 300px; background-color:#ccc"></div>
     <ul>
          <li class="one">di1ge</li>
          <li class="two">di2ge</li>
          <li class="thr">di3ge</li>
     </ul>
</body>
```
这个例子中就是当鼠标经过ul的时候，li会在设置的角度旋转

## 注意
仅可以给<font color="#f40">自身的子元素</font>设置样式，给其他元素子元素设置无效
接着上个例子举例子：
```
div:hover .one{}  //不显示任何效果，hover失效

```
