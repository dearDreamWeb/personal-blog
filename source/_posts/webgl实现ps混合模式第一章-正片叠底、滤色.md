---
title: webgl实现ps混合模式第一章~正片叠底、滤色
categories: 前端
date: 2022-08-18 10:24:34
tags: WebGl
---
<script type="text/javascript" src="/js/bai.js"></script>

# 一、混合模式
在ps中有很多的混合模式，如：正片叠底、滤色、变暗、变亮等等。下图为ps的算法公式图：
<img src='https://lire.oss-cn-hangzhou.aliyuncs.com/7f352606-e5b7-4a89-a02c-7e2b8d818148-0.png' height=400/>

<!--more-->
# 二、什么是正片叠底和滤色
正片叠底简单的来说就是`“去白留黑”`，所谓的`“去白留黑”`的实现原理就是将两张图的`rgba相乘`，rgba的各个值的区间为`[0.0,1.0]`，1.0乘任何值还是任何值本身，所以白色就被去除掉了。
滤色和正片叠底是相反的，也就是`“去黑留白”`。
# 三、正片叠底实现过程
下面例子中的两张图片原图为下面两个，第一张是效果图中的底图，第二张图是实现叠加效果的上层的图片
<div style='display:flex'>
    <img src='https://lire.oss-cn-hangzhou.aliyuncs.com/7f352606-e5b7-4a89-a02c-7e2b8d818148-1.png' height=200/>
    <img src='https://lire.oss-cn-hangzhou.aliyuncs.com/7f352606-e5b7-4a89-a02c-7e2b8d818148-2.png' height=200/>
</div>

这四个颜色叠加模式的顶点着色器都是一样的。  
例子：
```c++
const VSHADER_SOURCE = `
    attribute vec2 a_Position;    // 顶点坐标
    attribute vec2 a_PointUV;     // 顶点UV
    varying vec2 v_PointUV;

    void main(){
        gl_Position = vec4(a_Position,0.0,1.0);
        v_PointUV = a_PointUV;
    }
`;
```
正片叠底的片元着色器为：
```c++
const FSHADER_SOURCE = `
    precision mediump float;
    varying vec2 v_PointUV;
    uniform sampler2D u_Image;
    uniform sampler2D u_Image1;

    void main() {
        vec4 baseColor = texture2D(u_Image, v_PointUV);
        vec4 blendColor = texture2D(u_Image1, v_PointUV);
        gl_FragColor = blendColor * baseColor;
    }
`;
```
运行结果：
<img src='https://lire.oss-cn-hangzhou.aliyuncs.com/7f352606-e5b7-4a89-a02c-7e2b8d818148-3.png' height=200/>
这种两张都没有透明的部分的图片正片叠底的效果是没错的，但是，当混合模式的`图片部分有透明`的话就会导致下层的图片显示不出来，如下图：
<img src='https://lire.oss-cn-hangzhou.aliyuncs.com/7f352606-e5b7-4a89-a02c-7e2b8d818148-4.png' height=200/>

可以看的出来除了人物正片叠底了，人物之外透明部分是没有混合显示出来的。
### 为什么呢？
因为透明部分的`alpha值`是`0.0`，也就是rgba中的a是0.0，任何值乘以0.0都是0.0，所以下面的图片也就不显示了。
### 怎么显示出来下面的图片？
判断上层图片的alpha值是否为0.0，若为0.0时，就显示下层图片的颜色值。改良过的片元着色器如下：
```c++
const FSHADER_SOURCE = `
    precision mediump float;
    varying vec2 v_PointUV;
    uniform sampler2D u_Image;
    uniform sampler2D u_Image1;
    void main() {
        // 底层图片颜色
        vec4 baseColor = texture2D(u_Image, v_PointUV);
        // 上层混合图片的颜色
        vec4 blendColor = texture2D(u_Image1, v_PointUV);
        vec4 color = blendColor * baseColor + blendColor * (1.0 - baseColor.a) + baseColor * (1.0 - blendColor.a);
        if(blendColor.a == 0.0){
            color = baseColor;
        }
        gl_FragColor = color;
    }
`;
```
效果图如下：
<img src='https://lire.oss-cn-hangzhou.aliyuncs.com/7f352606-e5b7-4a89-a02c-7e2b8d818148-5.png' height=200/>

