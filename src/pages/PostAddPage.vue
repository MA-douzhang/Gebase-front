<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="content"
            rows="2"
            autosize
            type="textarea"
            maxlength="500"
            placeholder="请输入贴子内容，内容大于10"
            show-word-limit
        />
      </van-cell-group>

      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit" >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import 'vant/es/toast/style';


const router = useRouter();
const content = ref('');



const onSubmit = async () =>{
  const res = await myAxios.post("/post/add",{
    content: content.value,
  })
  if(res?.code === 0 && res){
    showSuccessToast('添加成功');
    router.push({
      path: '/post',
      replace: true,
    });
  }else {
    showFailToast('添加失败'+res.description);
  }
}


const value = ref(1);

</script>

<style scoped>

</style>
