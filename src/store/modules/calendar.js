/**
 * @author KarlHuang
 * @description 日程表相关
 */

import {
  getTeacherCalendar,
  updateTeacherCalendar,
  getStudentCalendar,
  getStudentProjects,
  sendCourseAlert,
  addCourse,
  deleteCourse,
  updateCourse,
  getCourseInfo,
  addCourseInfo,
  getCourseRecordingByStuName,
  getOnScheduleStudentCoursesForExportByStudent,
  getOnScheduleStudentCoursesForExportByTeacher
} from '@/api/calendar'
// import { message } from 'ant-design-vue'

const state = () => ({
  teacherCalendar: null,
  studentCalendar: null
})

const getters = {
  teacherCalendar: (state) => state.teacherCalendar,
  studentCalendar: (state) => state.studentCalendar
}

const mutations = {
  /**
   * @author KarlHuang
   * @description 设置教师日程表
   * @param {*} state
   * @param {*} studentList
   */
  setTeacherCalendar(state, teacherCalendar) {
    state.teacherCalendar = teacherCalendar
  },
  /**
   * @author KarlHuang
   * @description 设置学生日程表
   * @param {*} state
   * @param {*} studentList
   */
  setStudentCalendar(state, studentCalendar) {
    state.studentCalendar = studentCalendar
  }
}

const actions = {
  async getTeacherCalendar({ commit }, body) {
    const res = await getTeacherCalendar(body.teacherName)
    if (res) {
      commit('setTeacherCalendar', res.rows[0])
      body.callback && body.callback(res)
    }
  },
  // 更新日程表
  async updateTeacherCalendar({ state }, body) {
    const res = await updateTeacherCalendar(body.calendar)
    if (res) {
      console.log(state.teacherCalendar)
      body.callback && body.callback(res)
    }
  },
  // 获取学生维度的日程表
  async getStudentCalendar({ commit }, body) {
    const res = await getStudentCalendar(body.studentName)
    if (res) {
      commit('setStudentCalendar', res.row)
      body.callback && body.callback(res)
    }
  },
  // 查询学生项目
  async getStudentProjects({ state }, body) {
    const res = await getStudentProjects(body.studentName)
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  async sendCourseAlert({ state }, body) {
    const res = await sendCourseAlert(body.data)
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  async addCourse({ state }, body) {
    const res = await addCourse(body.data)
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  async deleteCourse({ state }, body) {
    const res = await deleteCourse(body.data)
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  async updateCourse({ state }, body) {
    const res = await updateCourse(body.data)
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  async getCourseInfo({ state }, body) {
    const res = await getCourseInfo(body.courseId)
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  async addCourseInfo({ state }, body) {
    const res = await addCourseInfo(body.data)
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  async getCourseRecordingByStuName({ state }, body) {
    const res = await getCourseRecordingByStuName(body.data)
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  async getOnScheduleStudentCoursesForExportByStudent({ state }, body) {
    const res = await getOnScheduleStudentCoursesForExportByStudent(
      body.studentName
    )
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  async getOnScheduleStudentCoursesForExportByTeacher({ state }, body) {
    const res = await getOnScheduleStudentCoursesForExportByTeacher(
      body.teacherName
    )
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  }
}

export default { state, getters, mutations, actions }
