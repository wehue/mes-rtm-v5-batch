<template>
  <ModulePage
    module="看板中心"
    title="产线状态看板"
    description="展示 SMT 产线运行、待机、异常和当前批次状态，是车间大屏的基础入口。"
    :cards="cards"
  />
</template>

<script setup>
import ModulePage from '../ModulePage.vue'

const cards = [
  { value: 'SMT-A1', title: '当前产线', text: '显示产线正在执行的工单与批次。' },
  { value: '运行', title: '产线状态', text: '用于演示看板中心的状态总览。' },
  { value: '30s', title: '刷新频率', text: '模拟实时看板定时刷新。' },
]
</script>
