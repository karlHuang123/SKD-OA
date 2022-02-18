import request from '@/utils/request'

export async function addStudent(data) {
  return request({
    url: '/system/student/add',
    method: 'post',
    data: data,
  })
}

export async function uploadFile(data) {
  return request({
    url: '/system/student/uploadContract',
    method: 'post',
    data: data,
  })
}

export async function getStudentList(listPara) {
  return request({
    url: `/system/student/getList?pageNum=${listPara.pageNum}&pageSize=${listPara.pageSize}`,
    method: 'get',
  })
}

export async function getStudent(studentId) {
  return request({
    url: `/system/student/${studentId}`,
    method: 'get',
  })
}

export async function editStudent(data) {
  return request({
    url: '/system/student/edit',
    method: 'put',
    data: data,
  })
}

export async function deleteStudent(studentIds) {
  return request({
    url: `/system/student/delete/${studentIds}`,
    method: 'delete',
  })
}
