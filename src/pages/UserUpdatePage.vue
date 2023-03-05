<template>
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称',user.username,'请输入新昵称')"/>
    <van-cell title="账号" :value="user.userAccount" />
    <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl','头像',user.avatarUrl,'请输入图片的地址')" >
      <img style="height: 48px" :src="user.avatarUrl"/>
    </van-cell>
    <van-cell title="个人介绍" is-link to="/user/edit" :value="user.userProfile" @click="toEdit('userProfile','个人介绍',user.userProfile,'请输入个人介绍')"/>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender','性别',user.gender,'输入 0 为男 1为女')"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone,'请输入电话号')"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email,'请输入邮箱')"/>
    <van-cell title="注册时间" :value="user.createTime" />
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";

const user = ref("");
onMounted(async ()=>{
  user.value = await getCurrentUser();
  console.log(user);
})

const router = useRouter();

const toEdit = (editKey: string,editName: string,currentValue: string,placeholder:string) =>{
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
      placeholder,
    }
  })
}

</script>

<style scoped>
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
