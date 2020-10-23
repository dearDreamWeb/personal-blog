---
title: vue上typescript的用法
date: 2020-08-11 18:19:41
tags: [Vue,TypeScript]
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# Vue.extend 和 vue-class-component
使用 TypeScript 写 Vue 组件时，有两种推荐形式：
- `Vue.extend()`：使用基础 Vue 构造器，创建一个“子类”。此种写法与 Vue 单文件组件标准形式最为接近，唯一不同仅是组件选项需要被包裹在 Vue.extend() 中。
- `vue-class-component`：通常与 `vue-property-decorator` 一起使用，提供一系列装饰器，能让我们书写类风格的 Vue 组件，和react写法很像，推荐这种写法，如果你会vue和react的话，用这种写法不容易对react的项目手生，不会react的话，用这种写法，会对后来对react的学习有很大的帮助。
# vue项目中安装

```
npm i -S vue-class-component 
npm i -S vue-property-decorator
```
<!-- more -->
# 一个基本的 vue 组件模板
`@Component({})`是必须要有的，即使不用也要留着，要不然页面不加载该组件
```js
<template>
  <div class="content-wrapper" >

  </div>
</template>

<script lang = "ts" >
	import { Component, Vue } from "vue-property-decorator";
	
	@Component({})
	export default class Foo extends Vue {
	
	}
</script>

<style scoped >
</style>

```

# 声明响应式属性 data

```
export default class App extends Vue {
  private name: string = 'kaelyn';   // 声明响应式属性
}

```
这样的写法等同于之前的：

```js
export default {
  name: 'App',
  data() {
    return {
      name: 'kaelyn'
    }
  }
}

```
# 计算属性 computed

```
<template>
  <div id="app">
     <button @click="age = number + 1">+</button>
     <p>{{age}}</p>
     <button @click="age = number - 1">-</button>
  </div>
</template>

<script>
	import { Component, Vue } from 'vue-property-decorator';
	@Component({})
	export default class App extends Vue {
	  private number: number = 0;
	
	  get age(): string {   // 计算属性的get
	    return `I am ${this.number} years old`;
	  }
	  set age(value) {      // 计算属性的set
	    this.number = Number(value);
  	  }
	}
</script>

```
当点击 button 的时候会执行`set age(value)`去改变 number 的值，同时计算出新的 age 值，这样的写法等于之前的：


```js
computed: {
  age: {
    get: function () {
      return `I am ${this.number} years old`;
    },
    set: function (value) {
      this.number = Number(value);
    }
  }
}

```
分享个小技巧，如果想要传参给 computed，可以令计算属性返回一个函数：

```js
get foo() {
  // ...
  return (params: any) => {
  	let returnValue;
    // ...
    return returnValue; 
  }
}

```
# 侦听属性 watch

```js
import { Component, Vue, Watch } from 'vue-property-decorator';
@Component({})
export default class App extends Vue {
  private number: number = 0;
  @Watch('number')
  changeAge(newValue: number, oldValue: number)  {
    console.log(`newValue: ${newValue}, oldValue: ${oldValue}`);
  }
}

```
这样的写法等同于之前的：

```js
watch: {
  changeAge: function (newValue, oldValue) {
    console.log(`newValue: ${newValue}, oldValue: ${oldValue}`);          	
  }
}

```

# 生命周期
声明周期还是原来的写法：

```js
// 生命周期
beforeCreate() {
  console.log('before create');
}
created() {
  console.log('created');：
}
beforeMount() {
  console.log('before mount');
}
mounted() {
  console.log('mounted');
}

```

# 组件注册与传递 Prop
父组件：

```js
<!-- App.vue -->
<template>
  <div id="app">
    <Son msg="msg from parent"/>
  </div>
</template>
<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import Son from './components/Son.vue';
	@Component({
 	  components: { Son }
    })
    export default class App extends Vue { }
</script>
```
子组件：

```
<!-- Son.vue -->
<template>
  <div class="son">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';

	@Component
	export default class Son extends Vue {
  		@Prop() private msg!: string;
	}
</script>
```

# 父子组件通信 Emit
父组件：

```js
<!-- App.vue -->
<template>
  <div id="app">
    <Son v-on:methodFromParent="methodFromParent"/>
  </div>
</template>
<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import Son from './components/Son.vue';
	@Component({
 	  components: { Son }
    })
    export default class App extends Vue { 
      methodFromParent(val: string) {
        console.log('data from sub:', val);
      }
    }
</script>

```
子组件：

```js
// Son.vue
mounted() {
  this.$emit('methodFromParent', 'hello my parent');
}

```
这样子组件挂载好之后父组件就回被触发事件打印出`data from sub: hello my parent`。
也可以使用 **Vue Property Decorator**官方提供的 **Emit** 的装饰器来实现通信和传参：

```js
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  count = 0

  @Emit()
  addToCount(n: number) {
    this.count += n
  }

  @Emit('reset')
  resetCount() {
    this.count = 0
  }

  @Emit()
  returnValue() {
    return 10
  }

  @Emit()
  promise() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(20)
      }, 0)
    })
  }
}

```
这种写法相对于之前的：

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    addToCount(n) {
      this.count += n
      this.$emit('add-to-count', n)
    },
    resetCount() {
      this.count = 0
      this.$emit('reset')
    },
    returnValue() {
      this.$emit('return-value', 10)
    },
    promise() {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(20)
        }, 0)
      })

      promise.then(value => {
        this.$emit('promise', value)
      })
    }
  }
}

```
# 过滤器filters
要在@Component({})中写
```js
@Component({
  filters: {
    // 过滤每个分类的数量
    categoryCount(index: number): number {
      return 123;
    },
  },
})
```
# 依赖注入 provide 和 inject
该例子是子孙组件调用祖先组件依赖注入来达到刷新页面的效果。  

父组件
```js
<template>
  <div id="app">
    <router-view v-if="isShow" />
  </div>
</template>

import { Component, Vue, Provide } from "vue-property-decorator";
@Component({})
export default class App extends Vue {
  @Provide() public componentReload = this.reload;
  private isShow: boolean = true;

  reload() {
    this.isShow = false;
    this.$nextTick(() => {
      this.isShow = true;
    });
  }
}
```
子组件

```js
import { Component, Vue, Inject } from "vue-property-decorator";
export default class Home extends Vue {
     @Inject() private componentReload!: any; // 祖先组件传递下来用来刷新组件用的
     mounted() {
         this.componentReload(); //调用
     }
}
```

# 混入对象 Mixins
在一个 ts 文件中定义 Mixins：

```js
// mixins.ts
import { Vue, Component } from 'vue-property-decorator';

declare module 'vue/types/vue' {
  interface Vue {
    methodFromMixins(value: number | string): void;  // 记得声明一下，要不然会报错 Property 'methodFromMixins' does not exist on type 'App'.
  }
}

@Component
export default class Mixins extends Vue {
  public methodFromMixins(value: number | string): void {
    console.log('method from mixins', value);
  }
}

```
在想使用 Mixins 的组件中：

```js
// App.vue
import { Component, Vue } from 'vue-property-decorator';
import mixins from "./common/mixins";
@Component({
  mixins: [mixins]
})
export default class App extends Vue { 
  created() {
    this.methodFromMixins('hello');	// method from mixins hello
  }
}

```
> 引用自两篇博客  
<a href="https://www.jianshu.com/p/7ed6d954164f?utm_source=oschina-app">在 Vue 中使用 TypeScript 的一些思考（实践）</a>  
[使用 TypeScript 来写 Vue](https://blog.csdn.net/kaelyn_X/article/details/85019575)
