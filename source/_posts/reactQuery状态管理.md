---
title: reactQuery状态管理
date: 2021-07-08 20:09:16
tags: react
categories: 前端
---


# react-query简介
react-query是用于状态管理，是为了处理请求的状态。目前在github上已有21.1k个star了。[react-query的github地址](https://github.com/tannerlinsley/react-query)

# react-query的使用
第一步需要用`QueryClientProvider`组件来包裹项目的根组件。例子如下：
<!--more-->
```
import Layout from './layout'
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient()

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
        <Layout />
    </QueryClientProvider>
  );
}
```
react-query的请求处理是通过`useQuery`、`useMutation` 等 Hooks API来实现的。下面将介绍一下useQuery和useMutation。  
- useQuery的使用
    - 两个参数：一个是请求的`Query key`，一个是发送请求进行处理并返回数据的异步方法。  

例子如下：
```
import { useQuery } from "react-query";
const { data, isSuccess } = useQuery("getData", async () => {
    const res = await axios.get("/api");
    return res;
});
console.log(data, isSuccess);
```
打印结果： `[1,2,3,4,5] true`

- useMutation的使用
    - 如果说useQuery是对数据的查，那么useMutation是增/删/改，两个参数：一个是发送请求的函数，一个是对请求的数据状态不同的处理。
    - 例子如下：  

例子：
```js
import { useMutation } from "react-query";
const mutation = useMutation(
    // data为参数
    async (data: string) => {
      const res = await axios.get("/api/updateUsername", {
        params: { username: data },
      });
      return res;
    },
    {
      // 成功回调
      onSuccess(res) {
        console.log(res);
      },
      // 失败回调
      onError(err) {
        console.log(err);
      },
    }
);
return (
    <button
      onClick={() => {
       // 使用mutate传参并发送请求
        mutation.mutate('www');
      }}
    >
      change username
    </button>
)
```

# 获取缓存的数据
在使用useQuery时，第一个参数要填入唯一的key值，useQuery是有缓存的能力，默认是5分钟，所以可以通过queryClient来获取到useQuery请求的缓存数据。例子如下：

```js
import { useQuery,useQueryClient } from "react-query";
// getData为useQuery的query key值
const { data, isSuccess } = useQuery("getData", async () => {
    const res = await axios.get("/api");
    return res;
});

const queryClient = useQueryClient();
// 获取query key为query的缓存数据
console.log(queryClient.getQueryData('getData'))
```

> 参考自： [React Query官网](https://react-query.tanstack.com/overview)