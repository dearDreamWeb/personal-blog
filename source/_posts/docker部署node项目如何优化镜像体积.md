---
title: docker部署node项目如何优化镜像体积
categories: 后端
date: 2023-05-12 00:23:59
tags: [Docker,Node]
---
# 起因

刚开始docker部署node项目，感觉部署完了就可以了，之后和后端朋友聊起天说我的node镜像有`1.02G`。后端的朋友直接人傻了，让我看他平时部署的JAVA项目，不看不知道，一看吓一跳居然只有90多M。看来我的node项目镜像确实部署有问题，开始解决镜像过大的问题。开整。。。
<!--more-->
# 分析

最开始node项目的dockerfile是这样写的：

```bash
FROM node:16                                                                                                                                                                                                                                                                                                                        

WORKDIR /app                                                                                                                                                                                                                                                                                                     

COPY package*.json ./                                                                                                                                                                            

RUN npm install -g cnpm -registry=https://registry.npm.taobao.org \                                                                                                                                                                                                                                                                                      

&& cnpm install                                                                                                                                                                   

COPY . .

RUN cnpm run build 

EXPOSE 9527                                                                                                                                                                                                                                                                                                                                               

CMD ["npm","run","docker-start"]  

```

这样子一开始只是只把`package.json`和`package.lock.json`文件copy到镜像中，后面进行依赖安装，之后再把其余文件copy到镜像中。 

这样有个好处是之后的部署只要没有修改package.json中的依赖，每次部署遇到`cnpm install`就会走到`docker layer中缓存中`，不用再重新安装依赖了。可以加快部署的速度。  

但是这样子没有解决node项目镜像的体积。

# 解决方案

使用docker 的`分级构建`解决问题，镜像的生成规则是：`选择最后一个镜像作为生成镜像`，所以前面的镜像体积就会跟最终镜像没有关系。

*   第一层镜像：使用的node镜像选择功能全面的镜像进行依赖下载以及打包。
*   第二层镜像：选择体积比较小的node镜像来当做基础镜像，将第一层镜像中的运行文件copy到第二层镜像中去。这样就会大大减小node项目的镜像体积。

修改后的dockerfile文件： 

```bash
# 第一层镜像用于安装依赖和打包
FROM node:16  AS builder                                                                                                                                                                                                                                                                                                                           

WORKDIR /app                                                                                                                                                                                                                                                                                                     

COPY package*.json ./                                                                                                                                                                            

RUN npm install -g cnpm -registry=https://registry.npm.taobao.org \ 
                                                                                                                                                                                                                                                                                    && cnpm install                                                                                                                                                                   

COPY . .

RUN cnpm run build 

# 第二层镜像选择体积更小的node镜像来作为基础镜像，用来生产
FROM node:16.17.0-alpine3.16  as production

WORKDIR /app

# 将实际生成用到的文件从第一层镜像中copy过来
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 9527                                                                                                                                                                                                                                                                                                                                               

CMD ["npm","run","docker-start"]   
```

现在的node项目的镜像大小降低到了`200多M`。  
这里还是有优化空间的，如果平时npm安装依赖的时候比较严谨，将`eslint`这种生成用不到的包安装到`devDependencies`中，在`cnpm install`这一步可以改为`cnpm install --production`，这样就不会安装开发环境所需要的依赖，也就是`devDependencies`下的依赖都不会安装，从而降低最终node项目镜像的体积。

