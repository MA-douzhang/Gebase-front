<template>
    <van-cell-group inset>
      <van-card
          :title="post.username"
          :thumb="post.avatarUrl"
      >
        <template #desc>
          <div style="margin-top: 2px;color: darkgray">
            {{ post.content }}
          </div>

        </template>
        <template #footer>
          <van-divider/>
          <van-button size="small" @click="preAddComment(post.id)" icon="chat-o">评论</van-button>
          <van-button size="small" icon="good-job-o" @click="doThumb(post.id)" v-if="post.thumb" color="#ee0a24">{{post.thumbNum}}</van-button>
          <van-button size="small" icon="good-job-o" @click="doThumb(post.id)" v-if="!post.thumb">{{post.thumbNum}}</van-button>
          <van-button size="small" type="danger" v-if="post.userId === currentUser?.id" @click="doDeletePost(post.id)">
            删除
          </van-button>
        </template>
      </van-card>
      <div
          id="postComment"
          v-for="comment in post.postCommentList"
      >
        <van-cell :title="comment.username"
                  :icon="comment.avatarUrl"
                  :label="comment.content">
        </van-cell>

      </div>
    </van-cell-group>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"/>
  <van-empty v-if="!post || post.length<1" description="帖子不存在"/>
  <van-action-sheet v-model:show="show" title="评论" @close="doAddCommentCancel">
    <van-cell-group inset>
      <van-field
          v-model="comment"
          rows="2"
          autosize
          type="textarea"
          maxlength="200"
          placeholder="请输入评论"
          show-word-limit
      />
    </van-cell-group>
    <van-button size="small" type="primary" style="float: right; margin: 5px 12px;" @click="doAddComment">发送
    </van-button>
  </van-action-sheet>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";
import {getCurrentUser} from "../services/user";


const currentUser = ref('');
const comment = ref('');
const post = ref([]);
const postId = ref();
const show = ref(false);
const addCommentPost = ref(0);
const router = useRouter();
const route = useRoute();




/**
 * 接收帖子的信息
 */

onMounted(async () => {
  postId.value  = route.query.id;
  console.log("postId",post.value)
  await getPost();
  currentUser.value = await getCurrentUser();
})

/**
 * 删除帖子
 */
const doDeletePost = async (id: number) => {
  const res = await myAxios.post("/post/delete", {
    id: id,
  })
  if (res?.code === 0 && res) {
    showSuccessToast("删除成功")
  } else {
    showFailToast('删除失败' + (res.description ? `,${res.description}` : ''))
  }
}
/**
 * 获取帖子的列表
 */
const getPost = async () => {
  const res = await myAxios.get("/post/get", {
    params: {
      id : postId.value,
    }
  });
  if (res) {
    post.value = res.data;
    console.log(post)
  } else {
    showFailToast("加载队伍失败")
  }
};


const preAddComment = (postId: number) => {
  show.value = true;
  addCommentPost.value = postId;
}
/**
 * 给帖子评论
 */
const doAddComment = async () => {
  const res = await myAxios.post("/post/addComment", {
    content: comment.value,
    postId: addCommentPost.value,
  })
  if (res?.code === 0 && res) {
    doAddCommentCancel()
  } else {
    showFailToast('评论失败' + (res.description ? `,${res.description}` : ''))
  }
}
/**
 * 关闭评论
 */
const doAddCommentCancel = () => {
  comment.value = '';
  show.value = false;
}

/**
 * 点赞
 */
const doThumb = async (postId: number) => {
  const res = await myAxios.post("/post_thumb/", {
    postId: postId,
  })
  if (res?.code === 0 && res) {
    //返回为1表示点赞 返回为-1表示取消点赞
    if (res.data === 1){
      post.value.thumbNum +=1;
    }else {
      post.value.thumbNum -=1;
    }
    post.value.thumb = !post.value.thumb;
  } else {
    showFailToast('点赞失败' + (res.description ? `,${res.description}` : ''))
  }
}

watchEffect(() => {
  addCommentPost.value
})
</script>

<style scoped>

</style>
