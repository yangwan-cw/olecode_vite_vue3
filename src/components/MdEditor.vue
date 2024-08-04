<template>
  <div class="md">
    <Editor :plugins="plugins" :value="value" @change="handleChange" />
  </div>
</template>
<script lang="ts" setup>
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor } from "@bytemd/vue-next";
import { ref  } from "vue";

const plugins = [gfm(), highlight()];

interface Props {
  value: string;
  handleChange: (value: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  handleChange: (v: string) => {
    console.log("props", v);
  },
});
</script>
<style lang="less" scoped></style>
