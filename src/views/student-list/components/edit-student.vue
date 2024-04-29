<template>
  <div class="component-container" v-if="customerStudentInfo">
    <div class="feedback-container">
      <div>回访信息：</div>
      <a-textarea
        style="width: 95%"
        v-model:value="customerStudentInfo.feedback"
        @change="handleChange"
        :rows="2"
      ></a-textarea>
    </div>
    <div>
      <a-collapse v-model="activeKey">
        <a-collapse-panel :bordered="false" key="1" header="历史回访记录">
          <a-table
            :columns="feedbackColumn"
            :pagination="false"
            :scroll="{ y: 400 }"
            :row-key="
              (r) => {
                return r.id
              }
            "
            :data-source="customerStudentInfo.historyFeedback"
          >
            <template #createTime="{ record }">
              <div class="status-container">
                {{ formatDate(record.createTime) }}
              </div>
            </template>
          </a-table>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <a-button style="margin-top: 20px" @click="addProject" type="primary">
      添加项目
    </a-button>
    <div
      class="section"
      v-if="
        customerStudentInfo.projects.basicCourse &&
        customerStudentInfo.projects.basicCourse.length !== 0
      "
    >
      <h2>基础课</h2>
      <div class="project-container">
        <div
          class="project-ele"
          v-for="item in customerStudentInfo.projects.basicCourse"
          v-bind:key="item.projectKey"
        >
          <div class="project-name">
            {{ item.projectName }}
          </div>
          <span>安排课时：</span>
          <a-input-number
            style="width: 72px; margin-right: 10px"
            v-model:value="item.projectPeriod"
          ></a-input-number>
          <label for="">指导老师:</label>
          <a-input
            v-model:value="item.projectTeacherChinesename"
            style="width: 120px"
            @change="handleChange"
          ></a-input>
          <a-popconfirm
            title="确定删除该项目吗？"
            @confirm="() => deleteProject('basicCourse', item.projectKey)"
          >
            <a-button type="danger"><CloseOutlined /></a-button>
          </a-popconfirm>
        </div>
      </div>
    </div>
    <div
      class="section"
      v-if="
        customerStudentInfo.projects.professionalCourse &&
        customerStudentInfo.projects.professionalCourse.length !== 0
      "
    >
      <h2>专业课</h2>
      <div class="project-container">
        <div
          class="project-ele"
          v-for="item in customerStudentInfo.projects.professionalCourse"
          v-bind:key="item.projectKey"
        >
          <div class="project-name">
            {{ item.projectName }}
          </div>
          <span>安排课时：</span>
          <a-input-number
            style="width: 72px; margin-right: 10px"
            v-model:value="item.projectPeriod"
          ></a-input-number>
          <label for="">指导老师:</label>
          <a-input
            style="width: 120px"
            v-model:value="item.projectTeacherChinesename"
            @change="handleChange"
          ></a-input>
          <a-popconfirm
            title="确定删除该项目吗？"
            @confirm="
              () => deleteProject('professionalCourse', item.projectKey)
            "
          >
            <a-button type="danger"><CloseOutlined /></a-button>
          </a-popconfirm>
        </div>
      </div>
    </div>
    <div
      class="section"
      v-if="
        customerStudentInfo.projects.subjectCamp &&
        customerStudentInfo.projects.subjectCamp.length !== 0
      "
    >
      <h2>跨学科营地</h2>
      <div class="project-container">
        <div
          class="project-ele"
          v-for="item in customerStudentInfo.projects.subjectCamp"
          v-bind:key="item.projectKey"
        >
          <div class="project-name">
            {{ item.projectName }}
          </div>
          <span>安排课时：</span>
          <a-input-number
            style="width: 72px; margin-right: 10px"
            v-model:value="item.projectPeriod"
          ></a-input-number>
          <label for="">指导老师:</label>
          <a-input
            v-model:value="item.projectTeacherChinesename"
            style="width: 120px"
            @change="handleChange"
          ></a-input>
          <a-popconfirm
            title="确定删除该项目吗？"
            @confirm="() => deleteProject('subjectCamp', item.projectKey)"
          >
            <a-button type="danger"><CloseOutlined /></a-button>
          </a-popconfirm>
        </div>
      </div>
    </div>
    <div
      class="section"
      v-if="
        customerStudentInfo.projects.overseaMentor &&
        customerStudentInfo.projects.overseaMentor.length !== 0
      "
    >
      <h2>海外名师授课</h2>
      <div class="project-container">
        <div
          class="project-ele"
          v-for="item in customerStudentInfo.projects.overseaMentor"
          v-bind:key="item.projectKey"
        >
          <div class="project-name">
            {{ item.projectName }}
          </div>
          <span>安排课时：</span>
          <a-input-number
            style="width: 72px; margin-right: 10px"
            v-model:value="item.projectPeriod"
          ></a-input-number>
          <label for="">指导老师:</label>
          <a-input
            v-model:value="item.projectTeacherChinesename"
            style="width: 120px"
            @change="handleChange"
          ></a-input>
          <a-popconfirm
            title="确定删除该项目吗？"
            @confirm="() => deleteProject('overseaMentor', item.projectKey)"
          >
            <a-button type="danger"><CloseOutlined /></a-button>
          </a-popconfirm>
        </div>
      </div>
    </div>
    <div
      class="section"
      v-if="
        customerStudentInfo.projects.additionalService &&
        customerStudentInfo.projects.additionalService.length !== 0
      "
    >
      <h2>教学教研增值服务</h2>
      <div class="project-container">
        <div
          class="project-ele"
          v-for="item in customerStudentInfo.projects.additionalService"
          v-bind:key="item.projectKey"
        >
          <div class="project-name">
            {{ item.projectName }}
          </div>
          <span>安排课时：</span>
          <a-input-number
            style="width: 72px; margin-right: 10px"
            v-model:value="item.projectPeriod"
          ></a-input-number>
          <label for="">指导老师:</label>
          <a-input
            v-model:value="item.projectTeacherChinesename"
            style="width: 120px"
            @change="handleChange"
          ></a-input>
          <a-popconfirm
            title="确定删除该项目吗？"
            @confirm="() => deleteProject('additionalService', item.projectKey)"
          >
            <a-button type="danger"><CloseOutlined /></a-button>
          </a-popconfirm>
        </div>
      </div>
    </div>
    <div
      class="section"
      v-if="
        customerStudentInfo.projects.applyService &&
        customerStudentInfo.projects.applyService.length !== 0
      "
    >
      <h2>后期申请增值服务</h2>
      <div class="project-container">
        <div
          class="project-ele"
          v-for="item in customerStudentInfo.projects.applyService"
          v-bind:key="item.projectKey"
        >
          <div class="project-name">
            {{ item.projectName }}
          </div>
          <span>安排课时：</span>
          <a-input-number
            style="width: 72px; margin-right: 10px"
            v-model:value="item.projectPeriod"
          ></a-input-number>
          <label for="">指导老师:</label>
          <a-input
            v-model:value="item.projectTeacherChinesename"
            style="width: 120px"
            @change="handleChange"
          ></a-input>
          <a-popconfirm
            title="确定删除该项目吗？"
            @confirm="() => deleteProject('applyService', item.projectKey)"
          >
            <a-button type="danger"><CloseOutlined /></a-button>
          </a-popconfirm>
        </div>
      </div>
    </div>
    <div
      class="section"
      v-if="
        customerStudentInfo.projects.backgroundUpgrade &&
        customerStudentInfo.projects.backgroundUpgrade.length !== 0
      "
    >
      <h2>学术背景提升服务</h2>
      <div class="project-container">
        <div
          class="project-ele"
          v-for="item in customerStudentInfo.projects.backgroundUpgrade"
          v-bind:key="item.projectKey"
        >
          <div class="project-name">
            {{ item.projectName }}
          </div>
          <span>安排课时：</span>
          <a-input-number
            style="width: 72px; margin-right: 10px"
            v-model:value="item.projectPeriod"
          ></a-input-number>
          <label for="">指导老师:</label>
          <a-input
            v-model:value="item.projectTeacherChinesename"
            style="width: 120px"
            @change="handleChange"
          ></a-input>
          <a-popconfirm
            title="确定删除该项目吗？"
            @confirm="() => deleteProject('backgroundUpgrade', item.projectKey)"
          >
            <a-button type="danger"><CloseOutlined /></a-button>
          </a-popconfirm>
        </div>
      </div>
    </div>
    <div
      class="section"
      v-if="
        customerStudentInfo.projects.backgroundUpgrade &&
        customerStudentInfo.projects.backgroundUpgrade.length !== 0
      "
    >
      <h2>一对一服务</h2>
      <div class="project-container">
        <div
          class="project-ele"
          v-for="item in customerStudentInfo.projects.OneOnOne"
          v-bind:key="item.projectKey"
        >
          <div class="project-name">
            {{ item.projectName }}
          </div>
          <span>安排课时：</span>
          <a-input-number
            style="width: 72px; margin-right: 10px"
            v-model:value="item.projectPeriod"
          ></a-input-number>
          <label for="">指导老师:</label>
          <a-input
            v-model:value="item.projectTeacherChinesename"
            style="width: 120px"
            @change="handleChange"
          ></a-input>
          <a-popconfirm
            title="确定删除该项目吗？"
            @confirm="() => deleteProject('OneOnOne', item.projectKey)"
          >
            <a-button type="danger"><CloseOutlined /></a-button>
          </a-popconfirm>
        </div>
      </div>
    </div>
    <a-modal
      @cancel="closeAddProject"
      :visible="showAddProject"
      :title="'添加服务项目'"
      @ok="confirmAddProject"
    >
      <div style="margin-bottom: 10px">
        <label for="">服务名称：</label>
        <a-select
          :default-value="defaultSelect"
          style="width: 150px"
          @change="handleServiceChange"
          v-if="showAddProject"
        >
          <a-select-option
            v-for="item in serviceList"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
      <div>
        <label for="">项目名称：</label>
        <a-input v-model:value="tempProjectName"></a-input>
      </div>
      <div>
        <label for="">老师姓名：</label>
        <a-input v-model:value="tempTeacherName"></a-input>
      </div>
    </a-modal>
  </div>
