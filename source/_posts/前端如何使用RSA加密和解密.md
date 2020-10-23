---
title: 前端如何使用RSA加密和解密
date: 2020-05-17 21:25:27
tags: JavaScript
categories: 前端
---
<script type="text/javascript" src="/js/bai.js"></script>

# 一、用openssl工具生成RSA的公钥和私钥
<a href="https://oomake.com/download/openssl">openssl下载地址</a>  
下载完openssl工具并安装之后，打开openssl文件夹下的bin文件夹，执行<font color="#f40">openssl.exe</font>程序：   
如图：
![1.png](1.png)
<!-- more -->
## （1）生成RSA私钥
打开openssl.exe 后输入<font color="#f40">genrsa -out rsa_private_key.pem 1024</font>   回车会看到结果
![2.png](2.png)

这时候bin文件夹中看到一个文件名为<font color="#f40">rsa_private_key.pem</font>的文件，用记事本方式打开它，可以看到-----BEGIN RSA PRIVATE KEY-----开头，-----END RSA PRIVATE KEY-----结尾的没有换行的字符串，这个就是原始的私钥。每次使用<font color="#f40">genrsa -out rsa_private_key.pem 1024</font>命令，私钥都会变的。
![3.png](3.png)

## （2）生成RSA公钥
输入命令：<font color="#f40">rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem</font>，并回车，得到生成成功的结果
![4.png](4.png)

这时候可以在bin文件夹中看到一个文件名为rsa_public_key.pem的文件，用记事本方式打开它，可以看到-----BEGIN PUBLIC KEY-----开头，-----END PUBLIC KEY-----结尾的没有换行的字符串，这个就是公钥。
![5.png](5.png)

## 注意： 
<font color="#f40">必须先生成私钥再生成公钥才行。</font>

# 二、用jsencrypt来进行RSA的加密和解密
这次我是用的React使用的jsencrypt进行的操作。  
<font color="#f40">使用场景</font>
- 需要在本地存储一些标志位，安全问题
- 用户登录密码的加密
## （1）安装jsencrypt
```js
npm install jsencrypt --save
```
## （2）生成一对RSA公钥和私钥
```js
import JSEncrypt from 'jsencrypt';

// 私钥内容
const PRIV_KEY = `MIICXQIBAAKBgQDsNBA0WAtqWTNan3YrP20wbeIivc/dsXF0GBGLj3LmYrlPfOCa
7sr0yzzzSmeb9iloig8C8Ao/swjw6iUdlcPV/pfY/FiFTTMiUNFLF503dvKkPRIf
CLgnGb/5ZGunm7u/2W4ForUW1LsphlwUGbRmIOIuMUwXo6c8FR/4GhmqPwIDAQAB
AoGBAOBwhClIs+gkxEBLH1zu0tDeyK6cT+Tm09gtepZzAwnZKx5VmZJ+bsl2SP8g
ZxzyJdyYurTe484tT8SjqArZoQ9lP6Qs6ngH80WPg9O0dHFF8QD1bHFG2IfSlS40
p5Tqlc2WT6RJgIK4NekowC7tPu7PONbf67CUCv2Fi0s3zpopAkEA/+lyaJNyVpA4
Bd7mb5tvk8VmcPhHdpNkVuP29Glc74P5+VdsvNvDgo/StYooi8TscDNcIjBGLtom
gljLARBqAwJBAOxI4SeYo6Vak8Eib83QiHEcDdM3HxEmzzRZkQJohipZwNGEqCDV
WWsrXL2upUOT16xzOElZmnpOsxkRA3llqBUCQQD7AeX2ztCyOSjKEVSiman6Hf+Z
xNyLYIxlcZnzJzlBsIhKWcbNAx0j/Z+l8opMdW2Xq7ity/26zLxC04biV1AzAkAJ
BUdDQbqNp4WYi/4Et39eAhotBB+1gevLLdgxZVgp6b9IwG3CwyJkywUBYNeCWvSS
6tstQbR6EuMXg+TED7N5AkA2xfsjd4z6jG1C6n8GpTo9S+Sz8obk2QUH0EqsN1E6
Fg3nV/1B8xdPlhWhy77uC5UEDuJ57+5hj27jKf01CmU/`;

// 公钥内容
const PUB_KEY = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDsNBA0WAtqWTNan3YrP20wbeIi
vc/dsXF0GBGLj3LmYrlPfOCa7sr0yzzzSmeb9iloig8C8Ao/swjw6iUdlcPV/pfY
/FiFTTMiUNFLF503dvKkPRIfCLgnGb/5ZGunm7u/2W4ForUW1LsphlwUGbRmIOIu
MUwXo6c8FR/4GhmqPwIDAQAB`;

// 公钥加密
function encrypt(text) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(PUB_KEY);
    const encrypted = encrypt.encrypt(text);
    return encrypted;
}

// 私钥解密
function decrypt(text) {
    const decrypt = new JSEncrypt();
    decrypt.setPrivateKey(PRIV_KEY);
    const decrypted = decrypt.decrypt(text);
    return decrypted;
}

console.log(encrypt("我是一段数据"))  // 加密
console.log(decrypt(encrypt("我是一段数据")))  // 解密
```
运行结果：
![6.png](6.png)