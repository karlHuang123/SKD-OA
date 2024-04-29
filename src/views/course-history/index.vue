<template>
  <div class="test-container">
    <h2>{{ this.studentName }}课程历史记录</h2>
    <div>总课时：{{ totalHours }}小时</div>
    <div class="line"></div>
    <div class="calendar">
      <a-table
        :columns="listColumns"
        :pagination="false"
        :data-source="studentListJson"
        :scroll="{ x: 1600, y: 800 }"
      ></a-table>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  //   import '@fullcalendar/core/main.css'
  import { historyData } from './static/historyData.js'
  import Moment from 'moment'
  export default {
    name: 'CourseHistory',
    components: {},
    data() {
      return {
        studentName: null,
        tempDateArg: null,
        teacherName: null,
        teacherId: null,
        studentProjects: null,
        showSearchBar: true,
        studentListJson: [],
        listColumns: historyData.listColumns,
        teacherOrStudent: true,
        selectionList: [],
        totalHours: 0
      }
    },
    methods: {
      ...mapActions({
        getTeacherCalendar: 'calendar/getTeacherCalendar',
        getStudentCalendar: 'calendar/getStudentCalendar',
        searchStudentName: 'contract/searchStudentName',
        searchTeacherName: 'position/searchTeacherName'
      }),
      search(val) {
        this.teacherName = this.selectionList[val]
        if (this.teacherOrStudent) {
          this.searchTeacherCalendar()
        } else {
          this.searchStudentCalendar()
        }
      },
      searchName(val) {
        this.teacherName = val
        if (!this.teacherOrStudent) {
          this.searchStudentNameFun()
        } else {
          this.searchTeacherNameFun()
        }
      },
      searchStudentNameFun() {
        if (this.timeout) clearTimeout(this.timeout)
        let name = ''
        console.log(this.studentName)
        if (this.showDateEdit || this.showExsitDateEdit) {
          name = this.studentName
        } else {
          name = this.teacherName
        }
        this.timeout = setTimeout(() => {
          this.searchStudentName({
            studentName: name,
            callback: (res) => {
              this.selectionList = res.data
            }
          })
        }, 500)
      },
      searchTeacherNameFun() {
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.searchTeacherName({
            teacherName: this.teacherName,
            callback: (res) => {
              this.selectionList = res.data
            }
          })
        }, 500)
      },
      searchStudentCalendar() {
        this.getStudentCalendar({
          studentName: this.studentName,
          callback: (res) => {
            if (res.rows && typeof res.rows.length === 'number') {
              res.rows.forEach((item) => {
                const date =
                  Moment(parseFloat(item.startDate)).format(
                    'YYYY-MM-DD HH:mm'
                  ) +
                  ' 至 ' +
                  Moment(parseFloat(item.endDate)).format('YYYY-MM-DD HH:mm')
                const hours =
                  Moment(parseFloat(item.endDate)).diff(
                    Moment(parseFloat(item.startDate)),
                    'minutes'
                  ) / 60
                const ele = {
                  teacherName: item.teacherName,
                  projectType: item.color,
                  projectName: item.projectName,
                  date: date,
                  hours: hours
                }
                this.totalHours += hours
                this.studentListJson.push(ele)
              })
            }
          }
        })
      },
      searchTeacherCalendar() {
        this.getTeacherCalendar({
          teacherName: this.teacherName,
          callback: (res) => {
            this.teacherId = res.rows[0].teacherId
            if (
              res.rows[0].courseTimeTables &&
              typeof res.rows[0].courseTimeTables.length === 'number'
            ) {
              console.log(res)
            }
          }
        })
      }
    },
    mounted() {
      if (this.$route.query.studentName) {
        this.studentName = this.$route.query.studentName
        this.searchStudentCalendar()
      }
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
