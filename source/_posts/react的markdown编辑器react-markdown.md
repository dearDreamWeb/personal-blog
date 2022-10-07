---
title: react的markdown编辑器react-markdown
date: 2020-10-30 10:08:34
tags: React
categories: 前端
---


# 一、用到的npm包
`react-markdown` ：用来解析markdown。 
`react-syntax-highlighter` ：用来让markdown中代码语法高亮。

# 二、安装
```
cnpm i react-markdown  react-syntax-highlighter --save 
```
<!-- more -->
# 三、例子
本次的例子的package.json中这两个npm包版本信息
```json
"react-markdown": "^5.0.2",
"react-syntax-highlighter": "^15.3.0"
```
开始例子  
`使用markdown中的代码功能时用~~~符号代替了``` `
```js
import React from 'react';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const App = () => {
  
  // 代码语法高亮
  const renderers = {
    code: ({ language, value }) => {
      return <SyntaxHighlighter style={vscDarkPlus} language={language} children={value} />
    }
  }
  
  // markdown的渲染的字符串
  const str = `
  # 说明
  - a
  - b
  
  ~~~js
  cosole.log(111)
  ~~~
  `;
  
  return (
    <div className="App" >
      <ReactMarkdown renderers={renderers} children={str} />
    </div >
  )

}

export default App;

```
运行结果
![1.png](/react的markdown编辑器react-markdown/1.png)

如果想要了解更多的配置，请看两个包的文档地址：
- [react-markdown文档](https://github.com/remarkjs/react-markdown)
- [react-syntax-highlighter文档](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
