---
title: vue中的filters过滤器
date: 2020-04-17 09:29:00
tags: Vue
categories: 前端
---


<font color="#f40"></font>
<font color="#f40">Vue2.0以后内置过滤器都去掉了，要用filters只能自定义写。</font>

# 一、自定义filters过滤器
过滤器函数始终以<font color="#f40">表达式的值</font>作为<font color="#f40">第一个参数</font>。带引号的参数视为字符串，而不带引号的参数按表达式计算 
<!-- more -->
# 二、局部定义的fliters
例子：
```
<div id="app">
    {{ message | toUpperCase}}
</div>
<script src="./vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data:{
            message:'hello world'
        },
        filters:{
            toUpperCase(val){
                return val.toString().toUpperCase();
            }
        }
    })
</script>
```
运行结果图:
![0](/vue中的filters过滤器/0.png)


# 三、可以设置多个过滤器
```
<div id="app">
    {{ message | toUpperCase | changeColor}}
</div>
<script src="./vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data:{
            message:'hello world'
        },
        filters:{
            toUpperCase(val){
                return val.toString().toUpperCase();
            },
            changeColor(val){
                return val.toString().replace('HELLO','hello')
            }
        }
    })
</script>
```
运行结果图:
![1](/vue中的filters过滤器/1.png)

# 四、全局定义的filter

## 1：在main.js里定义:
```
Vue.filter("定义的过滤器名字", function(val) {
  return val + "aa";
});
```

## 2:在需要处理数据的地方调用自定义过滤器
```
{{msg|自定义的过滤器名字}}
```
