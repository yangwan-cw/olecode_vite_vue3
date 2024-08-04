<template>
  <div id="layout-app">
    <template v-if="router.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <basic-layout />
    </template>
  </div>
</template>

<style lang="less">
#layout-app {
}
</style>
<script lang="ts" setup>
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const router = useRoute();
const init = () => {
  console.log(router.path.startsWith("/user"));
};
onMounted(() => {
  init();
});
</script>
