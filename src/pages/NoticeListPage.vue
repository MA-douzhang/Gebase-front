<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh" style="min-height: 100vh;">
      <template v-if="noticeList.length<=0">
        <van-empty description="无信息" />
      </template>

      <van-cell-group
          v-for="notice in noticeList"
      >
        <van-cell :title="notice.senderName+notice.content"  :label="notice.targetContent" @click="doPostInfo(notice.targetId,notice.id,notice.contentType)" is-link>
          <template #right-icon v-if="notice.noticeState===0">
            <van-icon name="warning" color="red" size="20px" badge=""/>
          </template>
        </van-cell>
      </van-cell-group>
  </van-pull-refresh>
</template>


<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";
import {myWebSocket} from "../config/myWebSocket";
import myAxios from "../plugins/myAxios";

const user = ref('');
const loading = ref(false)
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

const onRefresh = async () =>{
  loading.value = false
  init();
}

const init =async () => {
  const res = await myAxios.get('/notice/list')
  if (res?.code === 0 && res) {
      notices.value = res.data
      noticeList.value = getNoticeList(notices.value);
      console.log(noticeList.value)
  } else {
    showFailToast('加载失败' + (res.description ? `,${res.description}` : ''))
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
const readPost =async (noticeId:number) =>{
  await myAxios.post('/notice/update',{
    id: noticeId,
     noticeState: 1
  })
}

/**
 * 帖子详情
 */
const doPostInfo = (id: number,noticeId:number,contentType:number) => {
  if (contentType!=5){
    router.push({
      path: '/post/info',
      query: {
        id,
      }
    })
  }else {
    router.push({
      path: '/team/task/info',
      query: {
        id,
      }
    })
  }

  readPost(noticeId)
}
</script>

<style scoped>

</style>
