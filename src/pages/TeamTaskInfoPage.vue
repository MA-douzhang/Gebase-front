<template>
    <van-cell-group inset>
      <van-card>
        <template #title>
          <div style="margin-top: 2px;font-size: 15px">
           任务名称 ：{{ teamTask.taskName }}
          </div>
        </template>
        <template #desc>
          <div style="margin-top: 2px;color: darkgray">
            任务描述 ： {{ teamTask.description }}
          </div>

        </template>
        <template #footer>
          <van-divider/>
          <van-button size="small" @click="preAddComment(teamTask.id)" icon="chat-o">评论</van-button>
          <van-button size="small" type="danger" v-if="teamTask.userId === currentUser?.id" @click="doDeleteTeamTask(teamTask.id)">
            删除
          </van-button>
        </template>
      </van-card>
      <div
          id="teamTaskComment"
          v-for="comment in teamTask.teamTaskCommentList"
      >
        <van-cell :title="comment.username"
                  :icon="comment.avatarUrl"
                  :label="comment.content">
        </van-cell>

      </div>
    </van-cell-group>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"/>
  <van-empty v-if="!teamTask || teamTask.length<1" description="帖子不存在"/>
  <van-action-sheet v-model:show="show" title="评论" @close="doAddCommentCancel">
    <van-cell-group inset>
      <van-field
          v-model="comment"
          rows="2"
          autosize
          type="textarea"
          maxlength="200"
          placeholder="请输入评论"
          show-word-limit
      />
    </van-cell-group>
    <van-button size="small" type="primary" style="float: right; margin: 5px 12px;" @click="doAddComment">发送
    </van-button>
  </van-action-sheet>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";
import {getCurrentUser} from "../services/user";


const currentUser = ref('');
const comment = ref('');
const teamTask = ref([]);
const teamTaskId = ref();
const show = ref(false);
const addCommentTeamTask = ref(0);
const router = useRouter();
const route = useRoute();




/**
 * 接收帖子的信息
 */

onMounted(async () => {
  teamTaskId.value  = route.query.id;
  console.log("teamTaskId",teamTask.value)
  await getTeamTask();
  currentUser.value = await getCurrentUser();
})

/**
 * 删除帖子
 */
const doDeleteTeamTask = async (id: number) => {
  const res = await myAxios.post("/teamTask/delete", {
    id: id,
  })
  if (res?.code === 0 && res) {
    showSuccessToast("删除成功")
    router.back()
  } else {
    showFailToast('删除失败' + (res.description ? `,${res.description}` : ''))
  }
}
/**
 * 获取帖子的列表
 */
const getTeamTask = async () => {
  const res = await myAxios.get("/teamTask/get", {
    params: {
      id : teamTaskId.value,
    }
  });
  if (res) {
    teamTask.value = res.data;
    console.log(teamTask)
  } else {
    showFailToast("加载队伍失败")
  }
};


const preAddComment = (teamTaskId: number) => {
  show.value = true;
  addCommentTeamTask.value = teamTaskId;
}
/**
 * 给帖子评论
 */
const doAddComment = async () => {
  const res = await myAxios.post("/teamTask/addComment", {
    content: comment.value,
    teamTaskId: addCommentTeamTask.value,
  })
  if (res?.code === 0 && res) {
    doAddCommentCancel()
    getTeamTask()
  } else {
    showFailToast('评论失败' + (res.description ? `,${res.description}` : ''))
  }
}
/**
 * 关闭评论
 */
const doAddCommentCancel = () => {
  comment.value = '';
  show.value = false;
}

/**
 * 点赞
 */
const doThumb = async (teamTaskId: number) => {
  const res = await myAxios.teamTask("/teamTask_thumb/", {
    teamTaskId: teamTaskId,
  })
  if (res?.code === 0 && res) {
    //返回为1表示点赞 返回为-1表示取消点赞
    if (res.data === 1){
      teamTask.value.thumbNum +=1;
    }else {
      teamTask.value.thumbNum -=1;
    }
    teamTask.value.thumb = !teamTask.value.thumb;
  } else {
    showFailToast('点赞失败' + (res.description ? `,${res.description}` : ''))
  }
}

watchEffect(() => {
  addCommentTeamTask.value
})
</script>

<style scoped>

</style>
