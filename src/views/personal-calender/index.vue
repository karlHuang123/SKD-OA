<template>
  <div class="test-container">
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
          events: [
            {
              title: '孙悟空，西天取经不怕事儿',
              start: new Date(),
              groupId: '1'
            }
          ],
          dateClick: this.handleDateClick,
          eventClick: this.eventClick,
          eventRender: this.eventRender
        }
      }
    },
    methods: {
      handleDateClick(arg) {
        this.tempDateArg = arg
        this.showDateEdit = true
      },
      eventClick(info) {
        this.tempInfo = info
        this.startDate = Moment(info.event._instance.range.start)
          .utcOffset(0)
          .format('YYYY-MM-DD HH:mm')
        this.endDate = Moment(info.event._instance.range.end)
          .utcOffset(0)
          .format('YYYY-MM-DD HH:mm')
        this.studentName = info.event._def.title.split('，')[0]
        this.projectName = info.event._def.title.split('，')[1]
        this.showExsitDateEdit = true
        // this.tempInfo.event.remove()
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
        this.showExsitDateEdit = false
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
        this.showExsitDateEdit = false
      }
    },
    mounted() {}
  }
</script>
<style lang="less" scoped></style>
