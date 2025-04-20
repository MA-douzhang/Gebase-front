<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" />
    </template>
  </van-cell>
  <UserCardList :user-list="userList" :loading="loading"/>
  <template v-if="!isMatchMode">
    <van-empty v-if="!userList || userList.length<1" description="无符合的用户"/>
    <van-sticky :offset-top="50" change @click="loadDate()">
      <van-pagination
          v-model="currentPage"
          :total-items="125"
          :show-page-size="3"
          force-ellipses
          style="margin-bottom: 0"
      />
    </van-sticky>
  </template>

</template>

<script setup lang="ts">
import UserCardList from "../components/UserCardList.vue";
import myAxios from "../plugins/myAxios";
import {ref, watchEffect} from "vue";
import {userType} from "../models/user";
import {showFailToast, showSuccessToast} from "vant";

const userList = ref([]);
const isMatchMode = ref<boolean>(false);
const loading = ref<boolean>(true)
const currentPage =ref(1)


const loadDate = async () =>{
  let userListData;
  loading.value = true
  //开启心动模式
  if (isMatchMode.value){
    const num = 5;
    userListData = await myAxios.get('/user/match', {
      params:{
        num,
      }
    })
        .then(function (response) {
          console.log(response);
          showSuccessToast("开启心动模式");
          return response?.data;
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        })
  }else {
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageNum:currentPage.value,
        pageSize:15,
      }
    })
        .then(function (response) {
          console.log(response);
          if (response?.data === null){
            showFailToast( '' + (response.description ? `${response.description}` : ''))
            return null;
          }
          return response?.data;
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        })
  }
  userList.value = userListData
  loading.value = false;
  console.log("loading",isMatchMode.value)

}
//按钮有变化是触发
watchEffect(()=>{
  loadDate();
})
</script>

<style scoped>

</style>
