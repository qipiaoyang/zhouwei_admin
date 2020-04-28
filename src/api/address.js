import request from '@/utils/request'

/**
 * 获取用户列表
 * @param params
 */
export function getAddressList(params) {
  return request({
    url: 'admin/v1/address',
    method: 'get',
    params: params
  })
}

/**
 * 获取用户信息
 * @param params
 */
export function getAddressInfo(id) {
  return request({
    url: 'admin/v1/address/' + id,
    method: 'get',
  })
}


/**
 * 新增用户
 * @param params
 */
export function createAddress(data) {
  return request({
    url: 'admin/v1/address',
    method: 'post',
    data: data
  })
}


/**
 * 编辑用户
 * @param params
 */
export function updateAddress({id, data}) {
  return request({
    url: 'admin/v1/address/' + id,
    method: 'put',
    data: data
  })
}


/**
 * 删除用户
 * @param params
 */
export function deleteAddress(id) {
  return request({
    url: 'admin/v1/address' + id,
    method: 'delete',
  })
}
