<template>
  <div class="cards-container">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card class="card" :bordered="false" style="margin-top: 10px">
          <a-spin class="spin" :spinning="loading.all" tip="加载中..." />
          <div class="cover" v-if="loading.all"></div>
          <div class="all-students">
            <div class="">
              <span class="main-number">{{ studentDashboardNumC.allCnt }}</span>
              <span class="text">在读学生总数</span>
            </div>
          </div>
          <div class="details-number">
            <div>
              <strong>{{ studentDashboardNumC.OneYearLaterCnt }}&nbsp;</strong>
              <span class="gray">24Fall</span>
            </div>
            <div>
              <strong>
                {{ studentDashboardNumC.SecondYearLaterCnt }}&nbsp;
              </strong>
              <span class="gray">25Fall</span>
            </div>
            <div>
              <strong>
                {{ studentDashboardNumC.ThirdYearLaterCnt }}&nbsp;
              </strong>
              <span class="gray">26Fall</span>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col
        :span="6"
        v-if="
          role &&
          (role === 'educationalManager' ||
            role === 'educationalTeacher' ||
            role === 'admin')
        "
      >
        <a-card
          :bordered="false"
          style="margin-top: 10px; cursor: pointer"
          @click="callSpecial('unSchedule')"
        >
          <a-spin class="spin" :spinning="loading.unSchedule" tip="加载中..." />
          <div class="cover" v-if="loading.unSchedule"></div>
          <div class="all-students">
            <div>
              <span class="main-number">
                {{ studentDashboardNumC.unScheduleStudentCount }}
              </span>
              <span class="text">待排课学生</span>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col
        :span="6"
        v-if="
          role &&
          (role !== 'educationalManager' ||
            role !== 'educationalTeacher' ||
            role === 'admin')
        "
      >
        <a-card
          :bordered="false"
          style="margin-top: 10px; cursor: pointer"
          @click="goToToday"
        >
          <div class="all-students">
            <div>
              <span class="main-number">
                {{ studentDashboardNumC.todayCourseCut }}
              </span>
              <span class="text">今日上课学生</span>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card
          :bordered="false"
          style="margin-top: 10px; cursor: pointer"
          @click="callSpecial('unVisit')"
        >
          <a-spin class="spin" :spinning="loading.unVisit" tip="加载中..." />
          <div class="cover" v-if="loading.unVisit"></div>
          <div class="all-students">
            <div>
              <span class="main-number">
                {{ studentDashboardNumC.unVisitCnt }}
              </span>
              <span class="text">待回访学生</span>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: 'EducationCards',
    components: {},
    props: ['studentDashboardNum', 'role', 'loading'],
    data() {
      return {
        studentDashboardNumC: {
          OneYearLaterCnt: 0,
          SecondYearLaterCnt: 0,
          ThirdYearLaterCnt: 0,
          allCnt: 0,
          unScheduleStudentCount: 0,
          unVisitCnt: 0,
          todayCourseCut: 0
        }
      }
    },
    methods: {
      goToToday() {
        this.$router.push({
          path: '/today-course'
        })
      },
      callSpecial(str) {
        this.$emit('specialCall', str)
      }
    },
    watch: {
      studentDashboardNum: {
        handler(newVal) {
          if (newVal) {
            this.studentDashboardNumC = newVal
          }
        },
        deep: true,
        immediate: true
      }
    },
    mounted() {
      this.studentDashboardNumC = JSON.parse(
        JSON.stringify(this.studentDashboardNum)
      )
    }
  }
</script>

<style lang="less" scoped>
  .cards-container {
    .ant-card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19); //设置两层阴影
      border-radius: 6px;
      height: 250px;
      position: relative;
      .cover {
        position: absolute;
        z-index: 5;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);
        top: 0;
        left: 0;
      }
    }
    .all-students {
      display: flex;
      align-items: flex-end;
      .main-number {
        font-size: 64px;
        font-weight: bold;
      }
      .text {
        font-size: 18px;
        margin-left: 20px;
        color: gray;
      }
    }
    .details-number {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      margin-top: 40px;
      strong {
        font-size: 18px;
      }
    }
  }
  .gray {
    color: gray;
    font-weight: 500;
  }
  .ant-spin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
