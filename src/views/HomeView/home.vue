<template>
  <div class="home-container">
    <header class="home-header">
      <h1>首页</h1>
      <div class="user-info">
        <span>欢迎, {{ username }}</span>
        <button @click="handleLogout" class="logout-btn">退出登录</button>
      </div>
    </header>
    <main class="home-main">
      <p>这是首页内容，登录成功后跳转到这里。</p>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref(localStorage.getItem('username') || '用户')

function handleLogout() {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('username')
  router.push('/login')
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: #f5f7fa;
}
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.home-header h1 {
  font-size: 20px;
  color: #333;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.user-info span {
  color: #555;
  font-size: 14px;
}
.logout-btn {
  padding: 6px 16px;
  background: #667eea;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
.logout-btn:hover {
  opacity: 0.9;
}
.home-main {
  padding: 24px;
}
</style>