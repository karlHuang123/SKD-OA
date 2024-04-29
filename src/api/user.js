import request from '@/utils/request'
import { tokenName } from '@/config'

export async function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export async function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

// 注册外部邮箱申请，待改动
export async function applyRegister(email) {
  return request({
    url: `/register/outer/applay?email=${email}`,
    method: 'post'
  })
}

export async function confirmedRegister(uuid) {
  return request({
    url: `/register/confirm/${uuid}`,
    method: 'get'
  })
}

export async function resetPassword(uuid, password) {
  return request({
    url: `/register/reset/finish/${uuid}?password=${password}`,
    method: 'get'
  })
}

export async function confirmedResetPassword(uuid) {
  return request({
    url: `/register/reset/confirm/${uuid}`,
    method: 'get'
  })
}

export async function forgetPassword(email) {
  return request({
    url: `register/reset?email=${email}`,
    method: 'post'
  })
}

export async function getAuthCode() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}

export async function socialLogin(data) {
  return request({
    url: '/socialLogin',
    method: 'post',
    data
  })
}

export function getUserInfo(accessToken) {
  //此处为了兼容mock.js使用data传递accessToken，如果使用mock可以走headers
  return request({
    url: '/userInfo',
    method: 'post',
    data: {
      [tokenName]: accessToken
    }
  })
}

export function getUserInfoNova() {
  return request({
    url: '/system/user/getUserInfo',
    method: 'get'
  })
}

export function getUserList(pageNum, pageSize) {
  return request({
    url: `/system/user/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getStudentDashboard(createBy) {
  return request({
    url: `/system/student/getStudentDashboard?createBy=${
      createBy ? createBy : ''
    }`,
    method: 'get'
  })
}

export function getUnScheduleStudentCount(createBy) {
  return request({
    url: `/system/student/getUnScheduleStudentCount?createBy=${
      createBy ? createBy : ''
    }`,
    method: 'get'
  })
}

export function getUnVisitStudentCount(createBy) {
  return request({
    url: `/system/student/getUnVisitStudentCount?createBy=${
      createBy ? createBy : ''
    }`,
    method: 'get'
  })
}

export function getOnScheduleStudentCount(createBy) {
  return request({
    url: `/system/student/getOnScheduleStudentCount?createBy=${
      createBy ? createBy : ''
    }`,
    method: 'get'
  })
}

export function getOnScheduleStudentCourses(createBy, date) {
  return request({
    url: `/system/student/getOnScheduleStudentCourses?dt=${date}&createBy=${
      createBy ? createBy : ''
    }`,
    method: 'get'
  })
}

export function getUnScheduleStudentList(listPara) {
  return request({
    url: `/system/student/getUnScheduleStudentList?pageNum=${
      listPara.pageNum
    }&pageSize=${listPara.pageSize}&createBy=${
      listPara.createBy ? listPara.createBy : ''
    }`,
    method: 'get'
  })
}

export function getUnVisitStudentList(listPara) {
  return request({
    url: `/system/student/getUnVisitStudentList?pageNum=${
      listPara.pageNum
    }&pageSize=${listPara.pageSize}&createBy=${
      listPara.createBy ? listPara.createBy : ''
    }`,
    method: 'get'
  })
}

export function getRegionUsers() {
  return request({
    url: '/system/user/getRegionUsers',
    method: 'get'
  })
}
