import request from '@/utils/request'

export function getBatchList(params) {
  return request.get('/lots', { params })
}

export function getBatchStatusStats() {
  return request.get('/lots/status-stats')
}

export function updateBatchStatus(id, status) {
  return request.put('/lots/status', null, { params: { id, status } })
}

export function getBatchDetail(id) {
  return request.get('/lots/detail', { params: { id } })
}

export function getStationInList() {
  return request.get('/lots/station-in/list')
}

export function getStationInDetail(lotCode) {
  return request.get('/lots/station-in/detail', { params: { lotCode } })
}

export function getStationOutList() {
  return request.get('/lots/station-out/list')
}

export function getStationOutDetail(lotCode) {
  return request.get('/lots/station-out/detail', { params: { lotCode } })
}

export function createStationOut(data) {
  return request.post('/station-out', data)
}

export function getPendingLoadingList() {
  return request.get('/lots/pending-loading/list')
}

export function createBatch(data) {
  return request.post('/lots', data)
}

export function createStationIn(data) {
  return request.post('/station-in', data)
}

export function supplementMaterial(data) {
  return request.put('/loading/supplement', data)
}