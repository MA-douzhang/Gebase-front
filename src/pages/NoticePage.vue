<template>
  <van-cell center >
    <div style="text-align: center">
      正在和{{chatUsername}}聊天
    </div>
  </van-cell>
  <van-cell-group
      v-for="message in messages"
  >
<!--    如果是信息的consumer是本人则是接收信息-->
    <van-cell
        center
      v-if="user.userAccount === message.consumer"
    >
      <template #icon>
        <van-icon :name="chatUser[0].avatarUrl"/>
      </template>
      <template #title class="left_frame">
        <div class="left_triangle"></div>
        <span class="left_rotationtiao">
          {{message.content}}
        </span>
      </template>
    </van-cell>
    <!--    如果是信息的consumer是聊天对象则是发送信息-->
    <van-cell
        center
        v-if="chatUserAccount === message.consumer"
    >
      <template #right-icon>
        <van-icon :name="chatUser[0].avatarUrl"/>
      </template>
      <template #value class="frame">
        <div class="triangle"></div>
        <span class="rotationtiao">
                 {{message.content}}
        </span>
      </template>
    </van-cell>
  </van-cell-group>

  <van-cell style="
  bottom: var(--van-tabbar-height);
    position: fixed;" >
    <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa' }"
    />
    <van-cell-group border
    >
      <van-field
          v-model="content"
          rows="1"
          autosize
          type="textarea"
          placeholder="请输入信息"
      />
      <van-button block type="primary"  @click="send">发送</van-button>
    </van-cell-group>

    </van-cell>

</template>

<script setup lang="ts">

import {onBeforeUnmount, onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";
import {myWebSocket} from "../config/myWebSocket";

const user = ref('');
const socket = ref();
const messages = ref([])
const chatUserAccount = ref('');
const chatUser = ref([]);
const content = ref('');
const userList = ref([])
const router = useRouter();
const chatUsername = ref('');

/**
 * 接收聊天的用户
 */
const route = useRoute();

/**
 * 初始化
 */
onMounted(async () => {
  user.value = await getCurrentUser();
  chatUserAccount.value  = route.query.userAccount;
  console.log("接收到messages",messages.value)
  init();
})
const init = () => {
  console.log("聊天页面的聊天对象",chatUserAccount.value)
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
      let data:any = JSON.parse(msg.data);
      console.log("data", data)
      if (data.userList) {
        chatUser.value = data.userList.filter(user => user.userAccount === chatUserAccount.value)
        console.log("聊天用户列表", chatUser.value)
        chatUsername.value = chatUser.value[0].username;
      } else {
        if (data.consumer === '0'){
          showFailToast("对方已断开连接,3s后退出")
         let timer = setTimeout(() => {
            //需要定时执行的代码
            router.back();
          }, 3000);
        }
        //如果data中没有userList代表这是一个信息,信息中有接收者的userAccount
        if (data.consumer === userAccount) {
          messages.value.push(data)
        }
      }
    }
  }
}


/**
 * 发送信息
 */
const send = () => {
  if (!chatUserAccount) {
    showFailToast("发送信息失败")
    return;
  }
  if (!messages) {
    showFailToast("信息为空")
    return;
  } else {
    let message = {userAccount: user.value.userAccount, consumer: chatUserAccount.value, content: content.value}
    socket.value.send(JSON.stringify(message));
    messages.value.push({consumer: chatUserAccount.value, content: content.value})
    content.value = '';
  }

}


</script>

<style scoped>
/* CSS */
.frame{
  width: 100%;
  float: left;
  position: relative;
  padding: 0 5px 0 0;
}
.triangle{
  width:0;
  height:0;
  border-top:5px solid transparent;
  border-bottom:5px solid transparent;
  border-left:5px solid #98E165;
  position: absolute;
  right: 0;
  top: 6px;
}
.rotationtiao{
  float: right;
  padding: 5px 10px;
  background-color: #98E165;
  font-size: 14px;
  border-radius: 2px;
}

/* CSS */
/* CSS */
.left_frame{
  width: 100%;
  float: left;
  position: relative;
  padding: 0 0 0 5px;
}

.left_rotationtiao{
  float: left;
  padding: 5px 10px;
  background-color: #98E165;
  font-size: 14px;
  border-radius: 2px;
}

</style>
