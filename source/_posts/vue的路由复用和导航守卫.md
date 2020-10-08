---
title: vue的路由复用和导航守卫
date: 2020-04-21 09:05:11
tags: Vue
categories: 前端
---
# 一、路由复用
路由复用要在相对应的路由中添加的是在<font color="#f40">components</font>里面，不是children。  
例如：
```js
{
    path: "/",
    name: "Home",
    components: { //这里是components不是component
      default: Home,
      "Delivery": Delivery,
      "History": History,
      "OrderingGuide": OrderingGuide
    }
}
```
<!-- more -->
App组件部分
```js
<el-row class="main">
<router-view></router-view>    //没有指定路由，当访问哪个路由显示哪个相对应的组件
</el-row>
<el-row>
<el-col :md="8">
  <router-view name="Delivery"></router-view>  // 这三个有指定路由，会显示指定的组件
</el-col>
<el-col :md="8">
  <router-view name="History"></router-view>
</el-col>
<el-col :md="8">
  <router-view name="OrderingGuide"></router-view>
</el-col>
</el-row>
```
运行结果图：
![0.png](0.png)

![1.png](1.png)

<font color="#f40">
    解释一下上面这个例子：
    Home组件对应的路径是"/"，也就是根路径。App组件是首页组件，因为只有Home组件有components的配置的复用组件，所以只有在根路径才会显示那三个复用的路由组件。也就是上面运行结果表现出来的。
</font>

# 二、导航守卫
记住参数或查询的改变并不会触发进入/离开的导航守卫。你可以通过观察 $route 对象来应对这些变化，或使用 beforeRouteUpdate 的组件内守卫。

## （1）全局前置守卫
你可以使用 router.beforeEach 注册一个全局前置守卫：  
<font color="#f40">在配置完router后面注册router.beforeEach。</font>
```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```
当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
每个守卫方法接收三个参数：
- to: Route: 即将要进入的目标 路由对象
- from: Route: 当前导航正要离开的路由
- next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  - next(): <font color="#f40">进行管道中的下一个钩子</font>。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
  - next(false): <font color="#f40">中断当前的导航</font>。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
  - next('/') 或者 next({ path: '/' }): <font color="#f40">跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航</font>。你可以向 next 传递任意位置对象，且<font color="#f40">允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项</font>。
  - next(error):  如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
确保要调用 next 方法，否则钩子就不会被 resolved。


## （2）全局后置钩子  

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子<font color="#f40">不会接受 next 函数也不会改变导航本身</font>：
```js
router.afterEach((to, from) => {   // 没有next参数
  // ...
})
```

## （3）路由独享的守卫
你可以在<font color="#f40">路由配置上直接定义</font> beforeEnter 守卫：
```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```
这些守卫与全局前置守卫的方法参数是一样的。

## （4）组件内的守卫
最后，你可以在路由组件内直接定义以下路由导航守卫：
- beforeRouteEnter
- beforeRouteUpdate (2.2 新增)
- beforeRouteLeave
```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。
不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```
注意
 <font color="#f40">beforeRouteEnter 是支持给 next 传递回调的唯一守卫</font>。对于 <font color="#f40">beforeRouteUpdate 和 beforeRouteLeave</font> 来说，<font color="#f40">this 已经可用了</font>，所以不支持传递回调，因为没有必要了。
```js
beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
}
```
这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 <font color="#f40">next(false)</font> 来取消。
```js
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

## （5）完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 <font color="#f40">beforeEach</font> 守卫。
4. 在重用的组件里调用 <font color="#f40">beforeRouteUpdate</font> 守卫 (2.2+)。
5. 在路由配置里调用 <font color="#f40">beforeEnter</font>。
6. 解析异步路由组件。
7. 在被激活的组件里调用 <font color="#f40">beforeRouteEnter</font>。
8. 调用全局的 <font color="#f40">beforeResolve</font> 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 <font color="#f40">afterEach</font> 钩子。     
11. 用创建好的实例调用 beforeRouteEnter 守卫中传给 <font color="#f40">next</font> 的回调函数。
