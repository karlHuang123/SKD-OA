import request from '@/utils/request'

export async function addStudent(data) {
  return request({
    url: '/system/student/add',
    method: 'post',
    data,
  })
}
