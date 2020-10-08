---
title: js图片懒加载的实现原理
date: 2020-03-02 22:44:29
tags: JavaScript
categories: 前端
---
# 一、定义
当打开一个有很多图片的页面时，先只加载页面上看到的图片，等滚动到页面下面时，再加载所需的图片。这就是图片懒加载。

# 二、作用
减少或延迟请求数，缓解浏览器的压力，增强用户体验。

# 三、实现方式

<!-- more -->

1､设置图片src属性为同一张图片，同时自定义一个data-src属性来存储图片的真实地址<br>

2､ 页面初始化显示的时候或者浏览器发生滚动的时候判断图片是否在视野中<br>

3､ 当图片在视野中时，通过js自动改变该区域的图片的src属性为真实地址

# 四、代码部分

1、html 部分

```
 <div class="container">
    <img src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif" alt="1" data-src="http://cdn.jirengu.com/book.jirengu.com/img/1.jpg">
   .
   .
   .
    <img src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif" alt="20" data-src="http://cdn.jirengu.com/book.jirengu.com/img/20.jpg">
  </div>
<style>
.container {
      max-width: 800px;
      margin: 0 auto;
    }
    .container:after{
      content: '';
      display: block;
      clear: both;
    }
    .container img {
      float: left;
      width: 50%;
    }
    h1{
      clear: both;
    } 
/*注：img都是浮动，如果不清除浮动，h1的值高度就相当于container里面最高的，不是实际的数值*/
</style>
```

2、js 部分
```
  <script>
    start() // 一开始没有滚动，也需要触发一次 

    $(window).on('scroll', function(){// 滚动时，显示对应图片
      start()
    })

    function start(){
      $('.container img').not('[data-isLoaded]').each(function(){
        var $node = $(this)
        if( isShow($node) ){
          loadImg($node)
        }
      })
    }

    function isShow($node){ // 判断图片是否在视野中
      return $node.offset().top <= $(window).height() + $(window).scrollTop()
    }

    function loadImg($img){ 
      $img.attr('src', $img.attr('data-src'))
      $img.attr('data-isLoaded', 1) // 区别图片是否被加载过，防止重新加载
    }
```
### 效果图地址
http://js.jirengu.com/hexuluraxo/1/edit?html,output