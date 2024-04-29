<template>
  <div class="test-container">
    <div class="calendar-search">
      <div class="select-category" v-if="showSearchBar">
        <a-radio-group
          v-model:value="teacherOrStudent"
          @change="changeCategory"
        >
          <a-radio :value="false">搜学生</a-radio>
          <a-radio :value="true">搜老师</a-radio>
        </a-radio-group>
      </div>
      <!-- <a-input-search
        placeholder="请输入老师姓名查询时间表"
        style="width: 300px"
        @search="search"
        v-model:value="teacherName"
        v-if="showSearchBar"
      /> -->
      <a-select
        :value="teacherName"
        show-search
        placeholder="请输入姓名查询时间表"
        style="width: 300px"
        :default-active-first-option="false"
        :show-arrow="false"
        :filter-option="false"
        :not-found-content="null"
        @search="searchName"
        @change="search"
        v-if="showSearchBar"
      >
        <a-select-option v-for="(item, index) in selectionList" :key="index">
          {{ item }}
        </a-select-option>
      </a-select>
    </div>
    <div>
      <a-button type="primary" @click="openExportDialog">导出排课记录</a-button>
    </div>
    <div class="line"></div>
    <div class="calendar">
      <div class="calendar-picker">
        <div
          :style="{
            width: '300px',
            border: '1px solid #d9d9d9',
            borderRadius: '4px'
          }"
        >
          <a-calendar :fullscreen="false" @change="onPanelChange" />
        </div>
        <div class="category">
          <div class="title">
            <div>分类</div>
            <a-button @click="onCheckAllCategories">重置</a-button>
          </div>
          <br />
          <a-checkbox-group
            v-model:value="categoryList"
            :options="categories"
            style="color: red"
            @change="onCateoryChange"
          />
          <!-- <div class="category-section">
            <div class="section-ele">
              <div class="cube" style="background-color: #E396A3"></div>
              <div>专业课</div>
            </div>
          </div> -->
        </div>
      </div>
      <div class="flex-1">
        <FullCalendar :options="calendarOptions" v-if="refreshCalendar" />
      </div>
    </div>
    <a-modal
      :visible="showDateEdit"
      @cancel="closeDateEdit"
      :title="'添加日程'"
      width="600px"
    >
      <label for="">学生姓名：</label>
      <a-select
        :value="studentName"
        show-search
        :default-active-first-option="false"
        :show-arrow="false"
        :filter-option="false"
        :not-found-content="null"
        :disabled="projectType === '试听' || projectType === '休息'"
        @search="searchNameInModal"
        @change="searchProjectsThroughName"
        style="width: 300px"
      >
        <a-select-option v-for="(item, index) in selectionList" :key="index">
          {{ item }}
        </a-select-option>
      </a-select>
      <!-- <a-input
        v-model:value="studentName"
        :disabled="projectType === '试听'"
        @keyup="searchProjects"
      ></a-input> -->
      <div class="project-info">
        <div>
          <label for="">项目分类：</label>
          <a-select
            :default-value="'请选择'"
            style="width: 100%"
            @change="handleProjectTypeChange"
            v-model:value="projectType"
          >
            <a-select-option
              v-for="(item, index) in courseOption"
              v-bind:key="index"
              :value="item.label"
            >
              {{ item.value }}
            </a-select-option>
            <a-select-option value="试听">试听</a-select-option>
            <a-select-option value="休息">休息</a-select-option>
          </a-select>
        </div>
        <div>
          <label for="">项目名称：</label>
          <a-select
            :default-value="'请选择'"
            style="width: 100%"
            @change="handleProjectNameChange"
            v-model:value="projectName"
            :disabled="serviceOption.length === 0"
          >
            <a-select-option
              v-for="(item, index) in serviceOption"
              v-bind:key="index"
              :value="item.value"
            >
              {{ item.value }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div>
        <label for="">备注：</label>
        <a-input v-model:value="comment"></a-input>
      </div>
      <!-- <div
        class="time-set"
        v-if="this.tempDateArg && this.tempDateArg.view.type === 'dayGridMonth'"
      > -->
      <div class="time-set" v-if="this.tempDateArg">
        <div class="">开始时间：</div>
        <a-date-picker
          @change="startDateChange"
          v-model:value="startDate"
          :showTime="{ format: 'HH:mm' }"
        />
        <div>结束时间：</div>
        <a-date-picker
          @change="endDateChange"
          v-model:value="endDate"
          :showTime="{ format: 'HH:mm' }"
        />
      </div>
      <template v-slot:footer>
        <a-button type="primary" @click="confirmDateEdit" v-if="showSearchBar">
          确定
        </a-button>
        <a-button @click="closeDateEdit">取消</a-button>
        <!-- <a-button type="danger" @click="deleteDate">删除</a-button> -->
      </template>
    </a-modal>
    <a-modal
      :visible="showExsitDateEdit"
      @cancel="closeExsitDateEdit"
      :title="'日程信息'"
      width="600px"
    >
      <label for="">{{ teacherOrStudent ? '学生姓名：' : '老师姓名：' }}</label>
      <a-input
        v-model:value="studentName"
        :disabled="!teacherOrStudent"
      ></a-input>
      <div class="project-info">
        <div>
          <label for="">课程类型：</label>
          <a-select
            v-model:value="projectType"
            style="width: 100%"
            @change="handleProjectTypeChange"
          >
            <a-select-option
              v-for="(item, index) in courseOption"
              v-bind:key="index"
              :value="item.label"
            >
              {{ item.value }}
            </a-select-option>
            <a-select-option value="试听">试听</a-select-option>
            <a-select-option value="休息">休息</a-select-option>
          </a-select>
        </div>
        <div>
          <label for="">项目名称：</label>
          <a-select
            :default-value="'请选择'"
            style="width: 100%"
            @change="handleProjectNameChange"
            v-model:value="projectName"
            :disabled="serviceOption.length === 0"
          >
            <a-select-option
              v-for="(item, index) in serviceOption"
              v-bind:key="index"
              :value="item.value"
            >
              {{ item.value }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div>
        <label for="">备注：</label>
        <a-input v-model:value="comment"></a-input>
      </div>
      <!-- <div
        class="time-set"
        v-if="this.tempInfo && this.tempInfo.view.type === 'dayGridMonth'"
      > -->
      <div class="time-set" v-if="this.tempInfo">
        <div class="">开始时间：</div>
        <a-date-picker
          @change="startDateChange"
          v-model:value="startDate"
          :showTime="{ format: 'HH:mm' }"
        />
        <div>结束时间：</div>
        <a-date-picker
          @change="endDateChange"
          v-model:value="endDate"
          :showTime="{ format: 'HH:mm' }"
        />
      </div>
      <template v-slot:footer v-if="teacherOrStudent">
        <a-button
          type="primary"
          @click="confirmExsitDateEdit"
          v-if="showSearchBar && createdByYou"
        >
          确认修改
        </a-button>
        <a-button @click="closeExsitDateEdit">取消</a-button>
        <a-button type="dashed" @click="copySignLink($event)">
          签名链接
        </a-button>
        <a-popconfirm
          placement="top"
          ok-text="是"
          cancel-text="否"
          v-if="showSearchBar && createdByYou"
          @confirm="deleteDate"
        >
          <template #title>
            <span>确定要删除该日程吗？</span>
          </template>
          <a-button type="danger" v-if="role !== 'teacherManager'">
            删除
          </a-button>
        </a-popconfirm>
      </template>
    </a-modal>
    <a-modal
      :visible="showExportDialog"
      @cancel="closeExportDialog"
      :title="'导出课表'"
      width="600px"
    >
      <div>
        <div v-if="teacherName" class="ft-18">
          当前导出
          <strong>{{ teacherName }}</strong>
          <span>{{ teacherOrStudent ? '老师' : '同学' }}课表</span>
        </div>
        <div v-else class="ft-18">全量导出课表</div>
      </div>
      <div class="export-date-container">
        <div class="hint">时间段选择(如想全部导出，时间段可以不选择)：</div>
        <div class="time-set-export">
          <div>
            <div class="">开始时间：</div>
            <a-date-picker
              @change="startExportDateChange"
              v-model:value="startExportDate"
              :showTime="{ format: 'HH:mm' }"
            />
          </div>
          <div>
            <div>结束时间：</div>
            <a-date-picker
              @change="endExportDateChange"
              v-model:value="endExportDate"
              :showTime="{ format: 'HH:mm' }"
            />
          </div>
        </div>
      </div>
      <template v-slot:footer>
        <a-button
          type="primary"
          @click="exportCourseTable"
          :loading="exporting"
        >
          导出
        </a-button>
        <a-button @click="closeExportDialog">取消</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import dateModeTransform from '../../utils/date'
  import { calendarData } from './static/general'
  import { listParameters } from '../student-list/static/list-parameters'
  import { message } from 'ant-design-vue'
  import { exportJsonToExcel } from '../../utils/Export2Excel'
  import clip from '@/utils/clipboard'
  //   import '@fullcalendar/core/main.css'
  import Moment from 'moment'
  import moment from 'moment'
  export default {
    name: 'PersonalCalender',
    components: {
      FullCalendar
    },
    data() {
      return {
        showDateEdit: false,
        showExsitDateEdit: false,
        showExportDialog: false,
        exporting: false,
        studentName: null,
        studentInfo: null,
        projectName: '请选择',
        tempDateArg: null,
        tempInfo: null,
        teacherName: null,
        teacherId: null,
        startDate: '',
        endDate: '',
        startExportDate: null,
        endExportDate: null,
        days: calendarData.days,
        categories: calendarData.categories,
        courseOption: [],
        serviceOption: [],
        studentProjects: null,
        showSearchBar: true,
        tempCalendar: {
          courseTimeTables: []
        },
        tempEvents: [],
        categoryList: [],
        typeColor: {
          基础课: '#75CD2F',
          专业课: '#E396A3',
          跨学科营地: '#99B6EC',
          海外名师授课: '#B66FDB',
          // 教学教研增值服务: '#FF00FF',
          // 后期申请增值服务: '#B0C4DE',
          // 学术背景提升服务: '#00CED1',
          试听: '#F2B36D',
          休息: '#C0C0C0'
        },
        teacherOrStudent: true,
        selectionList: [],
        refreshCalendar: true,
        projectType: '请选择',
        comment: '',
        role: '',
        hasCourseDay: [], // 有课的时间，用于编辑休息日用
        createdByYou: true, //判断教务
        calendarOptions: {
          plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
          allDaySlot: true,
          initialView: 'timeGridWeek',
          initialDate: Moment().format('YYYY-MM-DD'),
          contentHeight: 940,
          firstDay: '1',
          locale: 'zh-cn',
          displayEventTime: true,
          selectable: true,
          // editable: true,
          slotDuration: '1:00',
          slotMinTime: '08:00:00',
          slotMaxTime: '24:00:00',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
            // right: ''
          },
          selectConstraint: {
            daysOfWeek: []
          },
          buttonText: { today: '今天', month: '月', week: '周', day: '天' },
          evnetTime: {
            hour: 'numeric',
            minute: '2-digit',
            hour12: false
          },
          events: [],
          dateClick: this.handleDateClick,
          eventClick: this.eventClick,
          select: this.select,
          snapDuration: { hours: 0.5 },
          courseTables: null, // 临时存储课表
          timeout: null // 防抖变量
        }
      }
    },
    methods: {
      ...mapActions({
        getTeacherCalendar: 'calendar/getTeacherCalendar',
        updateTeacherCalendar: 'calendar/updateTeacherCalendar',
        getStudentCalendar: 'calendar/getStudentCalendar',
        searchStudentName: 'contract/searchStudentName',
        searchTeacherName: 'position/searchTeacherName',
        getStudentProjects: 'calendar/getStudentProjects',
        sendCourseAlert: 'calendar/sendCourseAlert',
        addCourse: 'calendar/addCourse',
        deleteCourse: 'calendar/deleteCourse',
        updateCourse: 'calendar/updateCourse',
        getStudentByName: 'contract/getStudentByName',
        getOnScheduleStudentCoursesForExportByStudent:
          'calendar/getOnScheduleStudentCoursesForExportByStudent',
        getOnScheduleStudentCoursesForExportByTeacher:
          'calendar/getOnScheduleStudentCoursesForExportByTeacher'
      }),
      handleDateClick(arg) {
        this.tempDateArg = arg
        // const day = Moment(arg.dateStr).day()
        if (this.teacherOrStudent && this.teacherName) {
          this.showDateEdit = true
          this.courseOption = []
          this.serviceOption = []
          // if (
          //   this.calendarOptions.selectConstraint.daysOfWeek.indexOf(day) !== -1
          // ) {
          //   this.showDateEdit = true
          // } else {
          //   alert('该老师今天休息！')
          // }
        }
      },
      handleProjectTypeChange(value) {
        this.projectType = value
        this.serviceOption = []
        this.projectName = '请选择'
        if (this.projectType === '试听') {
          this.studentName = ' '
          this.projectName = '试听课'
        } else if (this.projectType === '休息') {
          this.studentName = ' '
          this.projectName = '休息'
        } else {
          let services
          for (let i in listParameters.courseMap) {
            if (value === listParameters.courseMap[i]) {
              services = this.studentProjects[i]
            }
          }
          services.forEach((item) => {
            const option = {
              label: item.projectName,
              value: item.projectName
            }
            this.serviceOption.push(option)
          })
        }
      },
      handleProjectNameChange(value) {
        this.projectName = value
      },
      openExportDialog() {
        this.showExportDialog = true
      },
      formatExport(array) {
        let exportArr = []
        array.forEach((item) => {
          let ele = {
            teacherName: item.teacherName,
            studentName: item.studentName,
            projectName: item.projectName,
            courseName: item.color,
            courseDate: moment(parseFloat(item.startDate)).format(
              'YYYY-MM-DD HH:mm'
            ),
            courseEndDate: moment(parseFloat(item.endDate)).format(
              'YYYY-MM-DD HH:mm'
            ),
            courseDuration:
              (parseFloat(item.endDate) - parseFloat(item.startDate)) / 3600000,
            eduationTeacherName: item.createByNickName
          }
          exportArr.push(ele)
        })
        return exportArr
      },
      exportCourseTable() {
        let exportArr = null
        this.exporting = true
        if (this.teacherOrStudent) {
          this.getOnScheduleStudentCoursesForExportByTeacher({
            teacherName: this.teacherName ? this.teacherName : '',
            callback: (res) => {
              if (res.code === 200) {
                if (this.startExportDate && !this.endExportDate) {
                  const temp = res.rows.filter((item) => {
                    return (
                      parseFloat(item.startDate) >
                      this.startExportDate.valueOf()
                    )
                  })
                  exportArr = this.formatExport(temp)
                } else if (!this.startExportDate && this.endExportDate) {
                  const temp = res.rows.filter((item) => {
                    return (
                      parseFloat(item.endDate) < this.endExportDate.valueOf()
                    )
                  })
                  exportArr = this.formatExport(temp)
                } else {
                  const temp = res.rows.filter((item) => {
                    return (
                      parseFloat(item.startDate) >
                        this.startExportDate.valueOf() &&
                      parseFloat(item.endDate) < this.endExportDate.valueOf()
                    )
                  })
                  exportArr = this.formatExport(temp)
                }
                this.generalExport(exportArr)
              }
            }
          })
        } else {
          this.getOnScheduleStudentCoursesForExportByStudent({
            studentName: this.teacherName ? this.teacherName : '',
            callback: (res) => {
              if (res.code === 200) {
                if (this.startExportDate && !this.endExportDate) {
                  const temp = res.rows.filter((item) => {
                    return (
                      parseFloat(item.startDate) >
                      this.startExportDate.valueOf()
                    )
                  })
                  exportArr = this.formatExport(temp)
                } else if (!this.startExportDate && this.endExportDate) {
                  const temp = res.rows.filter((item) => {
                    return (
                      parseFloat(item.endDate) < this.endExportDate.valueOf()
                    )
                  })
                  exportArr = this.formatExport(temp)
                } else {
                  const temp = res.rows.filter((item) => {
                    return (
                      parseFloat(item.startDate) >
                        this.startExportDate.valueOf() &&
                      parseFloat(item.endDate) < this.endExportDate.valueOf()
                    )
                  })
                  exportArr = this.formatExport(temp)
                }
                this.generalExport(exportArr)
              }
            }
          })
        }
      },
      generalExport(exportList) {
        if (exportList.length > 0) {
          let tHeader = [
            '授课老师',
            '学生',
            '项目名称',
            '课程名称',
            '上课时间',
            '结束时间',
            '课时',
            '教务老师'
          ] // 列头名称
          const filterVal = [
            'teacherName',
            'studentName',
            'projectName',
            'courseName',
            'courseDate',
            'courseEndDate',
            'courseDuration',
            'eduationTeacherName'
          ]
          const data = this.formatJson(filterVal, exportList)
          if (this.teacherName) {
            if (this.teacherOrStudent) {
              exportJsonToExcel(
                tHeader,
                data,
                `${this.teacherName}老师授课记录`
              ) // 定义导出的excle名字
            } else {
              exportJsonToExcel(
                tHeader,
                data,
                `${this.teacherName}同学授课记录`
              ) // 定义导出的excle名字
            }
          } else {
            exportJsonToExcel(tHeader, data, '校区全授课记录')
          }
          this.exporting = false
          this.closeExportDialog()
        }
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map((v) => filterVal.map((j) => v[j]))
      },
      select(arg) {
        this.tempDateArg = arg
        this.startDate = Moment(arg.startStr)
          .utcOffset(8)
          .format('YYYY-MM-DD HH:mm')
        this.endDate = Moment(arg.endStr)
          .utcOffset(8)
          .format('YYYY-MM-DD HH:mm')
        if (this.teacherOrStudent) this.showDateEdit = true
      },
      onCateoryChange() {
        this.calendarOptions.events = this.calendarOptions.events.filter(
          (item) => {
            return item.title === '休息'
          }
        )
        if (this.categoryList.length > 0) {
          this.categoryList.forEach((item) => {
            this.tempEvents.forEach((ele) => {
              if (ele.color === item) {
                this.calendarOptions.events.push(ele)
              }
            })
          })
        } else {
          this.calendarOptions.events = JSON.parse(
            JSON.stringify(this.tempEvents)
          )
        }
      },
      onCheckAllCategories() {
        this.categoryList = []
        this.calendarOptions.events = JSON.parse(
          JSON.stringify(this.tempEvents)
        )
      },
      eventClick(info) {
        this.tempInfo = info
        // const day = Moment(info.event._instance.range.start)
        //   .utcOffset(0)
        //   .format('YYYY-MM-DD HH:mm') // 莫名其妙的时区问题
        // const realDay = Moment(day).day()
        this.startDate = Moment(info.event._instance.range.start)
          .utcOffset(0)
          .format('YYYY-MM-DD HH:mm')
        this.endDate = Moment(info.event._instance.range.end)
          .utcOffset(0)
          .format('YYYY-MM-DD HH:mm')
        this.studentName = info.event._def.title.split('，')[0]
        this.projectName = info.event._def.title.split('，')[1]
        this.comment = info.event._def.title.split('，')[2]
          ? info.event._def.title.split('，')[2]
          : ''
        this.projectType = this.getObjectKey(info.event._def.ui.backgroundColor)
        this.courseOption = []
        this.serviceOption = []
        this.searchProjects()
        // this.projectType = null
        // if (
        //   this.calendarOptions.selectConstraint.daysOfWeek.indexOf(realDay) !==
        //   -1
        // ) {
        //   this.startDate = Moment(info.event._instance.range.start)
        //     .utcOffset(0)
        //     .format('YYYY-MM-DD HH:mm')
        //   this.endDate = Moment(info.event._instance.range.end)
        //     .utcOffset(0)
        //     .format('YYYY-MM-DD HH:mm')
        //   this.studentName = info.event._def.title.split('，')[0]
        //   this.projectName = info.event._def.title.split('，')[1]
        //   this.showExsitDateEdit = true
        // } else {
        //   alert('该老师今天休息！')
        // }
        if (
          this.projectName !== '试听课' &&
          this.projectName !== '休息' &&
          this.studentName !== '' &&
          this.studentName !== '休息' &&
          this.teacherOrStudent
        ) {
          this.getStudentInfo('edit')
        } else {
          this.showExsitDateEdit = true
        }
      },
      searchProjectsThroughName(val) {
        this.studentName = this.selectionList[val]
        this.searchProjects()
        this.getStudentInfo('search')
      },
      searchProjects() {
        this.courseOption = []
        this.serviceOption = []
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.getStudentProjects({
            studentName: this.studentName,
            callback: (res) => {
              if (res.code === 200) {
                this.studentProjects = res.data
                this.categories.forEach((item) => {
                  for (let i in this.studentProjects) {
                    if (
                      listParameters.courseMap[i] === item.label &&
                      this.studentProjects[i].length > 0
                    ) {
                      const option = {
                        label: item.label,
                        value: item.label
                      }
                      this.courseOption.push(option)
                    }
                  }
                })
                if (this.projectName && this.projectName !== '请选择') {
                  let services
                  for (let i in listParameters.courseMap) {
                    if (this.projectType === listParameters.courseMap[i]) {
                      services = this.studentProjects[i]
                    }
                  }
                  services.forEach((item) => {
                    const option = {
                      label: item.projectName,
                      value: item.projectName
                    }
                    this.serviceOption.push(option)
                  })
                }
              }
            }
          })
        }, 500)
      },
      startDateChange(date, dateString) {
        this.startDate = dateString
      },
      endDateChange(date, dateString) {
        this.endDate = dateString
      },
      startExportDateChange(date) {
        this.startExportDate = date
      },
      endExportDateChange(date) {
        this.endExportDate = date
      },
      confirmDateEdit() {
        if (
          !this.createdByYou &&
          this.projectName !== '试听课' &&
          this.projectName !== '休息'
        ) {
          message.error('抱歉，您不是该学生的负责老师，无法排试听以外的课程')
          this.showDateEdit = false
          return
        }
        let ousideEvent = null
        if (this.tempDateArg.view.type !== 'dayGridMonth') {
          const event = {
            // add new event data
            title:
              `${this.studentName ? this.studentName + '，' : ''}${
                this.projectName
              }` + (this.comment ? `，${this.comment}` : ''),
            start: this.startDate ? this.startDate : this.tempDateArg.dateStr,
            end: this.endDate
              ? this.endDate
              : Moment(this.tempDateArg.dateStr)
                  .subtract(-0.5, 'hours')
                  .format('YYYY-MM-DD HH:mm'), // 设置向后固定一个小时
            groupId: Math.random().toFixed(8).toString(),
            color: this.typeColor[this.projectType]
          }
          ousideEvent = event
          let tempEle = {
            endDate: Moment(ousideEvent.end).valueOf().toString(),
            groupId: ousideEvent.groupId,
            id: parseFloat(ousideEvent.groupId),
            projectName: ousideEvent.title.split('，')[1],
            startDate: Moment(ousideEvent.start).valueOf().toString(),
            studentName: ousideEvent.title.includes('，')
              ? ousideEvent.title.split('，')[0]
              : '',
            teacherId: this.teacherId,
            teacherName: this.teacherName,
            title: ousideEvent.title,
            color: this.getObjectKey(ousideEvent.color)
          }
          const checkTime = this.calendarOptions.events.filter((item) => {
            return (
              parseFloat(tempEle.startDate) < Moment(item.end).valueOf() &&
              parseFloat(tempEle.startDate) > Moment(item.start).valueOf()
            )
          })
          if (checkTime.length !== 0) {
            message.error('该老师在此时间段已有安排，请确认后重新排课。')
          } else {
            this.addCourse({
              data: tempEle,
              callback: (res) => {
                if (res && res.code === 200) {
                  this.sendCourseAlertFun({
                    endDate: Moment(event.end).valueOf().toString(),
                    groupId: event.groupId,
                    id: parseFloat(event.groupId),
                    color: event.color,
                    title: event.title,
                    startDate: Moment(event.start).valueOf().toString(),
                    projectName: this.projectName,
                    studentName: this.studentName,
                    teacherName: this.teacherName
                  })
                  this.calendarOptions.events.push(event)
                  this.tempEvents.push(event)
                  message.success('排课成功。')
                  this.closeDateEdit()
                } else {
                  if (res.msg.inclueds('开始时间')) {
                    let one = res.msg.split('开始时间：')[0]
                    const two = res.msg.split('开始时间：')[1]
                    const date = Moment.valueOf(parseFloat(two)).format(
                      'YYYY-MM-DD HH:mm'
                    )
                    message.error(one + '开始时间:' + date)
                  } else {
                    message.error(res.msg)
                  }
                }
              }
            })
          }
        } else {
          const event = {
            // add new event data
            title: `${this.studentName}，${this.projectName}`,
            groupId: Math.random().toFixed(8).toString(),
            start: this.startDate,
            end: this.endDate,
            color: this.typeColor[this.projectType]
          }
          this.sendCourseAlertFun({
            endDate: Moment(event.end).valueOf().toString(),
            groupId: event.groupId,
            id: parseFloat(event.groupId),
            color: event.color,
            title: event.title,
            startDate: Moment(event.start).valueOf().toString(),
            projectName: this.projectName,
            studentName: this.studentName,
            teacherName: this.teacherName
          })
          ousideEvent = event
          let tempEle = {
            endDate: Moment(ousideEvent.end).valueOf().toString(),
            groupId: ousideEvent.groupId,
            id: parseFloat(ousideEvent.groupId),
            projectName: ousideEvent.title.split('，')[1],
            startDate: Moment(ousideEvent.start).valueOf().toString(),
            studentName: ousideEvent.title.includes('，')
              ? ousideEvent.title.split('，')[0]
              : '',
            teacherId: this.teacherId,
            teacherName: this.teacherName,
            title: ousideEvent.title,
            color: this.getObjectKey(ousideEvent.color)
          }
          const checkTime = this.calendarOptions.events.filter((item) => {
            return (
              parseFloat(tempEle.startDate) < Moment(item.end).valueOf() &&
              parseFloat(tempEle.startDate) > Moment(item.start).valueOf()
            )
          })
          if (checkTime.length !== 0) {
            message.error('该老师在此时间段已有安排，请确认后重新排课。')
          } else {
            this.addCourse({
              data: tempEle,
              callback: (res) => {
                if (res && res.code === 200) {
                  this.sendCourseAlertFun({
                    endDate: Moment(event.end).valueOf().toString(),
                    groupId: event.groupId,
                    id: parseFloat(event.groupId),
                    color: event.color,
                    title: event.title,
                    startDate: Moment(event.start).valueOf().toString(),
                    projectName: this.projectName,
                    studentName: this.studentName,
                    teacherName: this.teacherName
                  })
                  this.calendarOptions.events.push(event)
                  this.tempEvents.push(event)
                  message.success('排课成功。')
                  this.closeDateEdit()
                } else {
                  if (res.msg.inclueds('开始时间')) {
                    let one = res.msg.split('开始时间：')[0]
                    const two = res.msg.split('开始时间：')[1]
                    const date = Moment.valueOf(parseFloat(two)).format(
                      'YYYY-MM-DD HH:mm'
                    )
                    message.error(one + '开始时间:' + date)
                  } else {
                    message.error(res.msg)
                  }
                }
              }
            })
          }
        }
      },
      confirmExsitDateEdit() {
        const tempObj = this.calendarOptions.events.find((item) => {
          return item.groupId === this.tempInfo.event._def.groupId
        })
        const event = {
          // add new event data
          title:
            `${this.studentName ? this.studentName : ''}，${this.projectName}` +
            (this.comment ? `，${this.comment}` : ''),
          groupId: tempObj.groupId,
          start: this.startDate,
          end: this.endDate,
          color: this.projectType
            ? this.typeColor[this.projectType]
            : tempObj.color
        }
        let tempEle = {
          endDate: Moment(event.end).valueOf().toString(),
          groupId: event.groupId,
          id: parseFloat(event.groupId),
          projectName: event.title.split('，')[1],
          startDate: Moment(event.start).valueOf().toString(),
          studentName: event.title.includes('，')
            ? event.title.split('，')[0]
            : '',
          teacherId: this.teacherId,
          teacherName: this.teacherName,
          title: event.title,
          color: this.getObjectKey(event.color)
        }
        const checkTime = this.calendarOptions.events.filter((item) => {
          return (
            parseFloat(tempEle.startDate) < Moment(item.end).valueOf() &&
            parseFloat(tempEle.startDate) > Moment(item.start).valueOf()
          )
        })
        if (checkTime.length !== 0) {
          message.error('该老师在此时间段已有安排，请确认后重新排课。')
        } else {
          this.updateCourse({
            data: tempEle,
            callback: (res) => {
              if (res && res.code === 200) {
                this.sendCourseAlertFun({
                  endDate: Moment(event.end).valueOf().toString(),
                  groupId: event.groupId,
                  id: parseFloat(event.groupId),
                  color: event.color,
                  title: event.title,
                  startDate: Moment(event.start).valueOf().toString(),
                  projectName: this.projectName,
                  studentName: this.studentName,
                  teacherName: this.teacherName
                })
                this.calendarOptions.events =
                  this.calendarOptions.events.filter((item) => {
                    return item.groupId !== this.tempInfo.event._def.groupId
                  })
                this.tempEvents = this.tempEvents.filter((item) => {
                  return item.groupId !== this.tempInfo.event._def.groupId
                })
                this.calendarOptions.events.push(event)
                this.tempEvents.push(event)
                message.success('排课修改成功！')
                this.closeExsitDateEdit()
              } else {
                message.error(res.msg)
              }
            }
          })
        }
      },
      sendCourseAlertFun(data) {
        this.sendCourseAlert({
          data: data,
          callback: (res) => {
            console.log(res)
          }
        })
      },
      // updateCalendarFun(type) {
      //   let courseTimeTables = []
      //   this.calendarOptions.events.forEach((item) => {
      //     if (item.title !== '休息') {
      //       let tempEle = {
      //         endDate: Moment(item.end).valueOf().toString(),
      //         groupId: item.groupId,
      //         id: parseFloat(item.groupId),
      //         projectName: item.title.split('，')[1],
      //         startDate: Moment(item.start).valueOf().toString(),
      //         studentName: item.title.split('，')[0],
      //         teacherId: this.teacherId,
      //         teacherName: this.teacherName,
      //         title: item.title,
      //         color: this.getObjectKey(item.color)
      //       }
      //       courseTimeTables.push(tempEle)
      //     }
      //   })
      //   this.updateTeacherCalendar({
      //     calendar: {
      //       courseTimeTables: courseTimeTables,
      //       teacherName: this.teacherName
      //     },
      //     callback: (res) => {
      //       if (res && res.code === 200) {
      //         switch (type) {
      //           case 'create':
      //             this.closeDateEdit()
      //             break
      //           case 'edit':
      //             this.closeExsitDateEdit()
      //             break
      //         }
      //         message.success('排课成功。')
      //       } else {
      //         message.error(res.msg)
      //         const deleteItem = this.tempEvents[this.tempEvents.length - 1]
      //         this.calendarOptions.events = this.calendarOptions.events.filter(
      //           (item) => {
      //             return item.groupId !== deleteItem.groupId
      //           }
      //         )
      //         this.tempEvents.pop()
      //       }
      //     }
      //   })
      // },
      getObjectKey(value) {
        return Object.keys(this.typeColor).find(
          (key) => this.typeColor[key] == value
        )
      },
      closeDateEdit() {
        this.studentName = null
        this.projectName = '请选择'
        this.projectType = '请选择'
        this.comment = ''
        this.startDate = null
        this.endDate = null
        this.courseOption = []
        this.serviceOption = []
        this.showDateEdit = false
      },
      closeExsitDateEdit() {
        this.studentName = null
        this.projectName = '请选择'
        this.projectType = '请选择'
        this.comment = ''
        this.startDate = null
        this.endDate = null
        this.serviceOption = []
        this.courseOption = []
        this.showExsitDateEdit = false
      },
      closeExportDialog() {
        this.startExportDate = null
        this.endExportDate = null
        this.showExportDialog = false
      },
      deleteDate() {
        const element = this.calendarOptions.events.filter((item) => {
          return item.groupId === this.tempInfo.event._def.groupId
        })[0]
        if (element.textColor && element.textColor === 'red') {
          this.calendarOptions.events = this.calendarOptions.events.filter(
            (item) => {
              return item.groupId !== this.tempInfo.event._def.groupId
            }
          )
          this.tempEvents = this.tempEvents.filter((item) => {
            return item.groupId !== this.tempInfo.event._def.groupId
          })
          this.closeExsitDateEdit()
        } else {
          let tempEle = {
            endDate: Moment(element.end).valueOf().toString(),
            groupId: element.groupId,
            id: parseFloat(element.groupId),
            projectName: element.title.split('，')[1],
            startDate: Moment(element.start).valueOf().toString(),
            studentName: element.title.includes('，')
              ? element.title.split('，')[0]
              : '',
            teacherId: this.teacherId,
            teacherName: this.teacherName,
            title: element.title,
            color: this.getObjectKey(element.color)
          }
          this.deleteCourse({
            data: tempEle,
            callback: (res) => {
              if (res && res.code === 200) {
                this.calendarOptions.events =
                  this.calendarOptions.events.filter((item) => {
                    return item.groupId !== this.tempInfo.event._def.groupId
                  })
                this.tempEvents = this.tempEvents.filter((item) => {
                  return item.groupId !== this.tempInfo.event._def.groupId
                })
                message.success(res.msg)
                this.closeExsitDateEdit()
              } else {
                message.error(res.msg)
              }
            }
          })
        }
      },
      changeCategory(e) {
        this.teacherOrStudent = e.target.value
        this.teacherName = null
        this.selectionList = []
        this.calendarOptions.events = []
        this.calendarOptions.selectConstraint.daysOfWeek = this.days
      },
      onPanelChange(value) {
        this.refreshCalendar = false
        this.calendarOptions.initialDate = Moment(value).format(
          'YYYY-MM-DD HH:mm:ss'
        )
        setTimeout(() => {
          this.refreshCalendar = true
        }, 10)
      },
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
      searchNameInModal(val) {
        this.studentName = val
        this.searchStudentNameFun()
      },
      searchStudentNameFun() {
        if (this.timeout) clearTimeout(this.timeout)
        let name = ''
        // console.log(this.studentName)
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
        this.calendarOptions.events = []
        this.getStudentCalendar({
          studentName: this.teacherName,
          callback: (res) => {
            if (res.rows && typeof res.rows.length === 'number') {
              res.rows.forEach((item) => {
                let ele = {
                  title: `${item.teacherName}老师，${item.projectName}`,
                  groupId: item.groupId,
                  start: Moment(parseFloat(item.startDate)).format(
                    'YYYY-MM-DD HH:mm'
                  ),
                  end: Moment(parseFloat(item.endDate)).format(
                    'YYYY-MM-DD HH:mm'
                  ),
                  color: this.typeColor[item.color]
                }
                this.calendarOptions.events.push(ele)
                this.tempEvents = JSON.parse(
                  JSON.stringify(this.calendarOptions.events)
                )
              })
            }
          }
        })
      },
      getStudentInfo(mode) {
        const nickName = this.$store.getters['user/nickName']
        console.log(nickName)
        this.getStudentByName({
          name: this.studentName,
          callback: (res) => {
            if (res && res.code === 200) {
              this.studentInfo = {
                applyMainCountry: res.data.applyMainCountry,
                applyMajor: res.data.applyMajor
              }
              if (res.data.createBy !== nickName) {
                this.createdByYou = false
              } else {
                this.createdByYou = true
              }
              if (mode === 'edit') {
                this.showExsitDateEdit = true
              }
            }
          }
        })
      },
      copySignLink(event) {
        const tempObj = this.courseTables.find((item) => {
          return item.groupId === this.tempInfo.event._def.groupId
        })
        // let bringData = null
        // bringData = {
        //   studentName: tempObj.studentName,
        //   applyMainCountry: this.studentInfo.applyMainCountry,
        //   applyMajor: this.studentInfo.applyMajor,
        //   id: tempObj.id,
        //   checkInTime: this.startDate,
        //   checkOutTime: this.endDate
        // }
        // const temp = encodeURI(JSON.stringify(bringData)).replace(/,/g, '#')
        // const link = `http://www.skdoasystem.com/#/signature?${temp}`
        // const link = `http://localhost:9999/#/signature?${encodeURI(tempObj.studentName)}&${encodeURI(this.studentInfo.applyMainCountry)}&${encodeURI(this.studentInfo.applyMajor)}&${tempObj.id}&${encodeURI(this.startDate)}&${encodeURI(this.endDate)}`
        if (this.projectName !== '试听课' && this.projectName !== '休息') {
          const link = `http://www.skdoasystem.com/#/signature?${encodeURI(
            tempObj.studentName
          )}&${encodeURI(this.studentInfo.applyMainCountry)}&${encodeURI(
            this.studentInfo.applyMajor
          )}&${tempObj.id}&${encodeURI(this.startDate)}&${encodeURI(
            this.endDate
          )}`
          clip(link, event)
        } else {
          message.error('试听课无需签名确认')
        }
      },
      searchTeacherCalendar() {
        this.calendarOptions.events = []
        this.hasCourseDay = []
        this.getTeacherCalendar({
          teacherName: this.teacherName,
          callback: (res) => {
            this.teacherId = res.rows[0].teacherId
            if (
              res.rows[0].courseTimeTables &&
              typeof res.rows[0].courseTimeTables.length === 'number'
            ) {
              this.courseTables = res.rows[0].courseTimeTables
              res.rows[0].courseTimeTables.forEach((item) => {
                this.hasCourseDay.push(
                  Moment(parseFloat(item.startDate)).format('YYYY-MM-DD')
                )
                let ele = {
                  title: item.title,
                  groupId: item.groupId,
                  start: Moment(parseFloat(item.startDate)).format(
                    'YYYY-MM-DD HH:mm'
                  ),
                  end: Moment(parseFloat(item.endDate)).format(
                    'YYYY-MM-DD HH:mm'
                  ),
                  color: this.typeColor[item.color]
                }
                this.calendarOptions.events =
                  this.calendarOptions.events.filter((item) => {
                    return item.start !== ele.start
                  })
                this.calendarOptions.events.push(ele)
                this.tempEvents = JSON.parse(
                  JSON.stringify(this.calendarOptions.events)
                )
              })
            }
            this.calendarOptions.selectConstraint.daysOfWeek = this.days
            if (
              res.rows[0].busiDateArray &&
              typeof res.rows[0].busiDateArray.length === 'number'
            ) {
              const restDate = dateModeTransform.getWeek(
                Moment().subtract(6, 'months').format('YYYY-MM-DD'),
                Moment().subtract(-6, 'months').format('YYYY-MM-DD'),
                res.rows[0].busiDateArray
              )
              // if (restDate.length > 0) { // 开启限制选择
              //   this.calendarOptions.selectConstraint.daysOfWeek =
              //     this.days.filter((item) => {
              //       return (
              //         item !== res.rows[0].busiDateArray[0] &&
              //         item !== res.rows[0].busiDateArray[1]
              //       )
              //     })
              // } else {
              //   this.calendarOptions.selectConstraint.daysOfWeek = this.days
              // }
              restDate.forEach((item) => {
                let temp = []
                // for (let i = 8; i < 24; i++) { // 按time slot添加休息时段
                //   const ele = {
                //     title: '休息',
                //     start: item + ` ${i < 10 ? '0' + i : i}:00`,
                //     end: item + ` ${i + 1 < 10 ? '0' + (i + 1) : i + 1}:00`,
                //     color: 'lightgray',
                //     groupId: Math.random().toFixed(5).toString(),
                //     textColor: 'red'
                //   }
                //   temp.push(ele)
                // }
                const ele = {
                  title: '休息',
                  start: item + ` 08:00`,
                  end: item + ` 23:59`,
                  color: '#C0C0C0',
                  groupId: Math.random().toFixed(8).toString(),
                  textColor: 'red'
                }
                const hasCourse = this.hasCourseDay.findIndex((ele) => {
                  return item === ele
                })
                if (hasCourse === -1) temp.push(ele)
                this.calendarOptions.events =
                  this.calendarOptions.events.concat(temp)
              })
            }
          }
        })
      }
    },
    mounted() {
      this.role = this.$store.getters['acl/role'][0]
      console.log(this.role)
      if (
        this.role !== 'educationalManager' &&
        this.role !== 'educationalTeacher' &&
        this.role !== 'teacherManager' &&
        this.role !== 'admin'
      ) {
        this.teacherName = this.$store.getters['user/nickName']
        this.showSearchBar = false
        this.searchTeacherCalendar()
      }
      if (this.role === 'teacherManager') {
        this.teacherName = this.$store.getters['user/nickName']
        this.searchTeacherCalendar()
      }
    }
  }
