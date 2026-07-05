<template>
  <ModulePage
    module="生产执行"
    title="进站操作"
    description="批次上料齐套后，操作工选择设备并提交进站，批次进入当前工序执行中。"
    :cards="cards"
  />
</template>

<script setup>
import ModulePage from '../ModulePage.vue'

const cards = [
  { value: '待进站', title: '批次选择', text: '只显示已投产且当前工序待进站的批次。' },
  { value: 'OK', title: '物料校验', text: '校验当前工序 BOM 是否齐套。' },
  { value: '设备', title: '设备绑定', text: '记录当前工序使用的设备。' },
]
</script>
