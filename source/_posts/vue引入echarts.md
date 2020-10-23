---
title: vue引入echarts
date: 2020-08-31 22:38:55
tags: Vue
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 下载echarts

```js
npm install echarts --save
```
# 全局引入Echarts
在/src/main.js中加入：

```js
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
```
# 创建一个图表
<!-- more -->
```js
<template>
  <div id="histogramChart">
  </div>
</template>

<script>
  export default {
    name:'Histogram',
    data(){
      return {}
    },
    mounted() {
      //在mounted生命周期函数中实例化echarts对象
      this.drawHistogarm();
    },
    methods:{
      drawHistogarm(){
        //初始化echarts实例
        let histogram = this.$echarts.init(document.getElementById('histogramChart'))
        let option = {
          title: {
            text: '柱状图示例',
            left: 'center'
          },
          tooltip: {
            trigger:'axis'
          },
          xAxis: {
            type: 'category',
            data: ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"]
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '数量',
            type: 'bar',
            barWidth: '50%',//设置柱子的宽度
            data: [204,106,190,230,100,170,201]
          }]
        };
        histogram.setOption(option);
      }
    }
  }
</script>

<style scoped>
  #histogramChart {
    width: 500px;
    height: 500px;
  }
</style>

```

原文链接：https://blog.csdn.net/HH18700418030/java/article/details/96131262



# 按需加载
## 第一种方法
不用再main.js中全局加载，可以在用的的组件中引入
import echarts from 'echarts'

直接就用就好了
上述例子中this.$echarts 改为echarts就好了

## 第二种方法（推荐）
在Echarts.vue文件中

```js
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入饼状图组件
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
//引入模型Series
require("echarts/lib/model/Series");
```
使用 require 而不是 import

