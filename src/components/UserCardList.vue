<template>
    <van-skeleton title avatar :row="3" :loading="props.loading" v-for="(user,index) in props.userList">
      <van-card
          :desc="user.userProfile"
          :title="user.username"
          :thumb="user.avatarUrl"
          :tag="user.gender === 0?'男':'女'"
          class="card"
      >
        <template #tags>
          <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 8px">
            {{ tag }}
          </van-tag>
        </template>
        <template #footer>
          <van-button size="mini" @click="showPopup(index)">联系我</van-button>
        </template>
      </van-card>
      <van-empty v-if="!props.userList || props.userList.length<1" description="无符合的用户"/>
    </van-skeleton>
     <van-popup v-model:show="show" round :style="{ padding: '64px' }" >
       <van-cell>
         <!-- 使用 title 插槽来自定义标题 -->
         <template #title>
           <span class="custom-title">邮箱 :</span>
           <span>{{ userList[userIndex].email!==null? userList[userIndex].email:'保密' }}</span>
         </template>
       </van-cell>
       <van-cell>
       <template #title>
         <span class="custom-title">电话 :</span>
         <span>{{userList[userIndex].phone!==null? userList[userIndex].phone:'保密'}}</span>
       </template>
       </van-cell>
     </van-popup>
</template>

<script setup lang="ts">
import {userType} from "../models/user";
import {onMounted, ref, watchEffect} from "vue";

const show = ref(false)
const userIndex = ref(0)

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

const showPopup =(index:number) =>{
  show.value = true;
  userIndex.value = index
  console.log("d",index)
}
watchEffect(()=>{
  loadDate();
})
</script>

<style scoped>

.card {
  position: relative;
  margin-bottom: 12px;
  background-image: url("../assets/bg.png");
  height: 130px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #ffffff;
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  color: #ffffff;
}
.rightbox {
  padding: 5px 10px;
  position: absolute;
  right: 0;
  top: 15px;
  background-image: url("../assets/right.png");
  background-size: cover;
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 3px;
}


</style>
