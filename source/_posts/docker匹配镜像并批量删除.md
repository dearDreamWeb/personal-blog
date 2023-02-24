---
title: docker匹配镜像并批量删除
categories: 后端
date: 2023-02-24 17:26:21
tags: Docker
---

# 场景



```bash
REPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
node                      dev                 f22e6969a040        11 seconds ago      614MB
test                      3.0.0               4db779627117        46 hours ago        614MB
test                      2.0.0               4db739647555        46 hours ago        614MB
test                      1.0.0               4db779627133        46 hours ago        614MB
test1                     2.0.0               4db779123344        46 hours ago        614MB
test1                     1.0.0               4db779622371        46 hours ago        614MB
test2                     1.0.0               4db779627477        46 hours ago        614MB
<none>                    <none>              92e01ab212ce        13 days ago         263MB
<none>                    <none>              abc55744f08a        13 days ago         263MB
```

现在想要删除 所有的`test1`镜像，可以把所有的镜像id复制粘贴删除，比如：
<!--more-->
```bash
docker rmi 4db779627117 4db739647555 4db779627133
```

但是这样如果镜像多起来，就会可能复制错镜像id并且繁琐。



# 方案

可以使用`grep`函数找出所有`test1`镜像，然后用`awk`函数找出所有的镜像`ID`，并将它们作为参数使用 `docker rmi`命令进行删除所有`test1`的镜像。 &#x20;

```bash
# 查询所有的包含test1的镜像
$ docker images | grep test1 | awk '{print $3}'
4db779123344
4db779622371

# 删除所有的包含test1的镜像
$ docker rmi `docker images | grep test1 | awk '{print $3}'`

# 查看所有镜像
$ docker images

REPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
node                      dev                 f22e6969a040        11 seconds ago      614MB
test                      3.0.0               4db779627117        46 hours ago        614MB
test                      2.0.0               4db739647555        46 hours ago        614MB
test                      1.0.0               4db779627133        46 hours ago        614MB
test2                     1.0.0               4db779627477        46 hours ago        614MB
<none>                    <none>              92e01ab212ce        13 days ago         263MB
<none>                    <none>              abc55744f08a        13 days ago         263MB
```

上诉例子可以看到包含`test1`的镜像全删除了。但是如果有镜像还又容器存在的话，该镜像是无法删除的。如果要强制性全部删除的话，可以 `docker rmi -f ` 。

    $ docker rmi -f `docker images | grep test1 | awk '{print $3}'`

`grep`只是模糊匹配的，如果只想删除所有包含`test`的镜像呢？ &#x20;

如果用刚才的方法会发现不止`test`镜像没有了，`test1` 和 `test2`镜像也被删除了，这时候要使用 `grep` 的 `-w` 参数进行精准匹配才行。

    # 只删除名字是test的镜像
    $ docker rmi -f `docker images | grep -w test | awk '{print $3}'`

    REPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
    node                      dev                 f22e6969a040        11 seconds ago      614MB
    test1                     2.0.0               4db779123344        46 hours ago        614MB
    test1                     1.0.0               4db779622371        46 hours ago        614MB
    test2                     1.0.0               4db779627477        46 hours ago        614MB
    <none>                    <none>              92e01ab212ce        13 days ago         263MB
    <none>                    <none>              abc55744f08a        13 days ago         263MB



awk函数`{print $3}` 返回的是根据空格切分的镜像的第三部分的值，比如 &#x20;

    node                      dev                 f22e6969a040        11 seconds ago      614MB

`{print $1}` 返回 node

`{print $2}` 返回 dev

`{print $3}` 返回 f22e6969a040

`{print $4}` 返回 11

`{print $5}` 返回 seconds

`{print $6}` 返回 ago

`{print $7}` 返回 614MB



    $ docker images | grep -w test
    test                      3.0.0               4db779627117        46 hours ago        614MB
    test                      2.0.0               4db739647555        46 hours ago        614MB
    test                      1.0.0               4db779627133        46 hours ago        614MB

    $ docker images | grep -w test | awk '{print $1}'`
    test
    test
    test

    $ docker images | grep -w test | awk '{print $2}'`
    3.0.0 
    2.0.0 
    1.0.0 

    $ docker images | grep -w test | awk '{print $3}'`
    3.0.0 
    2.0.0 
    1.0.0 

    $ docker images | grep -w test | awk '{print $4}'`
    4db779627117
    4db739647555
    4db779627133

    $ docker images | grep -w test | awk '{print $5}'`
    46
    46
    46

    $ docker images | grep -w test | awk '{print $6}'`
    hours
    hours
    hours

    $ docker images | grep -w test | awk '{print $7}'`
    ago
    ago
    ago

    $ docker images | grep -w test | awk '{print $8}'`
    614MB
    614MB
    614MB

