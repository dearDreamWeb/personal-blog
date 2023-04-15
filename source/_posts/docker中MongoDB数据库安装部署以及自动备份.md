---
title: docker中MongoDB数据库安装部署以及自动备份
categories: 后端
date: 2023-02-08 13:43:59
tags: Docker
---
# 简介

先了解一下MongoDB数据怎么导入导出的。

*   数据库导出

    ```bash
    # 语法
    mongodump -h 127.0.0.1:27017 -d <db> -u <username> -p <password> --authenticationDatabase admin -o <path> 

    # 例子
    mongodump -h 127.0.0.1:27017 -d test -u admin -p 123456 --authenticationDatabase admin -o /data/mongodb 
    ```

<!-- more -->
参数：
1.  \-h mongoDB所在服务器的地址
2.  \-d 需要导出的数据库，例子中的test就是数据库名称
3.  \-u 数据库管理员用户名
4.  \-p 密码
5.  \--authenticationDatabase 是为了解决权限不足的问题
6.  \-o 导出的数据存放的位置

*   数据库导入

    ```bash
    # 语法
    mongorestore -h dbhost -u <username> -p <password> --authenticationDatabase admin -d dbname path
    #例子
    mongorestore -h 127.0.0.1:27017 -u admin -p 123456 --authenticationDatabase admin -d test /data/mongodb 

    ```

参数同上

# 安装

安装最新版本的MongoDB镜像

```bash
docker pull mongo:latest
```

# 部署

这一步很关键，因为需要让宿主主机的文件夹和mongo容器中的文件夹起到映射关系，这样修改可以通过宿主主机映射的文件夹查看容器中对应文件夹的内容。

我想要mongo容器把导出的数据库文件备份放入到 `/data/mongodb`中，但是想要查看备份的数据库文件需要每次进入mongo容器中才能看到，我想要直接在宿主主机中`/data/mongodb/`看到就需要在运行容器的时候去进行映射。

```bash
docker run \ 
--name mongod \ 
-p 27017:27017 \ 
-v /data/mongodb:/data/mongodb/ \ 
-d mongo \
-- auth
```

参数

*   \--name 容器名称
*   \-p 指定端口映射，格式为：主机(宿主)端口:容器端口
*   \-v 宿主主机文件夹和容器中的文件夹进行映射
*   \-d 运行的镜像
*   \-- auth 连接数据库需要用户名和密码

docker 进入容器的命令

```bash
docker exec --it <container>
```

参数
*   container  容器名字或者容器id

添加用户和设置密码

```bash
 docker exec -it mongo mongo admin
# 创建一个名为 admin，密码为 123456 的用户。
> db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'},"readWriteAnyDatabase"]});
```
roles：指定用户的角色，可以用一个空数组给新用户设定空角色；在roles字段,可以指定内置角色和用户定义的角色。role里的角色可以选：

Built-In Roles（内置角色）：

1.  数据库用户角色：read、readWrite;
2.  数据库管理角色：dbAdmin、dbOwner、userAdmin；
3.  集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
4.  备份恢复角色：backup、restore；
5.  所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
6.  超级用户角色：root

现在是定义好了超级用户角色，如果想要再次添加角色就需要进行验证。
例子：如果现在想要再创建一个角色为`readAnyDatabase`的权限，需要先`db.auth(用户名，密码)`进行身份认证，通过之后就可以创建用户。

```bash
# 进行身份验证
> db.auth("admin","123456")
1    # 1代表通过，0代表未通过
# 创建新的用户
>db.createUser({ user:'user',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'},"readWriteAnyDatabase"]});
```

# 备份

思路

1.  进入容器
2.  导出数据库

实现：

```bash
 docker exec -it mongo

 mongodump -h 127.0.0.1:27017 -d test -u admin -p 123456 --authenticationDatabase admin -o /data/mongodb 
```

这样就在宿主主机的 /data/mongodb 文件夹中看到

# 定时自动备份

定时这里是需要用到 `crontab` 和 `shell脚本` 这两个知识点了。

crontab如何使用这里就不介绍了。

思路：

1.  shell脚本去导出数据库，并压缩成压缩包
2.  crontab开启定时任务执行该shell脚本的

shell脚本为：

```bash
#!/bin/bash
cd /data/mongodb
filename='test'
DATE=$(date +%Y%m%d)

# 删除上次的MongoDB导出的数据库test文件夹
if [ -d "$filename" ]; then
rm -rf "$filename"
fi

# 进入mongo容器并导出test数据库
docker exec mongo mongodump -h 127.0.0.1:27017 -d test -u admin -p 123456 --authenticationDatabase admin  -o /data/mongodb

# 压缩test文件夹成压缩包
if [ -d "$filename" ]; then
tar czvf mongdb-backup-$DATE.tar.gz $filename
fi

# 保留最新60天数据
ls -t | tail -n +60 | xargs rm -rf
```

使用crontab去定时执行shell脚本

```bash
crontab -e

# 每天凌晨两点十分执行shell脚本
10 2 * * * sh /data/backup.sh
```

# 注意

当定时任务执行docker脚本docker脚本要使用`-it`时将会失效。如：

```bash
// docker进入mongo容器的方法
docker exec -it mongo /bin/dash
```

这在shell脚本中运行是正常的，但是如果用crontab去运行的话就会失效，因为`exec 加了 -it 参数就开启了一个终端，计划任务无法进入任何终端`。所以在crontab任务中docker exec的正确用法是:

```bash
docker exec mongo /bin/dash
```


