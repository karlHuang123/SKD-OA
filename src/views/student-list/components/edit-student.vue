<template>
  <div class="component-container" v-if="customerStudentInfo">
    <a-button @click="addProject" type="primary">添加项目</a-button>
    <div
      class="section"
      v-if="
        customerStudentInfo.projects.productMajor &&
        customerStudentInfo.projects.productMajor.length !== 0
      "
    >
      <h2>作品集服务</h2>
      <div class="project-container">
        <div
          class="project-ele"
          v-for="item in customerStudentInfo.projects.productMajor"
          v-bind:key="item.projectKey"
        >
          <div class="project-name">
            {{ item.projectName }}
          </div>
          <label for="">指导老师:</label>
          <a-input
            v-model:value="item.projectTeacherChinesename"
            @change="handleChange"
          ></a-input>
        </div>
      </div>
    </div>
    <div
      class="section"
      v-if="
        customerStudentInfo.projects.research &&
        customerStudentInfo.projects.research.length !== 0
      "
    >
      <h2>教研服务</h2>
      <div class="project-container">
        <div
          class="project-ele"
          v-for="item in customerStudentInfo.projects.research"
          v-bind:key="item.projectKey"
        >
          <div class="project-name">
            {{ item.projectName }}
          </div>
          <label for="">指导老师:</label>
          <a-input
            v-model:value="item.projectTeacherChinesename"
            @change="handleChange"
          ></a-input>
        </div>
      </div>
    </div>
    <div
      class="section"
      v-if="
        customerStudentInfo.projects.apply &&
        customerStudentInfo.projects.apply.length !== 0
      "
    >
      <h2>申请服务</h2>
      <div class="project-container">
        <div
          class="project-ele"
          v-for="item in customerStudentInfo.projects.apply"
          v-bind:key="item.projectKey"
        >
          <div class="project-name">
            {{ item.projectName }}
          </div>
          <label for="">指导老师:</label>
          <a-input
            v-model:value="item.projectTeacherChinesename"
            @change="handleChange"
          ></a-input>
        </div>
      </div>
    </div>
    <div
      class="section"
      v-if="
        customerStudentInfo.projects.upgrade &&
        customerStudentInfo.projects.upgrade.length !== 0
      "
    >
      <h2>学员升级服务</h2>
      <div class="project-container">
        <div
          class="project-ele"
          v-for="item in customerStudentInfo.projects.upgrade"
          v-bind:key="item.projectKey"
        >
          <div class="project-name">
            {{ item.projectName }}
          </div>
          <label for="">指导老师:</label>
          <a-input
            v-model:value="item.projectTeacherChinesename"
            @change="handleChange"
          ></a-input>
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
          :default-value="'请选择'"
          style="width: 150px"
          @change="handleServiceChange"
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
  export default {
    props: ['studentInfo'],
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
          projectType: null,
        },
        serviceList: inputInformation.serviceList,
        showAddProject: false,
        tempProjectName: null,
        tempTeacherName: null,
      }
    },
    watch: {
      studentInfo: {
        handler(newVal) {
          this.customerStudentInfo = JSON.parse(JSON.stringify(newVal))
        },
      },
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
      closeAddProject() {
        this.projectSection = null
        this.tempProjectName = null
        this.tempTeacherName = null
        this.showAddProject = false
      },
      confirmAddProject() {
        if (!this.tempProjectName || !this.projectSection) {
          this.$message.error('请完善项目信息')
        } else {
          let tempProject = {
            projectKey: transferPinYin.getFullChars(this.tempProjectName),
            projectName: this.tempProjectName,
            projectTeacherId: null,
            projectTeacherChinesename: this.tempTeacherName,
            projectPredictCost: '',
            projectPeriod: null,
            status: 0,
            type: this.projectSection,
          }
          switch (this.projectSection) {
            case 'projectMajor':
              this.customerStudentInfo.projects.projectMajor.push(tempProject)
              break
            case 'research':
              this.customerStudentInfo.projects.research.push(tempProject)
              break
            case 'apply':
              this.customerStudentInfo.projects.apply.push(tempProject)
              break
            case 'upgrade':
              this.customerStudentInfo.projects.upgrade.push(tempProject)
              break
          }
          this.showAddProject = false
        }
      },
    },
    mounted() {
      this.customerStudentInfo = JSON.parse(JSON.stringify(this.studentInfo))
    },
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
    width: 80%;
    margin-left: 10px;
    margin-top: 6px;
  }
  .project-name {
    font-weight: bold;
  }
  .add-btn {
    display: flex;
    align-items: flex-end;
  }
</style>
