import request from '@/utils/request'

/**
 * 获取用户列表
 * @param params
 */
export function getOrderList(params) {
  return request({
    url: 'admin/v1/order',
    method: 'get',
    params: params
  })
}

/**
 * 获取用户信息
 * @param params
 */
export function getOrderInfo(id) {
  return request({
    url: 'admin/v1/order/' + id,
    method: 'get',
  })
}


/**
 * 新增用户
 * @param params
 */
export function createOrder(data) {
  return request({
    url: 'admin/v1/order',
    method: 'post',
    data: data
  })
}


/**
 * 编辑用户
 * @param params
 */
export function updateOrder({id, data}) {
  return request({
    url: 'admin/v1/order/' + id,
    method: 'put',
    data: data
  })
}


/**
 * 删除用户
 * @param params
 */
export function deleteOrder(id) {
  return request({
    url: 'admin/v1/order' + id,
    method: 'delete',
  })
}
