<template>
  <ModulePage
    module="首页"
    title="生产驾驶舱"
    description="汇总工单、批次、质量、设备等关键指标，是所有角色都可以查看的生产总览入口。"
    :cards="cards"
  />
</template>

<script setup>
import ModulePage from '../ModulePage.vue'

const cards = [
  { value: '12', title: '今日工单', text: '展示当天计划、执行中和已完成的工单数量。' },
  { value: '86%', title: '计划达成率', text: '用于演示管理层登录后查看生产总体进度。' },
  { value: '98.5%', title: '一次合格率', text: '用于连接质量看板和生产执行异常。' },
]
</script>
