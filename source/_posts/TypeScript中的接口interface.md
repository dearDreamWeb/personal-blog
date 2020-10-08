---
title: TypeScript中的接口interface
date: 2020-09-12 10:44:52
tags: TypeScript
categories: 前端
---
# 接口
接口是由`interface`去定义的，知识点分为
- 属性接口
- 函数类型接口
- 可索引接口
- 类类型接口
- 接口扩展

# 属性接口
每个属性用分号结尾，而不是逗号

```js
interface UserInfo {
  name: string;
  age: number;
}

function person(obj: UserInfo) {
  console.log(obj.name, obj.age);  // www 18
}
person({ name: "www", age: 18 });
```
<!--more-->

# 函数类型接口
对函数的参数和返回值进行约束

```js
/**
 * 代表函数接口为UserInfo时，
 * 参数name为string，age为number，
 * 回值类型为string;
 */
interface UserInfo {
  (name: string, age: number): string;
}

const person: UserInfo = function (name: string, age: number): string {
  return name + age;
};
person("www", 18);

```
# 可索引接口
对数组和对象进行约束（不常用）

数组例子：
```js
/**
 * 数组为接口UserArr的类型，
 * 数组中的每项值为string，
 * 索引值为number类型，如：arr[0],arr[1]
 */
interface UserArr {
  [index: number]: string;
}

let arr: UserArr = ["name", "age"];
// 正确例子
arr[2] = "sex"

// 错误例子
arr["like"] = "yes"
```
对象例子：  
当index的类型为string时，代表是对象
```js
/**
 * 当index的类型为string时，代表是对象
 * 对象的属性值为string
 */
interface UserObj {
  [index: string]: string;
}

let obj: UserObj = {name:"www",age:"18"};

```

# 类类型接口
对类进行约束，用`implements`来获取接口

```js
/**
 * 当class的接口为Person时，
 * name的属性值为string，
 * age方法的可以不传入参数，有参数的话参数num为number，返回值为number
 */
interface Person {
  name: string;
  age(num: number): number;
}

class Man implements Person {
  name: string;
  
  constructor(arg_name: string) {
    this.name = arg_name;
  }
  age(num: number) {
    return num;
  }
}

let man = new Man("www");
console.log(man.age(18))  // 18
```


# 接口扩展
接口是可以用`extends`继承的

```js
// Things接口
interface Things {
  run(): void;
}

// 继承接口Things，要求class要有run和eat方法
interface Doing extends Things {
  eat(): void;
}

// class Person获取接口Doing
class Person implements Doing {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  run() {
    console.log(this.name + " is running");
  }

  eat() {
    console.log(this.name + " is eating");
  }
}

let person = new Person("www");
console.log(person.run()); // www is running
console.log(person.eat()); // www is eating
```

