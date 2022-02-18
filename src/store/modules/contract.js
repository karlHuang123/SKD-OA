/**
 * @author KarlHuang
 * @description 获取岗位信息
 */

import {
  addStudent,
  uploadFile,
  getStudentList,
  deleteStudent,
  getStudent,
  editStudent,
} from '@/api/contract'
import { message } from 'ant-design-vue'

const state = () => ({
  studentList: null,
  studentInfo: null,
})

const getters = {
  studentList: (state) => state.studentList,
  studentInfo: (state) => state.studentInfo,
}

const mutations = {
  /**
   * @author KarlHuang
   * @description 设置学生列表
   * @param {*} state
   * @param {*} positionList
   */
  setStudentList(state, studentList) {
    state.studentList = studentList
  },
  /**
   * @author KarlHuang
   * @description 设置学生信息
   * @param {*} state
   * @param {*} positionList
   */
  setStudentInfo(state, studentInfo) {
    state.studentInfo = studentInfo
  },
}

const actions = {
  // 录入合同信息
  async addStudent({ state }, body) {
    const res = await addStudent(body.data)
    if (res && res.code === 200) {
      console.log(state.studentList)
      body.callback && body.callback(res)
    } else {
      message.error('请求错误，请稍后重试')
    }
  },
  // 合同文件上传
  async uploadFile({ state }, body) {
    const res = await uploadFile(body.data)
    if (res && res.code === 200) {
      console.log(state)
      body.callback && body.callback(res)
    } else {
      message.error('上传失败，请稍后重试')
    }
  },
  // 获取已录入合同的学生信息
  async getStudentList({ commit }, body) {
    const res = await getStudentList(body.listPara)
    if (res && res.code === 200) {
      commit('setStudentList', res.rows)
      body.callback && body.callback(res)
    } else {
      message.error('请求学生列表失败，请稍后重试。')
    }
  },
  // 获取单个学生信息
  async getStudent({ commit }, body) {
    const res = await getStudent(body.studentId)
    if (res && res.code === 200) {
      commit('setStudentInfo', res.data)
      body.callback && body.callback(res)
    } else {
      message.error('删除失败，请稍后重试。')
    }
  },
  // 编辑修改学生信息
  async editStudent({ commit }, body) {
    const res = await editStudent(body.studentInfo)
    if (res && res.code === 200) {
      commit('setStudentInfo', body.studentInfo)
      body.callback && body.callback(res)
    } else {
      message.error('编辑失败，请稍后重试。')
    }
  },
  // 删除学生（支持批量）
  async deleteStudent({ state }, body) {
    const res = await deleteStudent(body.studentIds)
    if (res && res.code === 200) {
      console.log(state)
      body.callback && body.callback(res)
    } else {
      message.error('删除失败，请稍后重试。')
    }
  },
}
export default { state, getters, mutations, actions }
