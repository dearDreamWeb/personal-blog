---
title: div加入onblur事件
date: 2021-02-06 14:08:30
tags: Html
categories: 前端
---


一般情况下，div是`没有onblur事件`的，但是给div加上`tabindex`属性后，就可以`使用onblur事件`了。  
# 注意
定义tabindex属性后，元素是默认会在聚焦的时候加上`outline`的样式，也就是onfocus时候，样式为div:focus{...}，那么在IE中可以通过`hidefocus="true"`去除。其他浏览器通过outline=0进行去除，可以通过样式去修改，比如`div:focus{outline:none}`。
<!--more-->
# 例子
```html
<div tabindex='1' onfocus='alert("得到焦点");' onblur='alert("失去焦点");'></div>
```

# tabindex属性
tabindex 全局属性 指示其元素是否可以聚焦，以及它是否/在何处参与顺序键盘导航（通常使用`Tab`键，因此得名）。  
它接受一个整数作为值，具有不同的结果，具体取决于整数的值：  
- `tabindex=负值` (通常是tabindex=“-1”)，表示元素是`可聚焦`的，但是`不能通过`键盘导航来访问到该元素，用JS做页面小组件内部键盘导航的时候非常有用。
- `tabindex="0"` ，表示元素是`可聚`焦的，并且`可以通过`键盘导航来聚焦到该元素，它的相对顺序是当前处于的`DOM结构`来决定的。
- `tabindex=正值`，表示元素是`可聚焦`的，并且`可以通过`键盘导航来访问到该元素；它的相对顺序按照`tabindex 的数值递增而滞后获焦`。如果多个元素拥有相同的 tabindex，它们的相对顺序按照他们在当前DOM中的先后顺序决定。

根据键盘序列导航的顺序，值为 0 、非法值、或者没有 tabindex 值的元素应该放置在 tabindex 值为正值的元素后面。  

如果我们在 `<div>` 上设置了 tabindex 属性，它的子元素内容`不能使用箭头键来滚动`，除非我们在内容上`也设置 tabindex`。

> 注：tabindex 的最大值不应超过 32767。如果没有指定，它的默认值为 0。