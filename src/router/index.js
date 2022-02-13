import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/register'),
    hidden: true,
  },
  {
    path: '/find-password',
    name: 'find-password',
    component: () => import('@/views/login/Password'),
    hidden: true,
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/login/reset'),
    hidden: true,
  },
  {
    path: '/please-confirmed',
    name: 'please-confirmed',
    component: () => import('@/views/login/please-confirmed'),
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home-4-line',
      affix: true,
      permission: ['TEACHER', 'MANAGER'],
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true,
          permission: ['TEACHER', 'MANAGER'],
        },
      },
    ],
  },
  {
    path: '/vab',
    component: Layout,
    redirect: '/vab/table',
    alwaysShow: true,
    meta: {
      title: '组件',
      icon: 'apps-line',
      permission: ['TEACHER', 'MANAGER'],
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/vab/table'),
        meta: {
          title: '表格',
          icon: 'table-2',
          permission: ['MANAGER'],
        },
      },
      {
        path: 'icon',
        name: 'Icon',
        component: () => import('@/views/vab/icon'),
        meta: {
          title: '图标',
          icon: 'remixicon-line',
          permission: ['TEACHER', 'MANAGER'],
        },
      },
    ],
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/test',
    meta: {
      title: '动态路由测试',
      icon: 'test-tube-line',
      permission: ['TEACHER', 'MANAGER'],
    },
    children: [
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/test'),
        meta: {
          title: '动态路由测试',
          icon: 'test-tube-line',
          permission: ['TEACHER', 'MANAGER'],
        },
      },
    ],
  },
  {
    path: '/educational-info',
    component: Layout,
    redirect: '/educational-info/contract-input',
    alwaysShow: false,
    meta: {
      title: '教务信息',
      icon: 'information-line',
      permission: ['EDUCATIONAL', 'MANAGER'],
    },
    children: [
      {
        path: 'contract-input',
        name: 'ContractInput',
        component: () => import('@/views/contract-input'),
        meta: {
          title: '合同信息录入',
          icon: 'contacts-book-line',
          permission: ['EDUCATIONAL', 'MANAGER'],
        },
      },
      {
        path: 'student-list',
        name: 'StudentList',
        component: () => import('@/views/student-list'),
        meta: {
          title: '学生信息列表',
          icon: 'list-check',
          permission: ['EDUCATIONAL', 'MANAGER'],
        },
      },
    ],
  },
  {
    path: '/user-manager',
    component: Layout,
    redirect: '/user-manager/user-manager',
    meta: {
      title: '员工管理',
      icon: 'group-line',
      permission: ['TEACHER', 'MANAGER'],
    },
    children: [
      {
        path: 'user-manager',
        name: 'User-Manager',
        component: () => import('@/views/user-manager'),
        meta: {
          title: '员工管理',
          icon: 'group-line',
          permission: ['MANAGER'],
        },
      },
    ],
  },
  {
    path: '/error',
    name: 'Error',
    component: Layout,
    redirect: '/error/403',
    meta: {
      title: '错误页',
      icon: 'error-warning-line',
      permission: ['TEACHER', 'MANAGER'],
    },
    children: [
      {
        path: '403',
        name: 'Error403',
        component: () => import('@/views/403'),
        meta: {
          title: '403',
          icon: 'error-warning-line',
          permission: ['TEACHER', 'MANAGER'],
        },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/404'),
        meta: {
          title: '404',
          icon: 'error-warning-line',
          permission: ['MANAGER'],
        },
      },
    ],
  },
  {
    path: '/*',
    redirect: '/404',
    hidden: true,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
