<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="账号"
          label="账号"
          placeholder="账号"
          :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请输入密码' }]"
      />
      <van-field
          v-model="checkPassword"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true ,validator, message: '请重新输入密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";

const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const router = useRouter();
const route = useRoute();



const onSubmit = async () => {
  const res = await myAxios.post("/user/register", {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value,
  })
  if (res.code === 0 && res.data) {
    //跳转到之前页面
    const redirectUrl = route.query?.redirect as string ?? '/';
    showSuccessToast('注册成功');
    window.location.href = redirectUrl;
  } else {
    showFailToast('注册失败 '+res.description);
  }
};
const validator = (val : string) =>{
  if (val === userPassword.value){
    return true;
  }
  return false;
}
</script>

<style scoped>

</style>
