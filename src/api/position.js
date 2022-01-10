import request from '@/utils/request'

export async function getPositionList() {
  return request({
    url: '/system/position/treeList',
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
