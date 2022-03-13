<template>
  <div class="test-container">
    <div class="calendar-search">
      <a-input-search
        placeholder="请输入老师姓名查询时间表"
        style="width: 300px"
        @search="searchTeacherCalendar"
        v-model:value="teacherName"
      />
    </div>
    <FullCalendar :options="calendarOptions" />
    <a-modal
      :visible="showDateEdit"
      @cancel="closeDateEdit"
      :title="'添加日程'"
      width="500px"
    >
      <label for="">学生姓名：</label>
      <a-input v-model:value="studentName"></a-input>
      <label for="">项目名称：</label>
      <a-input v-model:value="projectName"></a-input>
      <div
        class="time-set"
        v-if="this.tempDateArg && this.tempDateArg.view.type === 'dayGridMonth'"
      >
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
        <a-button type="primary" @click="confirmDateEdit">确定</a-button>
        <a-button @click="closeDateEdit">取消</a-button>
        <!-- <a-button type="danger" @click="deleteDate">删除</a-button> -->
      </template>
    </a-modal>
    <a-modal
      :visible="showExsitDateEdit"
      @cancel="closeExsitDateEdit"
      :title="'日程信息'"
      width="500px"
    >
      <label for="">学生姓名：</label>
      <a-input v-model:value="studentName"></a-input>
      <label for="">项目名称：</label>
      <a-input v-model:value="projectName"></a-input>
      <div
        class="time-set"
        v-if="this.tempInfo && this.tempInfo.view.type === 'dayGridMonth'"
      >
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
        <a-button type="primary" @click="confirmExsitDateEdit">
          确认修改
        </a-button>
        <a-button @click="closeExsitDateEdit">取消</a-button>
        <a-popconfirm
          placement="top"
          ok-text="是"
          cancel-text="否"
          @confirm="deleteDate"
        >
          <template #title>
            <span>确定要删除该日程吗？</span>
          </template>
          <a-button type="danger">删除</a-button>
        </a-popconfirm>
      </template>
    </a-modal>
  </div>
</template>

<script>
  //   import { mapActions } from 'vuex'
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import dateModeTransform from '../../utils/date'
  //   import '@fullcalendar/core/main.css'
  import Moment from 'moment'
  export default {
    name: 'PersonalCalender',
    components: {
      FullCalendar
    },
    data() {
      return {
        showDateEdit: false,
        showExsitDateEdit: false,
        studentName: null,
        projectName: null,
        tempDateArg: null,
        tempInfo: null,
        teacherName: null,
        startDate: '',
        endDate: '',
        calendarOptions: {
          plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
          initialView: 'timeGridWeek',
          height: 790,
          firstDay: '1',
          locale: 'zh-cn',
          displayEventTime: true,
          selectable: true,
          // editable: true,
          slotDuration: '1:00',
          slotMinTime: '08:00:00',
          slotMaxTime: '20:30:00',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
            // right: ''
          },
          selectConstraint: {
            daysOfWeek: [1, 4, 3, 0, 5]
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
          snapDuration: { hours: 1 }
        }
      }
    },
    methods: {
      handleDateClick(arg) {
        this.tempDateArg = arg
        const day = Moment(arg.dateStr).day()
        if (
          this.calendarOptions.selectConstraint.daysOfWeek.indexOf(day) !== -1
        ) {
          this.showDateEdit = true
        } else {
          alert('该老师今天休息！')
        }
      },
      select(arg) {
        this.tempDateArg = arg
        this.startDate = Moment(arg.startStr)
          .utcOffset(8)
          .format('YYYY-MM-DD HH:mm')
        this.endDate = Moment(arg.endStr)
          .utcOffset(8)
          .format('YYYY-MM-DD HH:mm')
        this.showDateEdit = true
      },
      eventClick(info) {
        this.tempInfo = info
        const day = Moment(info.event._instance.range.start)
          .utcOffset(0)
          .format('YYYY-MM-DD HH:mm') // 莫名其妙的时区问题
        const realDay = Moment(day).day()
        if (
          this.calendarOptions.selectConstraint.daysOfWeek.indexOf(realDay) !==
          -1
        ) {
          this.startDate = Moment(info.event._instance.range.start)
            .utcOffset(0)
            .format('YYYY-MM-DD HH:mm')
          this.endDate = Moment(info.event._instance.range.end)
            .utcOffset(0)
            .format('YYYY-MM-DD HH:mm')
          this.studentName = info.event._def.title.split('，')[0]
          this.projectName = info.event._def.title.split('，')[1]
          this.showExsitDateEdit = true
        } else {
          alert('该老师今天休息！')
        }
      },
      startDateChange(date, dateString) {
        this.startDate = dateString
      },
      endDateChange(date, dateString) {
        this.endDate = dateString
      },
      confirmDateEdit() {
        if (this.tempDateArg.view.type !== 'dayGridMonth') {
          this.calendarOptions.events.push({
            // add new event data
            title: `${this.studentName}，${this.projectName}`,
            start: this.startDate ? this.startDate : this.tempDateArg.dateStr,
            end: this.endDate
              ? this.endDate
              : Moment(this.tempDateArg.dateStr)
                  .subtract(-1, 'hours')
                  .format('YYYY-MM-DD HH:mm'), // 设置向后固定一个小时
            groupId: Math.random().toFixed(5).toString()
          })
        } else {
          this.calendarOptions.events.push({
            // add new event data
            title: `${this.studentName}，${this.projectName}`,
            groupId: Math.random().toFixed(5).toString(),
            start: this.startDate,
            end: this.endDate
          })
        }
        this.closeDateEdit()
      },
      confirmExsitDateEdit() {
        this.calendarOptions.events = this.calendarOptions.events.filter(
          (item) => {
            return item.groupId !== this.tempInfo.event._def.groupId
          }
        )
        this.calendarOptions.events.push({
          // add new event data
          title: `${this.studentName}，${this.projectName}`,
          groupId: Math.random().toFixed(5).toString(),
          start: this.startDate,
          end: this.endDate
        })
        this.closeExsitDateEdit()
      },
      closeDateEdit() {
        this.studentName = null
        this.projectName = null
        this.startDate = null
        this.endDate = null
        this.showDateEdit = false
      },
      closeExsitDateEdit() {
        this.studentName = null
        this.projectName = null
        this.startDate = null
        this.endDate = null
        this.showExsitDateEdit = false
      },
      deleteDate() {
        this.calendarOptions.events = this.calendarOptions.events.filter(
          (item) => {
            return item.groupId !== this.tempInfo.event._def.groupId
          }
        )
        this.closeExsitDateEdit()
      },
      searchTeacherCalendar() {
        console.log(this.teacherName)
      }
    },
    mounted() {
      const restDate = dateModeTransform.getWeek(
        '2018-01-01',
        '2028-01-01',
        [2, 6] // 记得+1和时间表同步
      )
      restDate.forEach((item) => {
        const ele = {
          title: '休息',
          start: item + ' 08:00',
          end: item + ' 20:30',
          color: 'lightgray'
        }
        this.calendarOptions.events.push(ele)
      })
    }
  }
</script>
<style lang="less">
  .calendar-search {
    margin-bottom: 20px;
  }
  .fc .fc-timegrid-slot {
    height: 50px !important;
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
</style>
