<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">
    已选标签
  </van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px;">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left">选择标签</van-divider>
    <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="tagList"
    />
  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>

</template>
<script setup>
import { ref } from 'vue';
import {useRouter} from "vue-router";

const router = new useRouter();

const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '学院',
    children: [
      {text: '智能科技学院', id: '智能科技学院'},
      {text: '汽车工程学院', id: '汽车工程学院'},
      {text: '商学院', id: '商学院'},
      {text: '人文学院', id: '人文学院'},
      {text: '盛宝金融科技学院', id: '盛宝金融科技学院'},
      {text: '艺术设计学院', id: '艺术设计学院'},
      {text: '体育与健康学院', id: '体育与健康学院'},
      {text: '吉利科技航空航天学院', id: '吉利科技航空航天学院'},
      {text: '博雅学院', id: '博雅学院'},
      {text: '创新创业学院', id: '创新创业学院'},
      {text: '外国语言与文化学院', id: '外国语言与文化学院'},
      {text: '马克思主义学院', id: '马克思主义学院'},
    ],
  },
  {
    text: '专业',
    children: [
      {text: '计算机科学与技术', id: '计算机科学与技术'},
      {text: '网络工程', id: '网络工程'},
      {text: '数据科学与大数据', id: '数据科学与大数据'},
      {text: '虚拟现实技术', id: '虚拟现实技术'},
      {text: '车辆工程', id: '车辆工程'},
      {text: '汽车服务工程', id: '汽车服务工程'},
      {text: '机器设计制造及其自动化', id: '机器设计制造及其自动化'},
      {text: '新能源汽车工程', id: '新能源汽车工程'},
      {text: '机器人工程', id: '机器人工程'},
      {text: '智能车辆工程', id: '智能车辆工程'},
      {text: '知识产权', id: '知识产权'},
      {text: '艺术设计学', id: '艺术设计学'},
      {text: '数字媒体艺术', id: '数字媒体艺术'},
      {text: '产品设计', id: '产品设计'},
      {text: '环境艺术设计', id: '环境艺术设计'},
      {text: '财务管理', id: '财务管理'},
      {text: '人力资源管理', id: '人力资源管理'},
      {text: '市场营销', id: '市场营销'},
      {text: '审计学', id: '审计学'},
      {text: '管理科学与工程', id: '管理科学与工程'},
      {text: '大数据管理与应用', id: '大数据管理与应用'},
      {text: '物流管理', id: '物流管理'},
      {text: '电子商务', id: '电子商务'},
      {text: '国际经济与贸易', id: '国际经济与贸易'},
      {text: '经济与金融', id: '经济与金融'},
      {text: '金融科技', id: '金融科技'},
      {text: '飞行器控制与信息工程', id: '飞行器控制与信息工程'},
      {text: '飞行器制造工程', id: '飞行器制造工程'},
      {text: '运动康复', id: '运动康复'},
      {text: '体育经济与管理', id: '体育经济与管理'},
      {text: '学前教育', id: '学前教育'},
      {text: '小学教育', id: '小学教育'},
      {text: '表演', id: '表演'},
      {text: '广播电视编导', id: '广播电视编导'},
      {text: '网络与新媒体', id: '网络与新媒体'},
      {text: '动画', id: '动画'},
      {text: '英语', id: '英语'},
      {text: '电子信息工程', id: '电子信息工程'},
      {text: '人工智能', id: '人工智能'},
      {text: '物联网', id: '物联网'},
      {text: '广播电视编导', id: '广播电视编导'},
      {text: '网络与新媒体', id: '网络与新媒体'},
      {text: '动画', id: '动画'},
      {text: '英语', id: '英语'},
    ],
  },
  {
    text: '体育爱好',
    children: [
      {text: '篮球', id: '篮球'},
      {text: '足球', id: '足球'},
      {text: '乒乓球', id: '乒乓球'},
      {text: '羽毛球', id: '羽毛球'},
      {text: '橄榄球', id: '橄榄球'},
      {text: '台球', id: '台球'},
      {text: '跑步', id: '跑步'},
      {text: '滑板', id: '滑板'},
    ],
  },
  {
    text: '艺术爱好',
    children: [
      {text: '绘画', id: '绘画'},
      {text: '舞蹈', id: '舞蹈'},
      {text: '吉他', id: '吉他'},
      {text: '小提琴', id: '小提琴'},
      {text: '钢琴', id: '钢琴'},
      {text: '架子鼓', id: '架子鼓'},
      {text: '唱歌', id: '唱歌'},
    ],
  },
  {
    text: '技术',
    children: [
      {text: 'Java', id: 'Java'},
      {text: 'Python', id: 'Python'},
      {text: 'Go', id: 'Go'},
      {text: 'Vue', id: 'Vue'},
      {text: 'React', id: 'React'},
      {text: 'Node.js', id: 'Node.js'},
      {text: '嵌入式', id: '嵌入式'},
    ],
  },
];


const searchText = ref('');
let tagList = ref(originTagList);

/**
 *  搜索过滤标签
 * @param val
 */
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag =>{
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  });
}
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};

const activeIds = ref([]);
const activeIndex = ref(0);


const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item =>{
    return item !== tag;
  })
};
/**
 * 执行搜索
 */
const doSearchResult = () =>{
  router.push({
    path: '/user/list',
    query: {
     tags : activeIds.value
    }
  })
}
</script>

<style scoped>

</style>
