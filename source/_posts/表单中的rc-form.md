---
layout: react的ui框架antd-mobile中form
title: antd-mobile中form表单中的rc-form
date: 2020-06-04 16:33:21
tags: React
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

antd mobile 的form表单是InputItem  
如图：
![1.png](/表单中的rc-form/1.png)

# rc-form
<!-- more -->
## 定义
rc-form是一个<font color="#f40">将输入框变为受控组件的库</font>，也是一个<font color="#f40">React的高阶form组件</font>。它集合了对于输入框的各种方法，可以使我们方便的控制输入框的状态。

## 使用
基本使用：
```js
import { createForm } from 'rc-form';
const Form = ()=>{...}
export default createForm()(Form); 
```

如果想要能够使用porps.history.push()进行路由跳转的话，要使用withRouter()，要使用一下写法：
```js
import { createForm } from 'rc-form';
import { withRouter } from "react-router-dom";
const Form = ()=>{...}
export default createForm()(withRouter(Form)); 
```

如果在同一个js文件中，当做子组件时，要再次赋值一下，再使用新的赋值的组件，写法：
```js
import { createForm } from 'rc-form';
const Form = ()=>{...}
const Form1 = createForm()(Form);  //赋值一下
const Parent = ()=> {
    return(<div>
        <Form1 />
    </div>)
}
export default Parent; 
```

# API

## validateFields
<font color="#f40">validateFields([fieldNames: string[]],[options: object],callback(errors, values)) => void </font>		校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件。

## getFieldsValue
<font color="#f40">getFieldsValue( [fieldNames: string[]] )</font>	 <font color="#f40">获取一组控件的值</font>，若 fieldNames <font color="#f40">参数为空</font>，则<font color="#f40">获取全部组件</font>。

## getFieldsError
<font color="#f40">getFieldsError( [names: string[]] ) </font>		 获取一组输入控件的 Error ，如不传入参数，则<font color="#f40">获取全部组件的 Error</font>。

## getFieldProps
<font color="#f40">getFieldProps( name,options )</font> 			 <font color="#f40">name用于为控件绑定名称(key)</font>，及控件的一些默认配置。
其中<font color="#f40">options参数</font>简单说两个 <font color="#f40">initialValue</font>和 <font color="#f40">validate</font>，<font color="#f40">initialValue</font>是控件的<font color="#f40">默认初始值绑定在name上</font>；
<font color="#f40">validate</font>中有<font color="#f40">trigger</font>和<font color="#f40">rules</font>，trigger是校验触发的时机，可以是onBlur或者onChange等默认是onChange，<font color="#f40">rules</font>是对输入框的内容做一些限制，比如是否必须输入(require)，最大(max)最小(min)长度等,也可以<font color="#f40">自定义限制(validator：function(rule, value, callback))</font>。


