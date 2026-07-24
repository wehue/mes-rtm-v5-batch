<template>
  <ModulePage
    module="生产执行"
    title="出站操作"
    description="当前工序完成后录入良品、不良和报废数量，并决定是否流转、维修或锁定。"
    :cards="cards"
  />
</template>

<script setup>
import ModulePage from '../ModulePage.vue'

const cards = [
  { value: 'ST-A1-01', title: '当前工站', text: '显示当前批次所在工站及绑定设备信息。' },
  { value: '良品', title: '完工数量', text: '记录正常通过当前工序的数量。' },
  { value: '不良', title: '异常处置', text: '可引出维修、报废、强制出站等处理方式。' },
  { value: '下一站', title: '工序推进', text: '后续补充自动流转到下一工序。' },
]
</script>
