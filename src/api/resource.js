import request from '@/utils/request'

/**
 * 获取用户列表
 * @param params
 */
export function getResourceList(params) {
  return request({
    url: 'admin/v1/resource',
    method: 'get',
    params: params
  })
}

/**
 * 获取用户信息
 * @param params
 */
export function getResourceInfo(id) {
  return request({
    url: 'admin/v1/resource/' + id,
    method: 'get',
  })
}


/**
 * 新增用户
 * @param params
 */
export function createResource(data) {
  return request({
    url: 'admin/v1/resource',
    method: 'post',
    data: data
  })
}


/**
 * 编辑用户
 * @param params
 */
export function updateResource({id, data}) {
  return request({
    url: 'admin/v1/resource/' + id,
    method: 'put',
    data: data
  })
}


/**
 * 删除用户
 * @param params
 */
export function deleteResource(id) {
  return request({
    url: 'admin/v1/resource' + id,
    method: 'delete',
  })
}
