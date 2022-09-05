---
title: webgl实现ps混合模式第二章-变暗、变亮、颜色加深、颜色简单、线性加深、线性减淡
categories: 前端
date: 2022-09-05 10:34:06
tags: WebGl
---
<script type="text/javascript" src="/js/bai.js"></script>

接着上一章讲解，如果本章有些知识点和公式看不懂可以看一下<a href="/webgl%E5%AE%9E%E7%8E%B0ps%E6%B7%B7%E5%90%88%E6%A8%A1%E5%BC%8F%E7%AC%AC%E4%B8%80%E7%AB%A0-%E6%AD%A3%E7%89%87%E5%8F%A0%E5%BA%95%E3%80%81%E6%BB%A4%E8%89%B2" target="_blank">第一章</a>的讲解。

# 变暗、变亮的实现
这两个方案实现起来很简单，就是去两张图的`rgb`的`最小值`或`最大值`，直接上shader代码： 
<!--more-->
变暗shader代码：
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
        vec4 color = vec4(min(baseColor.rgb,blendColor.rgb),max(baseColor.a,blendColor.a));
        gl_FragColor = color;
    }
`;
```
效果：
<img src='/webgl实现ps混合模式第二章-变暗、变亮、颜色加深、颜色简单、线性加深、线性减淡/0.png' height=200/>

变亮shader代码：
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
        vec4 color = vec4(max(baseColor,blendColor));
        gl_FragColor = color;
    }
`;
```
效果:
<img src='/webgl实现ps混合模式第二章-变暗、变亮、颜色加深、颜色简单、线性加深、线性减淡/1.png' height=200/>

# 颜色加深、颜色减淡
颜色加深、颜色减淡这两个功能都要用到`反相`，反相的计算方式是 `1.0减去rgb的颜色值`
如： 底层图的反向就是 vec3(1.0)-baseColor.rgb
颜色加深的实现：
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
        vec4 color = vec4(baseColor.rgb-(vec3(1.0)-baseColor.rgb)*(vec3(1.0)-blendColor.rgb)/blendColor.rgb,1.0);
        if(blendColor.a == 0.0){
            color = baseColor;
        }
        gl_FragColor = color;
    }
`;
```
效果：
<img src='/webgl实现ps混合模式第二章-变暗、变亮、颜色加深、颜色简单、线性加深、线性减淡/2.png' height=200/>

颜色加深的实现：

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
        vec4 color = vec4(baseColor.rgb + (baseColor.rgb * blendColor.rgb/(vec3(1.0)-blendColor.rgb)),1.0);
        if(blendColor.a == 0.0){
            color = baseColor;
        }
        gl_FragColor = color;
    }
`;
```
效果：
<img src='/webgl实现ps混合模式第二章-变暗、变亮、颜色加深、颜色简单、线性加深、线性减淡/3.png' height=200/>

# 线性加深和线性减淡
线性加深和线性减淡是向量进行相加减的过程，需要用到`clamp()`函数进行范围限制。
clamp使用方法：
`clamp (genType x, float minVal, float maxVal)`  
获取`x`和`minVal`之间`较大`的那个值，然后再拿较大的那个值和最后那个最大的值进行比较然后获取`较小`的那个，意思是x的取值范围是`[minVal,maxVal]`。
颜色加深代码如下：
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
        vec4 color = vec4(clamp(baseColor.rgb+blendColor.rgb-vec3(1.0),vec3(0.0),vec3(1.0)),baseColor.a);
        if(blendColor.a == 0.0){
            color = baseColor;
        }
        gl_FragColor = color;
    }
`;
```

效果：
<img src='/webgl实现ps混合模式第二章-变暗、变亮、颜色加深、颜色简单、线性加深、线性减淡/4.png' height=200/>

线性减淡效果：

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
        vec4 color = vec4(clamp(baseColor.rgb+blendColor.rgb,vec3(0.0),vec3(1.0)),baseColor.a);
        if(blendColor.a == 0.0){
            color = baseColor;
        }
        gl_FragColor = color;
    }
`;
```

效果：
<img src='/webgl实现ps混合模式第二章-变暗、变亮、颜色加深、颜色简单、线性加深、线性减淡/5.png' height=200/>