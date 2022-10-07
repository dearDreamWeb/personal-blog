---
title: antd中setFieldsValue导致提示消失
date: 2021-02-26 10:49:15
tags: antd
categories: 前端
---


# 场景：
当表单输入时，限制用户最大输入的长度时，会导致提示错误消息消失  
例子：
```js
 // 校验金额
 const validateMoney = (rule: RuleObject, value: StoreValue) => {
     if (value.length > 20) {
        form.setFieldsValue({ cashOutAmount: value.slice(0, 21) });
         return Promise.reject('不能超过20位');
      }
 }


<Form form={form}>
    <Form.Item
        name="cashOutAmount"
        label="提现金额"
        rules={[{ validator: validateMoney }]}
        validateTrigger="onChange"
    >
        <Input/>
    </Form.Item>
</Form>
```
<!--more-->
运行如下    
当输入超过20位时，虽然已经校验失败了，但是提示消息不见了。
![1.png](/antd中setFieldsValue导致提示消失/1.png)

# 原因：
可能`setFieldsValue`是异步的原因导致消息不提示
# 解决方案：
使用`setFields`方法 
例子:
```js
 // 校验金额
 const validateMoney = (rule: RuleObject, value: StoreValue) => {
     if (value.length > 20) {
         form.setFields([
                {
                    name: 'cashOutAmount',
                    value: value.slice(0, 20),
                },
            ]);
         return Promise.reject('不能超过20位');
      }
 }


<Form form={form}>
    <Form.Item
        name="cashOutAmount"
        label="提现金额"
        rules={[{ validator: validateMoney }]}
        validateTrigger="onChange"
    >
        <Input/>
    </Form.Item>
</Form>
```
运行后
![2.png](/antd中setFieldsValue导致提示消失/2.png)