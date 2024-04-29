import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    path: '/find-password',
    name: 'find-password',
    component: () => import('@/views/login/Password'),
    hidden: true
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/login/reset'),
    hidden: true
  },
  {
    path: '/please-confirmed',
    name: 'please-confirmed',
    component: () => import('@/views/login/please-confirmed'),
    hidden: true
  },
  {
    path: '/signature',
    name: 'signature',
    component: () => import('@/views/signature'),
    hidden: true
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true
  }
]
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home-4-line',
      affix: true
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true
        }
      }
    ]
  },
  // {
  //   path: '/vab',
  //   component: Layout,
  //   redirect: '/vab/table',
  //   alwaysShow: true,
  //   meta: {
  //     title: '组件',
  //     icon: 'apps-line',
  //     permission: ['TEACHER', 'MANAGER']
  //   },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/vab/table'),
  //       meta: {
  //         title: '表格',
  //         icon: 'table-2',
  //         permission: ['MANAGER']
  //       }
  //     },
  //     {
  //       path: 'icon',
  //       name: 'Icon',
  //       component: () => import('@/views/vab/icon'),
  //       meta: {
  //         title: '图标',
  //         icon: 'remixicon-line',
  //         permission: ['TEACHER', 'MANAGER']
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/test',
  //   component: Layout,
  //   redirect: '/test/test',
  //   meta: {
  //     title: '动态路由测试',
  //     icon: 'test-tube-line',
  //     permission: ['TEACHER', 'MANAGER']
  //   },
  //   children: [
  //     {
  //       path: 'test',
  //       name: 'Test',
  //       component: () => import('@/views/test'),
  //       meta: {
  //         title: '动态路由测试',
  //         icon: 'test-tube-line',
  //         permission: ['TEACHER', 'MANAGER']
  //       }
  //     }
  //   ]
  // },
  {
    path: '/educational-info',
    component: Layout,
    redirect: '/educational-info/contract-input',
    alwaysShow: false,
    meta: {
      title: '教务信息',
      icon: 'information-line',
      permission: ['admin', 'educationalManager', 'educationalTeacher']
    },
    children: [
      {
        path: 'contract-input',
        name: 'ContractInput',
        component: () => import('@/views/contract-input'),
        meta: {
          title: '合同信息录入/编辑',
          icon: 'contacts-book-line',
          permission: ['admin', 'educationalManager', 'educationalTeacher']
        }
      }
      // {
      //   path: 'student-list',
      //   name: 'StudentList',
      //   component: () => import('@/views/student-list'),
      //   meta: {
      //     title: '学生信息列表',
      //     icon: 'list-check',
      //     permission: [
      //       'none'
      //       'educationalManager',
      //       'educationalTeacher',
      //       '3DManager',
      //       'interactionManager',
      //       'fashionManager',
      //       'teacherManager'
      //     ]
      //   }
      // }
    ]
  },
  {
    path: '/user-manager',
    component: Layout,
    redirect: '/user-manager/user-manager',
    meta: {
      title: '员工管理',
      icon: 'group-line',
      permission: ['admin', 'educationalManager']
    },
    children: [
      {
        path: 'user-manager',
        name: 'User-Manager',
        component: () => import('@/views/user-manager'),
        meta: {
          title: '员工管理',
          icon: 'group-line',
          permission: ['admin', 'educationalManager']
        }
      }
    ]
  },
  {
    path: '/personal-calender',
    component: Layout,
    redirect: '/personal-calender/personal-calender',
    meta: {
      title: '日程表',
      icon: 'calendar-line'
    },
    children: [
      {
        path: 'personal-calender',
        name: 'Personal-Calender',
        component: () => import('@/views/personal-calender'),
        meta: {
          title: '日程表',
          icon: 'calendar-line'
        }
      }
    ]
  },
  {
    path: '/general-info',
    component: Layout,
    redirect: '/educational-info/contract-input',
    alwaysShow: false,
    meta: {
      title: '通用',
      icon: 'lightbulb-flash-line'
    },
    children: [
      {
        path: 'message-list',
        name: 'MessageList',
        component: () => import('@/views/message-list'),
        meta: {
          title: '消息列表',
          icon: 'message-2-line'
        }
      }
    ]
  },
  {
    path: '/course-history',
    component: Layout,
    redirect: '/course-history/course-history',
    alwaysShow: false,
    hidden: true,
    meta: {
      title: '学生上课历史记录',
      icon: 'lightbulb-flash-line'
    },
    children: [
      {
        path: 'course-history',
        name: 'CourseHistory',
        component: () => import('@/views/course-history'),
        meta: {
          title: '学生上课历史记录',
          icon: 'message-2-line'
        }
      }
    ]
  },
  {
    path: '/student-form',
    name: 'student-form',
    component: () => import('@/views/student-form'),
    hidden: true
  },
  {
    path: '/student-form',
    component: Layout,
    redirect: '/student-form/student-form',
    alwaysShow: false,
    hidden: true,
    meta: {
      title: '学生课堂记录反馈',
      icon: 'lightbulb-flash-line'
    },
    children: [
      {
        path: 'student-form',
        name: 'StudentForm',
        component: () => import('@/views/student-form'),
        meta: {
          title: '学生课堂记录反馈',
          icon: 'message-2-line'
        }
      }
    ]
  },
  {
    path: '/today-course',
    component: Layout,
    redirect: '/today-course/today-course',
    alwaysShow: false,
    hidden: true,
    meta: {
      title: '今日上课学生名单',
      icon: 'lightbulb-flash-line'
    },
    children: [
      {
        path: 'today-course',
        name: 'TodayCourse',
        component: () => import('@/views/today-course'),
        meta: {
          title: '今日上课学生名单',
          icon: 'message-2-line'
        }
      }
    ]
  }
  // {
  //   path: '/error',
  //   name: 'Error',
  //   component: Layout,
  //   redirect: '/error/403',
  //   meta: {
  //     title: '错误页',
  //     icon: 'error-warning-line',
  //     permission: ['TEACHER', 'MANAGER']
  //   },
  //   children: [
  //     {
  //       path: '403',
  //       name: 'Error403',
  //       component: () => import('@/views/403'),
  //       meta: {
  //         title: '403',
  //         icon: 'error-warning-line',
  //         permission: ['TEACHER', 'MANAGER']
  //       }
  //     },
  //     {
  //       path: '404',
  //       name: 'Error404',
  //       component: () => import('@/views/404'),
  //       meta: {
  //         title: '404',
  //         icon: 'error-warning-line',
  //         permission: ['MANAGER']
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/*',
  //   redirect: '/404',
  //   hidden: true
  // }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
