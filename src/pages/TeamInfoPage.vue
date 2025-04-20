<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh" style="min-height: 100vh;">
    <van-divider/>
    <div id="teamCardList">
      <van-card
          :thumb="imgs"
          :desc="teamInfo.description"
          :title="`${teamInfo.teamName}`"
      >
        <template #tags>
          <van-tag plain type="danger" style="margin-right: 8px;margin-top: 8px">
            {{ teamStatusEnum[teamInfo.teamState] }}
          </van-tag>
        </template>
        <template #bottom>
          <div>
            {{ `队伍人数: ${teamInfo.hasJoinNum}/${teamInfo.maxNum}` }}
          </div>
          <div v-if="teamInfo.expireTime">
            {{ '过期时间:' + teamInfo.expireTime }}
          </div>
          <div>
            {{ '创建时间:' + teamInfo.createTime }}
          </div>
        </template>
        <template #footer>

        </template>
      </van-card>
      <van-empty v-if="!teamInfo || teamInfo.length<1" description="无符合的队伍"/>
    </div>
    <van-tabs v-model:active="active">
      <van-tab title="teamUser">
        <template #title><van-icon name="friends-o" />队伍用户</template>
        <UserCardList :user-list="teamInfo.userJoinList" :loading="loading"/>
      </van-tab>
      <van-tab title='teamTask'>
        <template #title><van-icon name="notes-o" />队伍任务</template>
        <TeamTaskCardList :team-task-list="teamInfo.teamTaskList" :loading="loading"/>
      </van-tab>
    </van-tabs>
  </van-pull-refresh>
  <van-button v-if="teamInfo.userId===user?.id"  icon="plus" type="primary" class="add-button" @click="doTeamTaskAdd"/>

</template>

<script setup lang="ts">
import {teamStatusEnum} from "../constants/team";
import imgs from "../assets/vue.svg"
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {onMounted, ref, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {userType} from "../models/user";
import TeamTaskCardList from "../components/TeamTaskCardList.vue";
import {getCurrentUser} from "../services/user";

//const currentUser = ref('');
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const teamInfo = ref('');
const teamId = route.query.id;
const active=ref("teamUser")
const user=ref()
/**
 * 加载队伍信息
 */
onMounted(async () => {
  user.value=await getCurrentUser()

  const res = await myAxios.get("/team/get", {
    params: {
      id: teamId,
    }
  })
  if (res?.code === 0 && res) {
    console.log(res)
    teamInfo.value = res.data;

  } else {
    showFailToast('获取队伍信息失败' + (res.description ? `,${res.description}` : ''))
  }
  console.log("user",user.value)
})


const onRefresh = () => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};

/**
 * 添加帖子
 */
const doTeamTaskAdd = () => {
  router.push({
    path: "/team/task/add",
    query: {
      teamId,
    }
  })
}
</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>
