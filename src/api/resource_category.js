import request from '@/utils/request'

/**
 * 获取用户列表
 * @param params
 */
export function getResourceCategoryList(params) {
  return request({
    url: 'admin/v1/resource_category',
    method: 'get',
    params: params
  })
}

/**
 * 获取用户信息
 * @param params
 */
export function getResourceCategoryInfo(id) {
  return request({
    url: 'admin/v1/resource_category/' + id,
    method: 'get',
  })
}


/**
 * 新增用户
 * @param params
 */
export function createResourceCategory(data) {
  return request({
    url: 'admin/v1/resource_category',
    method: 'post',
    data: data
  })
}


/**
 * 编辑用户
 * @param params
 */
export function updateResourceCategory({id, data}) {
  return request({
    url: 'admin/v1/resource_category/' + id,
    method: 'put',
    data: data
  })
}


/**
 * 删除用户
 * @param params
 */
export function deleteResourceCategory(id) {
  return request({
    url: 'admin/v1/resource_category' + id,
    method: 'delete',
  })
}
