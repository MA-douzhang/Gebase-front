<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamTaskData.taskName"
            name="teamName"
            label="任务名称"
            placeholder="请输入任务名称"
            :rules="[{ required: true, message: '请填写任务名称' }]"
        />
        <van-field
            v-model="addTeamTaskData.description"
            rows="5"
            autosize
            label="任务描述"
            type="textarea"
            maxlength="500"
            placeholder="请输入队伍任务内容，内容大于10"
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
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import 'vant/es/toast/style';
import {getCurrentUser} from "../services/user";

const route=useRoute();
const teamId= route.query.teamId;

const initFormData = {
  "taskName": "",
  "description": "",
  "teamId":null,
}

const router = useRouter();
const content = ref('');
const addTeamTaskData = ref({...initFormData});
const user=ref();


const onSubmit = async () =>{
  const teamTaskData = {
    ...addTeamTaskData.value,
    teamId: Number(teamId),
  }
  const res = await myAxios.post("/teamTask/add",teamTaskData)
  if(res?.code === 0 && res){
    showSuccessToast('添加成功');
    router.back();
  }else {
    showFailToast('添加失败'+res.description);
  }
}


const value = ref(1);

onMounted(async ()=>{
  user.value=await getCurrentUser()
})
</script>

<style scoped>

</style>
