<template>
  <ModulePage
    module="生产执行"
    title="上料管理"
    description="操作工、班组长可在批次进站前完成当前工序 BOM 齐套准备。"
    :cards="cards"
  />
</template>

<script setup>
import ModulePage from '../ModulePage.vue'

const cards = [
  { value: '4/6', title: '齐套站位', text: '显示物料站位是否已经完成上料。' },
  { value: 'BOM', title: '物料清单', text: '后续可接入工序 BOM 校验。' },
  { value: '扫码', title: '补料动作', text: '演示现场操作端常见动作。' },
]
</script>
