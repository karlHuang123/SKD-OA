import request from '@/utils/request'

export async function getDeptTree() {
  return request({
    url: '/system/dept/getDeptTree',
    method: 'get'
  })
}

export async function getPositionDetail(positionId) {
  return request({
    url: `/system/position/${positionId}`,
    method: 'get'
  })
}

export async function getPositionList() {
  return request({
    url: '/system/post/getList',
    method: 'get'
  })
}

export async function getStaffList(listPara) {
  return request({
    url: `/system/user/getList?pageNum=${listPara.pageNum}&pageSize=${
      listPara.pageSize
    }&searchVal=${listPara.searchVal ? listPara.searchVal : ''}`,
    method: 'get'
  })
}

export async function getStaff(staffId) {
  return request({
    url: `/system/user/${staffId}`,
    method: 'get'
  })
}

export async function deleteStaff(staffId) {
  return request({
    url: `/system/user/delete/${staffId}`,
    method: 'delete'
  })
}

export async function getStaffAbilitiesList() {
  return request({
    url: '/system/menu/getAbilities',
    method: 'get'
  })
}

export async function getListByDeptName(deptName) {
  return request({
    url: `/system/post/getListByDeptName?deptName=${deptName}`,
    method: 'get'
  })
}

export async function addStaff(data) {
  return request({
    url: `/system/user/addUser`,
    method: 'post',
    data: data
  })
}

export async function editStaff(data) {
  return request({
    url: `/system/user/editUser`,
    method: 'post',
    data: data
  })
}

export async function searchTeacherName(teacherName) {
  return request({
    url: `/system/teacherCalendar/getEducationDeptTeacherNames?teacherName=${teacherName}`,
    method: 'get'
  })
}
