---
title: C++基础知识(1)--变量、数据类型、打印
categories: C++
date: 2022-06-09 23:27:16
tags: C++
---
<script type="text/javascript" src="/js/bai.js"></script>
本篇博客对于c++的基础知识讲解适用于有其他语言基础的人群，如JavaScript、Java、C等。因此有些简单的东西而且相对于其他语言来讲用法是一模一样就不会记录下来了，比如`if语句`、`while语句`、`switch语句`等等。   
博主是从事web前端这个岗位的，所以对于C++的专业知识没有比较深的理解，有些点讲解的也不是很到位，只是自己学习时候的记录笔记，可以评论留言讨论学习。

# 打印
以`cout`开始，以`endl`结尾，`<<`展示打印信息，由于c++对代码规范要求严格，所以需要写`;`结尾，否则报错。具体打印代码如：
`cout << "hello world" << endl;`    
<!-- more -->
完整例子：
```c++
#include <iostream>
using namespace std;

int main(){
    cout << "hello world"  << endl;
    return  0;
}
```
`endl`代表着打印换行，也就是下一个打印结果会再下一行打印出来。  
无endl例子：
```c++
#include <iostream>
using namespace std;

int main(){
    cout << "hello" ;
    cout << "world" ;
    return  0;
}
```
打印结果就是
```
helloworld
```
有endl例子：
```c++
#include <iostream>
using namespace std;

int main(){
    cout << "hello" << endl;
    cout << "world" << endl;
    return  0;
}
```
打印结果：
```
hello
world
```
后面讲到变量再介绍如何打印变量。

# 变量和常量
变量是先声明一个变量，然后可以根据声明的类型进行赋值对应的类型。如：  
```c++
#include <iostream>
using namespace std;

int main(){
    int a = 1;
    cout << a  << endl;
    a=2;
    cout << a  << endl;
    return  0;
}
```
运行结果：
```
1
2
```
int声明的是整型类型并赋值了1，然后第二次赋值了2。

常量是不可以修改的，变量是可以的，常量的声明有两种方式。
- 使用 `#define` 预处理器。  
- 使用 `const` 关键字。

#define 预处理器一般是在文件的开头定义常量。  
```c++
#include <iostream>
using namespace std;

#define DAY 7

int main(){
    cout << DAY  << endl;
    return  0;
}
```
运行结果：
```
7
```

const 在声明类型之前使用，就规定了该值是常量。

```c++
#include <iostream>
using namespace std;

int main(){
    const int DAY = 7;
    cout << DAY  << endl;
    return  0;
}
```
运行结果：
```
7
```
错误例子：

```c++
#include <iostream>
using namespace std;

int main(){
    const int DAY = 7;
    DAY = 8;  // 错误，不能重新赋值
    cout << DAY  << endl;
    return  0;
}
```



# 数据类型
本文介绍的数据类型有：整型、字符型、字符串型、浮点型、布尔型
## 整型  
整型也就是数字。整型分为：short(短整型)、int(整型)、long长短整型)、long long(长整型)。类型不同，所占的内存空间不同，表示的数字范围不一样。  

| 整型类型 | 占用空间 | 取值范围 |
| --- | --- | --- |
| short(短整型) | 2字节 | -2^15 ~ 2^15-1 |
| int(整型) | 4字节 | -2^31 ~ 2^31-1 |
| long长短整型) | windows为4字节，linux为4字节（32位），8字节(64位) | -2^31 ~ 2^31-1 |
| long long(长整型) | 8字节 | -2^63 ~ 2^63-1 |
最常使用的整型是`int`。  
例子：
```c++
#include <iostream>
using namespace std;

int main(){
    short a = 0;
    cout << "a的值为：" << a <<endl;
    int  b  = 1;
    cout << "b的值为：" << b <<endl;
    long c = 2;
    cout << "c的值为：" << c <<endl;
    long long d =3;
    cout << "d的值为：" << d <<endl;
    return  0;
}
```
运行结果：
```
a的值为：0
b的值为：1
c的值为：2
d的值为：3
```
这样是好像是没有问题的，但是如果赋值的数值大过定义的范围就无法得到赋值的数值，如short的取值范围是`-2^15 ~ 2^15-1`，也就是`-32768 到 32767`。如果使用short赋值 32768 是得不到该值的。
```c++
#include <iostream>
using namespace std;

int main(){
    short a = 32768;
    cout << a << endl;
    return  0;
}
```
运行结果：
```
-32768
```

## 字符型
字符型的声明关键词是`char`，例子如下：  
```c++
#include <iostream>
using namespace std;

int main(){
    char str = 'a';
    cout << str  << endl;
    return  0;
}
```
注意：
1. char声明的字符型只能使用单引号，用双引号会报错。
2. char声明的是字符型，也就是单引号里面只能有一个字符，多个字符是错误的。如错误例子：`char str = 'abc'`，abc就属于多个字符了。  

## 字符串型
上面提到的字符型是只能有一个字符的，字符串类型的数据就可以有多个字符了。c++是继承了c的风格，所以字符串类型可以和c的一样，如：  
```c++
#include <iostream>
using namespace std;

int main(){
    char str[] = "abc";
    cout << str  << endl;
    return  0;
}
```
运行结果：  
```
abc
```
也可以使用c++标准库提供的string类型去声明字符串类型。需要在开头引入string类，如：
```c++
#include <iostream>
#include <string> // 引入string类
using namespace std;

int main(){
    string str = "abc";
    cout << str  << endl;
    
    string str1 = "df";
    cout << str1  << endl;
    
    // 拼接字符串
    string str2=str + str1;
    cout << str2  << endl;
    return  0;
}
```
运行结果：
```
abc
df
abcdf
```
## 布尔类型
布尔类型只有两个值： `true` 和 `false` 。  
- true 真（本质就是1）
- false 假 （本质就是0）

```c++
#include <iostream>
using namespace std;

int main(){
    bool flag = true;
    cout << flag << endl;
    flag = false;
    cout << flag << endl;
    return  0;
}
```
运行结果：
```
1
0
```
## 浮点型
浮点型就是小数，分为`单精度float`和`双精度double`。二者区别是有效数字范围不同。  

| 数据类型 | 占用空间 | 有效数字范围 |
| --- | --- | --- |
| float | 4字节 | 7位有效数字 |
| double | 8字节 | 15~16位有效数字 |
```c++
#include <iostream>
using namespace std;

int main(){
    float f = 3.14f;
    cout << f << endl;
    
    double d = 3.14;
    cout << d << endl;
    
    float f1 = 3.1415926f;
    cout << f1 << endl;
    
    double d1 = 3.1415926;
    cout << d1 << endl;
    return  0;
}
```
打印结果：
```
3.14
3.14
3.14159
3.14159
```
float 赋值的时候需要在最后面加上`f`，否则会默认为双精度。可以看出赋值为`3.1415926`最后float和double打印出来都是3.14159。因为float和double默认只会显示`6`位有效数字。