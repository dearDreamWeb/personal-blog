---
title: React组件传参父子，爷孙，兄弟
date: 2020-09-07 17:48:32
tags: React
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 父子组件传参
父组件在子组件上写上类似html标签的属性和属性值，子组件用props接收
```js
// 父组件
class Parent extends React.Component {
  render() {
    return (<Child text="来自父组件的参数" />)
  }
}
// 子组件
class Child extends React.Component {
  render() {
    console.log(this.props.text);  // 来自父组件的参数
    return (<div>{this.props.text}</div>)
  }
}
```
打印结果是:   
<!-- more -->
`来自父组件的参数`

# 爷孙组件传参
父子传参的方法用两遍就行了
```js
// 父组件
class Parent extends React.Component {
  render() {
    return (<Child text="来自爷组件的参数" />)
  }
}
// 子组件
class Child extends React.Component {
  render() {
    return (<Sun childText={this.props.text}/>)
  }
}
// 孙组件
class Sun extends React.Component {
  render() {
    console.log(this.props.childText); // 来自爷组件的参数
    return (<div>{this.props.childText}</div>)
  }
}
```
打印结果是：    
`来自爷组件的参数`

#  兄弟组件传参
其中一个子组件把数据通过props传给父组件，父组件在给其他的子组件传参
```js
// 父组件
class Parent extends React.Component {
  constructor() {
    super();
    this.state={
      data:"我是ChildB组件"
    }
  }
  change(){
    this.setState({
      data:"我是ChildA组件传过来的数据"
    })
  }
  render() {
    return (<div>
      <ChildA dataChange={()=>this.change()}/>
      <ChildB data={this.state.data}/>
    </div>)
  }
}
// 子组件A
class ChildA extends React.Component {
  render() {
    return (<button onClick={()=>this.props.dataChange("ChildA")}>click</button>)
  }
}

// 子组件B
class ChildB extends React.Component {
  render() {
  return (<div>{this.props.data}</div>)
  }
}   
```
运行结果：  
点击之前：
![1.png](1.png)
点击之后：
![2.png](2.png)