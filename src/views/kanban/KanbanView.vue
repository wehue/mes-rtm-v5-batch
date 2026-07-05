<template>
  <ModulePage
    module="看板中心"
    title="车间实时看板"
    description="用于展示产线状态、质量趋势和生产进度，适合工厂大屏或管理人员巡检。"
    :cards="cards"
  />
</template>

<script setup>
import ModulePage from '../ModulePage.vue'

const cards = [
  { value: 'SMT-A1', title: '产线状态', text: '展示当前产线运行、待机、异常等状态。' },
  { value: '3', title: '预警消息', text: '聚合质量、设备、进度等看板提醒。' },
  { value: '30s', title: '自动刷新', text: '模拟 MES-RTM 大屏实时刷新机制。' },
]
</script>
