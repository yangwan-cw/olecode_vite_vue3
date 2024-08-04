<template>
  <div class="codeShare">
    <!--    <div>-->
    <!--      <a-alert type="warning">-->
    <!--        我们不会公开你的文档，代码分享后将会给你一个访问链接，链接有效期为三天。在刷新页面前请保存好你的链接-->
    <!--      </a-alert>-->
    <!--    </div>-->
    <!--    <div class="upload-file-container">-->
    <!--      &lt;!&ndash; 新增一个 div 来放置进度条 &ndash;&gt;-->
    <!--      <a-progress-->
    <!--        v-show="data.isDis"-->
    <!--        :percent="0.2"-->
    <!--        :percentage="data.load"-->
    <!--        :style="{ width: '50%' }"-->
    <!--      />-->
    <!--    </div>-->
    <!--    <div class="share-code-container">-->
    <!--      &lt;!&ndash; 新增一个 div 来放置分享按钮 &ndash;&gt;-->
    <!--      <a-button style="margin-bottom: 10px" @click="shareCode">分享</a-button>-->
    <!--      <a-modal-->
    <!--        v-model:visible="data.visible"-->
    <!--        @cancel="handleCancel"-->
    <!--        @ok="handleOk"-->
    <!--      >-->
    <!--        <template #title>文档分享链接</template>-->
    <!--        <div>-->
    <!--          You can customize modal body text by the current situation. This modal-->
    <!--          will be closed immediately once you press the OK button.-->
    <!--        </div>-->
    <!--      </a-modal>-->

    <!--      <a-button-->
    <!--        style="margin-bottom: 10px; margin-left: 10px"-->
    <!--        @click="shareCode"-->
    <!--        >pdf 下载-->
    <!--      </a-button>-->
    <!--    </div>-->
    <MdEditor
      v-model="data.text"
      :toolbarsExclude="toolbarsExcludeArray"
      @onSave="codeSave"
      @onUploadImg="onUploadImg"
    ></MdEditor>
  </div>
</template>

<script lang="ts" setup>
// import { onUploadImg, shareCodeApi } from "../util/api";
import { defineProps, onMounted, reactive, ref, withDefaults } from "vue";

import { MdEditor, ToolbarNames } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { Message } from "@arco-design/web-vue";

interface shareData {
  text: string;
  load: number;
  isDis: boolean;
  visible: boolean;
}

const toolbarsExcludeArray: ToolbarNames[] | undefined = [
  "link",
  "mermaid",
  "katex",
  "github",
];

const data = reactive<shareData>({
  text: "",
  load: 0,
  isDis: true,
  visible: false,
});

/**
 * 保存代码到本地
 * @param v 保存参数
 */
const codeSave = (v: string): void => {
  Message.info("已保存");
  localStorage.setItem("codeSave", v);
};
//
const href = window.location.href;
const url = href.substring(0, href.length - 10);

const handleOk = () => {
  data.visible = false;
};
const handleCancel = () => {
  data.visible = false;
};

// // 分享代码
const shareCode = () => {
  if (data.text === "") {
    return Message.error("为空不能分享！！！");
  }
  data.visible = true;
  console.log(data.text);

  // shareCodeApi({ text: data.text }).then((res) => {
  //   if (res.data.code === 200) {
  //     ElMessageBox.alert(
  //       `你的访问链接为：<br /><a style="word-break:break-all;" target='_blank' href="${url}/getCodeShare/${res.data.data}">${url}/getCodeShare/${res.data.data}</a>`
  //     );
  //     localStorage.removeItem("codeSave");
  //   }
  // });
};
//
onMounted(() => {
  // if (localStorage.getItem("codeSave")) {
  //   data.text = localStorage.getItem("codeSave") || "";
  //   console.log(data.text);
  // }
});

// // 图片上传
const onUploadImg = (files: FileList, callback: (urls: string[]) => void) => {
  // this.load = 0;
  // this.isDis = true;
  // const res = await Promise.all(
  //   Array.from(files).map((file) => {
  //     return new Promise((rev, rej) => {
  //       const form = new FormData();
  //       form.append("img", file);
  //       // @ts-ignore
  //       onUploadImg(form, this.onUploadProgress).then((res) => {
  //         rev(res);
  //       });
  //     });
  //   })
  // );
};

//   callback(res.map((item: any) => item.data.data));
// },
// // 获取图片上传进度
// onUploadProgress(e: number) {
//   this.load = e;
//   if (e === 100) {
//     setTimeout(() => {
//       this.isDis = false;
//     }, 1000);
//   }
// },
</script>

<style lang="less" scoped>
.md {
  height: 600px !important;
}

.codeShare {
  .share-code-container {
    margin-top: 5px;
  }
}
</style>
