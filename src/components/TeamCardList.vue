<template>
  <div id="teamCardList">
      <van-card
          v-for="team in props.teamList"
          :thumb="imgs"
          :desc="team.description"
          :title="`${team.teamName}`"
      >
        <template #tags>
          <van-tag plain type="danger" style="margin-right: 8px;margin-top: 8px">
            {{ teamStatusEnum[team.teamState] }}
          </van-tag>
        </template>
        <template #bottom>
          <div>
            {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}` }}
          </div>
          <div v-if="team.expireTime">
            {{ '过期时间:' + team.expireTime }}
          </div>
          <div>
            {{ '创建时间:' + team.createTime }}
          </div>
        </template>
        <template #footer>
          <van-button type="default" size="mini" @click="getInfoTeam(team.id)">
            查看队伍
          </van-button>
          <van-button type="primary" size="mini" @click="preJoinTeam(team)"
                      v-if="team.userId !== currentUser?.id && !team.hasJoin">
            加入队伍
          </van-button>
          <van-button v-if="team.userId === currentUser?.id || currentUser.userRole===1" type="default" size="mini" @click="doUpdateTeam(team.id)">
            更新队伍
          </van-button>
          <van-button type="default" size="mini" @click="doQuitTeam(team.id)" v-if="team.hasJoin">退出队伍</van-button>
          <van-button v-if="team.userId === currentUser?.id || currentUser.userRole===1" type="danger" size="mini" @click="doDeleteTeam(team.id)">
            解散队伍
          </van-button>
        </template>
      </van-card>
      <van-empty v-if="!teamList || teamList.length<1" description="无符合的队伍"/>
      <van-dialog v-model:show="showPasswordDialog" title="输入密码" @confirm="doJoinTeam" @cancel="doJoinCancel"
                  show-cancel-button>
        <van-field v-model="teamPassword" placeholder="队伍密码"/>
      </van-dialog>

  </div>
</template>

<script setup lang="ts">
import {teamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import imgs from "../assets/vue.svg"
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";
import {userType} from "../models/user";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: teamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  //@ts-ignore
  teamList: [] as teamType[],
});
const currentUser = ref('');
const router = useRouter();
const showPasswordDialog = ref(false)
const teamPassword = ref('')
const joinTeamId = ref(0);
const loading = ref(false);

/**
 * 加载用户信息
 */
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})
const preJoinTeam = (team: teamType) => {
  joinTeamId.value = team.id;
  if (team.teamState === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}
/**
 * 查看队伍信息详情
 */
const getInfoTeam = (id:number) =>{
  router.push({
    path: '/team/info',
    query: {
      id,
    }
  })
}
/**
 * 加入队伍
 * @param id
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post("/team/join", {
    teamId: joinTeamId.value,
    teamPassword: teamPassword.value,
  })
  if (res?.code === 0 && res) {
    showSuccessToast("加入成功")
    doJoinCancel();
  } else {
    showFailToast('加入失败' + (res.description ? `,${res.description}` : ''))
  }
}
/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post("/team/quit", {
    teamId: id
  })
  if (res?.code === 0 && res) {
    showSuccessToast("退出队伍成功")
  } else {
    showFailToast('退出失败失败' + (res.description ? `,${res.description}` : ''))
  }
}
/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post("/team/delete", {
    id,
  })
  if (res?.code === 0 && res) {
    showSuccessToast("解散队伍成功")
  } else {
    showFailToast("解散队伍失败")
  }
}
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

const doJoinCancel = () => {
  teamPassword.value = '';
  joinTeamId.value = 0;
}


</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>
