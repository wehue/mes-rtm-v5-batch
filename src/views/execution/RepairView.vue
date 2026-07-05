<template>
  <ModulePage
    module="生产执行"
    title="维修管理"
    description="维修员和质量工程师处理出站环节产生的不良维修任务，形成维修记录。"
    :cards="cards"
  />
</template>

<script setup>
import ModulePage from '../ModulePage.vue'

const cards = [
  { value: '2', title: '待维修', text: '展示需要维修员处理的异常批次。' },
  { value: '修复', title: '维修结果', text: '可记录修复、报废或关闭处理。' },
  { value: '追溯', title: '维修记录', text: '处理结果进入批次跟踪。' },
]
</script>
