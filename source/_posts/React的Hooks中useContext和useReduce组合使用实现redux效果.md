---
title: React的Hooks中useContext和useReduce组合使用实现redux效果
date: 2020-07-04 10:00:57
tags: React
categories: 前端
---
# 先声明一个useReducer文件

```js
import { createContext } from "react";
export const initData = { count: 0 };//初始数据

// 派发事件
export const reducer = (state , action) => {
    switch (action.type) {
        case "add":
            return { ...state, count: state.count + 1 }
        case "sub":
            return { ...state, count: state.count - 1 };
        case "change":
            return { ...state, count: action.changeCount };
        default:
            return state
    }
}

export const ContextData = createContext({});
```
<!-- more -->
# 在App.js中引入

```js
import { reducer, ContextData, initData } from "./useReducer" //引入useReducer文件
import  Children from "./Children" //引入Children组件

function App() {

<!-- 获取是state和dispatch -->
  const [state, dispatch] = useReducer(reducer, initData);
  return (
  <!--ContextData.Provider包裹子元素，让子元素获取到useContext中的值-->
    <ContextData.Provider value={{
      state,
      dispatch // 把 dispatch 也作为 context 的一部分共享下去，从而在嵌套组件中调用以实现更新顶层的 state
    }}>
      <div className="app">
            <Children />
      </div>
    </ContextData.Provider>

  );

}
export default App;
```
# 子组件Children中调用

```
import React, {useEffect, useContext } from "react";
import { ContextData } from "../../useReducer";
const Children = ()=>{
    <!-- 获取到useContext中存的值 -->
    const { state, dispatch } = useContext(ContextData);
    useEffect(()=>{
        dispatch({type:"add"}) //派发事件
        console.log(state)      //获取祖先组件的useReducer的值
        dispatch({type:"change",changeCount:110}) //派发事件，通过第二个参数去修改值
    },[])
  return(
    <div>
        children子组件
    </div>
  )
}
export default Children;
```
