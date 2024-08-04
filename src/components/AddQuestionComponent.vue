<template>
  <div id="addQuestion">
    <div>
      <a-button type="primary" @click="handleClick">新增问题</a-button>
    </div>

    <a-drawer
      :footer="!custom.includes('hide footer')"
      :visible="visible"
      :width="1000"
      esc-to-close
      unmountOnClose
      @cancel="handleCancel"
      @ok="handleOk"
    >
      <template #header>
        <span v-if="currentStep === 1">题目基本信息</span>
        <span v-else-if="currentStep === 2">题目配置信息</span>
      </template>
      <div class="question_container">
        <div class="question_step">
          <a-progress :percent="progress" :steps="2" />
          <div class="question_step_container">
            <div class="question_progress_content">
              <span :class="step1Class">步骤1</span>
              <span :class="step2Class">步骤2</span>
            </div>
          </div>
        </div>

        <template v-if="currentStep === 1">
          <div class="question_data">
            <!--          读取到用户输入的数据-->
            <div class="question_data_title">
              <a-form
                :model="result"
                :style="{ width: '900px' }"
                label="title"
                layout="inline"
              >
                <a-form-item field="title" label="标题: ">
                  <a-input
                    v-model="result.title"
                    placeholder="请输入问题的标题"
                  />
                </a-form-item>
              </a-form>
            </div>
            <div class="question_data_tag">
              <p>标签:</p>
              <a-space wrap>
                <a-tag
                  v-for="(tag, index) of result.tags"
                  :key="tag"
                  :closable="index !== 0"
                  @close="handleRemove(tag)"
                >
                  {{ tag }}
                </a-tag>

                <a-input
                  v-if="showInput"
                  ref="inputRef"
                  v-model.trim="inputVal"
                  :style="{ width: '90px' }"
                  size="mini"
                  @blur="handleAdd"
                  @keyup.enter="handleAdd"
                />
                <a-tag
                  v-else
                  :style="{
                    width: '90px',
                    backgroundColor: 'var(--color-fill-2)',
                    border: '1px dashed var(--color-fill-3)',
                    cursor: 'pointer'
                  }"
                  @click="handleEdit"
                >
                  <template #icon>
                    <!--                    <icon-plus />-->
                  </template>
                  添加语言标签
                </a-tag>
              </a-space>
            </div>
            <div class="question_data_content">
              <p>内容:</p>
              <MdEditor
                :handle-change="onContentChange"
                :value="result.content"
              />
            </div>
            <div class="question_data_answer">
              <p>答案:</p>
              <MdEditor
                :handle-change="onAnswerChange"
                :value="result.answer"
              />
            </div>
            <div class="question_button">
              <a-button
                style="margin-top: 30px"
                type="primary"
                @click="nextStep"
                >{{ progress === 1 ? '确认' : '下一步' }}
              </a-button>
            </div>
          </div>
        </template>

        <template v-else-if="currentStep === 2">
          <div class="addJudgeConfig_container">
            <div class="addJudgeConfig_list">
              <h4>题目配置</h4>
              <div class="addJudgeConfig_list_item">
                <div>
                  <span>内存限制 [mb]</span>
                  <a-space direction="vertical" size="large">
                    <a-input-number
                      v-model="result.judgeConfig.memoryLimit"
                      :style="{ width: '350px' }"
                      allow-clear
                      placeholder="请输入内存限制"
                    >
                      <template #plus>
                        <!--                        <icon-plus />-->
                      </template>
                      <template #minus>
                        <!--                        <icon-minus />-->
                      </template>
                    </a-input-number>
                  </a-space>
                </div>
                <div>
                  <span>堆栈限制 [mb]</span>
                  <a-space direction="vertical" size="large">
                    <a-input-number
                      v-model="result.judgeConfig.stackLimit"
                      :style="{ width: '350px' }"
                      allow-clear
                      placeholder="请输入堆栈限制"
                    >
                      <template #plus>
                        <!--                        <icon-plus />-->
                      </template>
                      <template #minus>
                        <!--                        <icon-minus />-->
                      </template>
                    </a-input-number>
                  </a-space>
                </div>
                <div>
                  <span>时间限制 [ms]</span>
                  <a-space direction="vertical" size="large">
                    <a-input-number
                      v-model="result.judgeConfig.timeLimit"
                      :style="{ width: '350px' }"
                      allow-clear
                      placeholder="请输入时间限制"
                    >
                      <template #plus>
                        <!--                        <icon-plus />-->
                      </template>
                      <template #minus>
                        <!--                        <icon-minus />-->
                      </template>
                    </a-input-number>
                  </a-space>
                </div>
              </div>
            </div>
          </div>

          <div class="addJudgeCase_container">
            <div class="addJudgeCase_list">
              <h4>用例配置</h4>
              <label for="addJudgeCase">输入输出用例: </label>
              <a-button size="mini" type="primary" @click="addCase"
                >新增用例
              </a-button>
              <div
                v-for="(caseItem, index) in result.judgeCase"
                :key="index"
                class="addJudgeCase_list_item"
              >
                <div>
                  <span>输入用例</span>
                  <a-space>
                    <a-input
                      v-model="caseItem.input"
                      :style="{ width: '320px' }"
                      allow-clear
                      placeholder="请输入用例"
                    />
                  </a-space>
                </div>
                <div>
                  <span style="margin-left: 10px">输出用例</span>
                  <a-space>
                    <a-input
                      v-model="caseItem.output"
                      :style="{ width: '320px' }"
                      allow-clear
                      placeholder="请输出用例"
                    />
                  </a-space>
                </div>
                <span
                  question_button
                  style="margin-left: 10px; color: #165dff; cursor: pointer"
                  @click="index !== 0 && deleteCase(index)"
                  >删除用例</span
                >
              </div>
            </div>
          </div>

          <div class="">
            <a-button type="primary" @click="lastStep"
              >{{ progress === 1 ? '上一步' : '无' }}
            </a-button>
            <a-button
              style="margin-left: 10px"
              type="primary"
              @click="submitData"
              >{{ progress === 1 ? '确认' : '下一步' }}
            </a-button>
          </div>
        </template>
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  import {
    computed,
    defineProps,
    nextTick,
    reactive,
    ref,
    withDefaults
  } from 'vue'
  import MdEditor from '@/components/MdEditor.vue'
  import { Service } from '../../generated'
  import message from '@arco-design/web-vue/es/message'

  interface question {
    answer?: string
    content?: string
    title: string
    tags: Array<string>

    judgeCase: [
      {
        input: string
        output: string
      }
    ]

    judgeConfig: { memoryLimit: number; stackLimit: number; timeLimit: number }
  }

  const visible = ref(false)
  const custom = ref(['hide footer'])
  const progress = ref(0.5)

  /**
   * 问题
   */
  const result = reactive<question>({
    title: '',
    answer: '',
    content: '',
    tags: [],
    judgeConfig: {
      memoryLimit: 0,
      stackLimit: 0,
      timeLimit: 0
    },
    judgeCase: [
      {
        input: '',
        output: ''
      }
    ]
  })

  // 当点击的时候需要去读接口返回标签页面
  const inputRef = ref(null)
  const showInput = ref(false)
  const inputVal = ref('')
  const currentStep = ref(1)

  const handleEdit = () => {
    showInput.value = true

    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.focus()
      }
    })
  }

  const handleAdd = () => {
    if (inputVal.value) {
      result.tags.push(inputVal.value)
      inputVal.value = ''
    }
    showInput.value = false
  }

  const handleRemove = (key: string) => {
    result.tags = result.tags.filter((tag) => tag !== key)
  }

  const handleClick = () => {
    visible.value = true
  }
  const handleOk = () => {
    visible.value = false
  }
  const handleCancel = () => {
    visible.value = false
  }

  const nextStep = () => {
    if (progress.value < 1) {
      progress.value += 0.5
    }

    if (currentStep.value === 1) {
      currentStep.value = 2 // 切换到第二步
    } else if (currentStep.value === 2) {
      // 处理第二步的逻辑，比如保存数据等
      console.log('完成配置！')
    }
    console.log(result)
  }

  const lastStep = () => {
    if (progress.value >= 1) {
      progress.value = 0.5
    }

    if (currentStep.value === 2) {
      currentStep.value = 1 // 切换到第一步
    }
    console.log(result)
  }

  const step1Class = computed(() => ({
    active: progress.value >= 0.5,
    'color-yellow': progress.value === 0.5,
    'color-green': progress.value === 1
  }))

  const step2Class = computed(() => ({
    active: progress.value >= 1,
    'color-green': progress.value === 1
  }))

  const onContentChange = (value: string) => {
    result.content = value
  }

  const onAnswerChange = (value: string) => {
    result.answer = value
  }

  const addCase = () => {
    result.judgeCase.push({ input: '', output: '' })
  }

  const deleteCase = (index: number) => {
    if (result.judgeCase.length > 1) {
      result.judgeCase.splice(index, 1)
    }
  }

  const submitData = () => {
    Service.addQuestionUsingPost(result)
      .then((res) => {
        console.log(res)
        if (res.code === 200) {
          message.success('成功')
          visible.value = false
        } else {
          message.error('错误')
        }
      })
      .catch((err) => {
        message.error('错误')
      })
  }

  interface InitialData {
    // 在这里定义 initialData 的具体结构
    visible: boolean
    initial: any
  }

  const props = withDefaults(defineProps<InitialData>(), {
    visible: true,
    initialData: {}
  })
  console.log('visible', props.visible)
  console.log('initialData', props.initialData)
