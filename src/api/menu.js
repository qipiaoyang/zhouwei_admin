import request from '@/utils/request'

/**
 * 获取用户列表
 * @param params
 */
export function getMenuList(params) {
  return request({
    url: 'admin/v1/menu',
    method: 'get',
    params: params
  })
}


/**
 * 获取一级分类
 * @param params
 */
export function getParentOptionsList() {
  return request({
    url: 'admin/v1/menu',
    method: 'get',
    params: {
      parent_id: 0
    }
  })
}

/**
 * 获取用户信息
 * @param params
 */
export function getMenuInfo(id) {
  return request({
    url: 'admin/v1/menu/' + id,
    method: 'get',
  })
}


/**
 * 新增用户
 * @param params
 */
export function createMenu(data) {
  return request({
    url: 'admin/v1/menu',
    method: 'post',
    data: data
  })
}


/**
 * 编辑用户
 * @param params
 */
export function updateMenu({id, data}) {
  return request({
    url: 'admin/v1/menu/' + id,
    method: 'put',
    data: data
  })
}


/**
 * 删除用户
 * @param params
 */
export function deleteMenu(id) {
  return request({
    url: 'admin/v1/menu' + id,
    method: 'delete',
  })
}
