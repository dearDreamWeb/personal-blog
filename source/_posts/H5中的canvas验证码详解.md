---
title: H5中的canvas验证码详解
date: 2020-03-08 11:25:13
tags: H5
categories: 前端
---
# 先看效果图
![](7.png)
# 代码阶段
由于这个canvas是我在vue项目里写的，所以为了照顾一下没学过vue的，就用了原生的js整理了一下，里面用到了一些es6的语法，包括class  模板字符串`` 等，代码里面都有注释。
    
<!-- more -->

html部分代码
```html
<canvas width="250px" height="100px" id="canvas">
  该浏览器不支持canvas
</canvas>
```
js部分代码
```js
class Canvas {
        constructor() {
            this.curCanvas();
        }
        curCanvas() {
            let myCanvas = document.querySelector("#canvas");
            let ctx = myCanvas.getContext("2d");
            let canvasH = myCanvas.offsetHeight; // canvas 高
            let canvasW = myCanvas.offsetWidth; //canvas宽
            ctx.clearRect(0, 0, canvasW, canvasH); // 每次先清空一下canvas画布，不然会和之前的重叠
            ctx.fillStyle = "rgba(0,0,0,0.7)";
            ctx.fillRect(0, 0, canvasW, canvasH);
            // 生成干扰点
            for (let i = 0; i < 200; i++) {
                this.producePoint(ctx, canvasW, canvasH);
            }
            // 随机验证码
            let str = "";
            let arr = this.allCharacter();
            for (let i = 0; i < 4; i++) {
                str += arr[this.randomValue(0, 61)];
            }

            // 核心代码
            // 设置的验证码就四个字符，遍历每个字符的时候，先把原点位移到设置好的位置，在进行旋转
            //每次都是位移旋转之后再回复原位
            for (let i = 0; i < str.length; i++) {
                let colorR = this.randomValue(0, 256);
                let colorG = this.randomValue(0, 256);
                let colorB = this.randomValue(0, 256);
                let deg = this.randomValue(-30, 30);
                let x = this.randomValue(20, 30);
                let y = this.randomValue(20,30);
                // 设置颜色 和字体大小以及样式
                ctx.font = "3rem sans-serif";
                ctx.fillStyle = `rgb(${colorR},${colorG},${colorB})`;
                // 先把原点调到字符出现的位置，再旋转 ，然后填充字符
                ctx.translate(x + 50 * i, y);
                ctx.rotate((Math.PI / 180) * deg);
                ctx.textBaseline ="top"
                ctx.fillText(str[i], 0, 0);
                // 把原点和旋转角度复位
                ctx.rotate((Math.PI / 180) * -deg);
                ctx.translate(-(x + 50 * i), -y);
            }
        }

        // 最小值到最大值之间的随机值
        randomValue(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        // 获取0-9和a-z之间的字符
        allCharacter() {
            let arr = [];
            for (let i = 48; i < 58; i++) {
                arr.push(String.fromCharCode(i));
            }
            for (let j = 65; j < 123; j++) {
                if (j >= 91 && j <= 96) {
                    continue;
                }
                arr.push(String.fromCharCode(j));
            }
            return arr;
        }

        // 生成干扰点
        producePoint(ctx, canvasW, canvasH) {
            ctx.beginPath();
            let x = this.randomValue(5, canvasW - 5);
            let y = this.randomValue(5, canvasH - 5);
            let r = this.randomValue(2, 4);
            let colorR = this.randomValue(0, 256);
            let colorG = this.randomValue(0, 256);
            let colorB = this.randomValue(0, 256);
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgb(${colorR},${colorG},${colorB})`;
            ctx.fill();
            ctx.closePath();
        }
    }
    new Canvas();
```
# 细节方面的问题
- 其实之前canvas的位移translate是困扰我很久的，因为一旦位移translate没有复位，下一次的位移接着上次的计算，后来查了一些资料才知道。所以每次位移之后，把字符填充上之后又复位了回来（旋转也一定要复位不然和位移是一样的，都会叠加计算）。
- 每次刚开始要clearRect清除画布内容，否则刷新页面还是会叠加上次的画布内容（主要是我本次用的画布背景透明度是0.7，所以刷新页面会明显看到叠加的效果，如果一开始画布背景的透明度是1的话，不用clearRect效果也是一样的。） 

