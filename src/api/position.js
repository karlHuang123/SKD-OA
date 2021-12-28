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
