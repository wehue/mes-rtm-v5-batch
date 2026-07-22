import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getCurrentUserFunctions } from '@/api/user'
import {
  firstAccessiblePathByPermissions,
  functionListToPermissionCodes,
  hasBackendPermission,
} from '@/utils/constants'

const DEFAULT_LINES = ['SMT-A1', 'SMT-A2', 'SMT-B1', 'SMT-B2']

// 定义默认用户信息
const DEFAULT_USER = {
  id: 'U001',
  userId: 'U001',
  username: 'admin',
  name: '工厂管理层',
  fullName: '工厂管理层',
  department: '生产部',
  post: '管理层',
  position: '管理层',
  role: 'RTM_ADMIN',
  roles: ['RTM_ADMIN'],
  lines: DEFAULT_LINES,
}

function parseLocalJson(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    localStorage.removeItem(key)
    return fallback
  }
}

function inferRole(info = {}, fallbackRole = 'operator') {
  // 直接使用后端返回的 role / roleCode，不再做任何映射
  if (info.role || info.roleCode) return info.role || info.roleCode
  if (Array.isArray(info.roleCodes) && info.roleCodes.length > 0) {
    return info.roleCodes[0] || fallbackRole
  }
  return fallbackRole
}

function normalizeUserInfo(info = {}, fallback = DEFAULT_USER) {
  const role = inferRole(info, fallback.role)
  const name = info.name || info.fullName || fallback.name || fallback.fullName || info.username || ''
  const position = info.position || info.post || fallback.position || fallback.post || ''

  // 直接使用后端返回的 roleCodes / roles，不再做任何映射
  let roles = [role]
  if (Array.isArray(info.roleCodes) && info.roleCodes.length > 0) {
    roles = [...info.roleCodes]
  } else if (Array.isArray(info.roles) && info.roles.length > 0) {
    roles = [...info.roles]
  }

  return {
    id: info.id ?? info.userId ?? fallback.id,
    userId: info.userId ?? info.id ?? fallback.userId ?? fallback.id,
    username: info.username || fallback.username || '',
    name,
    fullName: info.fullName || name,
    department: info.department || fallback.department || '',
    post: position,
    position,
    contact: info.contact || fallback.contact || '',
    role,
    roles,
    lines: Array.isArray(info.lines) && info.lines.length ? info.lines : (fallback.lines || DEFAULT_LINES),
  }
}

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(normalizeUserInfo(parseLocalJson('userInfo', DEFAULT_USER)))
  const userFunctions = ref(parseLocalJson('userFunctions', []))
  const permissionCodes = ref(parseLocalJson('permissionCodes', []))
  const permissionsLoaded = ref(permissionCodes.value.length > 0)
  const isLoggedIn = computed(() => Boolean(token.value && userInfo.value))

  function setToken(val) {
    token.value = val
    localStorage.setItem('token', val)
  }

  function setUserInfo(info) {
    const nextUser = normalizeUserInfo(info, userInfo.value)
    userInfo.value = nextUser
    localStorage.setItem('userInfo', JSON.stringify(nextUser))
  }

  function setFunctions(functions) {
    // 先把后端返回的多种结构（数组 / {list} / {records} / {rows} / {data} 等）归一为数组
    const list = normalizeFunctionList(functions)
    userFunctions.value = list
    permissionCodes.value = functionListToPermissionCodes(list)
    permissionsLoaded.value = true
    localStorage.setItem('userFunctions', JSON.stringify(list))
    localStorage.setItem('permissionCodes', JSON.stringify(permissionCodes.value))
  }

  async function fetchCurrentFunctions() {
    const result = await getCurrentUserFunctions({ pageNum: 1, pageSize: 200 })
    // 联调期日志：方便定位后端返回结构与字段名是否被前端正确解析
    console.log('[fetchCurrentFunctions] 接口原始返回:', result)
    setFunctions(result)
    console.log('[fetchCurrentFunctions] 归一化后功能列表:', userFunctions.value)
    console.log('[fetchCurrentFunctions] 解析出的权限码:', permissionCodes.value)
    return permissionCodes.value
  }

  async function ensurePermissionsLoaded() {
    if (permissionsLoaded.value) return permissionCodes.value
    if (!token.value) return []
    return fetchCurrentFunctions()
  }

  function logout() {
    token.value = ''
    userInfo.value = DEFAULT_USER
    userFunctions.value = []
    permissionCodes.value = []
    permissionsLoaded.value = false
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('userFunctions')
    localStorage.removeItem('permissionCodes')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
  }

  function hasRole(role) {
    const upper = String(role).toUpperCase()
    return userInfo.value.role?.toUpperCase() === 'RTM_ADMIN'
      || (userInfo.value.roles || []).some((item) => String(item).toUpperCase() === upper)
  }

  function hasAnyRole(roles) {
    if (userInfo.value.role?.toUpperCase() === 'RTM_ADMIN') return true
    const userRoles = (userInfo.value.roles || []).map((item) => String(item).toUpperCase())
    return roles.some((role) => userRoles.includes(String(role).toUpperCase()))
  }

  function hasPermission(permission) {
    return hasBackendPermission(permissionCodes.value, permission)
  }

  function firstAccessiblePath() {
    return firstAccessiblePathByPermissions(permissionCodes.value)
  }

  return {
    token,
    userInfo,
    userFunctions,
    permissionCodes,
    permissionsLoaded,
    isLoggedIn,
    setToken,
    setUserInfo,
    setFunctions,
    fetchCurrentFunctions,
    ensurePermissionsLoaded,
    logout,
    hasRole,
    hasAnyRole,
    hasPermission,
    firstAccessiblePath,
  }
})
