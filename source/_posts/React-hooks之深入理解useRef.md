---
title: React-hooks之深入理解useRef
date: 2021-08-31 22:35:52
tags: React
categories: 前端
---
<script type="text/javascript" src="/js/src/bai.js"></script>

# 一、useRef的特点
- useRef能够获取到dom
- 组件重新渲染，useRef的引用仍不会改变
- useRef的改变不会让组件重新渲染（render）

## 二、useRef与渲染的关系
<!--more-->
例子：
```js
import { useRef } from "react";

export default function App() {
    const ref = useRef(0)
    
    console.log(ref.current);
   
    return (
        <div>
            <div onClick={()=>ref.current++}>改变useRef</div>
        </div>
    )
}
```
打印结果：`0`  
打印结果可以看出ref的current改变并未造成组件重新渲染。因此useRef`不能作为`其他hooks的`依赖项`，如`useEffect、useMemo、useCallback`等。

## 三、useRef获取dom
useRef获取dom的方式通过实例一个useRef，通过ref获取dom。  
例子：
```js
import { useRef,useEffect } from "react";

export default function App() {
    const ref = useRef()
    useEffect(()=>{
        console.log(ref.current);
    },[])
    return (
        <div>
            <div ref={ref}>ref获取dom</div>
        </div>
    )
}
```
打印结果：  
`<div>ref获取dom</div>`  

#### （1）useRef存储多个dom  

利用数组将dom都添加进去
```js
import { useRef } from "react";

export default function Layout() {
  const ref = useRef([]);
  const arr = [0, 1, 2];

  const getRefList = dom => {
    ref.current.push(dom);
  };
  return (
    <div>
      {arr.map(item => (
        <span key={item} ref={getRefList}>
          {item}
        </span>
      ))}
    </div>
  );
}
```
#### （2）useRef和createRef的区别
useRef和createRef两者都可以去获取dom，但是createRef在组件每次渲染都会重新调用一次createRef，而useRef并不会

## 三、useRef解决闭包中最新的状态（state）
例子：
```js
import { useState } from "react";

export default function App() {
    const [count,setCount] = useState(0)
    
    const handlerClick = ()=>{
        setTimeout(()=>{
            console.log(count)
        },3000)
    }
    
    return (
        <div>
          <div>{count}</div>
          <button
            onClick={() => setCount(count + 1)}
          >
            click
          </button>
          <button
            onClick={handlerClick}
          >
            打印
          </button>
        </div>
    )
}
```
操作顺序：`点击一下click按钮`>`点击打印按钮`>`连续点击click按钮`>`查看控制台打印结果`   
这时候会发现打印结果是1，而不是连续点击后的结果，打印的不是实时的count。  
为什么呢？  `因为每次setCount都会导致重新渲染，这就让每次count都是一个独立的状态，也就是说每次渲染的引用地址都不一样。`如：
```js
// 第一次渲染 
点击了click按钮，handlerClick 中的count为 0 

// 第二次渲染 handlerClick 中的count为 1 
点击了打印按钮，handlerClick 中的count为 1


// 第三次渲染 handlerClick 中的count为 2 
点击了click按钮，handlerClick 中的count为 2 
...
```
使用useRef可以解决该问题，因为重新渲染多少次useRef的引用地址都是同一个。

## 四、useRef存储上次的状态
由于每次重新渲染useState都是一个`新的引用`，所以可以让useRef存储上一次的useState的值。  
例子：
```js
import { useState,useRef } from "react";

export default function App() {
    const [count,setCount] = useState(0)
    const ref = useRef(0)
    
    useEffect(()=>{
        ref.current = count
    })
    console.log(ref.current)
    console.log(count)
    
    return (
        <div>
          <div>{count}</div>
          <button
            onClick={() => setCount(count + 1)}
          >
            click
          </button>
        </div>
    )
```
打印结果：点击click按钮打印出`0 1`  
这是因为console.log是在渲染中打印，`useEffect是渲染之后执行的`，所以这时候ref.current保存的是上次的count的值。

## 五、使用useState模拟useRef
![1.png](1.png)  
本质上是记忆hook，但也可作为data hook，可以简单的用useState模拟useRef：
例子：
```js
const useRef = (initialValue) => {
  const [ref] = useState({ current: initialValue});
  return ref
}
```

> 参考自：  
[useRef使用细节](https://segmentfault.com/a/1190000024536290)  
[你不知道的 useRef](https://zhuanlan.zhihu.com/p/105276393)