<template>
  <div class="not-found">
    <h1>页面不存在</h1>
    <router-link to="/dashboard">返回首页</router-link>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 16px;
  background: #f2f5f8;
  color: #17202c;
  text-align: center;
}

.not-found a {
  color: #1f5f99;
  font-weight: 800;
}
</style>
