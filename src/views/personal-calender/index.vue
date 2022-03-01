<template>
  <div class="test-container">
    <FullCalendar :options="calendarOptions" />
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
        calendarOptions: {
          plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
          initialView: 'dayGridMonth',
          firstDay: '1',
          locale: 'zh-cn',
          displayEventTime: true,
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          evnetTime: {
            hour: 'numeric',
            minute: '2-digit',
            hour12: false
          },
          events: [{ title: '部门会议', start: new Date() }],
          dateClick: this.handleDateClick,
          eventClick: this.eventClick
        }
      }
    },
    methods: {
      handleDateClick(arg) {
        if (confirm('您是否要在' + arg.dateStr + '添加一个新的事件?')) {
          this.calendarEvents.push({
            // add new event data
            title: '新的事件',
            start: arg.date,
            allDay: arg.allDay
          })
        }
      },
      handleEventClick(info) {
        alert('Event: ' + info.event.title)
        info.el.style.borderColor = 'red'
      }
    },
    mounted() {}
  }
</script>
<style lang="less" scoped></style>
