<template>
  <div class="container">
    <div id="questionsView">
      <a-form :model="searchParams" layout="inline">
        <!-- 下拉框: 选择难度 -->
        <a-dropdown
          :popup-max-height="false"
          @select="handleSelectDifficultyLevel"
        >
          <a-button
            >难度
            <icon-down />
          </a-button>
          <template #content>
            <a-doption>简单</a-doption>
            <a-doption>中等</a-doption>
            <a-doption>困难</a-doption>
            <a-doption>地狱</a-doption>
          </template>
        </a-dropdown>
        <!-- 下拉框: 选择状态,用户已经做完的题目-->
        <a-dropdown :popup-max-height="false" @select="handleSelectStatus">
          <a-button
            >状态
            <icon-down />
          </a-button>
          <template #content>
            <a-doption>未完成</a-doption>
            <a-doption>已完成</a-doption>
          </template>
        </a-dropdown>
        <!--        <a-form-item field="tag" style="min-width: 240px">-->
        <!--          <a-input-search v-model="searchParams.tags" placeholder="标签" />-->
        <!--        </a-form-item>-->

        <a-form-item field="tags" label="标签" style="min-width: 200px">
          <a-input-tag v-model="searchParams.tags" placeholder="标签" />
        </a-form-item>

        <a-form-item field="searchKey" style="min-width: 240px">
          <a-input-search
            v-model="searchParams.searchKey"
            placeholder="题目号,内容"
          />
        </a-form-item>
      </a-form>
      <a-divider size="0" />
      <a-table
        :ref="tableRef"
        :columns="columns"
        :data="dataList"
        :pagination="{
          showTotal: true,
          pageSize: searchParams.pageSize,
          current: searchParams.current,
          total
        }"
        @page-change="onPageChange"
      >
        <template #title="{ record }">
          <a
            class="title-link"
            href="javascript:void(0)"
            @click="toQuestionPage(record)"
          >
            {{ record.title }}
          </a>
        </template>
        <template #tags="{ record }">
          <a-space wrap>
            <a-tag
              v-for="(tag, index) of record.tags"
              :key="index"
              color="green"
              >{{ tag }}
            </a-tag>
          </a-space>
        </template>
        <template #acceptedRate="{ record }">
          {{
            `${
              record.submitNum ? record.acceptedNum / record.submitNum : '0'
            }% (${record.acceptedNum}/${record.submitNum})`
          }}
        </template>
        <template #createTime="{ record }">
          {{ dayjs(record.createTime).format('YYYY-MM-DD') }}
        </template>
        <!--      <template #optional="{ record }">-->
        <!--        <a-space>-->
        <!--          <a-button type="primary" @click="toQuestionPage(record)">-->
        <!--            做题-->
        <!--          </a-button>-->
        <!--        </a-space>-->
        <!--      </template>-->
      </a-table>
    </div>
    <div id="calendar">
      <div class="calendar_container"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch, watchEffect } from 'vue'
  import { Question, QuestionQueryRequest, Service } from '../../../generated'
  import message from '@arco-design/web-vue/es/message'
  import { useRouter } from 'vue-router'
  import dayjs from 'dayjs'

  const tableRef = ref()

  const dataList = ref([])
  const total = ref(0)
  const searchParams = ref<QuestionQueryRequest>({
    title: '',
    tags: [],
    searchKey: '',
    difficultyLevel: 0,
    status: 0,
    pageSize: 10,
    current: 1
  })

  const loadData = async () => {
    const res = await Service.listQuestionVoByPageUsingPost(searchParams.value)
    if (res.code === 200) {
      dataList.value = res.data.records
      total.value = res.data.total
    } else {
      message.error('加载失败，' + res.message)
    }
  }

  /**
   * 监听 searchParams 变量，改变时触发页面的重新加载
   */
  watchEffect(() => {
    loadData()
  })

  /**
   * 页面加载时，请求数据
   */
  onMounted(() => {
    loadData()
  })

  const columns = [
    {
      title: '题号',
      dataIndex: 'id'
    },
    {
      title: '题目名称',
      // dataIndex: "title",
      slotName: 'title'
    },
    {
      title: '标签',
      slotName: 'tags'
    },
    {
      title: '通过率',
      slotName: 'acceptedRate'
    },
    {
      title: '创建时间',
      slotName: 'createTime'
    }
  ]

  const onPageChange = (page: number) => {
    searchParams.value = {
      ...searchParams.value,
      current: page
    }
  }

  const router = useRouter()

  /**
   * 跳转到做题页面
   * @param question
   */
  const toQuestionPage = (question: Question) => {
    router.push({
      path: `/view/question/${question.id}`
    })
  }

  const handleSelectDifficultyLevel = (v) => {
    console.log(v)
    searchParams.value.difficultyLevel = v
    loadData()
  }
  const handleSelectStatus = (v) => {
    console.log(v)
    searchParams.value.status = v
    loadData()
  }

  // 监听 searchParams 变量的变化，改变时触发页面的重新加载
  watch(
    () => searchParams.value.searchKey,
    () => {
      loadData()
    }
  )
</script>

<style scoped>
  #questionsView {
    max-width: 1200px;
  }

  .title-link {
    color: black;
    text-decoration: none;
  }

  .title-link:hover {
    color: blue;
    text-decoration: underline;
    text-decoration: none;
  }

  .container {
    display: flex;
  }

  .arco-dropdown-open .arco-icon-down {
    transform: rotate(180deg);
  }
</style>
