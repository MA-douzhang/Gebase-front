# 前言
***
校园匹配项目的前端源码，主要是用于总结学习vue的知识，在学校中没有遇见学习前端的同学，所以自己学习了前端的知识。  

前端页面主要分为，用户列表页面，队伍页面，帖子页面，聊天页面，个人页面。  

功能模块放在后端介绍

## 技术栈
***
vue2 + Vant + Vite + WebSocket + vue-router

## 项目部署
***
myWebSocket.ts文件中修改上线后端地址

  ```
   const isDev = process.env.NODE_ENV === 'development'
   export const myWebSocket = {
   url: isDev ? "ws://localhost:9091/api/webSocket/":"ws://线上地址/api/webSocket/"
   }
  ```
myAxios.ts文件中修改后端地址

   ```
   const isDev = process.env.NODE_ENV === 'development'
   const myAxios = axios.create({
   baseURL: isDev ? 'http://localhost:9091/api':'http://线上地址/api'
   });
   ```
上线打包方法
   ```
   vite build
   ```
项目运行
```
vite
```
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
