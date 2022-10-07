---
title: vue引入阿里图标库的方法css-loader以及报错解决方案
date: 2020-03-14 12:05:11
tags: Vue
categories: 前端
---


# 下载到本地

想需要的图标加入购物车，然后添加至项目中，再选择下载至本地
![](/vue引入阿里图标库的方法css-loader以及报错解决方案/8.png)
<!-- more -->
会得到一个压缩文件夹，打开这个文件，复制里面所有 iconfont 命名的文件，在 vue 项目中新建一个文件夹存放这些文件，我这里是在<font color="#f40">assets 文件夹</font>下新建 iconfont 文件夹。
![](/vue引入阿里图标库的方法css-loader以及报错解决方案/9.png)

# 在 main.js 中引入

然后在 vue 项目的<font color="#f40">main.js</font>文件中进行引入：

```js
import "./assets/font/iconfont.css";
```


# 安装 css-loader 依赖包

此时，如果直接使用，会报错，所以还需要安装<font color="#f40">css-loader</font>依赖包：  
`npm install --save css-loader`  
安装完成以后，就可以直接在需要使用图标的页面直接使用了。

# 使用图标

一定要先引用<font color="#f40">iconfont 类名</font>，再使用具体的类名,否则会失效。

```html
<i class="iconfont icon-build"></i>
<i class="iconfont icon-cuo"></i>
<i class="iconfont icon-dui"></i>
<i class="iconfont icon-android"></i>
```

运行结果图：
![](/vue引入阿里图标库的方法css-loader以及报错解决方案/10.png)

可以用 css 样式自定义具体类名图标的大小，用<font color="#f40">font-size</font> 就行，一样要加<font color="#f40">!important</font>

```css
.iconfont.icon-build {
  font-size: 2.5rem !important;
}
```
运行效果：
![](/vue引入阿里图标库的方法css-loader以及报错解决方案/11.png)

# 报错解决方案
用vue-cli3导入外部的iconfont.css图标样式遇到的坑:These relative modules were not found:...  
报错截图
![](/vue引入阿里图标库的方法css-loader以及报错解决方案/12.png)

原因是引入的iconfont.css 文件中的url地址没有删除掉  
注意我这是举的是另一个例子，和上面不是一个例子，根据对应的url地址改的。
![](/vue引入阿里图标库的方法css-loader以及报错解决方案/13.png)

![](/vue引入阿里图标库的方法css-loader以及报错解决方案/14.png)
修改后：
![](/vue引入阿里图标库的方法css-loader以及报错解决方案/15.png)
