import request from '@/utils/request'

/**
 * 获取用户列表
 * @param params
 */
export function getDeptList(params) {
  return request({
    url: 'admin/v1/dept',
    method: 'get',
    params: params
  })
}

/**
 * 获取用户信息
 * @param params
 */
export function getDeptInfo(id) {
  return request({
    url: 'admin/v1/dept/' + id,
    method: 'get',
  })
}


/**
 * 新增用户
 * @param params
 */
export function createDept(data) {
  return request({
    url: 'admin/v1/dept',
    method: 'post',
    data: data
  })
}


/**
 * 编辑用户
 * @param params
 */
export function updateDept({id, data}) {
  return request({
    url: 'admin/v1/dept/' + id,
    method: 'put',
    data: data
  })
}


/**
 * 删除用户
 * @param params
 */
export function deleteDept(id) {
  return request({
    url: 'admin/v1/dept' + id,
    method: 'delete',
  })
}
