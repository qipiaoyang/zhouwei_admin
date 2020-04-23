import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'admin/v1/auth/login',
    method: 'post',
    data
  })
}


export function logout() {
  return request({
    url: 'admin/v1/auth/logout',
    method: 'post'
  })
}
