import request from '@/utils/request'

/**
 * 获取用户列表
 * @param params
 */
export function getAreaTree() {
  return request({
    url: 'admin/v1/area/tree',
    method: 'get',
  })
}

