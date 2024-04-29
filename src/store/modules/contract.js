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
  getStudentByName,
  editStudent,
  getMessageList,
  updateMessageStatus,
  searchStudentName,
  batchAddStudent,
  updateStudyStatus,
  updateGraduateStatus,
  updateRefundStatus,
  getSaveLimits,
  addSaveLimits
} from '@/api/contract'
import { message } from 'ant-design-vue'

const state = () => ({
  studentList: null,
  studentInfo: null,
  messageList: null,
  studentName: null,
  openList: null
})

const getters = {
  studentList: (state) => state.studentList,
  studentInfo: (state) => state.studentInfo,
  messageList: (state) => state.messageList,
  studentName: (state) => state.studentName,
  openList: (state) => state.openList
}

const mutations = {
  /**
   * @author KarlHuang
   * @description 设置学生列表
   * @param {*} state
   * @param {*} studentList
   */
  setStudentList(state, studentList) {
    state.studentList = studentList
  },
  /**
   * @author KarlHuang
   * @description 设置消息列表
   * @param {*} state
   * @param {*} messageList
   */
  setMessageList(state, messageList) {
    state.messageList = messageList
  },
  /**
   * @author KarlHuang
   * @description 设置学生姓名
   * @param {*} state
   * @param {*} studentInfo
   */
  setStudentName(state, studentName) {
    state.studentName = studentName
  },
  /**
   * @author KarlHuang
   * @description 设置学生信息
   * @param {*} state
   * @param {*} studentInfo
   */
  setStudentInfo(state, studentInfo) {
    state.studentInfo = studentInfo
  },
  setOpenList(state, openList) {
    state.openList = openList
  }
}

const actions = {
  // 录入合同信息
  async addStudent({ state }, body) {
    const res = await addStudent(body.data)
    if (res && res.code === 200) {
      console.log(state.studentList)
      body.callback && body.callback(res)
    } else {
      message.error(res.msg)
    }
  },
  async batchAddStudent({ state }, body) {
    const res = await batchAddStudent(body.data)
    if (res && res.code === 200) {
      console.log(state.studentList)
      body.callback && body.callback(res)
    } else {
      message.error(res.msg)
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
      message.error('查询失败，请稍后重试。')
    }
  },
  // 通过姓名获取单个学生信息
  async getStudentByName({ commit }, body) {
    const res = await getStudentByName(body.name)
    if (res && res.code === 200) {
      commit('setStudentInfo', res.data)
      body.callback && body.callback(res)
    } else {
      message.error('查询失败，请稍后重试。')
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
  // 学生恢复状态
  async updateStudyStatus({ state }, body) {
    const res = await updateStudyStatus(body.studentId)
    if (res && res.code === 200) {
      console.log(state)
      body.callback && body.callback(res)
    } else {
      message.error('删除失败，请稍后重试。')
    }
  },

  // 学生毕业（支持批量）
  async updateGraduateStatus({ state }, body) {
    const res = await updateGraduateStatus(body.studentId)
    if (res && res.code === 200) {
      console.log(state)
      body.callback && body.callback(res)
    } else {
      message.error('删除失败，请稍后重试。')
    }
  },
  // 学生退费（支持批量）
  async updateRefundStatus({ state }, body) {
    const res = await updateRefundStatus(body.studentId)
    if (res && res.code === 200) {
      console.log(state)
      body.callback && body.callback(res)
    } else {
      message.error('删除失败，请稍后重试。')
    }
  },
  // 获取消息列表
  async getMessageList({ commit }, body) {
    const res = await getMessageList(body.listPara)
    if (res && res.code === 200) {
      commit('setMessageList', res.rows)
      body.callback && body.callback(res)
    } else {
      body.errCallback && body.errCallback()
    }
  },
  // 消息已读
  async updateMessageStatus({ state }, body) {
    const res = await updateMessageStatus(body.id)
    if (res && res.code === 200) {
      console.log(state.messageList)
      body.callback && body.callback(res)
    }
  },
  // 模糊搜索学生名
  async searchStudentName({ state }, body) {
    const res = await searchStudentName(body.studentName)
    if (res && res.code === 200) {
      console.log(state.messageList)
      body.callback && body.callback(res)
    }
  },
  // 获取开放列表
  async getSaveLimits({ commit }, body) {
    const res = await getSaveLimits()
    if (res && res.code === 200) {
      commit('setOpenList', res.data)
      body.callback && body.callback(res)
    }
  },
  // 更新开放列表
  async addSaveLimits({ commit }, body) {
    const res = await addSaveLimits(body.data)
    if (res && res.code === 200) {
      commit('setOpenList', res.data)
      body.callback && body.callback(res)
    }
  }
}
export default { state, getters, mutations, actions }
