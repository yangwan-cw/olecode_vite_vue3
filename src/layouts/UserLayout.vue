<template>
  <div id="basic-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="basic-layout-header"> </a-layout-header>
      <a-layout-content class="basic-layout-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
#basic-layout {
  .basic-layout-content {
    //margin-bottom: 16px;
    //padding: 20px;
  }
}
</style>
