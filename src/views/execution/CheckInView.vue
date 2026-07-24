<template>
  <ModulePage
    module="生产执行"
    title="进站操作"
    description="批次上料齐套后，系统自动识别工站及绑定设备，操作工提交进站，批次进入当前工序执行中。"
    :cards="cards"
  />
</template>

<script setup>
import ModulePage from '../ModulePage.vue'

const cards = [
  { value: '待进站', title: '批次选择', text: '只显示已投产且当前工序待进站的批次。' },
  { value: 'ST-A1-01', title: '当前工站', text: '工站与设备一对一绑定，进站时自动识别设备。' },
  { value: 'OK', title: '物料校验', text: '校验当前工序 BOM 是否齐套。' },
]
</script>
