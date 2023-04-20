# 前言
***
校园匹配项目的前端源码，主要是用于总结学习vue的知识，在学校中没有遇见学习前端的同学，所以自己学习了前端的知识。  

前端页面主要分为，用户列表页面，队伍页面，帖子页面，聊天页面，个人页面。  

功能模块放在后端介绍

## 技术栈
***
vue2 + Vant + Vite + WebSocket + vue-router


## 项目前后端部署
***

## 本地部署
## 前端部署方式
1. 代码仓库 https://github.com/MA-douzhang/Gebase-front
2. 初始化项目，下载依赖
```
npm install
```
3. 在package.json文件中使用 dev 启动

端口号 5173
## 后端部署
1. 代码仓库 https://github.com/MA-douzhang/Gebase
2. 本地数据库部署运行sql文件

## 安装redis
1. Redis配置(需要本地部署Redis)
```
  session:
    timeout: 86400
  redis:
    port: 6379
    host: localhost
    database: 1
```
2. 配置文件中头像上传地址需要重新配置,可自定义设置
```
upload:
  path: D:\\项目开发\\Gebase-bankend\\src\\main\\resources\\uploadAvatarImg\\
  address: http://localhost:9091/api

```
端口号为 9091


# 服务器部署
1. 使用服务器配置为1核2G
2. 宝塔面板

## 前端部署

1. 需要将plugins文件下的myAxios.ts中服务器地址修改为线上后端地址
```
const myAxios = axios.create({
    baseURL: isDev ? 'http://localhost:9091/api':'http://服务器地址/api'
});
```
2. config文件下myWebSocket.ts中服务器地址换成线上地址
```
export const myWebSocket = {
    url: isDev ? "ws://localhost:9091/api/webSocket/":"ws://服务器地址/api/webSocket/"
}

```
4. package.json文件中运行build命令，打包成dist文件夹
5. 宝塔使用PHP项目启动前端项目，并修改nginx配置(否则会出现找不到页面404)
```
 location / {
        try_files $uri $uri/ @router;#需要指向下面的@router否则会出现vue的路由在nginx中刷新出现404
        index  index.html index.htm;
     }
      #对应上面的@router，主要原因是路由的路径资源并不是一个真实的路径，所以无法找到具体的文件
      #因此需要rewrite到index.html中，然后交给路由在处理请求资源
     location @router {
         rewrite ^.*$ /index.html last;
     }
```

端口号 5173
## 后端部署

### 服务器安装redis
1. 使用宝塔面板直接安装redis
2. 配置redis https://blog.csdn.net/SpongeBob_shouse/article/details/128909794
   （来自星球某位同学的分享）
3. 配置完记得重新启动redis

### 后端项目打包
1. Redis配置(需要本地部署Redis)
```
  session:
    timeout: 86400
  redis:
    port: 6379
    host: 服务器地址
    database: 1
```
2. 在RedissonConfig文件中配置redis配置
```
        String redisAddress = String.format("redis://%s:%s", host, port);
        config.useSingleServer().setAddress(redisAddress).setDatabase(3).setPassword(password);
```
3. 数据库地址配置
```
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://服务器/gebase
    username: 
    password: 
```
4. session配置
```
server:
  port: 9091
  servlet:
    context-path: /api
    session:
      cookie:
        domain: 服务器地址 #线下环境 域名的访问范围
```
5. 配置文件中头像上传地址需要重新配置,可自定义设置
```
#线上环境
#upload:
#  path: /www/wwwroot/gebase/uploadAvatarImg/
#  address: http://服务器地址:9091/api
```

6. package打包，将打包好的jar文件上传服务器
7. 使用宝塔的java项目运行该jar文件




## 伙伴校园的后端源码
***
Gebase-backend 后台系统，[后端源码项目](https://github.com/MA-douzhang/Gebase)

## 说明
***
>如果对您有帮助，您可以右上角点一个“start”支持一下，👍
> 
> 如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

# 效果展示
***
[查看在线展示](http://124.71.138.38:5173/)

## 目标功能
***
+ [x] 登录注册功能
+ [X] 推荐用户功能（心动模式）
+ [X] 队伍功能
+ [x] 创建加入队伍
+ [x] 查看队伍信息
+ [x] 帖子功能
+ [x] 添加删除帖子
+ [x] 评论帖子
+ [x] 在线单聊功能
+ [x] 个人信息修改功能
+ [x] 上传头像
+ [x] 根据标签搜索用户
+ [ ] 给帖子点赞
+ [ ] 聊天信息的记录

~~给开发者打钱的支付功能~~

# 总结
1.前端项目这块，作为初学者开始学习Vue做开发时，遇见许多许多问题，页面之间传递参数，页面的拦截器，强制跳转登录，用WebSocket做通信，对axios的封装。 

2，伙伴校园项目陆陆续续做了一个寒假才完成，但是项目中还有许多许多的细节问题，和没完成的功能，因为自己时间精力有限，暂时没时间完成，以后有时间会继续完善该项目

3，在对项目做上线部署时，碰见了许多问题，跨域，接口地址错误，cookie种不上，等待问题。

4，线上部署时，项目部署在Nginx时因为Vue的router跳转并不会有真正存在的页面，会出现404的问题，所以要重新配置文件。

# 2.0版本
***
1. 完善了帖子页面的点赞动画，队伍页面加入队伍被遮盖的问题，用户列表联系我按钮。
2. 新增了信息通知页面，对帖子中的评论和点赞会推送信息给帖子的创建者，显示在通知页面中。
3. 增加如何本地部署和服务器部署文档

+ [x] Redis对数据缓存
+ [x] 用分布式锁对事务做原子性操作
+ [x] 信息通知功能
+ [ ] 完善聊天功能
+ [ ] 优化用户推荐算法

# 总结
***
1. 在更新这个项目同时自己学习了Redis技术，并学以致用，虽然Redis中有很多技术没用上，如Feed流对信息做推送，因为自己对这部分技术还是不太了解，不能想出这部分业务该如何实现。
2. 在新增功能的过程中会发现自己之前写代码时没考虑完善留下的坑，设计的缺陷，导致会不断地修改之前的数据库和一些业务代码。
3. 希望这个项目能帮助我不断学习。 
