---
title: React修改eslint配置
date: 2020-05-28 08:50:53
tags: React
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 一、在package.json中添加rules
在package.json中找到eslintConfig这一项，在里面添加rules进行修改即可  
例子：
```js
  "eslintConfig": {
    "extends": "react-app",
    "rules": {
      "jsx-a11y/anchor-is-valid": "off"
    }
  }
```
<!-- more -->
# 二、打开webpack进行配置修改
运行
```
npm run eject
```
这时候就会多出个config文件夹，里面有个<font color="#f40">webpack.config.js</font>是用来配置webpack的。

如果仅仅是在package.json修改后的话，重新打开服务器你会发现，修改的eslint配置并<font color="#f40">没有更新</font>，这是因为webpack.config.js 里面有个<font color="#f40">eslint-loader</font>的配置，其中有个<font color="#f40">cache</font>配置默认设置的是<font color="#f40">true</font>，要把它修改为false，再<font color="#f40">重启一下服务器</font>就好了。