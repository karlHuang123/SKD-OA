<template>
  <div class="test-container">
    <FullCalendar :options="calendarOptions" />
    <a-modal
      :visible="showDateEdit"
      @cancel="closeDateEdit"
      :title="'日程信息'"
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
        <a-date-time-picker
          @change="startDateChange"
          v-model:value="startDate"
        />
        <div>结束时间：</div>
        <a-date-time-picker @change="endDateChange" v-model:value="endDate" />
      </div>
      <template v-slot:footer>
        <a-button type="primary" @click="confirmDateEdit">确定</a-button>
        <a-button @click="closeDateEdit">取消</a-button>
        <!-- <a-button type="danger" @click="deleteDate">删除</a-button> -->
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
  //   import '@fullcalendar/core/main.css'
  export default {
    name: 'PersonalCalender',
    components: {
      FullCalendar
    },
    data() {
      return {
        showDateEdit: false,
        studentName: null,
        projectName: null,
        tempDateArg: null,
        tempInfo: null,
        startDate: '',
        endDate: '',
        calendarOptions: {
          plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
          initialView: 'dayGridMonth',
          firstDay: '1',
          locale: 'zh-cn',
          displayEventTime: true,
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
            // right: ''
          },
          evnetTime: {
            hour: 'numeric',
            minute: '2-digit',
            hour12: false
          },
          events: [{ title: '部门会议', start: new Date(), groupId: '1' }],
          dateClick: this.handleDateClick,
          eventClick: this.eventClick,
          eventRender: this.eventRender
        }
      }
    },
    methods: {
      handleDateClick(arg) {
        console.log(arg)
        this.tempDateArg = arg
        this.showDateEdit = true
      },
      eventClick(info) {
        this.tempInfo = info
        // this.tempInfo.event.remove()
        this.calendarOptions.events = this.calendarOptions.events.filter(
          (item) => {
            return item.groupId !== this.tempInfo.event._def.groupId
          }
        )
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
            start: this.tempDateArg.dateStr,
            groupId: Math.random().toFixed(5).toString()
          })
        } else {
          console.log(this.startDate)
          this.calendarOptions.events.push({
            // add new event data
            title: `${this.studentName}，${this.projectName}`,
            groupId: Math.random().toFixed(5).toString(),
            start: this.startDate,
            end: this.endDate
          })
        }
        this.showDateEdit = false
        this.startDate = null
        this.endDate = null
      },
      closeDateEdit() {
        this.studentName = null
        this.projectName = null
        this.showDateEdit = false
      }
    },
    mounted() {}
  }
</script>
<style lang="less" scoped></style>
