<template>
  <div id="manageQuestionView">
    <div class="top_operation">
      <AddQuestion
        :initial="editData"
        :visible="drawerVisible"
        class="add_question"
      />
      <a-button :loading="loading" type="primary" @click="refreshData()"
        >刷新
      </a-button>
    </div>
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #optional="{ record }">
        <a-space>
          <!--          <a-button type="primary" @click="doUpdate(record)"> 修改</a-button>-->
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import { Question, QuestionVO, Service } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import AddQuestion from "@/components/AddQuestionComponent.vue";
import { throttle } from "radash";

const show = ref(true);
const tableRef = ref();

const dataList = ref([]);
const total = ref(0);

const drawerVisible = ref(false);
const editData = ref({});

const loading = ref(false);

const searchParams = ref({
  pageSize: 5,
  current: 1,
});

const loadData = async () => {
  const res = await Service.listQuestionByPageUsingPost(searchParams.value);
  if (res.code === 200) {
    dataList.value = res.data.records;
    total.value = Number(res.data.total);
    loading.value = false; // 加载完成，隐藏加载状态
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
  },
  {
    title: "用户id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const doDelete = async (question: Question) => {
  const res = await Service.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 200) {
    message.success("删除成功");
    await loadData();
  } else {
    message.error("删除失败");
  }
};

const doUpdate = async (question: Question) => {
  // 定义新增和编辑接口，读取到父组件传递下来的数据，里面包括 visible 和 请求过后的数据
  // console.log(question);
  // const jsonString =
  //   '{\\"timeLimit\\":1000,\\"memoryLimit\\":1000,\\"stackLimit\\":1000}';
  // const correctedJsonString = jsonString.replace(/\\"/g, '"');
  // const jsonObject = JSON.parse(correctedJsonString);
  // console.log(jsonObject);

  console.log(question);
  editData.value = question as QuestionVO;
  drawerVisible.value = true;
};

// const refreshData = () => {
//   loading.value = true; // 开始加载数据，显示加载状态
//   setTimeout(() => {
//     loadData(); // 执行数据加载
//   }, 500);
// };

// 节流刷新数据函数
const throttledRefreshData = throttle({ interval: 1000 }, () => {
  loading.value = true; // 开始加载数据，显示加载状态
  // loadData(); // 执行数据加载
  setTimeout(async () => {
    await loadData(); // 执行数据加载
  }, 500);
}); // 设置节流时间为 3000 毫秒（即 3 秒）

const refreshData = () => {
  throttledRefreshData(); // 调用节流函数以刷新数据
};

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

watchEffect(() => {
  loadData();
});
</script>

<style scoped>
#manageQuestionView {
  .top_operation {
    display: flex;
    margin-bottom: 10px;

    .add_question {
      margin-right: 10px;
    }
  }
}
</style>
