---
title: React中获取不到useState的最新值？
categories: 前端
date: 2022-04-19 21:19:07
tags: [React]
---
<script type="text/javascript" src="/js/bai.js"></script>

# 场景
需求：点击支付的时候，会出现支付的二维码，这时候我不知道用户什么时候支付完成了，这时候就需要轮询请求接口，根据接口的返回值判断是否支付成功了，如果用户取消支付，那就不在轮询请求接口了。  
问题： 当我用useState的值来控制是否开始还是停止轮询接口的时候，我发现根本就无法去获取到最新的state。
<!-- more -->
```js
function App() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if(visible){
      payHandle()
    }
  }, [visible])

  // 支付请求
  const payHandle = async () => {
    console.log(visible);
    if (!visible) {
      return;
    }
    const res = await axios('http://pic.616pic.com/ys_bnew_img/00/01/69/BnYq61qLwM.jpg')
    console.log('请求中...')
    // res.isSuccess 为false代表未支付成功，继续请求
    if (!res.isSuccess) {
      // 暂停3秒，继续轮询请求
      await new Promise((resolve) => setTimeout(resolve, 3000));
      payHandle()
      return;
    }
    location.href = '/'
  }

  return (
    <div>
      {visible && <div>支付中。。。</div>}
      <button onClick={() => setVisible(true)}>支付</button>
      <button onClick={() => setVisible(false)}>取消支付</button>
    </div>
  )
}
```
打印的结果如下：
![0.png](0.png)
一开始点击支付，然后会一直请求这是没有错的，但是点击取消支付就会发现请求还是在一直继续，payHandle函数一直在轮询。

# 原因
react 官方文档有提到，大概的意思是`组件内部的函数只会拿到定义它的那次渲染的props和state`。因为这个是当支付的时候，`payHandle函数就会一直调用执行`，即使取消支付，但它也并没有重新定义改函数，运行的还是之前的payHandle函数，所以是无法拿到useState的最新值。

# 解决方案
采用useRef来解决问题。
```js
function App() {
  const [visible, setVisible] = useState(false)
  const isQuerying = useRef(false)

  useEffect(() => {
    isQuerying.current = visible;
    if(visible){
      payHandle()
    }
  }, [visible])

  // 支付请求
  const payHandle = async () => {
    console.log(isQuerying.current);
    if (!isQuerying.current) {
      return;
    }
    const res: any = await axios('http://pic.616pic.com/ys_bnew_img/00/01/69/BnYq61qLwM.jpg')
    console.log('请求中...')
    // res.isSuccess 为false代表未支付成功，继续请求
    if (!res.isSuccess) {
      // 暂停3秒，继续轮询请求
      await new Promise((resolve) => setTimeout(resolve, 3000));
      payHandle()
      return;
    }
    location.href = '/'
  }

  return (
    <div>
      {visible && <div>支付中。。。</div>}
      <button onClick={() => setVisible(true)}>支付</button>
      <button onClick={() => setVisible(false)}>取消支付</button>
    </div>
  )
}
```
运行结果如下：
![1.png](1.png)
可以看到点击支付，之后再点击取消支付就可以停止发送请求了。
