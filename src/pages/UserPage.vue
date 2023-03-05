<template>
  <div style="text-align: center;margin-top: 5px;margin-bottom: 2px">
    <van-uploader :max-size="5000 * 1024"
                  :max-count="1"
                  @oversize="onOversize"
                  :after-read="afterRead">
      <van-image
          round
          fit ="cover"
          width="5rem"
          height="5rem"
          :src="user?.avatarUrl"
      />
    </van-uploader>
    <van-divider/>
  </div>
    <van-cell title="用户昵称" :value="user?.username"/>
    <van-cell title="修改个人信息" is-link to="/user/update"/>
    <van-cell title="修改个人标签" is-link to="/user/update/tags"/>
    <van-cell title="创建的队伍" is-link to="/user/team/create"/>
    <van-cell title="加入的队伍" is-link to="/user/team/join"/>
    <van-button round type="danger" class="bottom-button" style="margin-left: 30%" @click="logout">注销</van-button>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";

const user  = ref("");
const router = useRouter();

onMounted(async ()=>{
  user.value = await getCurrentUser();
  console.log(user);
})


/**
 * 上传头像大小限制
 */
const onOversize = ()=>{
  showFailToast("头像上传大小不能超过500kb")
}

/**
 * 上传头像接口 设置header头信息，对接口的字段匹配，文件需要二进制
 */
const afterRead = async (file:object) =>{
  const res = await myAxios.post("/user/upload/avatar",{
    avatarImg:file.file,
  },{
    headers:{
      'Content-Type' : 'multipart/form-data'
    }
  })
  if (res?.code === 0 && res) {
    console.log(res)
    user.value.avatarUrl = res.data;
    showSuccessToast("更新头像成功")
  } else {
    showFailToast('更新头像失败' + (res.description ? `,${res.description}` : ''))
  }
}


const logout = async () =>{
 const res = await myAxios.post("/user/logout");
 console.log("退出",res)
  if(res){
    user.value = null;
  }
}
</script>

<style scoped>
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
