---
title: css3中flex如何实现子元素等分
date: 2020-07-18 10:31:19
tags: css3
categories: 前端
---
# 一、属性
<font color="#f40">justify-content: space-between;</font>
这个属性能够让子元素之间的间隔实现平均分配剩余空间,并没有让元素等分。

## 二、代码
```css
// html部分
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>

// css 部分
    ul {
        display: flex;
        justify-content: space-between;
    }

    ul li {
        list-style: none;
        border: 1px solid #000;
    }
    ul :nth-child(1) {
        background-color: rgb(35, 238, 238);
    }
    ul :nth-child(2) {
        background-color: rgb(80, 252, 123);
    }
    ul :nth-child(3) {
        background-color: rgb(242, 245, 72);
    }
```
实现的效果
<!-- more -->
![1.png](1.png)


# 三、实现子元素等分
## 步骤
<font color="#f40">将子元素的width设为100%</font>

# 代码
和上面的例子代码是基本一样的，唯一不一样的就是li的width为100%
```css
ul li {
    width: 100%;
    list-style: none;
    border: 1px solid #000;
}
```
实现效果：
![2.png](2.png)