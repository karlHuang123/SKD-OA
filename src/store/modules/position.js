/**
 * @author KarlHuang
 * @description 获取岗位信息
 */

import {
  getDeptTree,
  getPositionDetail,
  getStaffList,
  getStaff,
  deleteStaff,
  getStaffAbilitiesList,
  getListByDeptName,
  addStaff,
  editStaff,
  getPositionList,
  searchTeacherName
} from '@/api/position'
import { message } from 'ant-design-vue'

const state = () => ({
  positionList: null,
  positionDetail: null,
  staffList: null,
  abilitiesList: null,
  deptTree: null
})

const getters = {
  positionList: (state) => state.positionList,
  positionDetail: (state) => state.positionDetail,
  staffList: (state) => state.staffList,
  abilitiesList: (state) => state.abilitiesList,
  deptTree: (state) => state.deptTree
}

const mutations = {
  /**
   * @author KarlHuang
   * @description 设置岗位列表
   * @param {*} state
   * @param {*} deptTree
   */
  setDeptTree(state, deptTree) {
    state.DeptTree = deptTree
  },
  /**
   * @author KarlHuang
   * @description 设置岗位详情
   * @param {*} state
   * @param {*} positionDetail
   */
  setPositionDetail(state, positionDetail) {
    state.positionDetail = positionDetail
  },
  /**
   * @author KarlHuang
   * @description 设置岗位详情
   * @param {*} state
   * @param {*} positionDetail
   */
  setStaffList(state, staffList) {
    state.staffList = staffList
  },
  /**
   * @author KarlHuang
   * @description 设置功能列表
   * @param {*} state
   * @param {*} positionDetail
   */
  setAbilitiesList(state, abilitiesList) {
    state.abilitiesList = abilitiesList
  },
  /**
   * @author KarlHuang
   * @description 设置岗位map
   * @param {*} state
   * @param {*} positionDetail
   */
  setPositionList(state, positionList) {
    state.positionList = positionList
  }
}

const actions = {
  // 获取岗位层级列表
  async getDeptTree({ commit }, callback) {
    const res = await getDeptTree()
    if (res) {
      commit('setDeptTree', res)
      callback && callback(res)
    } else {
      message.error('请求错误，请稍后重试')
    }
  },
  // 获取岗位id和名称对应关系
  async getPositionList({ commit }, callback) {
    const res = await getPositionList()
    if (res && res.code === 200) {
      commit('setPositionList', res.data)
      callback && callback(res)
    }
  },
  // 获取岗位详情
  async getPositionDetail({ commit }, body) {
    const res = await getPositionDetail(body.positionId)
    if (res) {
      commit('setPositionDetail', res)
      body.callback && body.callback(res)
    } else {
      message.error('请求错误，请稍后重试')
    }
  },
  // 获取改账号下所有员工的列表
  async getStaffList({ commit }, body) {
    const res = await getStaffList(body.listPara)
    if (res && res.code === 200) {
      commit('setStaffList', res.rows)
      body.callback && body.callback(res)
    } else {
      body.errCallback && body.errCallback(res)
    }
  },
  // 添加员工
  async addStaff({ state }, body) {
    const res = await addStaff(body.data)
    if (res) {
      console.log(state.staffList)
      body.callback && body.callback(res)
    }
  },
  // 查询员工
  async getStaff({ state }, body) {
    const res = await getStaff(body.staffId)
    if (res && res.code === 200) {
      console.log(state.positionList)
      body.callback && body.callback(res)
    } else {
      body.errCallback && body.errCallback(res)
    }
  },
  // 编辑员工
  async editStaff({ state }, body) {
    const res = await editStaff(body.data)
    if (res && res.code === 200) {
      console.log(state.staffList)
      body.callback && body.callback(res)
    }
  },
  // 删除员工
  async deleteStaff({ state }, body) {
    const res = await deleteStaff(body.staffId)
    if (res) {
      console.log(state.positionList)
      body.callback && body.callback(res)
    }
  },
  // 获取功能列表
  async getStaffAbilitiesList({ commit }, body) {
    const res = await getStaffAbilitiesList()
    if (res && res.code === 200) {
      commit('setAbilitiesList', res)
      body.callback && body.callback(res)
    } else {
      body.errCallback && body.errCallback(res)
    }
  },
  // 通过部门获取岗位列表
  async getListByDeptName({ state }, body) {
    const res = await getListByDeptName(body.deptName)
    if (res && res.code === 200) {
      body.callback && body.callback(res)
    } else {
      console.log(state.staffList)
    }
  },
  async searchTeacherName({ state }, body) {
    const res = await searchTeacherName(body.teacherName)
    if (res && res.code === 200) {
      body.callback && body.callback(res)
    } else {
      console.log(state.staffList)
    }
  }
}
export default { state, getters, mutations, actions }
