<template>
  <ModulePage
    module="看板中心"
    title="生产进度看板"
    description="展示工单计划达成、批次进度和预计完成时间，面向生产主管和管理层。"
    :cards="cards"
  />
</template>

<script setup>
import ModulePage from '../ModulePage.vue'

const cards = [
  { value: '86%', title: '计划达成率', text: '展示当前生产目标完成情况。' },
  { value: '3/5', title: '完成工序', text: '展示批次在工艺路线中的位置。' },
  { value: '18:00', title: '预计完成', text: '用于演示生产进度预测。' },
]
</script>
