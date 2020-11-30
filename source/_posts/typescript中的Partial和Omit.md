---
title: typescript中的Partial和Omit
date: 2020-11-30 08:46:57
tags:
---
<script type="text/javascript" src="/js/src/bai.js"></script>

# Partial<Type>
构造一个类型，将`Type的所有属性`设置为`可选`。该实用程序将返回一个表示给定类型的所有子集的类型。

例子:

```
interface Todo {
  title: string;
  description: string;
}

// 用partial将接口Todo所有属性变成可选
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

// 虽然第二个参数没有给声明title属性，但不报错
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```
<!-- more -->
# Omit<Type, Keys>
通过从`Type`中选取所有属性，然后删除属性`Keys`来构造一个类型。 

例子

```
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// 类型TodoPreview等于接口Todo移除descprition属性的接口
type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```


