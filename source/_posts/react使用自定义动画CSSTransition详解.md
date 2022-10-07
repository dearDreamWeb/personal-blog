---
title: react使用自定义动画CSSTransition详解
date: 2020-10-23 12:01:06
tags: React
categories: 前端
---


# 一、先下载依赖包
安装两个包 `react-transition-group` 和 `@types/react-transition-group`
```
 npm install react-transition-group  @types/react-transition-group --save
```
# 二、使用步骤
例子  
APP.js文件中定义CSSTransition中的一些属性，和通过classNames自定义动画名字
<!-- more -->
```js
import React, { useState } from 'react';
import './App.css';
import { CSSTransition } from "react-transition-group";

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="App" >
      <button onClick={() => setOpen(!open)}>toggle</button>
      <CSSTransition
        in={open}
        timeout={300}
        classNames="diy-transition"
        unmountOnExit
      >
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </CSSTransition>
    </div >
  )
}
```

App.css中根据`CSSTransition中的classNames的属性值`编写对应想要的样式
```css
/* 显示的初始样式 */
li {
  color: red;
}

/* 元素出现时 */
.diy-transition-enter {
  opacity: 0;
}
/*  元素出现的最终样式 */
.diy-transition-enter-active {
  opacity: 1;
  background-color: rgb(32, 218, 209);
  transition: all 300ms ease-in-out;
}

/* 元素消失时 */
.diy-transition-exit {
  opacity: 1;
}
.diy-transition-exit-active {
  opacity: 0;
  background-color: green;
  transition: all 300ms ease-in-out;
}
```
运行效果图
![1.gif](1.gif)

# 三、CSSTransition参数
CSSTransition中的属性值的讲解
- in：
  必备的参数，默认是false，类型是boolean,切换状态时所用的值，是显示还是隐藏元素
  `type:boolean`
  `default: false`

- timeout：
  延时
  `type:number`

- classNames：
  所应用样式的前缀
  可以使string类型也可以是object类型
  例子：
  string型
  ```js
  classNames="my-appear"
  ```
  object类型
  ```js
  classNames={{
    appear: 'my-appear',
    appearActive: 'my-active-appear',
    appearDone: 'my-done-appear',
    enter: 'my-enter',
    enterActive: 'my-active-enter',
    enterDone: 'my-done-enter',
    exit: 'my-exit',
    exitActive: 'my-active-exit',
    exitDone: 'my-done-exit',
  }}
  ```
  `type: string | { appear?: string, appearActive?: string, appearDone?: string, enter?: string, enterActive?: string, enterDone?: string, exit?: string, exitActive?: string, exitDone?: string, }`
  `default: ''`

- unmountOnExit：
  消失时移除组件
  `type:boolean`
  `default: false`

- appear
  刚加载时是否使用动画  
  appear要重点说明一下，应用场景是当元素在页面第一次加载渲染的时候显示在页面时，在页面加载渲染的时候是否执行动画，下面举个例子  
  App.js
  ```js
    import React, { useState } from 'react';
    import './App.css';
    import { CSSTransition } from "react-transition-group";

    const App = () => {
    const [open, setOpen] = useState(true);  // 默认true
    return (
        <div className="App" >
        <button onClick={() => setOpen(!open)}>toggle</button>
        <CSSTransition
            in={open}
            timeout={300}
            classNames="diy-transition"
            unmountOnExit // 为true 代表退出的时候移除dom
            appear   // 为true  渲染的时候就直接执行动画，默认false，
        >
            <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            </ul>
        </CSSTransition>

        </div >
    )
    }
  ```
  App.css
  ```css
    /* 显示的初始样式 */
    ul {
        color: red;
    }

    /* 页面渲染时 */
    .diy-transition-appear {
        opacity: 0;
        background-color: goldenrod;
    }
    .diy-transition-appear-active {
        opacity: 1;
        transition: all 300 ease-in-out;
    }

    /* 元素出现时 */
    .diy-transition-enter {
        opacity: 0;
    }
    /*  元素出现的最终样式 */
    .diy-transition-enter-active {
        opacity: 1;
        background-color: rgb(32, 218, 209);
        transition: all 300ms ease-in-out;
    }

    /* 元素消失时 */
    .diy-transition-exit {
        opacity: 1;
    }
    .diy-transition-exit-active {
        opacity: 0;
        background-color: green;
        transition: all 300ms ease-in-out;
    }
  ```
  运行效果：
  ![2.gif](2.gif)

  # 四、CSSTransition回调函数

- onEnter
    <Transition>组件的回调函数，当组件enter或appear时会立即调用。
    `type: Function(node: HtmlElement, isAppearing: bool)`

- onEntering
    也是一个过渡组件的回调函数，当组件enter-active或appear-active时，立即调用此函数
    `type: Function(node: HtmlElement, isAppearing: bool)`

- onEntered
    同样是回调函数，当组件的enter,appearclassName被移除时，意即调用此函数
    `type: Function(node: HtmlElement, isAppearing: bool)`

- onExit
    当组件应用exit类名时，调用此函数
    `type: Function(node: HtmlElement)`

- onExiting
    当组件应用exit-active类名时，调用此函数
    `type: Function(node: HtmlElement)`

- onExited
    当组件exit类名被移除，且添加了exit-done类名时，调用此函数
    `type: Function(node: HtmlElement)`

# 五、配合第三方库animate.css使用
1. 安装 animate.css
`npm install aniamte.css --save`

2. 在index.js中引入animate.css
```js
import "animate.css";
```
3. 在CSSTransition中的classNames中引入样式
```js
import React, { useState } from 'react';
import { CSSTransition } from "react-transition-group";

const App = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="App" >
      <button onClick={() => setOpen(!open)}>toggle</button>
      <CSSTransition
        in={open}
        timeout={300}
        classNames={{
          appear:"animate__slideInDown",  // 第一次加载动画
          enter:"animate__fadeIn",     // 显示动画
          exit:"animate__fadeOut"      // 消失动画
        }}
        unmountOnExit
        appear
      >
        <ul className="animate__animated">
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </CSSTransition>

    </div >
  )
}
```
运行效果:
![3.gif](3.gif)