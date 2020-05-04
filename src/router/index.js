import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '订单', icon: 'dashboard' }
    }]
  },
]

export const asyncRoutes = [{
  path: '/system',
  component: Layout,
  redirect: '/system/user',
  name: 'System',
  meta: {
    title: '管理模块',
    icon: 'nested'
  },
  children: [
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/system/user/index'),
      meta: { title: '用户列表' }
    },
    {
      path: 'dept',
      name: 'dept',
      component: () => import('@/views/system/dept/index'),
      meta: { title: '小组列表' }
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('@/views/system/role/index'),
      meta: { title: '订单列表' }
    },
  ]
},
  { path: '*', redirect: '/404', hidden: true }];

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
