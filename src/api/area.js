import request from '@/utils/request'

/**
 * 获取用户列表
 * @param params
 */
export function getAreaTree() {
  return request({
    url: 'admin/v1/area/tree',
    method: 'post',
  })
}



/**
 * 获取用户列表
 * @param params
 */
export function getTownList(data) {
  return request({
    url: 'admin/v1/area/townList',
    method: 'post',
    data: data
  })
}



/**
 * 获取用户列表
 * @param params
 */
export function getDeptList(data) {
  return request({
    url: 'admin/v1/area/deptList',
    method: 'post',
    data: data
  })
}
