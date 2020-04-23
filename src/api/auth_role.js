import request from '@/utils/request'

/**
 * 获取用户列表
 * @param params
 */
export function getAuthRoleList(params) {
  return request({
    url: 'admin/v1/role',
    method: 'get',
    params: params
  })
}

/**
 * 获取用户信息
 * @param params
 */
export function getAuthRoleInfo(id) {
  return request({
    url: 'admin/v1/role/' + id,
    method: 'get',
  })
}


/**
 * 新增用户
 * @param params
 */
export function createAuthRole(data) {
  return request({
    url: 'admin/v1/role',
    method: 'post',
    data: data
  })
}


/**
 * 编辑用户
 * @param params
 */
export function updateAuthRole({id, data}) {
  return request({
    url: 'admin/v1/role/' + id,
    method: 'put',
    data: data
  })
}


/**
 * 删除用户
 * @param params
 */
export function deleteAuthRole(id) {
  return request({
    url: 'admin/v1/role' + id,
    method: 'delete',
  })
}
