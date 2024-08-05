<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 600px" />
  <!--  <a-button @click="fillValue">填充值</a-button>-->
</template>

<script lang="ts" setup>
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, watch } from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  handleChange: (v: string) => void;
  language: "";
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
  language: "",
});

const codeEditorRef = ref();
const codeEditor = ref();

const fillValue = () => {
  if (!codeEditor.value) {
    return;
  }
  // 改变值
  toRaw(codeEditor.value).setValue("新的值");
};

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);
// 判断
onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs-dark",
    lineNumbers: "off",
    roundedSelection: false,
    scrollBeyondLastLine: false,
  });

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    console.log(props);

    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>
