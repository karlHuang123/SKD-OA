import request from '@/utils/request'

export async function addStudent(data) {
  return request({
    url: '/system/student/add',
    method: 'post',
    data: data
  })
}

export async function uploadFile(data) {
  return request({
    url: '/system/student/uploadContract',
    method: 'post',
    data: data
  })
}

export async function getStudentList(listPara) {
  return request({
    url: `/system/student/getList?
    pageNum=${listPara.pageNum}&
    pageSize=${listPara.pageSize}&
    admissionYear=${listPara.admissionYear}&
    applyMainCountry=${listPara.applyMainCountry}&
    applyBakCountry=${listPara.applyBakCountry}&
    applyMajor=${listPara.applyMajor}&
    createBy=${listPara.createBy}&
    createTime=${listPara.createTime}&
    productLevel=${listPara.productLevel}&
    studentName=${listPara.studentName}`,
    method: 'get'
  })
}

export async function getStudent(studentId) {
  return request({
    url: `/system/student/${studentId}`,
    method: 'get'
  })
}

export async function editStudent(data) {
  return request({
    url: '/system/student/edit',
    method: 'put',
    data: data
  })
}

export async function deleteStudent(studentIds) {
  return request({
    url: `/system/student/delete/${studentIds}`,
    method: 'delete'
  })
}

export async function getMessageList(listPara) {
  return request({
    url: `/system/message/getList?pageNum=${listPara.pageNum}&pageSize=${listPara.pageSize}`,
    method: 'get'
  })
}

export async function updateMessageStatus(id) {
  return request({
    url: `/system/message/updateMessageStatus?id=${id}`,
    method: 'put'
  })
}
