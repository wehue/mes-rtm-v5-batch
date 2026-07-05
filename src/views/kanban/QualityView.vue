<template>
  <ModulePage
    module="看板中心"
    title="质量监控看板"
    description="展示 SPI、AOI、批次良率和异常分布，为质量工程师提供现场质量观察入口。"
    :cards="cards"
  />
</template>

<script setup>
import ModulePage from '../ModulePage.vue'

const cards = [
  { value: '98.5%', title: '一次合格率', text: '展示批次质量表现。' },
  { value: 'AOI', title: '检测工序', text: '关联后续出站和维修处理。' },
  { value: '2', title: '异常批次', text: '用于演示质量角色可见功能。' },
]
</script>
