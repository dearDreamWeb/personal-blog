---
title: css取消事件的属性
date: 2020-10-16 09:00:22
tags: css
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 方法

```css
pointer-events:none;
```
当pointer-events属性值为`none`时，`元素永远不会成为鼠标事件的target`。但是，当其后代元素的pointer-events属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。

# 例子

```
<a href="www.baidu.com">链接</a>

// css
a{
    pointer-events:none
}
```
<!-- more -->
点击a标签将不会跳转地址

# 注意
- 当pointer-evnets:none时，`css属性cursor（鼠标样式）也会失效`。
- pointer-events的属性值中除了`none`和`auto`，其他的都只适用于svg

# 兼容性
| 浏览器 | 最低兼容的版本 |
| ---- | ---- |
| IE |  11 |
| Chrome | 4 |
| Edge | 12 |
| Firefox | 3.6 |
| Opera | 15 |
| Safari | 4 |
| 移动端浏览器 | 都兼容 |
