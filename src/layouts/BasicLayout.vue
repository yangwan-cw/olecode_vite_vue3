<template>
  <div id="basic-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="basic-layout-header">
        <BasicHeader />
      </a-layout-header>
      <a-layout-content class="basic-layout-content">
        <div class="basic-layout-content-container">
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer class="basic-layout-footer">
        <div class="basic-layout-footer-container">
          <p>oleCode-vue3</p>
          由
          <a href="https://github.com/yangwan-cw">
            <div class="link-my-github">
              ioomex....
              <img
                alt=""
                src="https://media.giphy.com/media/WUlplcMpOCEmTGBtBW/giphy.gif"
                width="25"
              />
            </div>
          </a>
          所开发
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import BasicHeader from "@/components/BasicHeader.vue";
</script>

<style lang="less" scoped>
#basic-layout {
  .basic-layout-content {
    margin-bottom: 16px;
    padding: 20px;
    display: flex;
    justify-content: center;
    //align-items: center;
    .basic-layout-content-container {
      width: @common-width;
    }
  }

  .basic-layout-footer {
    font-size: 16px;
    text-align: center;
    padding: 16px;
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;

    .basic-layout-footer-container {
      width: @common-width;
    }
    a {
      text-decoration: none;
      color: @font-color;
      text-transform: capitalize;
    }

    .link-my-github {
      display: inline-block;
    }

    p {
      display: inline-block;
      //color: #08c161;
      text-transform: capitalize;
    }
  }
}
</style>
