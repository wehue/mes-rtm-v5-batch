export const ROLES = [
  { value: 'process_engineer', label: '宸ヨ壓宸ョ▼甯?, username: 'process', password: '123456' },
  { value: 'operator', label: '鎿嶄綔宸?, username: 'operator', password: '123456' },
  { value: 'team_leader', label: '鐝粍闀?, username: 'leader', password: '123456' },
  { value: 'production_manager', label: '鐢熶骇涓荤', username: 'manager', password: '123456' },
  { value: 'quality_engineer', label: '璐ㄩ噺宸ョ▼甯?, username: 'quality', password: '123456' },
  { value: 'repairman', label: '缁翠慨鍛?, username: 'repair', password: '123456' },
  { value: 'admin', label: '宸ュ巶绠＄悊灞?, username: 'admin', password: '123456' },
]

export const PERMISSION_CODES = {
  DASHBOARD: 'dashboard',
  KANBAN: 'kanban',
  WORK_ORDER: 'work_order',
  BATCH: 'batch',
  LOADING: 'loading',
  CHECK_IN: 'check_in',
  CHECK_OUT: 'check_out',
  TRACKING: 'tracking',
  REPAIR: 'repair',
  DEVICE: 'device',
  SYSTEM: 'system',
}


export const BACKEND_FUNCTION_PERMISSION_MAP = {
  dashboard: [PERMISSION_CODES.DASHBOARD],
  kanban: [PERMISSION_CODES.KANBAN],
  work_order: [PERMISSION_CODES.WORK_ORDER],
  batch: [PERMISSION_CODES.BATCH],
  loading: [PERMISSION_CODES.LOADING],
  check_in: [PERMISSION_CODES.CHECK_IN],
  check_out: [PERMISSION_CODES.CHECK_OUT],
  tracking: [PERMISSION_CODES.TRACKING],
  repair: [PERMISSION_CODES.REPAIR],
  device: [PERMISSION_CODES.DEVICE],
  equipment: [PERMISSION_CODES.DEVICE],
  system: [PERMISSION_CODES.SYSTEM],
  user: [PERMISSION_CODES.SYSTEM],
  role: [PERMISSION_CODES.SYSTEM],
  WO_MANAGE: [PERMISSION_CODES.WORK_ORDER],
  BATCH_MANAGE: [PERMISSION_CODES.BATCH],
  LINE_LOAD_MONITOR: [PERMISSION_CODES.DASHBOARD],
  SCHEDULE_BOARD: [PERMISSION_CODES.DASHBOARD, PERMISSION_CODES.KANBAN],
  INBOUND_MANAGE: [PERMISSION_CODES.CHECK_IN],
  LOADING_TASK_VIEW: [PERMISSION_CODES.LOADING],
  INBOUND_LOADING_CHECK: [PERMISSION_CODES.CHECK_IN, PERMISSION_CODES.LOADING],
  OUTBOUND_MANAGE: [PERMISSION_CODES.CHECK_OUT],
  REPAIR_MANAGE: [PERMISSION_CODES.REPAIR],
  QUALITY_JUDGE_INTERCEPT: [PERMISSION_CODES.BATCH, PERMISSION_CODES.CHECK_OUT, PERMISSION_CODES.REPAIR],
  PARAM_QUALITY_RELATE_QUERY: [PERMISSION_CODES.TRACKING],
  LINE_STATUS_BOARD: [PERMISSION_CODES.KANBAN],
  QUALITY_BOARD: [PERMISSION_CODES.KANBAN],
  PARAM_TEMPLATE_SELECT: [PERMISSION_CODES.DEVICE],
  PARAM_ISSUE: [PERMISSION_CODES.DEVICE],
  PARAM_CONSISTENCY_CHECK: [PERMISSION_CODES.DEVICE],
}

export const PERMISSION_HOME_PATH = [
  { permission: PERMISSION_CODES.DASHBOARD, path: '/dashboard' },
  { permission: PERMISSION_CODES.WORK_ORDER, path: '/production/work-order' },
  { permission: PERMISSION_CODES.BATCH, path: '/production/batch' },
  { permission: PERMISSION_CODES.LOADING, path: '/execution/loading' },
  { permission: PERMISSION_CODES.CHECK_IN, path: '/execution/check-in' },
  { permission: PERMISSION_CODES.CHECK_OUT, path: '/execution/check-out' },
  { permission: PERMISSION_CODES.REPAIR, path: '/execution/repair' },
  { permission: PERMISSION_CODES.TRACKING, path: '/execution/tracking' },
  { permission: PERMISSION_CODES.DEVICE, path: '/device' },
  { permission: PERMISSION_CODES.KANBAN, path: '/kanban/line-status' },
]

export function normalizeFunctionList(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.list)) return payload.list
  if (Array.isArray(payload?.records)) return payload.records
  return []
}

export function functionListToPermissionCodes(functions = []) {
  const codes = new Set()
  normalizeFunctionList(functions).forEach((item) => {
    const rawCode = item?.functionCode || item?.FunctionCode || item
    const functionCode = typeof rawCode === 'string' ? rawCode.trim() : rawCode
    const normalizedCode = typeof functionCode === 'string' ? functionCode.replace(/-/g, '_').toLowerCase() : functionCode
    const upperCode = typeof functionCode === 'string' ? functionCode.toUpperCase() : functionCode
    const permissions = BACKEND_FUNCTION_PERMISSION_MAP[functionCode]
      || BACKEND_FUNCTION_PERMISSION_MAP[normalizedCode]
      || BACKEND_FUNCTION_PERMISSION_MAP[upperCode]
      || []
    permissions.forEach((permission) => codes.add(permission))
  })
  codes.add(PERMISSION_CODES.SYSTEM)
  return [...codes]
}

export function hasBackendPermission(permissionCodes = [], permission) {
  if (!permission || permission === PERMISSION_CODES.SYSTEM) return true
  return permissionCodes.includes(permission)
}

export function firstAccessiblePathByPermissions(permissionCodes = []) {
  return PERMISSION_HOME_PATH.find((item) => hasBackendPermission(permissionCodes, item.permission))?.path || '/system/profile'
}

export function isRtmRole(role) {
  return ROLES.some((item) => item.value === role)
}
export const ROLE_PERMISSIONS = {
  process_engineer: [
    PERMISSION_CODES.DASHBOARD,
    PERMISSION_CODES.KANBAN,
    PERMISSION_CODES.DEVICE,
    PERMISSION_CODES.SYSTEM,
  ],
  production_manager: [
    PERMISSION_CODES.DASHBOARD,
    PERMISSION_CODES.KANBAN,
    PERMISSION_CODES.WORK_ORDER,
    PERMISSION_CODES.BATCH,
    PERMISSION_CODES.TRACKING,
    PERMISSION_CODES.SYSTEM,
  ],
  team_leader: [
    PERMISSION_CODES.DASHBOARD,
    PERMISSION_CODES.KANBAN,
    PERMISSION_CODES.LOADING,
    PERMISSION_CODES.CHECK_IN,
    PERMISSION_CODES.CHECK_OUT,
    PERMISSION_CODES.TRACKING,
    PERMISSION_CODES.SYSTEM,
  ],
  operator: [
    PERMISSION_CODES.DASHBOARD,
    PERMISSION_CODES.KANBAN,
    PERMISSION_CODES.LOADING,
    PERMISSION_CODES.CHECK_IN,
    PERMISSION_CODES.CHECK_OUT,
    PERMISSION_CODES.TRACKING,
    PERMISSION_CODES.SYSTEM,
  ],
  quality_engineer: [
    PERMISSION_CODES.DASHBOARD,
    PERMISSION_CODES.KANBAN,
    PERMISSION_CODES.BATCH,
    PERMISSION_CODES.CHECK_OUT,
    PERMISSION_CODES.REPAIR,
    PERMISSION_CODES.TRACKING,
    PERMISSION_CODES.SYSTEM,
  ],
  repairman: [
    PERMISSION_CODES.DASHBOARD,
    PERMISSION_CODES.KANBAN,
    PERMISSION_CODES.REPAIR,
    PERMISSION_CODES.TRACKING,
    PERMISSION_CODES.SYSTEM,
  ],
  admin: Object.values(PERMISSION_CODES),
}

export const ROLE_HOME_PATH = {
  process_engineer: '/device',
  production_manager: '/production/work-order',
  team_leader: '/execution/loading',
  operator: '/execution/loading',
  quality_engineer: '/execution/repair',
  repairman: '/execution/repair',
  admin: '/dashboard',
}

export function roleHasPermission(role, permission) {
  if (!permission || role === 'admin') return true
  return ROLE_PERMISSIONS[role]?.includes(permission) || false
}

export function firstAccessiblePath(role) {
  return ROLE_HOME_PATH[role] || '/dashboard'
}

export const WORK_ORDER_STATUS = {
  1: { label: '鑽夌', type: 'info', color: '#909399' },
  2: { label: '宸查噴鏀?, type: 'warning', color: '#d97706' },
  3: { label: '鐢熶骇涓?, type: 'primary', color: '#2563eb' },
  4: { label: '宸叉殏鍋?, type: 'warning', color: '#d97706' },
  5: { label: '宸插畬鎴?, type: 'success', color: '#16a34a' },
  6: { label: '宸插叧闂?, type: 'info', color: '#6b7280' },
  draft: { label: '寰呭垱寤?, type: 'info', color: '#909399' },
  pending: { label: '寰呴噴鏀?, type: 'warning', color: '#d97706' },
  running: { label: '鐢熶骇涓?, type: 'primary', color: '#2563eb' },
  paused: { label: '鏆傚仠', type: 'warning', color: '#d97706' },
  completed: { label: '宸插畬鎴?, type: 'success', color: '#16a34a' },
  closed: { label: '宸插叧闂?, type: 'info', color: '#6b7280' },
}

export const BATCH_STATUS = {
  1: { label: '寰呯敓浜?, type: 'warning', color: '#b7791f' },
  2: { label: '鐢熶骇涓?, type: 'primary', color: '#2563eb' },
  3: { label: '鏆傚仠', type: 'warning', color: '#d97706' },
  4: { label: '缁翠慨涓?, type: 'danger', color: '#dc2626' },
  5: { label: '宸查攣瀹?, type: 'danger', color: '#dc2626' },
  6: { label: '宸插畬鎴?, type: 'success', color: '#16a34a' },
  pending: { label: '寰呯敓浜?, type: 'warning', color: '#b7791f' },
  running: { label: '鐢熶骇涓?, type: 'primary', color: '#2563eb' },
  paused: { label: '鏆傚仠', type: 'warning', color: '#d97706' },
  repair: { label: '缁翠慨涓?, type: 'danger', color: '#dc2626' },
  locked: { label: '宸查攣瀹?, type: 'danger', color: '#dc2626' },
  completed: { label: '宸插畬鎴?, type: 'success', color: '#16a34a' },
}

export const PROCESS_STATUS = {
  1: { label: '寰呰繘绔?, type: 'info', color: '#64748b' },
  2: { label: '宸茶繘绔?, type: 'primary', color: '#2563eb' },
  3: { label: '宸插嚭绔?, type: 'success', color: '#16a34a' },
  4: { label: '鏆傚仠', type: 'warning', color: '#d97706' },
  5: { label: '閿佸畾', type: 'danger', color: '#dc2626' },
  6: { label: '璺宠繃', type: 'info', color: '#6b7280' },
  wait_in: { label: '寰呰繘绔?, type: 'info', color: '#64748b' },
  checked_in: { label: '宸茶繘绔?, type: 'primary', color: '#2563eb' },
  checked_out: { label: '宸插嚭绔?, type: 'success', color: '#16a34a' },
  paused: { label: '鏆傚仠', type: 'warning', color: '#d97706' },
  locked: { label: '閿佸畾', type: 'danger', color: '#dc2626' },
  skipped: { label: '璺宠繃', type: 'info', color: '#6b7280' },
}

export const DEVICE_STATUS = {
  1: { label: '杩愯', type: 'success', color: '#16a34a' },
  2: { label: '寰呮満', type: 'warning', color: '#d97706' },
  3: { label: '鏁呴殰', type: 'danger', color: '#dc2626' },
  4: { label: '淇濆吇', type: 'warning', color: '#d97706' },
  5: { label: '绂荤嚎', type: 'info', color: '#6b7280' },
  6: { label: '鎶ュ簾', type: 'danger', color: '#dc2626' },
  running: { label: '杩愯', type: 'success', color: '#16a34a' },
  standby: { label: '寰呮満', type: 'warning', color: '#d97706' },
  fault: { label: '鏁呴殰', type: 'danger', color: '#dc2626' },
  offline: { label: '绂荤嚎', type: 'info', color: '#6b7280' },
}

export const DEVICE_TYPES = [
  '鍗板埛鏈?,
  'SPI 妫€娴嬩华',
  '楂橀€熻创鐗囨満',
  '閫氱敤璐寸墖鏈?,
  '鍥炴祦鐐?,
  'AOI 妫€娴嬩华',
]

export function statusMeta(map, value) {
  return map[value] || { label: value || '鏈煡', type: 'info', color: '#909399' }
}

export function findLoginRole(username, password) {
  return ROLES.find((item) => item.username === username && item.password === password) || null
}
