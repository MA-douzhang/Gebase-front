<template>
  <van-skeleton title avatar :row="3" :loading="props.loading">
    <van-steps direction="vertical" :active="props.teamTaskList.length">
      <van-step v-for="(teamTask, index) in props.teamTaskList" @click="onClickTeamTask(teamTask.id)">
        <div class="task-content">
          <img
              v-if="teamTask.taskState==0"
              src="../assets/todo.png"
              class="businessTypeOne"
          />
          <img
              v-if="teamTask.taskState==1"
              src="../assets/pass.png"
              class="businessTypeOne"
          />
          <h3>{{ teamTask.taskName }}</h3>
          <p>创建时间：{{ formatDate(teamTask.createTime) }}</p>
          <p v-if="teamTask.endTime">完成时间：{{ formatDate(teamTask.endTime) }}</p>
          <div class="button-container" v-if="teamTask.userId===user?.id&&teamTask.taskState==0">
            <van-button type="primary" class="complete-btn" @click="onTaskFinish(teamTask.id)">完成</van-button>
          </div>
        </div>
      </van-step>
    </van-steps>
  </van-skeleton>

  <van-empty v-if="!props.teamTaskList || props.teamTaskList.length<1" description="无队伍任务"/>

</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import {teamTaskType} from "../models/teamTask";
import {format} from "date-fns";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";

const show = ref(false)
const userIndex = ref(0)
const router=useRouter()
const user=ref()
interface UserCardListProps {
  loading: boolean
  teamTaskList: teamTaskType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  //@ts-ignore
  teamTaskList: [] as teamTaskType[],
});
//用户信息标签字符串化
const loadDate =async () =>{
  console.log("teamTaskList"+props.teamTaskList)
  user.value= await getCurrentUser()

}

const showPopup =(index:number) =>{
  show.value = true;
  userIndex.value = index
  console.log("d",index)
}

/**
 * 查看队伍任务详情
 */
const onClickTeamTask=(id:number)=>{
  router.push({
    path: '/team/task/info',
    query: {
      id,
    }
  })
}

/**
 * 时间转换
 */
const formatDate=(dateString:Date)=>{
  const date = new Date(dateString);
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}
/**
 * 完成任务
 */
const onTaskFinish=async (teamTaskId:number)=>{
  const res = await myAxios.post("/teamTask/finish", {
    id: teamTaskId,
  })
  if (res?.code === 0 && res) {
    showSuccessToast('完成任务成功')
  } else {
    showFailToast('评论失败' + (res.description ? `,${res.description}` : ''))
  }
}
watchEffect(()=>{
  loadDate();
})
</script>

<style scoped>
.task-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.button-container {
  display: flex;
  justify-content: flex-end; /* 右对齐按钮 */
  width: 100%; /* 让容器占满宽度 */
}

.complete-btn {
  margin-left: 10px; /* 保证按钮与文字之间有一定的间隔 */
}
.businessTypeOne {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 50%;
  right: 0;
  transform: translate(-10%, -50%);
}
.red-dot {
  width: 6px;
  height: 6px;
  background-color: #ff6f2f;
  border-radius: 50%;
  margin-top: 8px;
}
</style>
