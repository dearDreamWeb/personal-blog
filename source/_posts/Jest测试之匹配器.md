---
title: Jest测试之匹配器
date: 2020-11-08 08:41:01
tags: Jest
categories: 前端
---


# 运行Jest
1. 安装jest
- yarn安装
```
yarn add --dev jest
```
- npm 安装
```
npm install --save-dev jest
```

2. 添加运行脚本
<!-- more -->
在package.json中添加运行脚本
```js
  "scripts": {
    "test":"jest --watchAll"
  }
```
创建测试文件名字的格式 `*.test.js`,比如：`index.test.js`

# toBe
toBe选择器是严格匹配的，对象的引用地址不同是会报错的。
- 简单的例子
```js
test('toBe 简单的例子', () => {
    expect(1+1).toBe(2);
});
```
- 使用对象时
错误例子
```js
test('toBe 对象的错误例子', () => {
    let obj = { a: 1 }
    expect(obj).toBe({ a: 1 });  // 报错，因为引用地址不一样
});
```
正确的例子
```js
test('toBe 对象的正确例子', () => {
    let obj = { a: 1 };
    let newObj = obj;
    expect(obj).toBe(newObj);
});
```

# toEqual
和toBe类似，但不同的是对于对象的判断处理。toEqual不会要求对象的引用地址不一样。
```js
test('toEqual', () => {
    let obj = { a: 1 };
    expect(1 + 1).toEqual(2);
    expect(obj).toEqual({ a: 1 });
});
```

# toBeNull
测试是否为null
```js
test('toBeNull', () => {
    expect(null).toBeNull();      // 通过
    expect(undefined).toBeNull();  // 失败
});
```

# toBeUndefined
测试是否为undefined
```js
test('toBeUndefined', () => {
    expect(undefined).toBeUndefined();  // 通过
    expect(null).toBeUndefined();      // 失败
});
```

# toBeTruthy
测试是否为true
```js
test('toBeTruthy', () => {
    expect(1).toBeTruthy();     // 通过
    expect(null).toBeTruthy();  // 失败
    expect(0).toBeTruthy();     // 失败
});
```

# toBeFalsy
测试是否为false
```js
test('toBeFalsy', () => {
    expect(false).toBeFalsy();     // 通过
    expect(null).toBeFalsy();      // 通过
    expect(true).toBeFalsy();      // 失败
});
```

# toHaveBeenCalled
函数是否被调用
```js
function drinkAll(callback, drink) {
    callback(drink)
}
test('toHaveBeenCalled', () => {
    let mockFn = jest.fn();  //jest的模拟出的一个函数
    drinkAll(mockFn,"water");
    expect(mockFn).toHaveBeenCalled();  // 通过
});
```

# toHaveBeenCalled
函数是否被调用的次数
```js
function drinkAll(callback, drink) {
    callback(drink)
}
test('toHaveBeenCalledTimes', () => {
    let mockFn = jest.fn();
    drinkAll(mockFn,"water");
    drinkAll(mockFn,"water");
    expect(mockFn).toHaveBeenCalledTimes(2);  // 通过
});
```

# toHaveBeenCalledWith
函数被调用时的所有参数
```js
function drinkAll(callback, drink) {
    callback(drink,"milk")
}
test('toHaveBeenCalled', () => {
    let mockFn = jest.fn();
    drinkAll(mockFn,"water");
    expect(mockFn).toHaveBeenCalledWith("water","milk");  // 通过  
});
```
# 数字相关的匹配器
- toBeGreaterThan(number | bigint)
等价符号 `>`
```js
test('toBeGreaterThan', () => {
    expect(1).toBeGreaterThan(0);  // 通过  
});
```

- toBeGreaterThanOrEqual(number | bigint)
等价符号 `>=`
```js
test('toBeGreaterThanOrEqual', () => {
    expect(1).toBeGreaterThanOrEqual(1);  // 通过  
    expect(1).toBeGreaterThanOrEqual(0);  // 通过  
});
```

- toBeLessThan(number | bigint)
等价符号 `<`
```js
test('toBeLessThan', () => {
    expect(1).toBeLessThan(2);  // 通过  
});
```

- toBeLessThanOrEqual(number | bigint)
等价符号 `<=`
```js
test('toBeLessThanOrEqual', () => {
    expect(1).toBeLessThanOrEqual(2);  // 通过  
    expect(1).toBeLessThanOrEqual(1);  // 通过  
});
```

# toContain(item)
测试是否存在数组中，相当于 `===`
```js
test('toContain', () => {
    expect([1,2]).toContain(2);  // 通过  
});
```

# toContainEqual(item)
当要测试数组中的对象是否存在时，需要用到toContainEqual
```js
test('toContainEqual', () => {
    expect([1, 2, { a: 1, b: 2 }]).toContainEqual(2);  // 通过  
    expect([1, 2, { a: 1, b: 2 }]).toContainEqual({ a: 1, b: 2 });  // 通过  
});
```

> 参考[Jest官方文档](https://jestjs.io/docs/en/expect)