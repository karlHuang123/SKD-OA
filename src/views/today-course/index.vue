<template>
  <div class="test-container">
    <h2>{{ date }}上课学生名单</h2>
    <div>
      <span>日期选择：</span>
      <a-date-picker v-model:value="selectDate" @change="dateChange" />
    </div>
    <div class="line"></div>
    <div class="calendar">
      <a-table
        :columns="listColumns"
        :data-source="courseList"
        :pagination="pagination"
        @change="handleStudentListChange"
        :scroll="{ y: 800 }"
      ></a-table>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { historyData } from './static/historyData.js'
  import Moment from 'moment'
  export default {
    name: 'CourseHistory',
    components: {},
    data() {
      return {
        courseList: [],
        listColumns: historyData.listColumns,
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total) => `共${total}条`
        },
        selectDate: null,
        date: '今日'
      }
    },
    methods: {
      ...mapActions({
        getOnScheduleStudentCourses: 'user/getOnScheduleStudentCourses'
      }),
      getOnScheduleStudentCoursesFun(date) {
        this.courseList = []
        this.getOnScheduleStudentCourses({
          date: date ? date : '',
          callback: (res) => {
            res.rows.forEach((item) => {
              const ele = {
                projectType: item.color,
                projectName: item.projectName,
                startDate: Moment(parseFloat(item.startDate)).format(
                  'YYYY-MM-DD HH:mm'
                ),
                studentName: item.studentName,
                teacherName: item.teacherName
              }
              this.courseList.push(ele)
            })
            this.courseList.sort(function (a, b) {
              return (
                new Date(a.startDate).getTime() -
                new Date(b.startDate).getTime()
              )
            })
          }
        })
      },
      dateChange(date, dateString) {
        if (dateString) {
          this.date = Moment(dateString).format('MM月DD日')
          this.getOnScheduleStudentCoursesFun(
            Moment(dateString).format('YYYY-MM-DD')
          )
        } else {
          this.getOnScheduleStudentCoursesFun()
          this.date = '今日'
        }
      },
      handleStudentListChange({ current, pageSize }) {
        this.pagination.current = current
        this.pagination.pageSize = pageSize
      }
    },
    mounted() {
      this.getOnScheduleStudentCoursesFun()
    }
  }
</script>
<style lang="less">
  .calendar-search {
    margin-bottom: 20px;
  }
  .line {
    border-bottom: 1px solid gray;
    opacity: 0.7;
    width: 100%;
    margin: 15px auto;
  }
</style>
