import { createRouter, createWebHistory } from 'vue-router'
import { createNameComponent } from './createNode'
import Layout from '@/layout/index.vue'
import { HomeFilled, Operation, Lock } from '@element-plus/icons-vue' // 导入需要的图标

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      meta: { title: 'dashboard', icon: HomeFilled }, // 使用 HomeFilled 图标
      children: [
        {
          path: 'dashboard',
          component: createNameComponent(
            () => import('@/views/main/dashboard/index.vue'),
          ),
          meta: { title: '首页', icon: HomeFilled, hideClose: true }, // 使用 HomeFilled 图标
        },
      ],
    },
    {
      path: '/system',
      component: Layout,
      redirect: '/404',
      hideMenu: true,
      meta: { title: '系统目录' },
      children: [
        {
          path: '/404',
          component: createNameComponent(
            () => import('@/views/system/404.vue'),
          ),
          meta: { title: '404', icon: Operation, hideTabs: true }, // 使用 Operation 图标
        },
        {
          path: '/401',
          component: createNameComponent(
            () => import('@/views/system/401.vue'),
          ),
          meta: { title: '401', icon: Lock, hideTabs: true }, // 使用 Lock 图标
        },
        {
          path: '/redirect/:path(.*)',
          component: createNameComponent(
            () => import('@/views/system/redirect.vue'),
          ),
          meta: { title: '重定向页面', hideTabs: true },
        },
      ],
    },
    {
      path: '/login',
      component: createNameComponent(() => import('@/views/system/login.vue')),
      hideMenu: true,
      meta: { title: '登录', hideTabs: true },
    },
    {
      // 找不到路由重定向到404页面
      path: '/:pathMatch(.*)',
      component: Layout,
      redirect: '/404',
      hideMenu: true,
      meta: { title: '' },
    },
  ],
})

export default router
