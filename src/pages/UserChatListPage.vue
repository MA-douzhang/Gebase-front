<template>
  <template v-if="userList.length<=0">
    <van-empty description="当前无在线用户" />
  </template>
  <van-cell-group
      v-for="user in userList"
  >
    <van-cell :title="user.userAccount" :icon="user.avatarUrl" @click="doChatUser(user.userAccount,messages)" is-link>
      <template #right-icon>
        <van-icon name="wechat" color="green" size="20px" :badge="messages.length"/>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";
import {myWebSocket} from "../config/myWebSocket";

const user = ref('');
const socket = ref();
const messages = ref([])
const chatUser = ref('');
const content = ref('');
const userList = ref([])
const router = useRouter();

/**
 * 初始化
 */
onMounted(async () => {
  user.value = await getCurrentUser();
  init();
})

const init = () => {
  //获取用户账号作为聊天地址的参数
  console.log("user", user.value.userAccount);
  let userAccount = user.value.userAccount;
  if (typeof (WebSocket) === "undefined") {
    showFailToast("浏览器不支持WebSocket")
  } else {
    showSuccessToast("浏览器支持")
    let socketUrl = myWebSocket.url + userAccount;
    socket.value = new WebSocket(socketUrl);
    socket.value.onopen = () => {
      console.log("WebSocket连接成功")
    }
    socket.value.onmessage = (msg: any) => {
      let data = JSON.parse(msg.data);
      console.log("data", data)
      if (data.userList) {
        userList.value = data.userList.filter(user => user.userAccount !== userAccount)
        console.log("在线用户列表", userList.value)
      } else {
        //如果data中没有userList代表这是一个信息,信息中有接收者的userAccount
        if (data.consumer === userAccount) {
          messages.value.push(data)
        }
      }
    }
  }
}

/**
 * 选择聊天的用户
 */
const doChatUser = (userAccount: string,messages:any) => {
  chatUser.value = userAccount;
  router.push({
    path: '/user/chat/info',
    query: {
      userAccount,
    }
  })
}
</script>

<style scoped>

</style>
