import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import NotAuth from "@/views/NotAuth.vue";
import AccessAuth from "@/auth/AccessAuth";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLogin from "@/views/UserLogin.vue";
import UserRegister from "@/views/UserRegister.vue";
import AddQuestion from "@/components/AddQuestionComponent.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";
import SystemInfo from "@/views/SystemInfo.vue";
import Feedback from "@/views/Feedback.vue";
import { IconUpload } from "@arco-design/web-vue/es/icon";

// import { IconPlus, IconCheckCircle } from "@arco-design/web-vue/es/icon";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "登录页面",
        component: UserLogin,
        meta: {
          title: "登录页面",
        },
      },
      {
        path: "/user/register",
        name: "注册页面",
        component: UserRegister,
        meta: {
          title: "注册页面",
        },
      },
    ],
    meta: {
      title: "用户",
      isHideTag: true,
    },
  },
  {
    path: "/",
    name: "题库",
    component: QuestionsView,
    meta: {
      title: "浏览题目",
      roles: AccessAuth.USER,
      icon: "IconHome",
    },
  },
  {
    path: "/manage/question/",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      title: "浏览题目",
      roles: AccessAuth.ADMIN,
      icon: "icon-code-square",
    },
  },
  {
    path: "/error",
    name: "错误页面",
    component: NotAuth,
    meta: {
      title: "错误页面",
      isHideTag: true,
    },
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: ViewQuestionView,
    props: true,
    meta: {
      access: AccessAuth.USER,
      isHideTag: true,
    },
  },
  {
    path: "/system",
    name: "系统设置",
    component: SystemInfo,
    meta: {
      title: "系统模块",
      roles: AccessAuth.ADMIN,
      icon: "IconSettings",
    },
  },
  {
    path: "/feedback",
    name: "关于 & 反馈",
    component: SystemInfo,
    meta: {
      title: "反馈模块",
      roles: AccessAuth.USER,
      icon: "IconEmail",
    },
  },
  {
    path: "/message",
    name: "消息",
    component: SystemInfo,
    meta: {
      title: "消息模块",
      roles: AccessAuth.ADMIN,
      icon: "IconMessage",
    },
  },
];
