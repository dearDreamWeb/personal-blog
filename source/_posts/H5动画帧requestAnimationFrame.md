---
title: H5动画帧requestAnimationFrame
date: 2020-12-25 11:16:40
tags: Html5
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 介绍
在Web应用中，实现动画效果的方法比较多，JavaScript 中可以通过定时器 `setTimeout` 来实现，`css3` 可以使用 `transition` 和 `animation` 来实现，html5 中的 `canvas` 也可以实现。除此之外，html5 还提供一个专门用于请求动画的 API，即 ` requestAnimationFrame（rAF）`，顾名思义就是 “`请求动画帧`”。 为了深入理解  `rAF` 背后的原理（后文的 `rAF` 均指的是 `requestAnimationFrame`），我们首先需要了解一下与之相关的几个概念：

<!-- more -->
# 屏幕绘制频率
即图像在屏幕上更新的速度，也即屏幕上的图像每秒钟出现的次数，它的单位是赫兹(`Hz`)。 对于一般笔记本电脑，这个频率大概是`60Hz`， 可以在桌面上 右键 > 屏幕分辨率 > 高级设置 > 监视器 中查看和设置。这个值的设定受屏幕分辨率、屏幕尺寸和显卡的影响，原则上设置成让眼睛看着舒适的值都行。
`当你对着电脑屏幕什么也不做的情况下，显示器也会以每秒60次的频率正在不断的更新屏幕上的图像`。为什么你感觉不到这个变化？ 那是因为人的眼睛有`视觉停留效应`，即前一副画面留在大脑的印象还没消失，紧接着后一副画面就跟上来了，这中间只间隔了`16.7ms(1000/60≈16.7)`， 所以会让你误以为屏幕上的图像是静止不动的。而屏幕给你的这种感觉是对的，试想一下，如果刷新频率变成1次/秒，屏幕上的图像就会出现严重的闪烁，这样就很容易引起眼睛疲劳、酸痛和头晕目眩等症状。

# CSS 动画原理
根据上面的原理我们知道，你眼前所看到图像正在以每秒 `60` 次的频率绘制，由于频率很高，所以你感觉不到它在绘制。而 `动画本质就是要让人眼看到图像被绘制而引起变化的视觉效果，这个变化要以连贯的、平滑的方式进行过渡`。 那怎么样才能做到这种效果呢？   
`60Hz` 的屏幕每` 16.7ms 绘制一次`，如果在屏幕每次绘制前，将元素的位置向左移动一个像素，即1px，这样一来，屏幕每次绘制出来的图像位置都比前一个要差1px，你就会看到图像在移动；而由于人眼的视觉停留效应，当前位置的图像停留在大脑的印象还没消失，紧接着图像又被移到了下一个位置，这样你所看到的效果就是，图像在流畅的移动。这就是视觉效果上形成的动画。 

# setTimeout
理解了上面的概念以后，我们不难发现，`setTimeout` 其实就是通过设置一个间隔时间来不断的改变图像的位置，从而达到动画效果的。但我们会发现，利用 `seTimeout` 实现的动画在某些低端机上会出现卡顿、抖动的现象。 这种现象的产生有两个原因：
- `setTimeout` 的执行时间并不是确定的。在JavaScript中， setTimeout 任务被放进了异步队列中，`只有当主线程上的任务执行完以后，才会去检查该队列里的任务是否需要开始执行`，所以 `setTimeout 的实际执行时机一般要比其设定的时间晚一些`。
- 刷新频率受 `屏幕分辨率` 和 `屏幕尺寸` 的影响，不同设备的屏幕绘制频率可能会不同，而 setTimeout 只能设置一个固定的时间间隔，这个时间不一定和屏幕的刷新时间相同。

以上两种情况都会导致 `setTimeout 的执行步调和屏幕的刷新步调不一致`，从而引起`丢帧`现象。 那为什么步调不一致就会引起丢帧呢？   
首先要明白，setTimeout 的执行只是在内存中对元素属性进行改变，这个变化必须要等到屏幕下次绘制时才会被更新到屏幕上。如果两者的步调不一致，就可能会导致中间某一帧的操作被跨越过去，而直接更新下一帧的元素。假设屏幕每隔`16.7ms`刷新一次，而`setTimeout` 每隔`10ms`设置图像向左移动`1px`， 就会出现如下绘制过程（表格）：

|  时间点   | 情况  |
|  ----  | ----  |
| 第 0 ms  | 屏幕未绘制等待中，setTimeout 也未执行，等待中 |
| 第 10 ms | 屏幕未绘制等待中，setTimeout 开始执行并设置元素属性 left=1px |
| 第 16.7 ms | 屏幕开始绘制，屏幕上的元素向左移动了 1px， setTimeout 未执行，继续等待中 |
| 第 20 ms | 屏幕未绘制，等待中，setTimeout 开始执行并设置 left=2px |
| 第 30 ms | 屏幕未绘制，等待中，setTimeout 开始执行并设置 left=3px |
| 第 33.4  ms | 屏幕开始绘制，屏幕上的元素向左移动了 3px， setTimeout 未执行，继续等待中 |
| ... | .... |

