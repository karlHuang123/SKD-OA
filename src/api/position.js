import request from '@/utils/request'

export async function getDeptTree() {
  return request({
    url: '/system/dept/getDeptTree',
    method: 'get',
  })
}

export async function getPositionDetail(positionId) {
  return request({
    url: `/system/position/${positionId}`,
    method: 'get',
  })
}

export async function getStaffList(listPara) {
  return request({
    url: `/system/user/getList?pageNum=${listPara.pageNum}&pageSize=${
      listPara.pageSize
    }&searchVal=${listPara.searchVal ? listPara.searchVal : ''}`,
    method: 'get',
  })
}

export async function deleteStaff(staffId) {
  return request({
    url: `/system/user/delete/${staffId}`,
    method: 'delete',
  })
}
