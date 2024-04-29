import request from '@/utils/request'

export async function getTeacherCalendar(teacherName) {
  return request({
    url: `/system/teacherCalendar/get?teacherName=${teacherName}`,
    method: 'get'
  })
}

export async function updateTeacherCalendar(data) {
  return request({
    url: `/system/teacherCalendar/update`,
    method: 'post',
    data: data
  })
}

export async function getStudentCalendar(studentName) {
  return request({
    url: `/system/teacherCalendar/getBySutdentName?studentName=${studentName}`,
    method: 'get'
  })
}

export async function getStudentProjects(studentName) {
  return request({
    url: `/system/student/getProjects?studentName=${studentName}`,
    method: 'get'
  })
}

export async function sendCourseAlert(data) {
  return request({
    url: '/system/teacherCalendar/sendWeixin',
    method: 'post',
    data: data
  })
}

export async function addCourse(data) {
  return request({
    url: '/system/teacherCalendar/addCourse',
    method: 'post',
    data: data
  })
}

export async function deleteCourse(data) {
  return request({
    url: '/system/teacherCalendar/deleteCourse',
    method: 'post',
    data: data
  })
}

export async function updateCourse(data) {
  return request({
    url: '/system/teacherCalendar/updateCourse',
    method: 'post',
    data: data
  })
}

export async function getCourseInfo(courseId) {
  return request({
    url: `/system/teacherCalendar/getCourseRecording?courseId=${courseId}`,
    method: 'get'
  })
}

export async function addCourseInfo(data) {
  return request({
    url: '/system/teacherCalendar/addCourseRecording',
    method: 'post',
    data: data
  })
}

export async function getCourseRecordingByStuName(data) {
  return request({
    url: '/system/teacherCalendar/getCourseRecordingByStuName',
    method: 'post',
    data: data
  })
}

export async function getOnScheduleStudentCoursesForExportByStudent(
  studentName
) {
  return request({
    url: `/system/student/getOnScheduleStudentCoursesForExport?studentName=${studentName}`,
    method: 'get'
  })
}

export async function getOnScheduleStudentCoursesForExportByTeacher(
  teacherName
) {
  return request({
    url: `/system/student/getOnScheduleStudentCoursesForExport?teacherName=${teacherName}`,
    method: 'get'
  })
}
