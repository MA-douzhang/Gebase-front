<template>
    <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
      <van-card
          :desc="user.userProfile"
          :title="user.username"
          :thumb="user.avatarUrl"
          :tag="user.gender === 0?'男':'女'"
      >
        <template #tags>
          <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 8px">
            {{ tag }}
          </van-tag>
        </template>
        <template #footer>
          <van-button size="mini">联系我</van-button>
        </template>
      </van-card>
      <van-empty v-if="!props.userList || props.userList.length<1" description="无符合的用户"/>
    </van-skeleton>
</template>

<script setup lang="ts">
import {userType} from "../models/user";
import {onMounted, ref, watchEffect} from "vue";


interface UserCardListProps {
  loading: boolean
  userList: userType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  //@ts-ignore
  userList: [] as userType[],
});
//用户信息标签字符串化
const loadDate =() =>{
  console.log("userList"+props.userList)
  if (props.userList){
    props.userList.forEach((user:userType) =>{
      if (user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
  }
}
watchEffect(()=>{
  loadDate();
})
</script>

<style scoped>

</style>
