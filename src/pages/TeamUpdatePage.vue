<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.teamName"
            name="teamName"
            label="队伍名称"
            placeholder="请输入队伍名称"
            :rules="[{ required: true, message: '请填写队伍名称' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="2"
            autosize
            label="描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <van-field
            is-link
            readonly
            name="datePicker"
            label="过期时间"
            :placeholder="addTeamData.expireTime ?? '点击选择时间'"
            @click="showPicker = true"
        />
        <van-popup
            v-model:show="showPicker"
            position="bottom"
            @confirm="showPicker = false"
            @cancel="showPicker = false">
          <van-date-picker
              v-model="addTeamData.expireTime"
              title="过期时间"
              type="datetime"
              @confirm="showPicker = false"
              @cancel="showPicker = false"
              :min-date="minDate"
          />
        </van-popup>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.teamState" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私密</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="Number(addTeamData.teamState) === 2"
            v-model="addTeamData.teamPassword"
            type="password"
            name="teamPassword"
            label="队伍密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
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

const router = useRouter();
const route = useRoute();

const teamId= route.query.id;

onMounted(async () =>{
  if(teamId == null && teamId <=0){
    showFailToast('加载队伍信息失败');
    return;
  }
  const res = await myAxios.get("team/get",{
    params:{
      id:teamId,
    }
  });
  if(res?.code === 0 && res){
    let expireDate =new Date(res.data.expireTime)
    res.data.expireTime = [expireDate.getFullYear(),expireDate.getMonth()+1,expireDate.getDate()]
    res.data.teamState = String(res.data.teamState)

    addTeamData.value = res.data
  }else {
    showFailToast('添加失败');
  }
})

const onSubmit = async () =>{
  const postDate = {
    ...addTeamData.value,
    teamState: Number(addTeamData.value.teamState),
    //后端需要 yyyy-mm-dd 格式Date，需要强转，date月份是从0开始设置的需要见一
    expireTime: new Date(addTeamData.value.expireTime[0],addTeamData.value.expireTime[1]-1,addTeamData.value.expireTime[2]),
  }
  const res = await myAxios.post("/team/update",postDate)
  if(res?.code === 0 && res){
    showSuccessToast('队伍更新成功');
    router.push({
      path: '/team',
      replace: true,
    });
  }else {
    showFailToast('队伍更新失败');
  }
}
const initFormData = {
  "teamName": "",
  "description": "",
  "expireTime": [],
  "maxNum":5,
  "userId":"",
  "teamState":0,
  "teamPassword":"",
}
const minDate = new Date();
const showPicker = ref(false);
const addTeamData = ref({...initFormData});


</script>

<style scoped>

</style>
