/**
 * @author KarlHuang
 * @description 获取岗位信息
 */

import { addStudent } from '@/api/contract'
import { message } from 'ant-design-vue'

const state = () => ({
  studentList: null,
})

const getters = {
  studentList: (state) => state.studentList,
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
}
export default { state, getters, mutations, actions }