从上面的绘制过程中可以看出，屏幕`没有更新 left=2px` 的那一帧画面，元素直接从`left=1px` 的位置跳到了 `left=3px` 的的位置，这就是丢帧现象，这种现象就会引起动画卡顿。

# rAF
与 setTimeout 相比，`rAF 最大的优势`是 `由系统来决定回调函数的执行时机`。具体一点讲就是，`系统每次绘制之前会主动调用 rAF 中的回调函数`，如果系统绘制率是 `60Hz`，那么回调函数就每`16.7ms` 被执行一次，如果绘制频率是`75Hz`，那么这个间隔时间就变成了 `1000/75=13.3ms`。换句话说就是，`rAF` 的执行步伐跟着系统的绘制频率走。`它能保证回调函数在屏幕每一次的绘制间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题`。  
这个API的调用很简单，如下所示：
```js
varprogress = 0;
//回调函数
function render() {
    progress += 1;//修改图像的位置
 
    if(progress < 100) {
           //在动画没有结束前，递归渲染
           window.requestAnimationFrame(render);
    }
}
//第一帧渲染
window.requestAnimationFrame(render);
```
## 除此之外，rAF 还有以下两个优势：
1. **CPU节能**：使用 setTimeout 实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，而且还浪费 CPU 资源。而 rAF 则完全不同，`当页面处理未激活的状态下`，该页面的屏幕`绘制任务`也会被系统暂停，因此跟着系统步伐走的 rAF 也会停止渲染，`当页面被激活时，动画就从上次停留的地方继续执行，有效节省了 CPU 开销`。
2. **函数节流**：在高频率事件(resize,scroll 等)中，为了防止在一个刷新间隔内发生多次函数执行，使用 rAF 可保证`每个绘制间隔内`，函数`只被执行一次`，这样既能保证流畅性，也能更好的节省函数执行的开销。一个绘制间隔内函数执行多次时没有意义的，因为显示器每16.7ms 绘制一次，多次绘制并不会在屏幕上体现出来。

# 优雅降级
由于 `rAF` 目前还存在兼容性问题，而且不同的浏览器还需要带不同的前缀。因此需要通过优雅降级的方式对 `rAF` 进行封装，优先使用高级特性，然后再根据不同浏览器的情况进行回退，直止只能使用 `setTimeout` 的情况，因此可以这么写：
```js
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
```
但这种写法没有考虑 cancelAnimationFrame 的兼容性，并且不是所有的设备绘制时间间隔都是1000/60，下面的代码是比较全的一个 polyfill
```js
if(!Date.now)
    Date.now = function() {returnnewDate().getTime(); };
 
(function() {
    'use strict';
     
    varvendors = ['webkit','moz'];
    for(vari = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        varvp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                   || window[vp+'CancelRequestAnimationFrame']);
    }
    if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)// iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        varlastTime = 0;
        window.requestAnimationFrame = function(callback) {
            varnow = Date.now();
            varnextTime = Math.max(lastTime + 16, now);
            returnsetTimeout(function() { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());
```
> 原创发布 [@一像素](http://www.cnblogs.com/onepixel/p/7078617.html)

# 技巧：
1. return 可以停止动画帧
2. window.cancelAnimationFrame(动画名)可以取消动画,
例子:
```js
function fn() {
    let frame1 =   window.requestAnimationFrame(fn);
    window.cancelAnimationFrame(frame1); 
}
```
3. 想要有动画效果，window.requestAnimationFrame()要在函数体内才行  
例子:
```js
function fn () {
    if(.....){   // 当满足某条件时，停止动画
        return ;
    }
    window.requestAnimationFrame(fn)
}
```

总例子：
```js
//html
<div id="map" ref="map"></div>

//css
#map {
  position: absolute;
  width: 300px;
  height: 180px;
  background: red;
}

//js
 move() {
      this.$nextTick(() => {
        let mapL = parseInt(window.getComputedStyle(this.$refs.map).left); // 获取元素的left值
        mapL += 1;  // 每次绘制left值加1
        this.$refs.map.style.left = mapL + "px";
        // 当位移量加上元素的宽度等于大于屏幕的宽度时，停止运动
        if (parseInt(this.$refs.map.style.left) + this.$refs.map.offsetWidth >= window.innerWidth) {
          return;
        }
        // 绘制函数
        window.requestAnimationFrame(this.move);
      });
    }
```