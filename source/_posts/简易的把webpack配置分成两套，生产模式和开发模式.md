---
title: 简易的把webpack配置分成两套，生产模式和开发模式
date: 2021-09-14 11:42:27
tags: WebPack
categories: 前端
---


# webpack.config.js中配置，区分两套配置
先通过运行的命令判断是开发模式还是生成模式，把公共的配置放在webpack.config.js，再根据模式引入对应的配置
<!-- more -->
```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
//默认为开发模式
  env = env || { development: true };
  return {
    entry: {
      index: path.resolve(__dirname, "./js/index.js")
    },
    module: {
      rules: [
        // es6转换
        {
          test: /\.js$/i,
          use: {
            loader: "babel-loader", // 用babel-loader把es6转换成es5
            options: {
              presets: ["@babel/preset-env"],  // 调用把es6转换成es5的文件
              plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose": true }]
              ]
            }
          }
        },
        // css，sass
        {
          test: /\.scss$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                plugins: [require("autoprefixer")]
              }
            },
            "sass-loader"]
        },
        // 图片
        {
          test: /\.(jpg|png|gif)$/i,
          use: {
            loader: "url-loader",
            options: {
              outputPath: "imgs/",  // 相对于ouput中的path路径，此例子也就是说图片存放在dest/imgs中
              limit: 4 * 1024
            }
          }
        },
        // 字体
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/i,
          use: {
            loader: "url-loader",
            options: {
              outputPath: "fonts/",  // 相对于ouput中的path路径，此例子也就是说图片存放在dest/fonts
              limit: 4 * 1024
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./index.html")
      })
    ],F
    //  根据模式的不同引入不同的配置
    ...env.production ? require("./config/webpack.production") : require("./config/webpack.development")
  }
}
```


# 创建一个config文件放两套配置
目录结构
- config
    + webpack.development.js
    + webpack.production.js

## 生产模式webpack.production.js的简易配置

```js
const path = require("path");

module.exports = {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "../dest"),
        filename: "build.min.js"
    }
}
```
## 开发模式webpack.development.js的简易配置

```
const path = require("path");

module.exports = {
    mode: "development",
    output: {
        filename: "index.js"
    },

}
```
# package.json的配置

```
{
    
  "scripts": {
    "start": "webpack-dev-server --config webpack.config.js --mode development",  // 开发模式运行
    "build": "webpack --env.production"  // 生成模式打包
  }
}
```