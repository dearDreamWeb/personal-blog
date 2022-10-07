---
title: React中fontawesome图标库的使用步骤
date: 2020-10-21 22:23:52
tags: React
categories: 前端
---


使用的是最新版`svg`的，之前版本使用的的`font icon`
# 一、安装依赖

```
npm i --save @fortawesome/fontawesome-svg-core

npm i --save @fortawesome/react-fontawesome

npm i --save  @fortawesome/free-solid-svg-icons
```
<!-- more -->
# 二、组件中引入
和官网的图标名有点不一样，比如官网的图标名是`coffee`，这里因为就应该是`faCoffee`
```
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {faCoffee} from '@fortawesome/free-solid-svg-icons'
```
# 三、组件中使用

```
<FontAwesomeIcon icon ={faCoffee} />
```

# 四、图标以字符串形式引入的方式
1. 添加指定的图标  
例子:  
引入的`faCoffee`，使用的时候变成`coffee`，就是去掉fa，然后小写
```js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
library.add(faCoffee);

<FontAwesomeIcon icon ="coffee" />
```
2. 添加所有的图标  
例子：   
用的是fas参数

```js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);

<FontAwesomeIcon icon ="coffee" />
```