</script>

<style lang="less" scoped>
  #addQuestion {
    height: 100%;
  }

  .question_container {
    .question_step {
      .question_step_container {
        display: flex;
        padding: 10px 0;
        align-items: center;
        justify-content: space-between;

        .question_progress_content {
          display: flex;
          width: 95%;
          //position: absolute;
          //top: 5px;
          //left: 0;
          //right: 0;
          //padding: 0 12px;
          //z-index: 1;
          span {
            flex: 1;
            text-align: center;

            &.active {
              font-weight: bold;
            }

            &.color-yellow {
              color: #165dff;
            }

            &.color-green {
              color: #00cc00;
            }
          }
        }
      }
    }
  }

  .addJudgeConfig_list {
    display: flex;
    flex-direction: column; /* 列布局 */
    justify-content: space-between;
  }

  .addJudgeConfig_list_item {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;

    div {
      margin-top: 10px;

      span {
        margin-right: 10px;
      }
    }
  }

  .a-space {
    margin-top: 350px; /* 调整子元素的宽度 */
  }

  .addJudgeCase_container {
    .addJudgeCase_list {
      .addJudgeCase_list_item {
        display: flex;
        flex-direction: row;
        border: 2px dashed #165dff;
        justify-content: center;
        align-items: center;
        height: 100px;
        margin-top: 30px;
        margin-bottom: 30px;
      }
    }
  }
</style>
