---
title: 自制简易的localStorage和sessionStorage的封装库
date: 2020-09-18 20:30:15
tags: JavaScript
categories: 前端
---


# 说明
该封装库只是对localStorage和sessionStorage进行的简易封装。   
优点：
- 对localStorage和sessionStorage的操作更能加便捷。

缺点：
- 因为使用的JSON.parse和JSON.stringify，所以存取数据如果为对象并且对象中的值为undefined、function等会照成数据丢失。

# 封装的代码
<!-- more -->
```js
function Store(webStorage) {
    if (webStorage !== "localStorage" && webStorage !== "sessionStorage") {
        throw new Error(` invalid parameter, parameter should be localStorage or sessionStorage`);
    }
    this.storage = webStorage === "localStorage" ? window.localStorage : window.sessionStorage;

    /**
     * 获取数据
     * @param {String} key  要获取的key值的数据
     */
    this.getItem = function (key) {
        return JSON.parse(this.storage.getItem(key));
    }

    /**
     * 新建数据
     * @param {String} key  要新建的数据的key值
     * @param {String,Object,Array} val  要新建的数据的value值
     */
    this.setItem = function (key, val) {
        return this.storage.setItem(key, JSON.stringify(val));
    }

    /**
     * 删除某一项数据
     * @param {String} key 要删除key值的数据
     */
    this.removeItem = function (key) {
        if (!this.storage.hasOwnProperty(key)) {
            return {
                state: 1,
                message: `删除失败，没有key值为${key}字段`
            };
        }
        
        this.storage.removeItem(key);
        return {
            state: 0,
            message: "删除成功"
        }
    }

    // 清除所有数据
    this.clear = function () {
        this.storage.clear();
    }
}
export default Store;
```
# 使用方法

```js
//引入webStorage文件
import Store from "../utils/webStorage.js"; 

// 实例化Store
const store = new Store("localStorage");

// 新建一个key值为www，value值为123的localStorage数据
store.setItem("www",123);  

// 获取key值为www的数据
store.getItem("www");

// 删除key值为www的数据
store.removeItem("www");

// 清除所有数据
store.clear();
```

