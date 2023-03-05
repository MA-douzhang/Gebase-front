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
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary"  native-type="submit">
        登录
      </van-button>
      <van-divider/>
      <van-button round block type="default" plain to="/user/register">
        注册新用户
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
const router = useRouter();
const route = useRoute();
const onSubmit = async () => {
  const res = await myAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  })
  console.log(res, "登录返回信息");
  if (res.code === 0 && res.data) {
    //跳转到之前页面
    const redirectUrl = route.query?.redirect as string ?? '/';
    showSuccessToast('登陆成功');
    window.location.href = redirectUrl;
  } else {
    showFailToast('登录失败'+res.description);
  }
};
</script>

<style scoped>

</style>
