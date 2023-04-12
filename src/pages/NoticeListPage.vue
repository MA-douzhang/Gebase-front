<template>
  <template v-if="noticeList.length<=0">
    <van-empty description="无信息" />
  </template>
  <van-cell-group
      v-for="notice in noticeList"
  >
    <van-cell :title="notice.senderName+notice.content"  :label="notice.targetContent" @click="doChatUser(user.userAccount,messages)" is-link>
      <template #right-icon>
        <van-icon name="warning" color="red" size="20px" badge=""/>
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
import myAxios from "../plugins/myAxios";

const user = ref('');
const messages = ref([])
const chatUser = ref('');
const content = ref('');
const notices = ref([])
const noticeList = ref([])
const router = useRouter();

/**
 * 初始化
 */
onMounted(async () => {
  user.value = await getCurrentUser();
  init();
})

const init =async () => {
  //获取用户账号作为聊天地址的参数
  const res = await myAxios.get('/notice/list')
  if (res?.code === 0 && res) {
      notices.value = res.data
      noticeList.value = getNoticeList(notices.value);
      console.log(noticeList.value)
  } else {
    showFailToast('删除失败' + (res.description ? `,${res.description}` : ''))
  }
}
/**
 * 根据noticeState封装不同信息
 * 信息类型，1为评论，2为回复评论，3为点赞，4系统通知
 * @param noticeList
 */
const getNoticeList =( noticeList: []) =>{
  noticeList = JSON.parse(JSON.stringify(noticeList));
  for (var temp in noticeList){
    var contentType = noticeList[temp].contentType;
      if (contentType === 1){
        noticeList[temp].content = ' 评论: '+ noticeList[temp].content
      }
      else if (contentType === 2){
        noticeList[temp].content = ' 回复: '+ noticeList[temp].content
      }
      else if (contentType === 3){
        noticeList[temp].content = ' 点赞: '+ noticeList[temp].content
      }
      else if (contentType === 4){
        noticeList[temp].content = ' 系统通知: '+ noticeList[temp].content
      }
  }
  return noticeList;
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
