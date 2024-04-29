import request from '@/utils/request'

export async function addStudent(data) {
  return request({
    url: '/system/student/add',
    method: 'post',
    data: data
  })
}

export async function batchAddStudent(data) {
  return request({
    url: '/system/student/batchAdd',
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
    // eslint-disable-next-line
    url: `/system/student/getList?pageNum=${listPara.pageNum}&pageSize=${listPara.pageSize}&applyEducation=${listPara.applyEducation ? listPara.applyEducation : ''}&admissionYear=${listPara.admissionYear ? listPara.admissionYear : ''}&applyMainCountry=${listPara.applyMainCountry ? listPara.applyMainCountry : ''}&applyMajor=${listPara.applyMajor ? listPara.applyMajor : ''}&productLevel=${listPara.productLevel ? listPara.productLevel : ''}&studentName=${listPara.studentName}&studySchool=${listPara.studySchool ? listPara.studySchool : ''}&createBy=${listPara.createBy ? listPara.createBy : ''}`,
    method: 'get'
  })
}

export async function getStudent(studentId) {
  return request({
    url: `/system/student/${studentId}`,
    method: 'get'
  })
}

export async function getStudentByName(name) {
  return request({
    url: `/system/student/getByName?studentName=${name}`,
    method: 'get'
  })
}

export async function downloadContract(studentId, path) {
  return request({
    url: `/system/student/downloadContract?path=${path}&studentId=${studentId}`,
    method: 'get',
    responseType: 'blob'
  })
}

export async function editStudent(data) {
  return request({
    url: '/system/student/edit',
    method: 'put',
    data: data
  })
}

export async function deleteStudent(studentName) {
  return request({
    url: `/system/student/delete/${studentName}`,
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

export async function searchStudentName(studentName) {
  return request({
    url: `/system/student/getNames?studentName=${studentName}`,
    method: 'get'
  })
}

export async function updateStudyStatus(studentId) {
  return request({
    url: `/system/student/updateStudyStatus/${studentId}`,
    method: 'delete'
  })
}

export async function updateGraduateStatus(studentId) {
  return request({
    url: `/system/student/updateGraduateStatus/${studentId}`,
    method: 'delete'
  })
}

export async function updateRefundStatus(studentId) {
  return request({
    url: `/system/student/updateRefundStatus/${studentId}`,
    method: 'delete'
  })
}

export async function getSaveLimits() {
  return request({
    url: '/system/student/getSaveLimits',
    method: 'get'
  })
}

export async function addSaveLimits(data) {
  return request({
    url: '/system/student/addSaveLimits',
    method: 'post',
    data: data
  })
}

export async function deleteContract(studentId, path) {
  return request({
    url: `/system/student/deleteContract?path=${path}&studentId=${studentId}`,
    method: 'post'
  })
}
