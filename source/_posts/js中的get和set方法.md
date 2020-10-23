---
title: js中的get和set方法
date: 2020-09-09 19:16:55
tags: JavaScript
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# get和set的介绍
get 和 set方法可以使用在`对象`或者`构造函数`中，但不能出现在普通的function里。   
vue中的计算属性`computed`默认使用的就是vue已经`封装好的get方法`。  

# get和set的使用方法

1. get和set是方法，因为是方法，所以可以进行判断  

2. get一般是要`返回`的；而set是`设置`，不用返回
 
3. get 和 set的方法名可以重名

4. set方法必须要有`形参`，`否则报错`

5. 如果调用对象内部的属性约定的命名方式是变量名前加_

对象的例子
<!-- more -->
```js
let obj={
    a:18,
    b:2,
    get sum(){
        return this.a + this .b;
    },
    set changeBValue(val) {
         this.b = val;
    }
}
obj.a  // 18
obj.b  // 2
obj.sum // 20
obj.changeBValue = 10
obj.b  // 10
obj.sum // 28
```

构造函数的例子
```js
class P {
    constructor(){
        this.a = 1;
        this.b = 2;
    }
    get sum(){
        return this.a + this.b;
    }

    set sum(val) {
        this.a = val;    
    }
}
let p = new P();
console.log(p)  //{a: 1, b: 2}
p.sum   // 3
p.sum =  3;  
p.sum   // 5
console.log(p)  // {a: 3, b: 2}
```

即get是对象的属性值返回的方法，set是属性值修改的方法
