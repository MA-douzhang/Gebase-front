<template>
  <UserCardList :user-list="userList"/>
  <van-empty v-if="!userList || userList.length<1" description="无符合的用户" />
</template>

<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import qs from "qs";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const { tags } = route.query;
const userList = ref([]);


onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList : tags
    },
      paramsSerializer: {
        serialize:function(params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      }
  })
    .then(function (response) {
      return response?.data;
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    })
  //在后端处理了tag标签转json格式的问题
    if (userListData){
      userListData.forEach(user =>{
        // if (user.tags){
        //   user.tags = JSON.parse(user.tags);
        // }
      })
      userList.value = userListData
    }
})

</script>

<style scoped>

</style>
