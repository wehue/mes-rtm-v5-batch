import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getCurrentUserFunctions } from '@/api/user'
import {
  findLoginRole,
  firstAccessiblePath,
  firstAccessiblePathByPermissions,
  functionListToPermissionCodes,
  hasBackendPermission,
  roleHasPermission,
} from '@/utils/constants'

const DEFAULT_LINES = ['SMT-A1', 'SMT-A2', 'SMT-B1', 'SMT-B2']

const POSITION_ROLE_MAP = {
  生产主管: 'production_manager',
  班组长: 'team_leader',
  操作工: 'operator',
  质量工程师: 'quality_engineer',
  工厂管理层: 'admin',
  系统管理员: 'admin',
  RTM管理员: 'admin',
  RTM操作员: 'operator',
}

const ROLE_CODE_MAP = {
  PRODUCTION_SUPERVISOR: 'production_manager',
  LEADER: 'team_leader',
  TEAM_LEADER: 'team_leader',
  OPERATOR: 'operator',
  RTM_OPERATOR: 'operator',
  QUALITY_ENGINEER: 'quality_engineer',
  ADMIN: 'admin',
  RTM_ADMIN: 'admin',
}

const DEFAULT_USER = {
  id: 'U001',
  userId: 'U001',
  username: 'admin',
  name: 'Administrator',
  fullName: 'Administrator',
  department: 'Production',
  post: 'Administrator',
  position: 'Administrator',
  role: 'admin',
  roles: ['admin'],
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
  const rawRole = info.role || info.roleCode
  if (rawRole) return ROLE_CODE_MAP[rawRole] || rawRole
  const roleName = info.roleName || info.position || info.post
  return POSITION_ROLE_MAP[roleName] || fallbackRole
}

function normalizeUserInfo(info = {}, fallback = DEFAULT_USER) {
  const role = inferRole(info, fallback.role)
  const name = info.name || info.fullName || fallback.name || fallback.fullName || info.username || ''
  const position = info.position || info.post || fallback.position || fallback.post || ''

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
    roles: Array.isArray(info.roles) && info.roles.length ? info.roles : [role],
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
    userFunctions.value = Array.isArray(functions) ? functions : []
    permissionCodes.value = functionListToPermissionCodes(userFunctions.value)
    permissionsLoaded.value = true
    localStorage.setItem('userFunctions', JSON.stringify(userFunctions.value))
    localStorage.setItem('permissionCodes', JSON.stringify(permissionCodes.value))
  }

  async function fetchCurrentFunctions() {
    const result = await getCurrentUserFunctions({ pageNum: 1, pageSize: 200 })
    setFunctions(result?.list || result || [])
    return permissionCodes.value
  }

  async function ensurePermissionsLoaded() {
    if (permissionsLoaded.value) return permissionCodes.value
    if (!token.value) return []
    return fetchCurrentFunctions()
  }

  function login(username, password) {
    const role = findLoginRole(username, password)
    if (!role) {
      return { ok: false, message: 'Invalid username or password' }
    }

    const info = {
      id: role.value,
      username: role.username,
      name: role.label,
      role: role.value,
      roles: [role.value],
      department: 'Production',
    }

    token.value = `token-${role.value}`
    userInfo.value = normalizeUserInfo(info)
    permissionCodes.value = []
    permissionsLoaded.value = false
    localStorage.setItem('token', token.value)
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('username', role.username)

    return { ok: true, redirect: firstAccessiblePath(role.value) }
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
    return userInfo.value.role === 'admin' || userInfo.value.roles?.includes(role)
  }

  function hasAnyRole(roles) {
    return userInfo.value.role === 'admin' || roles.some((role) => userInfo.value.roles?.includes(role))
  }

  function hasPermission(permission) {
    if (permissionCodes.value.length) {
      return hasBackendPermission(permissionCodes.value, permission)
    }
    return roleHasPermission(userInfo.value?.role, permission)
  }

  function firstAccessiblePathForUser() {
    if (permissionCodes.value.length) {
      return firstAccessiblePathByPermissions(permissionCodes.value)
    }
    return firstAccessiblePath(userInfo.value?.role)
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
    login,
    logout,
    hasRole,
    hasAnyRole,
    hasPermission,
    firstAccessiblePath: firstAccessiblePathForUser,
  }
})