</script>
<style lang="less">
  .calendar-search {
    margin-bottom: 20px;
  }
  .fc .fc-timegrid-slot {
    height: 80px !important;
  }
  .fc .fc-timegrid-col.fc-day-today {
    background-color: white !important;
  }
  .fc .fc-timegrid-col.fc-day-tue {
    background-color: lightcyan !important;
  }
  .fc .fc-timegrid-col.fc-day-thu {
    background-color: lightcyan !important;
  }
  .fc .fc-timegrid-col.fc-day-sat {
    background-color: lightcyan !important;
  }
  .select-category {
    margin-bottom: 10px;
  }
  .calendar {
    display: flex;
    .calendar-pick {
      width: 300px;
    }
    .flex-1 {
      flex: 1;
      padding: 0 20px;
    }
  }
  .line {
    border-bottom: 1px solid gray;
    opacity: 0.7;
    width: 100%;
    margin: 15px auto;
  }
  .project-info {
    margin-top: 5px;
    display: flex;
    div:first-child {
      margin-right: 10px;
    }
  }
  .category {
    margin-top: 30px;
    .title {
      display: flex;
      align-items: center;
      div {
        font-size: 24px;
        font-weight: 500;
        flex: 1;
      }
    }
    .category-section {
      .section-ele {
        display: flex;
        align-items: center;
        font-size: 18px;
        .cube {
          width: 22px;
          height: 22px;
          margin-right: 20px;
        }
      }
    }
    .ant-checkbox-group {
      .ant-checkbox-group-item:first-child {
        color: #75cd2f !important;
      }
      .ant-checkbox-group-item:nth-child(2) {
        color: #e396a3 !important;
      }
      .ant-checkbox-group-item:nth-child(3) {
        color: #99b6ec !important;
      }
      .ant-checkbox-group-item:nth-child(4) {
        color: #b66fdb !important;
      }
      .ant-checkbox-group-item:nth-child(5) {
        color: #ff00ff !important;
      }
      .ant-checkbox-group-item:nth-child(6) {
        color: #b0c4de !important;
      }
      .ant-checkbox-group-item:nth-child(7) {
        color: #00ced1 !important;
      }
      .ant-checkbox-group-item:last-child {
        color: #f2b36d !important;
      }
    }
  }
  .export-date-container {
    margin-top: 20px;
    .hint {
      text-align: left;
      font-weight: 600;
      font-size: 16px;
    }
    .time-set-export {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  .ant-checkbox-group-item {
    display: block;
    margin: 10px auto;
    font-size: 18px;
  }
  .ant-modal-content {
    padding: 10px !important;
  }
  .ft-18 {
    font-size: 18px;
  }
</style>