# 例子
这是我在项目中的一个例子：
```
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { List, InputItem, Button, WingBlank, WhiteSpace, Picker, Toast } from 'antd-mobile';
import VerificationCode from "../../component/verificationCode"; //验证码组件
import { createForm } from 'rc-form';


const Form = (props) => {
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState(["0"]);    //用户类型，默认是1即是老板的选项
    const [canvasCode, setCanvasCode] = useState(""); //canvas生成的验证码
    // 用户类型数据
    const userTypeData = [
        {
            label: "大神",
            value: "0",
        },
        {
            label: "老板",
            value: "1",
        }];
    const { getFieldProps, getFieldError } = props.form;


    // 点击注册
    const handleClick = () => {
        props.form.validateFields({ force: true }, (error) => {
            if (!error) {
                console.log(props.form.getFieldsValue());
            } else {
                Toast.info("请确认表单内容全部正确");
            }
        });
    }

    // 获取子组件传过来的验证码
    const getCode = (value) => {
        setCanvasCode(value);
    }

    // 校验用户名
    const validateUserName = (rule, value, callback) => {
        // 仅允许输入英文和数字
        const reg = /^\w{3,8}$/;
        if (reg.test(value)) {
            callback();
        } else {
            callback(new Error("仅允许英文、数字长度为3到8"));
        }
    }

    // 输入密码校验
    const validatePassword = (rule, value, callback) => {
        //匹配是否有特殊字符（包括空格）,允许的特殊字符@,.
        const reg = /^[\w@,.]{6,16}$/;
        if (reg.test(value)) {
            setPassword(value);
            callback();
        } else {
            callback(new Error("仅允许英文、数字和特殊字符@ , .长度为6到16"))
        }
    }

    // 再次输入密码校验
    const validateRePassword = (rule, value, callback) => {
        if (value && value === password) {
            callback();
        } else if (value.length === 0) {
            callback(new Error('请再次输入密码'));
        } else {
            callback(new Error('两次输入密码不一致'));
        }
    }

    // 校验验证码
    const validateVerificationCode = (rule, value, callback) => {
        if (value.toLowerCase() === canvasCode.toLowerCase()) {
            callback();
        } else {
            callback(new Error("验证码错误"));
        }
    }


    return (
        <WingBlank>
            <List>

                {/* 用户名 */}
                <InputItem
                    {...getFieldProps('userName', {
                        validate: [{
                            trigger: "onBlur",
                            rules: [
                                { validator: validateUserName }
                            ],
                        }],

                    })}
                    error={!!getFieldError('userName')}
                    onErrorClick={() => {
                        Toast.info(getFieldError('userName'), 1);
                    }}
                    clear
                    placeholder="请输入用户名"
                >用户名</InputItem>

                {/* 密码 */}
                <InputItem
                    {...getFieldProps('password', {
                        validate: [{
                            trigger: "onBlur",
                            rules: [
                                { validator: validatePassword }
                            ],
                        }],

                    })}
                    error={!!getFieldError('password')}
                    onErrorClick={() => {
                        Toast.info(getFieldError('password'), 1);
                    }}
                    type="password"
                    clear
                    placeholder="请输入密码"
                >密码</InputItem>

                {/* 确认密码 */}
                <InputItem
                    {...getFieldProps('rePassword', {
                        validate: [{
                            trigger: "onBlur",
                            rules: [
                                { validator: validateRePassword },
                            ],
                        }],

                    })}
                    error={!!getFieldError('rePassword')}
                    onErrorClick={() => {
                        Toast.info(getFieldError('rePassword'), 1);
                    }}
                    type="password"
                    clear
                    placeholder="请再次输入密码"
                >确认密码</InputItem>

                {/* 用户类型 */}
                <Picker
                    {...getFieldProps('userType', {
                        initialValue: userType
                    })}
                    data={userTypeData}
                    title="用户类型"
                    extra="请选择"
                    cols={1}
                    value={userType}
                    onOk={v => setUserType(v)}
                >
                    <List.Item arrow="horizontal">用户类型</List.Item>
                </Picker>

                {/* 验证码 */}
                <List.Item>
                    <VerificationCode getCode={value => getCode(value)} />
                </List.Item>
                <WhiteSpace />
                <InputItem
                    {...getFieldProps('verificationCode', {
                        validate: [{
                            trigger: "onBlur",
                            rules: [
                                { validator: validateVerificationCode },
                            ],
                        }],

                    })}
                    error={!!getFieldError('verificationCode')}
                    onErrorClick={() => {
                        Toast.info(getFieldError('verificationCode'), 1);
                    }}
                    clear
                    placeholder="请输入验证码"
                >验证码</InputItem>



                <List.Item>
                    <Button
                        type="primary"
                        onClick={handleClick}
                    >注册</Button>
                </List.Item>

                <List.Item>
                    <Button onClick={() => { props.history.push("/login") }}>
                        已有账户
                    </Button>
                </List.Item>
            </List>
        </WingBlank>
    )

}
const Form1 = createForm()(withRouter(Form))

const Register = () => {
    return (<div className="register">
            <Form1 />
            </div>)
}
export default withRouter(Register);
```
> 部分内容借鉴的博客地址：https://www.jianshu.com/p/6e1ebce3966d