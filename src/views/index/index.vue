<template>
  <div class="index-container">
    <education-cards
      :studentDashboardNum="studentDashboardNum"
      :role="role"
      :loading="loading"
      @specialCall="handleCardClick"
    ></education-cards>
    <h2 style="margin-top: 20px">列表筛选</h2>
    <div class="filters">
      <div class="filter">
        <div>入学年份:</div>
        <a-select
          mode="multiple"
          style="width: 100%"
          placeholder="请选择"
          @change="handleChange"
          v-model:value="filters.admissionYear"
          @click="selectType('admissionYear')"
        >
          <a-select-option
            v-for="item in admissionYearList"
            v-bind:key="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
      <div class="filter">
        <div>主申国家:</div>
        <a-select
          mode="multiple"
          style="width: 100%"
          placeholder="请选择"
          @change="handleChange"
          v-model:value="filters.applyMainCountry"
          @click="selectType('applyMainCountry')"
        >
          <a-select-option
            v-for="item in applyMainCountryList"
            v-bind:key="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
      <div class="filter">
        <div>产品类型:</div>
        <a-select
          mode="multiple"
          style="width: 100%"
          placeholder="请选择"
          @change="handleChange"
          v-model:value="filters.applyMajor"
          @click="selectType('applyMajor')"
        >
          <a-select-option
            v-for="item in applyMajorList"
            v-bind:key="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
      <div class="filter">
        <div>产品级别:</div>
        <a-select
          mode="multiple"
          style="width: 100%"
          placeholder="请选择"
          @change="handleChange"
          v-model:value="filters.productLevel"
          @click="selectType('productLevel')"
        >
          <a-select-option
            v-for="item in productLevelList"
            v-bind:key="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
      <div class="filter">
        <div>学生状态:</div>
        <a-select
          mode="multiple"
          style="width: 100%"
          placeholder="请选择"
          @change="handleChange"
          v-model:value="filters.status"
          @click="selectType('status')"
        >
          <a-select-option v-for="item in statusList" v-bind:key="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
      <div
        class="filter"
        v-if="role === 'admin' || role === 'educationalManager'"
      >
        <div>负责教务:</div>
        <a-select
          mode="multiple"
          style="width: 100%"
          placeholder="请选择"
          @change="handleChange"
          v-model:value="filters.createBy"
          @click="selectType('createBy')"
        >
          <a-select-option v-for="item in createByList" v-bind:key="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
      <div class="filter">
        <div>在读学校:</div>
        <a-input-search
          v-model:value="filters.studySchool"
          placeholder="请输入学校"
          @search="handleChange"
          @click="selectType('studySchool')"
        ></a-input-search>
      </div>
    </div>
    <student-list
      :filters="filters"
      :specialCall="specialCall"
      @clear="handleClear"
      @changeCall="handleChangeCall"
    ></student-list>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import EducationCards from './components/educational-cards.vue'
  import StudentList from '../student-list/index.vue'
  import { filters } from './static/filters'
  import store from '@/store'
  export default {
    name: 'Index',
    components: { EducationCards, StudentList },
    data() {
      return {
        role: null,
        nickName: null,
        filters: {
          admissionYear: [], // 入学年份
          applyMainCountry: [], // 主审国家
          applyMajor: [], // 申请专业
          productLevel: [], // 产品级别
          applyEducation: [], // 申请学历
          status: [],
          createBy: [], // 负责教务
          studySchool: '' // 在读学校
        },
        admissionYearList: [],
        applyMainCountryList: [],
        applyMajorList: [],
        productLevelList: [],
        applyEducationList: [],
        statusList: [],
        createByList: [],
        filterType: '',
        studentDashboardNum: {
          OneYearLaterCnt: 0,
          SecondYearLaterCnt: 0,
          ThirdYearLaterCnt: 0,
          allCnt: 0,
          unScheduleStudentCount: 0,
          unVisitCnt: 0,
          todayCourseCut: 0
        },
        loading: {
          all: false,
          unSchedule: false,
          unVisit: false,
          todayCourse: false
        },
        specialCall: ''
      }
    },
    methods: {
      ...mapActions({
        getStudentDashboard: 'user/getStudentDashboard',
        getUnScheduleStudentCount: 'user/getUnScheduleStudentCount',
        getUnVisitStudentCount: 'user/getUnVisitStudentCount',
        getOnScheduleStudentCount: 'user/getOnScheduleStudentCount',
        getRegionUsers: 'user/getRegionUsers'
      }),
      handleChange(value) {
        this.filters[this.filterType] = value
        if (this.filterType === 'createBy') {
          this.getStudentDashboardFun(value)
          this.getUnScheduleStudentCountFun(value)
          this.getUnVisitStudentCountFun(value)
          this.getOnScheduleStudentCountFun(value)
        }
      },
      selectType(type) {
        this.filterType = type
      },
      handleCardClick(value) {
        this.specialCall = value
      },
      handleClear() {
        this.filters = {
          admissionYear: [], // 入学年份
          applyMainCountry: [], // 主审国家
          applyMajor: [], // 申请专业
          productLevel: [], // 产品级别
          applyEducation: [], // 申请学历
          status: [], // 学生状态
          createBy: [], // 负责教务
          studySchool: ''
        }
        this.specialCall = ''
      },
      handleChangeCall() {
        this.specialCall = ''
      },
      getStudentDashboardFun(createBy) {
        this.loading.all = true
        this.getStudentDashboard({
          createBy: createBy ? createBy : null,
          callback: (res) => {
            for (let i in res.data) {
              this.studentDashboardNum[i] = res.data[i]
              this.loading.all = false
            }
          }
        })
      },
      getRegionUsersFun() {
        this.getRegionUsers({
          callback: (res) => {
            if (res && res.code === 200) {
              const tempList = res.rows.filter((item) => {
                return (
                  item.postCode === 'educationalManager' ||
                  item.postCode === 'educationalTeacher'
                )
              })
              if (this.role === 'educationalManager') {
                const self = {
                  label: this.nickName,
                  value: this.nickName
                }
                this.createByList.push(self)
              }
              tempList.forEach((item) => {
                const ele = {
                  label: item.nickName,
                  value: item.nickName
                }
                this.createByList.push(ele)
              })
            }
          }
        })
      },
      getUnScheduleStudentCountFun(createBy) {
        this.loading.unSchedule = true
        this.getUnScheduleStudentCount({
          createBy: createBy ? createBy : null,
          callback: (res) => {
            if (res && res.code === 200) {
              this.studentDashboardNum.unScheduleStudentCount =
                res.data.unScheduleCnt
              this.loading.unSchedule = false
            }
          }
        })
      },
      getUnVisitStudentCountFun(createBy) {
        this.loading.unVisit = true
        this.getUnVisitStudentCount({
          createBy: createBy ? createBy : null,
          callback: (res) => {
            if (res && res.code === 200) {
              this.studentDashboardNum.unVisitCnt = res.data.unVisitCnt
              this.loading.unVisit = false
            }
          }
        })
      },
      getOnScheduleStudentCountFun(createBy) {
        this.loading.todayCourse = true
        this.getOnScheduleStudentCount({
          createBy: createBy ? createBy : null,
          callback: (res) => {
            if (res && res.code === 200) {
              this.studentDashboardNum.todayCourseCut = res.data.onScheduleCnt
              this.loading.todayCourse = false
            }
          }
        })
      }
    },
    mounted() {
      // this.role = store.getters['acl/role']
      this.applyMainCountryList = filters.applyMainCountryList
      this.applyMajorList = filters.applyMajorList
      this.productLevelList = filters.productLevelList
      this.applyEducationList = filters.applyEducationList
      this.statusList = filters.statusList
      const date = new Date()
      const year = date.getFullYear()
      for (let i = 0; i < 4; i++) {
        let ele = {
          label: year + i + ' Fall',
          value: year + i + ' Fall'
        }
        this.admissionYearList.push(ele)
      }
      this.getStudentDashboardFun()
      this.getUnScheduleStudentCountFun()
      this.getUnVisitStudentCountFun()
      this.getOnScheduleStudentCountFun()
      setTimeout(() => {
        this.role = store.getters['acl/role'][0]
        this.nickName = store.getters['user/nickName']
        if (this.role === 'admin' || this.role === 'educationalManager') {
          this.getRegionUsersFun()
        }
      }, 0)
    }
  }
</script>

<style lang="less" scoped>
  .index-container {
    .filters {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      margin: 0 auto 20px;
      .filter {
        padding: 5px 10px;
      }
    }
  }
</style>
