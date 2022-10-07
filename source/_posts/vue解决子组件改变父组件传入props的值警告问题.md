---
title: vue解决子组件改变父组件传入props的值警告问题
date: 2020-04-07 22:38:15
tags: Vue
categories: 前端
---


# 需求
子组件想要改变父组件传入的值（props） 

例子：  
点击按钮，改变数据
```
// 父组件代码
<hello-world :msg="str"></hello-world>
data(){
    return{
        str:"啦啦啦"
    }
},
    
//子组件代码
<template>
  <div class="hello">
    <button @click="change">改变</button>{{ msg }}
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    change(){
      this.msg="已改变"
    }
  }
}
</script>
```
<!-- more -->
运行结果  
<font color="#f40">值确实改变了，但是会有警告</font>
![](/vue解决子组件改变父组件传入props的值警告问题/0.png)

# 原因
vue父组件props传值子组件是<font color="#f40">单向数据</font>的，子组件改变props值的话，父组件监听不到的。

# 解决方案
用<font color="#f40">$emit</font>自定义事件来告诉父组件变化  
先用子组件定义事件，父组件去监听，子组件一触发父组件就能监听到。  
改后的代码
```
// 父组件 监听子组件自定义的change-props事件
 <hello-world :msg="str" @change-props="changeLate"></hello-world>
  data(){
        return{
            str:"啦啦啦"
        }
    },
    methods: {
      changeLate(data) {
        this.str = data;
      }
    },

// 子组件  改变props值时，自定义change-props事件，把要改变成的数据传入事件中
<button @click="change">改变</button>{{ msg }}
  <script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    methods:{
      change(){
        let late="已改变";
        this.$emit("change-props",late); //自定义事件
      }
    }
```
运行结果  
完美解决
![](/vue解决子组件改变父组件传入props的值警告问题/1.png)