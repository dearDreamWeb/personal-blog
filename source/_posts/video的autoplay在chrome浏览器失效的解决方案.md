---
title: video的autoplay在chrome浏览器失效的解决方案
date: 2021-01-23 19:50:01
tags: Html5
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 问题
当给video或audio标签添加autoplay属性时，在chrome浏览器会失效。

# 原因
Chrome为了不造成噪音污染，提升用户体验，首次让用户自己选择，关掉了声音自动播放

# 解决方案
<!--more-->
如果视频本身已经被设置为`静音`的情况下,那么浏览器将`不会再拦截其加载进行自动播放`。  
video标签有一个`muted`属性可以将视频设置为静音状态。  
代码如下
```html
<video muted src="" autoplay loop></video>
```
# 副作用
副作用就是视频自动播放但是没有声音。不适用既要自动播放又要有声音的场景。