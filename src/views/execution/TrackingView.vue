<template>
  <ModulePage
    module="生产执行"
    title="批次跟踪"
    description="追踪批次从投产、上料、进站、出站、维修到完工的全过程记录。"
    :cards="cards"
  />
</template>

<script setup>
import ModulePage from '../ModulePage.vue'

const cards = [
  { value: '时间线', title: '流转记录', text: '展示批次每个关键动作的时间点。' },
  { value: '工序', title: '工艺路线', text: '串联印刷、SPI、贴片、回流、AOI 等工序。' },
  { value: '质量', title: '异常记录', text: '关联不良、报废和维修处理。' },
]
</script>
