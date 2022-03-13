/**
 * @author KarlHuang
 * @description 获取岗位信息
 */

import {
  getDeptTree,
  getPositionDetail,
  getStaffList,
  deleteStaff,
  getStaffAbilitiesList,
  getListByDeptName,
  addStaff
} from '@/api/position'
import { message } from 'ant-design-vue'

const state = () => ({
  positionList: null,
  positionDetail: null,
  staffList: null,
  abilitiesList: null
})

const getters = {
  positionList: (state) => state.positionList,
  positionDetail: (state) => state.positionDetail,
  staffList: (state) => state.staffList,
  abilitiesList: (state) => state.abilitiesList
}

const mutations = {
  /**
   * @author KarlHuang
   * @description 设置岗位列表
   * @param {*} state
   * @param {*} positionList
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
    if (res && res.code === 200) {
      console.log(state.staffList)
      body.callback && body.callback(res)
    }
  },
  // 删除员工
  async deleteStaff({ state }, body) {
    const res = await deleteStaff(body.staffId)
    if (res && res.code === 200) {
      console.log(state.positionList)
      body.callback && body.callback(res)
    } else {
      body.errCallback && body.errCallback(res)
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
  }
}
export default { state, getters, mutations, actions }
