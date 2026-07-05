<template>
  <ModulePage
    module="系统辅助"
    title="个人中心"
    description="展示当前登录用户、所属角色和可访问的功能范围，便于录屏说明权限来源。"
    :cards="cards"
  />
</template>

<script setup>
import { computed } from 'vue'
import ModulePage from '../ModulePage.vue'
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()

const cards = computed(() => [
  { value: userStore.userInfo?.name || '-', title: '当前角色', text: '角色决定侧边栏可见功能块。' },
  { value: userStore.userInfo?.username || '-', title: '登录账号', text: '录屏时可以切换账号对比菜单差异。' },
  { value: '权限码', title: '访问控制', text: '路由守卫会阻止越权访问页面。' },
])
</script>
