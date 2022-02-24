<template>
  <div class="component-container" v-if="customerStudentInfo">
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
            v-model:value="item.projectTeacherId"
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
            v-model:value="item.projectTeacherId"
            @change="handleChange"
          ></a-input>
        </div>
        <div class="add-btn project-ele">
          <a-popconfirm
            placement="top"
            ok-text="添加"
            cancel-text="取消"
            @confirm="confirm"
          >
            <template v-slot:title>
              <div class="title">
                <span>项目名称:</span>
                <a-input></a-input>
              </div>
              <div class="title">
                <span>指导老师:</span>
                <a-input></a-input>
              </div>
            </template>
            <!-- <a-button
              @click="addProject('research', customerStudentInfo.studentId)"
            >
              添加项目
            </a-button> -->
          </a-popconfirm>
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
            v-model:value="item.projectTeacherId"
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
            v-model:value="item.projectTeacherId"
            @change="handleChange"
          ></a-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
      addProject(projectTeam, studentId) {
        console.log(projectTeam)
        this.tempEle.studentId = studentId
        this.projectTeam = projectTeam
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