# 滤色实现过程
滤色的片元着色器为：
```c++
const FSHADER_SOURCE = `
    precision mediump float;
    varying vec2 v_PointUV;
    uniform sampler2D u_Image;
    uniform sampler2D u_Image1;
    void main() {
        // 底层图片颜色
        vec4 baseColor = texture2D(u_Image, v_PointUV);
        // 上层混合图片的颜色
        vec4 blendColor = texture2D(u_Image1, v_PointUV);
        vec4 color = vec4(1.0)-((vec4(1.0)-blendColor)*(vec4(1.0)-baseColor));
        if(blendColor.a == 0.0){
            color = baseColor;
        }
        gl_FragColor = color;
    }
`;
```
<img src='https://lire.oss-cn-hangzhou.aliyuncs.com/7f352606-e5b7-4a89-a02c-7e2b8d818148-6.png' height=200/>

正片叠底完整代码片段：
```js
let textureList = [];  

const VSHADER_SOURCE = `
    attribute vec2 a_Position;    // 顶点坐标
    attribute vec2 a_PointUV;     // 顶点UV
    varying vec2 v_PointUV;

    void main(){
        gl_Position = vec4(a_Position,0.0,1.0);
        v_PointUV = a_PointUV;
    }
`;
const FSHADER_SOURCE = `
    precision mediump float;
    varying vec2 v_PointUV;
    uniform sampler2D u_Image;
    uniform sampler2D u_Image1;
    void main() {
        // 底层图片颜色
        vec4 baseColor = texture2D(u_Image, v_PointUV);
        // 上层混合图片的颜色
        vec4 blendColor = texture2D(u_Image1, v_PointUV);
        vec4 color = blendColor * baseColor;
        if(blendColor.a == 0.0){
            color = baseColor;
        }
        gl_FragColor = color;
    }
`;

const vShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vShader, VSHADER_SOURCE);
gl.compileShader(vShader);

const fShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fShader, FSHADER_SOURCE);
gl.compileShader(fShader);

const program = gl.createProgram()
gl.attachShader(program, vShader) // 添加顶点着色器
gl.attachShader(program, fShader) // 添加片元着色器
gl.linkProgram(program) // 连接 program 中的着色器

gl.useProgram(program) // 告诉 WebGL 用这个 program 进行渲染
const bufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);

draw()

function random(min, max) {
    return min + Math.random() * (max - min);
}

async function draw() {
    let data = [
        -1, -1, 0, 0,
        1, -1, 1, 0,
        1, 1, 1, 1,
        1, 1, 1, 1,
        -1, 1, 0, 1,
        -1, -1, 0, 0,
    ];
    data = new Float32Array(data)
    await loadTextureImage(0, './images/1.jpeg')
    await loadTextureImage(1, './images/0.jpeg')

    const FSIZE = data.BYTES_PER_ELEMENT;

    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
    gl.enableVertexAttribArray(a_Position);

    const a_PointUV = gl.getAttribLocation(program, 'a_PointUV');
    gl.vertexAttribPointer(a_PointUV, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
    gl.enableVertexAttribArray(a_PointUV);


    const u_Image = gl.getUniformLocation(program, "u_Image");
    gl.activeTexture(gl.TEXTURE0 + 0);
    gl.bindTexture(gl.TEXTURE_2D, textureList[0]);
    gl.uniform1i(u_Image, 0);

    const u_Image1 = gl.getUniformLocation(program, "u_Image1");
    gl.activeTexture(gl.TEXTURE0 + 1);
    gl.bindTexture(gl.TEXTURE_2D, textureList[1]);
    gl.uniform1i(u_Image1, 1);

    const u_TranslateImage = gl.getUniformLocation(program, "u_TranslateImage");
    gl.uniform1f(u_TranslateImage, translateNumber);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, data.length / 4)
}

// 判断是否是 2 的 整数次方
function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}

/**
    * 加载纹理
    */
function loadTextureImage(index, url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url || './images/0.jpeg';
        img.crossOrigin = 'anonymous'
        img.onload = () => {
            // 在 WebGL 里创建一个 texture
            let texture = gl.createTexture();
            textureList.push(texture)
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.activeTexture(gl.TEXTURE0 + index);
            gl.bindTexture(gl.TEXTURE_2D, textureList[index])
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            if (isPowerOf2(img.width) && isPowerOf2(img.height)) {
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                console.log("非2的整数次方");
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            }

            resolve(texture)
        }
    })
}
```