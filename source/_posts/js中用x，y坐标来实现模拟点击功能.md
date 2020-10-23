---
title: js中用x，y坐标来实现模拟点击功能
date: 2020-05-12 20:50:44
tags: JavaScript
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 一、应用场景
目前我想到的应用场景就只有一个，就是用手机上用脚本自动点击指定位置的元素。
手机有个名为Auto.js的软件，这款软件可以写脚本的，脚本是可以在其他软件上运行的（真心给力的脚本软件，比如可以写一个蚂蚁森林收集能量的脚本、抢限时优惠卷的脚本等等），只不过要用auto.js的语法。
我当时用auto.js写手机上的一些脚本的时候就经常用一个click(x,y)的方法可以实现指定坐标元素点击的功能。
对Auto.js这款软件就不多介绍了，想多了解的话自行百度。

# 二、什么是Document.elementFromPoint()
<!-- more -->
## 语法：
- 返回的是DOM元素.
- x 和 y 是坐标数值, 不需要单位比如px.
```js
document.elementFromPoint(x, y);  
```

## 功能：
简单来说就是以<font color="#f40">浏览器窗口的左上角为原点</font>计算，获取对应的<font color="#f40">x坐标点</font>和<font color="#f40">y坐标点</font>的<font color="#f40">元素</font>。x,y指的是<font color="#f40">clientX</font>,<font color="#f40">clientY</font>。

## 例子：
```js
// html
<body>
    <p id="para1">Some text here</p>
    <button>blue</button>
    <button>red</button>
</body>

//js
<script>
  let el = document.elementFromPoint(69, 61);
  console.log(el);
</script>
```
运行结果：
因为坐标(69, 61)对应就是名为red的button，所以就会获取到该元素。
![1.png](1.png)


# 三、什么是MouseEvent()
## MouseEvent()的语法：
```js
let event = new MouseEvent(typeArg, mouseEventInit);
```
typeArg：事件名称
mouseEventInit （可选）
初始化 MouseEvent 的字典，有下列属性字段：
- "<font color="#f40">bubbles</font>"，Boolean 型可选，默认为true
- "<font color="#f40">cancelable</font>"，Boolean 型可选，默认为true
- "<font color="#f40">view</font>"，默认为window（我也不知道其他值是什么，目前就知道好像只能是window）
- "<font color="#f40">screenX</font>"，long 型可选，默认为 0，设置鼠标事件发生时相对于用户屏幕的水平坐标位置；该操作并不会改变真实鼠标的位置。
- "<font color="#f40">screenY</font>"，long 型可选，默认为 0，设置鼠标事件发生时相对于用户屏幕的垂直坐标位置；该操作并不会改变真实鼠标的位置。
- "<font color="#f40">clientX</font>"，long 型可选，默认为 0，设置鼠标事件时相对于客户端窗口的水平坐标位置；该操作并不会改变真实鼠标的位置。
- "<font color="#f40">clientY</font>"，long 型可选，默认为 0，设置鼠标事件时相对于客户端窗口的垂直坐标位置；该操作并不会改变真实鼠标的位置。
- "<font color="#f40">ctrlKey</font>"，Boolean 型可选，默认为false，标明是否同时按下 ctrl 键。
- "<font color="#f40">shiftKey</font>"，Boolean 型可选，默认为false，标明是否同时按下 shift 键。
- "<font color="#f40">altKey</font>"，Boolean 型可选，默认为 false，标明是否同时按下 alt 键。
- "<font color="#f40">metaKey</font>"，Boolean 型可选，默认为false，标明是否同时按下 meta 键。
- "<font color="#f40">button</font>"，short 型可选，默认为 0，描述了当事件发生时，哪个按键被按下或释放：

|值|含义|
| ---- | ---- |
0|主按键被按下（通常为左键）或未初始化
1|辅助按键被按下 (通常为中键)
2|次按键被按下 (通常为右键)

- "<font color="#f40">buttons</font>"，无符号 short 型可选，默认为 0，描述了当事件发生时哪些按键被按下：

|位域值（Bit-field value） | 含义|
| ---- | ---- |
0|无按键被按下
1|主按键被按下 (通常为左键)
2|次按键被按下 (通常为右键)
4|辅助按键被按下 (通常为中键)

- "<font color="#f40">relatedTarget</font>"，EventTarget 型可选，默认为 null，若事件为 mouseenter 或 mouseover，则表示刚离开的元素；若事件为 mouseout 或 mouseleave，则表示刚进入的元素。
- "<font color="#f40">region</font>"，DOMString 型可选，默认为null，标明点击事件影响的区域 DOM 的 id。不影响任何区域的话，请传null值。

## 功能：
构造器创建一个 MouseEvent。
MouseEvent接口 指<font color="#f40">鼠标事件</font>。使用此接口的<font color="#f40">常见事件</font>包括：<font color="#f40">click</font>，<font color="#f40">dblclick</font>，<font color="#f40">mouseup</font>，<font color="#f40">mousedown</font>。


# 四、实现模拟点击
将上述的Document.elementFromPoint()和MouseEvent()结合使用。
例子：
相当于一开始加载就点击过了对应坐标的元素。
```js
// html
<body>
    <p id="para1">Some text here</p>
    <button>blue</button>
    <button>red</button>
</body>

//js
function click(x,y) {
    // 创建了一个点击事件
  let event = new MouseEvent("click",{
    bubbles: true,  // 事件冒泡：true为允许;false为不允许
    cancelable: true, // 默认事件：true为允许;false为不允许
    view: window, 
  });
  // 获取改坐标的元素
  let el = document.elementFromPoint(x,y);
  // 设置元素点击事件触发打印innerText的内容
  el.onclick=(e)=>{
    console.log(e.target.innerText)
  }
  // 为该元素派发事件
  el.dispatchEvent(event);
}
click(69, 61);
```
运行结果：
![2.png](2.png)

> 推荐一篇关于<font color="#f40">js原生创建模拟事件和自定义事件的方法</font>博客链接
https://www.cnblogs.com/libin-1/p/5944334.html