import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/stores/user'
import { isRtmRole, PERMISSION_CODES } from '../utils/constants'

NProgress.configure({ showSpinner: false })

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/LoginView.vue'),
    meta: { title: '登录', noAuth: true },
  },
  {
    path: '/',
    component: () => import('../layouts/DefaultLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/DashboardView.vue'),
        meta: { title: '首页', module: '首页', permission: PERMISSION_CODES.DASHBOARD },
      },
      { path: 'kanban', redirect: '/kanban/line-status' },
      {
        path: 'kanban/line-status',
        name: 'KanbanLineStatus',
        component: () => import('../views/kanban/LineStatusView.vue'),
        meta: { title: '产线状态', module: '看板', permission: PERMISSION_CODES.KANBAN },
      },
      {
        path: 'kanban/quality',
        name: 'KanbanQuality',
        component: () => import('../views/kanban/QualityView.vue'),
        meta: { title: '质量看板', module: '看板', permission: PERMISSION_CODES.KANBAN },
      },
      {
        path: 'kanban/progress',
        name: 'KanbanProgress',
        component: () => import('../views/kanban/ProgressView.vue'),
        meta: { title: '进度看板', module: '看板', permission: PERMISSION_CODES.KANBAN },
      },
      {
        path: 'production/work-order',
        name: 'WorkOrder',
        component: () => import('../views/production/WorkOrderView.vue'),
        meta: { title: '工单管理', module: '生产', permission: PERMISSION_CODES.WORK_ORDER },
      },
      {
        path: 'production/work-order/:id',
        name: 'WorkOrderDetail',
        component: () => import('../views/production/WorkOrderDetailView.vue'),
        meta: {
          title: '工单详情',
          module: '生产',
          parent: { title: '工单管理', path: '/production/work-order' },
          activeMenu: '/production/work-order',
          permission: PERMISSION_CODES.WORK_ORDER,
        },
      },
      {
        path: 'production/batch',
        name: 'Batch',
        component: () => import('../views/production/BatchView.vue'),
        meta: { title: '批次管理', module: '生产', permission: PERMISSION_CODES.BATCH },
      },
      {
        path: 'production/batch/:id',
        name: 'BatchDetail',
        component: () => import('../views/production/BatchDetailView.vue'),
        meta: {
          title: '批次详情',
          module: '生产',
          parent: { title: '批次管理', path: '/production/batch' },
          activeMenu: '/production/batch',
          permission: PERMISSION_CODES.BATCH,
        },
      },
      {
        path: 'execution/loading',
        name: 'Loading',
        component: () => import('../views/execution/LoadingView.vue'),
        meta: { title: '上料管理', module: '生产执行', permission: PERMISSION_CODES.LOADING },
      },
      {
        path: 'execution/check-in',
        name: 'CheckIn',
        component: () => import('../views/execution/CheckInView.vue'),
        meta: { title: '进站管理', module: '生产执行', permission: PERMISSION_CODES.CHECK_IN },
      },
      {
        path: 'execution/check-out',
        name: 'CheckOut',
        component: () => import('../views/execution/CheckOutView.vue'),
        meta: { title: '出站管理', module: '生产执行', permission: PERMISSION_CODES.CHECK_OUT },
      },
      {
        path: 'execution/repair',
        name: 'Repair',
        component: () => import('../views/execution/RepairView.vue'),
        meta: { title: '维修管理', module: '生产执行', permission: PERMISSION_CODES.REPAIR },
      },
      {
        path: 'execution/tracking',
        name: 'Tracking',
        component: () => import('../views/execution/TrackingView.vue'),
        meta: { title: '追溯管理', module: '生产执行', permission: PERMISSION_CODES.TRACKING },
      },
      {
        path: 'device',
        name: 'Device',
        component: () => import('../views/device/DeviceMonitorView.vue'),
        meta: { title: '设备监控', module: '设备', permission: PERMISSION_CODES.DEVICE },
      },
      {
        path: 'system/profile',
        name: 'Profile',
        component: () => import('../views/system/ProfileView.vue'),
        meta: { title: '个人中心', module: '系统', permission: PERMISSION_CODES.SYSTEM },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/error/NotFoundView.vue'),
    meta: { title: '页面未找到', noAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  NProgress.start()
  if (to.meta.noAuth) return true

  const token = localStorage.getItem('token')
  if (!token) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  try {
    const userStore = useUserStore()
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    const role = userInfo.role || 'RTM_ADMIN'
    if (!isRtmRole(role)) {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      return { path: '/login', query: { redirect: to.fullPath } }
    }
    await userStore.ensurePermissionsLoaded()
    const permission = to.meta.permission
    if (permission && !userStore.hasPermission(permission)) {
      return { path: userStore.firstAccessiblePath() }
    }
  } catch (e) {
    console.error('Failed to load permissions:', e)
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('userFunctions')
    localStorage.removeItem('permissionCodes')
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  return true
})

router.afterEach((to) => {
  document.title = (to.meta.title || 'MES-RTM') + '-MES-RTM-V5.0-Batch'
  NProgress.done()
})

export default router