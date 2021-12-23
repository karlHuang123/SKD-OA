import request from '@/utils/request'
import { tokenName } from '@/config'

export async function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

export async function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data,
  })
}

export async function confirmed(uuid) {
  return request({
    url: `/register/confirm/${uuid}`,
    method: 'get',
  })
}

export async function confirmedResetPassword(code, password) {
  return request({
    url: `/register/reset/finish/${code}?${password}`,
    method: 'get',
  })
}

export async function forgetPassword(email) {
  return request({
    url: `register/reset?email=${email}`,
    method: 'post',
  })
}

export async function getAuthCode() {
  return request({
    url: '/captchaImage',
    method: 'get',
  })
}

export async function socialLogin(data) {
  return request({
    url: '/socialLogin',
    method: 'post',
    data,
  })
}

export function getUserInfo(accessToken) {
  //此处为了兼容mock.js使用data传递accessToken，如果使用mock可以走headers
  return request({
    url: '/userInfo',
    method: 'post',
    data: {
      [tokenName]: accessToken,
    },
  })
}

export function getUserList(pageNum, pageSize) {
  return request({
    url: `/system/user/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}
