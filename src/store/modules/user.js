/**
 * @author chuzhixin 1204505056@qq.com
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */
import {
  getUserInfo,
  getUserInfoNova,
  login,
  register,
  applyRegister,
  confirmedRegister,
  forgetPassword,
  resetPassword,
  confirmedResetPassword,
  logout,
  getAuthCode,
  getUserList,
  getStudentDashboard,
  getUnScheduleStudentCount,
  getUnVisitStudentCount,
  getOnScheduleStudentCount,
  getOnScheduleStudentCourses,
  getUnScheduleStudentList,
  getUnVisitStudentList,
  getRegionUsers
} from '@/api/user'
import { getPositionList } from '@/api/position'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken
} from '@/utils/accessToken'
import { title } from '@/config'
import { message, notification } from 'ant-design-vue'

const state = () => ({
  accessToken: getAccessToken(),
  username: '',
  nickName: '',
  avatar: '',
  code: '',
  userId: '',
  userList: null,
  parentId: ''
})
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  nickName: (state) => state.nickName,
  userId: (state) => state.userId,
  parentId: (state) => state.parentId
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
  setNickName(state, nickName) {
    state.nickName = nickName
  },
  setUserId(state, userId) {
    state.userId = userId
  },
  setParentId(state, parentId) {
    state.parentId = parentId
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
  }
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
      sessionStorage.setItem('username', userInfo.username)
      console.log(userInfo)
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
        description: `${thisTime}！`
      })
    } else {
      message.error(res.msg)
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
  // 外部邮箱注册申请接口
  async applyRegister({ state }, body) {
    const res = await applyRegister(body.email)
    if (res) {
      console.log(state.accessToken)
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
    console.log('hey', data)
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
    const res = await getUserInfoNova()
    const positionList = await getPositionList()
    // console.log(positionList)
    // console.log(res)
    commit('setNickName', res.user.nickName)
    if (res.user.userId) commit('setUserId', res.user.userId)
    setTimeout(() => {
      const positionName = positionList.rows.find((item) => {
        return item.postId === res.user.postIds[0]
      }).postCode
      const data = {
        roles: [positionName],
        ability: ['READ', 'EDIT', 'WRITE'],
        username: sessionStorage.getItem('username'),
        'avatar|1': [
          'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
          'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif'
        ]
      }
      let { username, avatar, roles, ability } = data
      if (roles && Array.isArray(roles)) {
        dispatch('acl/setRole', roles, { root: true })
        if (ability && ability.length > 0)
          dispatch('acl/setAbility', ability, { root: true })
        commit('setUsername', username)
        commit('setAvatar', avatar)
        commit('setParentId', res.user.dept.parentId)
      } else {
        message.error('用户信息接口异常')
      }
    }, 50)
  },
  // 获取用户信息列表
  async getUserList({ commit }, body) {
    const res = await getUserList(body.pageNum, body.pageSize)
    if (res) {
      commit('setUserList', res.rows)
      body.callback && body.callback(res)
    }
  },
  // 获取负责学生总数
  async getStudentDashboard({ state }, body) {
    const res = await getStudentDashboard(body.createBy)
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  // 获取待排课学生数
  async getUnScheduleStudentCount({ state }, body) {
    const res = await getUnScheduleStudentCount(body.createBy)
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  // 获取待回访学生数
  async getUnVisitStudentCount({ state }, body) {
    const res = await getUnVisitStudentCount(body.createBy)
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  // 今天上课学生数
  async getOnScheduleStudentCount({ state }, body) {
    const res = await getOnScheduleStudentCount(body.createBy)
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  // 今天上课学生列表
  async getOnScheduleStudentCourses({ state }, body) {
    const res = await getOnScheduleStudentCourses(body.createBy, body.date)
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  // 待排课学生列表
  async getUnScheduleStudentList({ state }, body) {
    const res = await getUnScheduleStudentList(body.listPara)
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  // 待回访学生列表
  async getUnVisitStudentList({ state }, body) {
    const res = await getUnVisitStudentList(body.listPara)
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  // 获取辖区内的教务老师
  async getRegionUsers({ state }, body) {
    const res = await getRegionUsers()
    if (res) {
      console.log(state)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 退出登录
   * @param {*} { dispatch }
   */
  async logout({ dispatch, commit }) {
    await logout(state.accessToken)
    await dispatch('resetAll')
    commit('setUsername', null)
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
  }
}
export default { state, getters, mutations, actions }
