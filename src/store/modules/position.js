/**
 * @author KarlHuang
 * @description 获取岗位信息
 */

import { getPositionList, getPositionDetail } from '@/api/position'
import { message } from 'ant-design-vue'

const state = () => ({
  positionList: null,
  positionDetail: null,
})

const getters = {
  positionList: (state) => state.positionList,
  positionDetail: (state) => state.positionDetail,
}

const mutations = {
  /**
   * @author KarlHuang
   * @description 设置岗位列表
   * @param {*} state
   * @param {*} positionList
   */
  setPositionList(state, positionList) {
    state.positionList = positionList
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
}

const actions = {
  // 获取岗位层级列表
  async getPositionList({ commit }, callback) {
    const res = await getPositionList()
    if (res) {
      commit('setPositionList', res)
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
}
export default { state, getters, mutations, actions }