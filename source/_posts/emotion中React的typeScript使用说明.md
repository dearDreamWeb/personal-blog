---
title: emotion中React的typeScript使用说明
date: 2021-07-01 14:51:56
tags: [css,React]
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

React的TypeScript中使用手册:
# @emotion/react 
举一个简单的例子：
```
/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

 <div
    css={css`
        color: red
    `}
 >
    emotion
</div>
```
这个例子的css样式没有生效的，反而会报错，报错信息如：`Property 'css' does not exist on type 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>'`
<!--more-->
### 解决方案如下：
- 第一种：在文件的头部添加 `/* @jsxImportSource @emotion/react */`，让组件识别出emotion样式。  
例子如下：
```
/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

 <div
    css={css`
        color: red
    `}
 >
    emotion
</div>
```
- 第二种：用babel插件`@emotion/babel-plugin`(ps: 因为该项目使用的是nextjs，所以使用的babel插件也和其他的react框架会有所差异，官方推荐原生的react使用的是[@emotion/babel-preset-css-prop](https://emotion.sh/docs/@emotion/babel-preset-css-prop))
在nextjs中的babel文件配置如下:

```json
{
    "presets": [
      [
        "next/babel",
        {
          "preset-react": {
            "runtime": "automatic",
            "importSource": "@emotion/react"
          }
        }
      ]
    ],
    "plugins": ["@emotion/babel-plugin"]
  }
```
配置完babel插件后在使用emotion的css样式会出现效果，但是css仍然会报错，这就需要在`tsconfig.json`文件中添加 `"jsxImportSource": "@emotion/react"`，然后重启项目就行了。   
例子如下(前提是babel和tsconfig.js配置完成后)：
```js
import { css } from '@emotion/react'

 <div
    css={css`
        color: red
    `}
 >
    emotion
</div>
```
> 提示： css={css``}中css反引号中样式的写法和普通的css写法是一样的。如：  

```js
 <div
    css={css`
        margin-top: 10px;
        color: red;
        border-bottom: 1px solid #000000;
    `}
 >
    emotion
</div>
```

# @emotion/styled的使用方法
@emotion/styled基本没什么注意的点，直接开干，举个例子：  

```js
import styled from "@emotion/styled";

export default function Layout() {
  const Wrap = styled.div`
    border: 1px solid #000;
    color: red;
  `;
  return (
    <Wrap>
      emotion
    </Wrap>
  );
}
```
通过styled的形式定义css样式来生成组件，写法还有一种:
```js
  // 括号的形式
  const Wrap = styled('div')`   
    border: 1px solid #000;
    color: red;
  `;
  return (
    <Wrap>
      emotion
    </Wrap>
  );
```
使用参数
```js
  const Wrap = styled.div<{ diyBgColor:string }>` 
    border: 1px solid #000;
    color: red;
    background: ${props=>props.diyBgColor};
  `;
  return (
    <Wrap diyBgColor='#f40'>
      emotion
    </Wrap>
  );
```

以上是emotion在react typescript中的基本使用方式，本人暂时没有时间去整理react的js中使用说明。
> [Emotion的React的TypeScript官方文档](https://emotion.sh/docs/typescript)  
[Emotion所有官方文档](https://emotion.sh/docs/introduction)