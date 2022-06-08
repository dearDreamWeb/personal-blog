---
title: React使用ref操作dom
date: 2020-05-05 16:36:44
tags: React
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 第一种（不推荐）
用法：<font color="#f40">ref="名字"</font>
例子：
```js
 componentDidMount() {
    this.refs.dom.style.width = "100px";
    this.refs.dom.style.height = "100px";
    this.refs.dom.style.backgroundColor = "red";
  }
 
  render() {
    return (<div ref="dom"></div>)
  }
```
  运行效果图：
  <!-- more -->
  ![1.png](/React使用ref操作dom/1.png)
  会有一个警告（意思是不推荐这种方法）：
  > Warning: A string ref, "dom", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead.

# 第二种
用法：<font color="#f40">ref={(dom)=>this.mode = dom}</font>
例子：
```js
  componentDidMount() {
    this.mode.style.width = "100px";
    this.mode.style.height = "100px";
    this.mode.style.backgroundColor = "red";
  }
 
  render() {
    return (<div ref={(dom)=>this.mode = dom}></div>)
  }
```
运行效果：
![2.png](/React使用ref操作dom/2.png)

# 第三种
父组件操作子组件的dom元素
<font color="#f40">父组件给子组件传参this：scope={this}</font>
```js
function MyDiv(props) {
  return (<div ref={(dom)=>{props.scope.myDiv=dom}}></div>)
}
class Test extends React.Component {
  componentDidMount() {
    this.myDiv.style.width ="100px";
    this.myDiv.style.height ="100px";
    this.myDiv.style.backgroundColor ="red";
  }
  render() {
    return (<MyDiv scope={this} />)
  }
}
```
运行结果图：
和上面的例子的效果是一样的。
