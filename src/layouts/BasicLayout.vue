<template>
  <van-nav-bar
      :title="title"
      right-text="按钮"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view />
  </div>
  <van-tabbar route  placeholder>
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/post" icon="fire-o" name="post">贴吧</van-tabbar-item>
    <van-tabbar-item to="/user/chat" icon="chat-o" name="chat">聊天</van-tabbar-item>
    <van-tabbar-item to="/notice" icon="comment-o" name="notice">信息</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
  import {showToast} from "vant";
  import {useRouter} from "vue-router";
  import {ref} from "vue";
  import routes from "../config/router.ts";

  const router = useRouter();
  const DEFAULT_TITLE = "伙伴匹配";
  const title = ref(DEFAULT_TITLE);

  router.beforeEach((to,from)=>{
    const toPath = to.path;
    const route = routes.find((route) =>{
      return toPath == route.path;
    })
    title.value = route?.title ?? DEFAULT_TITLE;
  })
  const onClickLeft = () => {
    router.back();
  }
  const onClickRight = () => {
    router.push('/search');
  }
</script>

<style scoped>
#content{
  padding-bottom: 50px;
}


</style>
