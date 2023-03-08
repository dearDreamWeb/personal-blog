---
title: axios主动取消或中止请求
categories: 前端
date: 2023-02-24 13:52:49
tags: [Axios,JavaScript]
---

# 场景
有这样一个场景：后台查询统计数据的时候，如果查询全部日期的话会很慢，比如30秒的时候，这时候不想查询全部了，想查询今天的统计数据，就是会很快的0.5秒查询完了。由于查询今天的数据请求完成了，页面显示的数据是今天的，但是等到全部日期的数据请求完成之后页面的所有数据就会又变了全部日期的数据。
<!--more-->
大概意思如下图所示：

![图片1](https://resource.blogwxb.cn/blogResources/011120590b37d77c38ffb94cd961a3f5-1.gif)

# 解决

`axios` 从`0.22.0`版本开始就不推荐 `cancel token` 的方式，推荐的是 `AbortController`，接下来要用`AbortController`的方式去主动取消请求。

AbortController介绍：
- AbortController 接口表示一个控制器对象，允许你根据需要`中止一个或多个 Web 请求`。
- 你可以使用 `AbortController.AbortController()` 构造函数创建一个新的`AbortController`。
- 使用`AbortSignal` 对象可以完成与` DOM 请求`的通信。

简单封装axios请求一下：
```js
const request = (type) => {
  // 生成AbortController实例
  const abortController = new AbortController();
  setTimeout(()=>{
      // 中止请求
      abortController.abort();  
  },100)
  return new Promise((resolve, reject) => {
    axios({
      url: 'http://localhost:8888/test',
      method: 'get',
      params: {
        type,
      },
      // 建立请求的通信
      signal: abortController.signal,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
          // 判断是不是主动取消请求的错误
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          // 处理错误
        }
      });
  });
};
```
这样发送请求就会中止，但是当前场景是下次请求取消上次的请求，目前这样封装只会自动取消，不能人为控制，所以要将 AbortController 实例抛出去，让外部进行控制。总体代码如下：

axios封装部分
```js
const request = (type, callback) => {
  const abortController = new AbortController();
  callback && callback(abortController);
  return new Promise((resolve, reject) => {
    axios({
      url: 'http://localhost:8888/test',
      method: 'get',
      params: {
        type,
      },
      signal: abortController.signal,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          // 处理错误
        }
      });
  });
};
```

页面结构部分
```js
const Index = () => {
  const [value, setValue] = useState('all');
  const [response, setResponse] = useState('');
  const [abortInstance, setAbortInstance] = useState();

  const changeRadio = (e) => {
    setValue(e.target.value);
  };

  const submit = async () => {
    // 每次请求前把上次的请求取消掉
    abortInstance && abortInstance.abort();
    const res = await request(value, (abortController) => {
      // 每次请求的时候，将 AbortController实例存起来
      setAbortInstance(abortController);
    });
    setResponse(res.data.msg);
  };

  return (
    <div className="main">
      <input
        type="radio"
        name="sex"
        value="all"
        checked={value === 'all'}
        onChange={changeRadio}
      />
      <label>全部数据</label>
      <input
        type="radio"
        name="sex"
        value="little"
        checked={value === 'little'}
        onChange={changeRadio}
      />
      <label>少量数据</label>
      <div>
        <button onClick={submit}>请求</button>
      </div>
      <div>{response}</div>
    </div>
  );
};
```

最终的效果：

![图片2](https://resource.blogwxb.cn/blogResources/011120590b37d77c38ffb94cd961a3f5-2.gif)