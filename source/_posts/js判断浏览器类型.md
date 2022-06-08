---
layout: js
title: 判断浏览器类型
date: 2020-02-26 16:24:56
tags: JavaScript
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

## 判断浏览器类型用的方法是
<font color="#f40"> navigator.userAgent </font>  //取得浏览器的userAgent字符串  
例子  
<!-- more -->
- Chrom浏览器  
![](/判断浏览器类型/0.png)
- Firefox浏览器
![](/判断浏览器类型/1.png)
- Opera浏览器
![](/判断浏览器类型/2.png)

## 重点说一下Opera
Opera之前用的引擎是自家的研发的 **Presto**  ，2016年以后改用chrome浏览器的**webkit**引擎,所以说做网上教的正常的浏览器判断，会把Opera判断成Chrome，Opera的名字改成了**OPR**,所以判断浏览器类型方法是（只区分浏览器，不考虑版本）：

```js
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("OPR") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
  return "Chrome";
 }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}
```