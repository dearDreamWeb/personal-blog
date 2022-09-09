---
title: webgl实现ps混合模式第三章-强光,柔光,亮光,点光,线性光,实色混合,排除,差值
categories: 前端
date: 2022-09-08 22:04:25
tags: WebGl
---
<script type="text/javascript" src="/js/bai.js"></script>

本章的图片和之前两张的图替换一下，第一张是底层的图片，第二张图是进行混合模式的，这是png图片，空白的地方全是透明的。
<div style='display:flex'>
    <img src='https://lire.oss-cn-hangzhou.aliyuncs.com/7f352606-e5b7-4a89-a02c-7e2b8d818148-1.png' height=200/>
    <img src='https://cdn2.mihuiai.com/ff0ad43c-48e8-4b9a-9179-3ede5e9dab4f-10.png' height=200/>
</div>
<!--more-->
公式图如下：
<img src='https://lire.oss-cn-hangzhou.aliyuncs.com/7f352606-e5b7-4a89-a02c-7e2b8d818148-0.png' height=400/>

# 叠加

叠加这里就需要进行进行各个通道也就是rgb的值是否小于`128`，在webgl中就是`0.5`，根据大小的判断去进行公式计算。
```c++
const FSHADER_SOURCE = `
    precision mediump float;
    varying vec2 v_PointUV;
    uniform sampler2D u_Image;
    uniform sampler2D u_Image1;

    // 颜色计算
    float colorValue(float color1, float color2){
        float value = 0.0;
        if(color1 <= 0.5){
            value = color1 * color2 / 0.5;
        }else{
            value = 1.0 - (1.0-color1) * (1.0-color2)/0.5;
        }
        return value;
    }

    void main() {
        // 底层图片颜色
        vec4 baseColor = texture2D(u_Image, v_PointUV);
        // 上层混合图片的颜色
        vec4 blendColor = texture2D(u_Image1, v_PointUV);
        vec4 color = vec4(1.0);

        color.r = colorValue(baseColor.r,blendColor.r);
        color.g = colorValue(baseColor.g,blendColor.g);
        color.b = colorValue(baseColor.b,blendColor.b);

        if(blendColor.a == 0.0){
            color = baseColor;
        }
        gl_FragColor = color;
    }
`;
```
运行效果：
<img src='https://lire.oss-cn-hangzhou.aliyuncs.com/ff0ad43c-48e8-4b9a-9179-3ede5e9dab4f-1.png' height=200/>

# 强光
强光的判断是和叠加反着来的，shader就不写了，和上面的例子判断是相反的，效果图：
<img src='https://lire.oss-cn-hangzhou.aliyuncs.com/ff0ad43c-48e8-4b9a-9179-3ede5e9dab4f-2.png' height=200/>

# 柔光
这里要用到`平方`和`根号`，glsl里面的内建的函数有这两种方法，分别是 `pow(x,y)`，`sqrt(x)`。pow代表x的次方。和js的表达意思差不多。
注意：下面公司用到的乘`2`，要写成`2.0`，因为之前声明的就是浮点数，所以所有的计算都是浮点数的计算。
代码如下：
```c++
float colorValue(float color1, float color2){
    float value = 0.0;
    if(color2 <= 0.5){
        value = color1 * color2 / 0.5 + pow(color1,2.0) * (1.0-2.0 * color2);
    }else{
        value = color1 *  (1.0 - color2)/0.5 + sqrt(color1) * (2.0 * color2 - 1.0);
    }
    return value;
}
```
效果图如下：
<img src='https://lire.oss-cn-hangzhou.aliyuncs.com/ff0ad43c-48e8-4b9a-9179-3ede5e9dab4f-3.png' height=200/>

# 亮光
亮光也是需要做`0.5`的判断的，如下
```c++
float colorValue(float color1, float color2){
    float value = 0.0;
    if(color2 <= 0.5){
        value = color1 - (1.0 - color1) * (1.0 - 2.0 * color2) / (2.0 * color2);
    }else{
        value = color1 + color1 * (2.0 * color2-1.0) / (2.0 * (1.0 - color2)) ;
    }
    return value;
}
```
效果图：
<img src='https://lire.oss-cn-hangzhou.aliyuncs.com/ff0ad43c-48e8-4b9a-9179-3ede5e9dab4f-4.png' height=200/>

# 点光
```c++
float colorValue(float color1, float color2){
    float value = 0.0;
    if(color2 <= 0.5){
        value = min(color1,2.0 * color2);
    }else{
        value = max(color1,2.0 * color2 - 1.0);
    }
    return value;
}
```
效果：
<img src='https://lire.oss-cn-hangzhou.aliyuncs.com/ff0ad43c-48e8-4b9a-9179-3ede5e9dab4f-5.png' height=200/>

# 线性光
线性光的效果和点光的差不多的，但是线性光的呈现效果会比点光的更亮一些。
```c++
float colorValue(float color1, float color2){
    return color1 + color2 * 2.0 - 1.0;
}
```
<img src='https://lire.oss-cn-hangzhou.aliyuncs.com/ff0ad43c-48e8-4b9a-9179-3ede5e9dab4f-6.png' height=200/>

# 实色混合
实色混合这里代码要用到`三目运算符?:`   （实现效果和ps有点不一致）
```c++
float colorValue(float color1, float color2){
    return (color1 + color2) >= 1.0 ? 1.0 : 0.0;
}
```
效果图：
<img src='https://lire.oss-cn-hangzhou.aliyuncs.com/ff0ad43c-48e8-4b9a-9179-3ede5e9dab4f-7.png' height=200/>

# 排除和差值
排除和差值的公式都很简单就放在一起了
```c++
// 排除
float colorValue(float color1, float color2){
    return color1 + color2 - color1 * color2 / 0.5;
}

// 差值
float colorValue(float color1, float color2){
    return abs(color1 - color2);
}
```
排除和差值效果如下：
<div style='display:flex'>
    <img src='https://cdn2.mihuiai.com/ff0ad43c-48e8-4b9a-9179-3ede5e9dab4f-8.png' height=200/>
    <img src='https://cdn2.mihuiai.com/ff0ad43c-48e8-4b9a-9179-3ede5e9dab4f-9.png' height=200/>
</div>