---
layout: react
title: React hooks中useContext更新数据的方法
date: 2020-12-15 08:58:49
tags: React
categories: 前端
---

# 关于context的知识点
context 是react 提供的`实现数据共享的api`，`解决props层层传递的问题`
1. `React.createContext()`创建Context对象
2. 使用`Context Provider`包裹组件 `给他的后代组件提供数据`
3. Context Provider所有的后代组件，都可以`通过Context.Consumer获取到Context数据`

<!-- more -->
useContext(context)

1. `useContext(context)`是针对context（上下文）提出的api
2. 它接受`React.createContext()的返回结果作为参数`也就是context对象 并返回最近的context
3. 使用useContext 将不再需要Provider和Consumer
4. 当最近的`context更新`时，那么使用该conntext的hook将会`重新渲染`

# 本次用的Hook
- useState
- useContext

# 例子
- 父组件App

```js

import React, { useState, createContext } from 'react';
import ChildA from './components/childA';
import ChildB from './components/childB';

// 默认数据
export const InitContext = createContext({
  a: 1
});

function App() {

  const [count, setCount] = useState(1);

  return (

    <InitContext.Provider
    // value就是通过context 共享的数据 这里是store
      value={{  
        count,
        setCount
      }}
    >
      <div className="App" >
        <ChildA />
        <ChildB />
      </div>
    </InitContext.Provider>

  );
}

export default App;

```
- 子组件ChildA

```js
import React, { useEffect, useContext } from 'react';
import { InitContext } from '../../App';

const ChildA = () => {
    const contextData = useContext(InitContext);  // 接收一个 context 对象并返回该 context 的当前值。

    return (
        <div>
            {contextData.count}
        </div>
    );
}

export default ChildA;

```
- 子组件ChildB

```js
import React, { useState, useContext } from 'react';
import { InitContext } from '../../App';

const ChildB = () => {
    const contextData = useContext(InitContext);

    // 增加
    const add = () => {
        // 调用contextData中的setCount方法来改变contextData中的count值
        contextData.setCount(contextData.count + 1);
    }
    return (
        <button onClick={() => add()}>增加</button>
    );
}

export default ChildB;


```

