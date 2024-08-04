<template>
  <div class="basic-component-header">
    <a-row :wrap="false" align="center" class="dynamic-header">
      <a-col flex="auto">
        <a-menu
          :selected-keys="searchKey"
          mode="horizontal"
          style="align-items: center"
          @menu-item-click="toPage"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img class="logo" src="../../public/logo.png" />
              <div class="olecode-vue3">OleCode-Vue3</div>
            </div>
          </a-menu-item>
          <!--         设置图标  -->
          <a-menu-item v-for="item in visibleTag" :key="item.path">
            <template #icon>
              <component :is="item?.meta?.icon" />
              <!--              <IconHome />-->
            </template>
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <div class="user-info">
          <div class="avatar-container">
            <a-avatar :imageUrl="loginUser?.userAvatar" class="avatar">
            </a-avatar>
            <!--            <img alt="Avatar" class="avatar" src="../assets/pink_dog.jpeg" />-->
            <!--            <a-badge class="avatar-status" status="danger" />-->
          </div>
          <div>{{ loginUser?.userName ?? "未登录" }}</div>
        </div>
      </a-col>
      <div class="basic-component-header-icon">
        <a-col flex="30%">
          <a href="https://github.com/yangwan-cw">
            <github-one fill="#000000" size="24" theme="outline" />
          </a>
        </a-col>
        <a-col
          flex="40%"
          style="display: flex; justify-content: center; align-items: center"
        >
          <a href="https://cn.vuejs.org/">
            <svg
              height="24"
              style="fill: rgb(65, 184, 131); msfilter: "
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m12 12.765 5.592-9.437h-3.276L12 7.33v.002L9.688 3.328h-3.28z"
              ></path>
              <path
                d="M18.461 3.332 12 14.235 5.539 3.332H1.992L12 20.672l10.008-17.34z"
              ></path>
            </svg>
          </a>
          <a href="https://cn.vuejs.org/">
            <p>{{ version }}</p></a
          >
          <!--          <a-space size="large">-->
          <!--            <a-dropdown trigger="hover">-->
          <!--              <icon-sun-fill style="font-size: 24px" />-->
          <!--              <template #content>-->
          <!--                <a-doption-->
          <!--                  v-for="(mode, index) in modes"-->
          <!--                  :key="index"-->
          <!--                  @click="selectMode(index)"-->
          <!--                >-->
          <!--                  <template #icon>-->
          <!--                    <icon-check-->
          <!--                      v-if="selectedMode === index"-->
          <!--                      style="color: blue"-->
          <!--                    />-->
          <!--                  </template>-->
          <!--                  <template #default>{{ mode }}</template>-->
          <!--                </a-doption>-->
          <!--              </template>-->
          <!--            </a-dropdown>-->
          <!--          </a-space>-->
        </a-col>
      </div>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { routes } from "@/router/routers";
import router from "@/router";
import { computed, ref, version } from "vue";
import { GithubOne } from "@icon-park/vue-next";
import { useRouter } from "vue-router";
import useStore from "@/store/index";
import { storeToRefs } from "pinia";
import checkAuth from "@/auth/CheckAccess";

const routerApi = useRouter();
const searchKey = ref(["/"]);
const { useUserStore } = useStore();
const { loginUser } = storeToRefs(useUserStore());
const { fetchAndUpdateUser } = useUserStore();
const selectedMode = ref<number>(0); // 初始选中第一个模式
const modes = ["明亮模式", "暗黑模式"];

/**
 * 系统级别模式切换
 * @param index
 */
const selectMode = (index: number) => {
  selectedMode.value = index;
  // 可以在这里添加更多逻辑，例如改变应用主题
  console.log(index);
  if (index === 0) {
    document.body.removeAttribute("arco-theme");
  }
  if (index === 1) {
    document.body.setAttribute("arco-theme", "dark");
  }
};

const visibleTag = computed(() => {
  return routes.filter((item) => {
    // 如果是有隐藏按钮，那么就不显示
    if (item.meta?.isHideTag) {
      return false;
    }
    if (!checkAuth(useUserStore(), item?.meta?.roles as string)) {
      return false;
    }
    return true;
  });
});

routerApi.afterEach((to) => {
  searchKey.value = [to.path];
});

const toPage = (key: string) => {
  router.push({
    path: key,
  });
};
fetchAndUpdateUser();
</script>

<style lang="less" scoped>
.basic-component-header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid;
  border-color: #00000014;

  .dynamic-header {
    width: @header-width;
  }

  .basic-component-header-icon {
    display: flex;
    align-items: center;

    p {
      color: #41b883;
    }
  }
}

.title-bar {
  display: flex;
  align-items: center;

  .olecode-vue3 {
    color: #165dff;
    margin-left: 16px;
    font-weight: bold;
  }
}

.logo {
  height: 32px;
  margin-top: 3px;
}

.user-info {
  display: flex;
  align-items: center;

  .avatar-container {
    position: relative;

    .avatar {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      margin-right: 8px;
    }

    .avatar-status {
      position: absolute;
      bottom: 0;
      right: 13px;
    }
  }
}
</style>
