---
title: React中dangerouslySetInnerHTML实现dom插入Html代码
categories: 前端
date: 2022-05-18 09:49:28
tags: [React]
---


# 场景
当用富文本编辑好内容保存到数据库之后，数据库存的富文本的内容格式如下：  
```
<div><h1>标题</h1><main>内容</main></div>
```
当需要在某个页面某个位置去展示它的话需要原样展示出来，要怎么办呢？
<!-- more -->
# 解决方案
解决方案有两种： 
1. 使用`useRef`获取dom元素之后使用`innerHTML`属性去吧html代码插入到dom元素中去，具体如下：
```js
import React, { useEffect, useRef } from "react";

function App() {
  const dom = useRef(null);

  useEffect(()=>{
    if(dom.current){
      dom.current.innerHTML = '<h2>标题2</h2>'
    }
  },[])

  return (
    <div ref={dom}></div>
  )
}
```
2. 使用react在dom上新增的一个属性[dangerouslySetInnerHTML](https://zh-hans.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml),官方文档介绍：
> `dangerouslySetInnerHTML` 是 React 为浏览器 DOM 提供 `innerHTML` 的替换方案。通常来讲，使用代码直接设置 HTML 存在风险，因为很容易无意中使用户暴露于`跨站脚本（XSS）`的攻击。因此，你可以直接在 React 中设置 HTML，但当你想设置 `dangerouslySetInnerHTML` 时，需要向其传递包含 key 为 `__html` 的对象，以此来警示你。
下面不用官方例子了，用本文章的例子：
```js
import React, { useState, useEffect } from "react";

function App() {
  const [htmlContent,setHtmlContent] = useState('')

  useEffect(()=>{
    setHtmlContent('<h2>标题2</h2>')
  },[])

  return (
    <div dangerouslySetInnerHTML={{__html:htmlContent}}></div>
  )
}
```
这个用法更加安全一些。