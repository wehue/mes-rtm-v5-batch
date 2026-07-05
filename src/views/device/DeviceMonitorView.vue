<template>
  <ModulePage
    module="设备监控"
    title="设备状态监控"
    description="工艺工程师和管理层可查看设备运行、待机、故障和保养状态。"
    :cards="cards"
  />
</template>

<script setup>
import ModulePage from '../ModulePage.vue'

const cards = [
  { value: '运行', title: '印刷机', text: '展示设备当前状态和关联批次。' },
  { value: '待机', title: '贴片机', text: '用于说明设备监控权限只对部分角色开放。' },
  { value: 'OEE', title: '设备效率', text: '后续可补充设备效率图表。' },
]
</script>
