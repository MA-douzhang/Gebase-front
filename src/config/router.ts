import SearchPage from "../pages/SearchPage.vue";
import IndexPage from "../pages/IndexPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserJoinPage from "../pages/UserJoinPage.vue";
import UserCreatePage from "../pages/UserCreatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserRegisterPage from "../pages/UserRegisterPage.vue";
import UserTagsPage from "../pages/UserTagsPage.vue";
import TeamInfoPage from "../pages/TeamInfoPage.vue";
import PostPage from "../pages/PostPage.vue";
import PostAddPage from "../pages/PostAddPage.vue";
import UserChatListPage from "../pages/UserChatListPage.vue";
import UserChatPage from "../pages/UserChatPage.vue";
import NoticeListPage from "../pages/NoticeListPage.vue";
import PostInfoPage from "../pages/PostInfoPage.vue";


const routes = [
    {path: '/', component: IndexPage},
    {path: '/team',title:"找队伍", component: TeamPage},
    {path: '/team/add',title:"创建队伍", component: TeamAddPage},
    {path: '/team/update', title:"更新队伍",component: TeamUpdatePage},
    {path: '/team/info', title:"队伍信息",component: TeamInfoPage},
    {path: '/user', title:"个人信息",component: UserPage},
    {path: '/search', title:"找伙伴",component: SearchPage},
    {path: '/user/edit', title:"编辑信息",component: UserEditPage},
    {path: '/user/list', title:"用户列表",component: SearchResultPage},
    {path: '/user/login',title:"登录", component: UserLoginPage},
    {path: '/user/register',title:"注册", component: UserRegisterPage},
    {path: '/user/update', title:"更新信息",component: UserUpdatePage},
    {path: '/user/chat', title:"聊天",component: UserChatListPage},
    {path: '/user/chat/info', title:"聊天页面",component: UserChatPage},
    {path: '/user/update/tags',title:"更新标签", component: UserTagsPage},
    {path: '/user/team/create',title:"我创建的队伍", component: UserCreatePage},
    {path: '/user/team/join', title:"我加入的队伍",component: UserJoinPage},
    {path: '/post', title:"伙伴圈",component: PostPage},
    {path: '/post/add', title:"发布帖子",component: PostAddPage},
    {path: '/post/info', title:"帖子详情",component: PostInfoPage},
    {path: '/notice', title:"通知信息",component: NoticeListPage},
]
export default routes;
