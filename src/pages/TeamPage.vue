<template>
  <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch"/>
  <van-tabs v-model:active="active" @click-tab="onTabChange(active)">
    <van-tab title="公开" name='public'/>
    <van-tab title="加密" name='secret'/>
  </van-tabs>
  <van-pull-refresh v-model="loading" @refresh="onRefresh" style="min-height: 100vh;">
    <TeamCardList :team-list="teamList"/>
  </van-pull-refresh>
  <van-button icon="plus" type="primary" class="add-button" @click="doTeamAdd" style="z-index: 0"/>
</template>

<script setup>
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
const teamList = ref([]);
const value = ref('');
const searchText = ref('');
const active = ref('public');
const loading = ref(false);

/**
 * 创建队伍
 */
const doTeamAdd = () => {
  router.push({
    path: "/team/add",
  })
}
/**
 * 加载队伍信息
 * @param val
 * @param state
 * @returns {Promise<void>}
 */
const listTeam = async (val = '', state = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      teamState: state,
    }
  });
  if (res) {
    teamList.value = res.data;
  } else {
    showFailToast("加载队伍失败")
  }
};

/**
 * 队伍状态查询切换
 * @param name
 */
const onTabChange = (name) => {
  //查队伍状态
  if (name === 'public') {
    active.value = 'public';
    listTeam(searchText.value, 0);
  } else {
    active.value = 'secret';
    listTeam(searchText.value, 2);
  }
}
/**
 * 页面渲染时加载队伍
 */
onMounted(async () => {
  listTeam();
})

/**
 * 关键词搜索队伍（队伍名+队伍描述）
 */
const onSearch = (val) => {
  listTeam(val);
}
const onRefresh = () => {
  setTimeout(() => {
    loading.value = false;
    onTabChange(active.value);
  }, 1000);
};
</script>

<style scoped>

</style>
