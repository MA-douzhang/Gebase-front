<template>
  <van-search v-model="value" placeholder="请输入搜索关键词"  @search="onSearch" />
  <van-tabs v-model:active="active" @click-tab="onTabChange">
    <van-tab title="公开" name='public'/>
    <van-tab title="加密" name='secret'/>
  </van-tabs>
  <TeamCardList :team-list="teamList"/>
</template>

<script setup>
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
const teamList = ref([]);
const value = ref('');
const searchText = ref('');
const active =ref('public');



/**
 * 加载队伍信息
 * @param val
 * @param state
 * @returns {Promise<void>}
 */
const listTeam = async (val = '',state = 0) => {
  const res = await myAxios.get("/team/list/my/join", {
       params :{
         searchText: val,
         teamState: state,
       }
      });
  if (res){
    console.log("加载成功",res)
    teamList.value = res.data;
  }else {
    showFailToast("加载队伍失败"+res.description)
  }
};
/**
 * 队伍状态查询切换
 * @param name
 */
const onTabChange = ({name}) => {
  //查队伍状态
  if (name === 'public') {
    listTeam(searchText.value,0);
  }else {
    listTeam(searchText.value,2);
  }
}
/**
 * 页面渲染时加载队伍
 */
onMounted(async () =>{
  listTeam();
})

/**
 * 关键词搜索队伍（队伍名+队伍描述）
 */
const onSearch = (val) =>{
  listTeam(val);
}
</script>

<style scoped>

</style>