</template>
<script>
  import { inputInformation } from '../../contract-input/static/inputInformation.js'
  let transferPinYin = require('js-pinyin')
  import { message } from 'ant-design-vue'
  import { CloseOutlined } from '@ant-design/icons-vue'
  import { listParameters } from '../static/list-parameters'
  import Moment from 'moment'
  export default {
    props: ['studentInfo'],
    components: { CloseOutlined },
    data() {
      return {
        customerStudentInfo: null,
        projectTeam: null,
        tempEle: {
          projectKey: null,
          projectName: null,
          studentId: null,
          status: '0',
          projectPeriod: null,
          projectPredictionCost: null,
          projectType: null
        },
        serviceList: inputInformation.serviceList,
        feedbackColumn: listParameters.feedbackList,
        showAddProject: false,
        tempProjectName: null,
        tempTeacherName: null,
        defaultSelect: '请选择'
      }
    },
    watch: {
      studentInfo: {
        handler(newVal) {
          this.customerStudentInfo = JSON.parse(JSON.stringify(newVal))
          if (this.customerStudentInfo) this.customerStudentInfo.feedback = ''
        }
      }
    },
    methods: {
      handleChange() {
        this.$emit('studentInfoChanged', this.customerStudentInfo)
      },
      handleServiceChange(value) {
        this.projectSection = value
      },
      addProject() {
        this.showAddProject = true
      },
      deleteProject(section, key) {
        this.customerStudentInfo.projects[section] =
          this.customerStudentInfo.projects[section].filter((item) => {
            return item.projectKey !== key
          })
        this.$emit('studentInfoChanged', this.customerStudentInfo)
      },
      closeAddProject() {
        this.tempTeacherName = null
        this.showAddProject = false
      },
      confirmAddProject() {
        if (!this.tempProjectName || !this.projectSection) {
          message.error('请完善项目信息')
        } else {
          let tempProject = {
            projectKey: transferPinYin.getFullChars(this.tempProjectName),
            projectName: this.tempProjectName,
            projectTeacherId: null,
            projectTeacherChinesename: this.tempTeacherName,
            projectPredictCost: '',
            projectPeriod: null,
            status: 0,
            type: this.projectSection
          }
          this.customerStudentInfo.projects[this.projectSection].push(
            tempProject
          )
          this.$emit('studentInfoChanged', this.customerStudentInfo)
          this.showAddProject = false
        }
      },
      formatDate(date) {
        const tempDate = Moment(date).valueOf()
        return Moment(tempDate).format('YYYY年MM月DD日 HH:MM')
      }
    },
    mounted() {
      this.customerStudentInfo = JSON.parse(JSON.stringify(this.studentInfo))
      if (this.customerStudentInfo) this.customerStudentInfo.feedback = ''
    }
  }
</script>
<style lang="less" scoped>
  h2 {
    font-weight: bold;
  }
  .project-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .project-ele {
    padding: 10px;
  }
  .ant-input {
    display: inline !important;
    width: 50%;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 6px;
  }
  .project-name {
    font-weight: bold;
    margin-bottom: 6px;
  }
  .add-btn {
    display: flex;
    align-items: flex-end;
  }
  .feedback-container {
    margin-bottom: 20px;
  }
</style>
