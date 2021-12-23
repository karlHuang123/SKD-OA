/**
 * @author chuzhixin 1204505056@qq.com
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */
import {
  getUserInfo,
  login,
  register,
  confirmedRegister,
  forgetPassword,
  resetPassword,
  confirmedResetPassword,
  logout,
  getAuthCode,
  getUserList,
} from '@/api/user'
// import { login, logout, getAuthCode, getUserList } from '@/api/user'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/accessToken'
import { title, tokenName } from '@/config'
import { message, notification } from 'ant-design-vue'

const state = () => ({
  accessToken: getAccessToken(),
  username: '',
  avatar: '',
  code: '',
  userList: null,
})
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
}
const mutations = {
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 设置accessToken
   * @param {*} state
   * @param {*} accessToken
   */
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 设置用户名
   * @param {*} state
   * @param {*} username
   */
  setUsername(state, username) {
    state.username = username
  },
  // 设置验证码返回的uuid
  setAuthCode(state, code) {
    state.code = code
  },
  // 保存用户列表
  setUserList(state, userList) {
    state.userList = userList
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 设置头像
   * @param {*} state
   * @param {*} avatar
   */
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
}
const actions = {
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 登录拦截放行时，设置虚拟角色
   * @param {*} { commit, dispatch }
   */
  setVirtualRoles({ commit, dispatch }) {
    dispatch('acl/setFull', true, { root: true })
    commit('setAvatar', 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif')
    commit('setUsername', 'admin(未开启登录拦截)')
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 登录
   * @param {*} { commit }
   * @param {*} userInfo
   */
  async login({ commit }, userInfo) {
    const res = await login(userInfo)
    sessionStorage.setItem('token', res.token)
    if (res.token) {
      commit('setAccessToken', res.token)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      notification.open({
        message: `欢迎登录${title}`,
        description: `${thisTime}！`,
      })
    } else {
      message.error(`登录接口异常，未正确返回${tokenName}...`)
    }
  },
  // 获取验证码接口
  async getAuthCode({ commit }, callback) {
    const res = await getAuthCode()
    if (res) {
      commit('setAuthCode', res.uuid)
      callback(res)
    }
  },
  // 注册接口
  async register({ commit }, body) {
    const res = await register(body.userInfo)
    if (res) {
      commit('setAuthCode', res.uuid)
      body.callback && body.callback(res)
    }
  },
  // 确认注册邮箱链接，注册成功
  async confirmedRegister({ state }, body) {
    const res = await confirmedRegister(body.uuid)
    console.log(state.accessToken)
    if (res) {
      body.callback && body.callback(res)
    }
  },
  // 忘记密码，申请重置
  async forgetPassword({ state }, body) {
    const res = await forgetPassword(body.email)
    console.log(state.accessToken)
    if (res) {
      body.callback && body.callback(res)
    }
  },
  // 重置密码
  async resetPassword({ state }, body) {
    const res = await resetPassword(body.uuid, body.password)
    console.log(state.accessToken)
    if (res) {
      body.callback && body.callback(res)
    }
  },
  // 确认重置密码
  async confirmedResetPassword({ state }, body) {
    const res = confirmedResetPassword(body.uuid)
    console.log(state.accessToken)
    if (res) {
      body.callback && body.callback(res)
    }
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 获取用户信息接口 这个接口非常非常重要，如果没有明确底层前逻辑禁止修改此方法，错误的修改可能造成整个框架无法正常使用
   * @param {*} { commit, dispatch, state }
   * @returns
   */
  async getUserInfo({ commit, dispatch, state }) {
    const { data } = await getUserInfo(state.accessToken)
    if (!data) {
      message.error(`验证失败，请重新登录...`)
      return false
    }
    let { username, avatar, roles, ability } = data
    if (username && roles && Array.isArray(roles)) {
      dispatch('acl/setRole', roles, { root: true })
      if (ability && ability.length > 0)
        dispatch('acl/setAbility', ability, { root: true })
      commit('setUsername', username)
      commit('setAvatar', avatar)
    } else {
      message.error('用户信息接口异常')
    }
  },
  async getUserInfoMock({ commit, dispatch }) {
    const data = {
      roles: ['admin', 'editor'],
      ability: ['READ'],
      username: 'test',
      'avatar|1': [
        'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
        'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
      ],
    }
    let { username, avatar, roles, ability } = data
    if (username && roles && Array.isArray(roles)) {
      dispatch('acl/setRole', roles, { root: true })
      if (ability && ability.length > 0)
        dispatch('acl/setAbility', ability, { root: true })
      commit('setUsername', username)
      commit('setAvatar', avatar)
    } else {
      message.error('用户信息接口异常')
    }
  },
  // 获取用户信息列表
  async getUserList({ commit }, body) {
    const res = await getUserList(body.pageNum, body.pageSize)
    if (res) {
      commit('setUserList', res.rows)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 退出登录
   * @param {*} { dispatch }
   */
  async logout({ dispatch }) {
    await logout(state.accessToken)
    await dispatch('resetAll')
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 重置accessToken、roles、ability、router等
   * @param {*} { commit, dispatch }
   */
  async resetAll({ dispatch }) {
    await dispatch('setAccessToken', '')
    await dispatch('acl/setFull', false, { root: true })
    await dispatch('acl/setRole', [], { root: true })
    await dispatch('acl/setAbility', [], { root: true })
    removeAccessToken()
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 设置token
   */
  setAccessToken({ commit }, accessToken) {
    commit('setAccessToken', accessToken)
  },
}
export default { state, getters, mutations, actions }
