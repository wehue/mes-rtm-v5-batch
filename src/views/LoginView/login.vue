<template>
  <div class="login-page">
    <section class="login-panel">
      <div class="brand">
        <span class="brand-mark">RT</span>
        <div>
          <h1>MES-RTM</h1>
          <p>实时制造执行系统</p>
        </div>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <label>
          <span>登录角色</span>
          <select v-model="selectedRole" @change="applyRole">
            <option v-for="role in ROLES" :key="role.value" :value="role.value">
              {{ role.label }}：{{ role.username }} / {{ role.password }}
            </option>
          </select>
        </label>

        <label>
          <span>用户名</span>
          <input v-model="form.username" type="text" autocomplete="username" />
        </label>

        <label>
          <span>密码</span>
          <input v-model="form.password" type="password" autocomplete="current-password" />
        </label>

        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
        <button type="submit">登录系统</button>
      </form>
    </section>

    <aside class="role-card">
      <h2>本次录屏演示点</h2>
      <p>用户登录后，系统根据所属角色过滤侧边栏菜单和页面访问权限。</p>
      <div class="role-list">
        <span v-for="role in ROLES" :key="role.value">{{ role.label }}</span>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ROLES } from '../../utils/constants'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const userStore = useUserStore()
const selectedRole = ref('admin')
const errorMsg = ref('')
const form = reactive({
  username: 'admin',
  password: '123456',
})

function applyRole() {
  const role = ROLES.find((item) => item.value === selectedRole.value)
  form.username = role?.username || ''
  form.password = role?.password || ''
}

function handleLogin() {
  errorMsg.value = ''
  const result = userStore.login(form.username.trim(), form.password.trim())
  if (!result.ok) {
    errorMsg.value = result.message
    return
  }
  router.push(result.redirect)
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(360px, 460px) minmax(320px, 520px);
  align-items: center;
  justify-content: center;
  gap: 48px;
  padding: 48px;
  background:
    linear-gradient(90deg, rgba(30, 64, 96, 0.08) 1px, transparent 1px),
    linear-gradient(rgba(30, 64, 96, 0.08) 1px, transparent 1px),
    #eef3f8;
  background-size: 32px 32px;
  color: #17202c;
}

.login-panel,
.role-card {
  border: 1px solid #d8e0ea;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 18px 45px rgba(23, 32, 44, 0.12);
}

.login-panel {
  padding: 36px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 32px;
}

.brand-mark {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  background: #1f5f99;
  color: #fff;
  font-weight: 800;
}

.brand h1 {
  font-size: 26px;
  line-height: 1.1;
}

.brand p,
.role-card p {
  margin-top: 6px;
  color: #65758a;
}

.login-form {
  display: grid;
  gap: 18px;
}

.login-form label {
  display: grid;
  gap: 8px;
  color: #415066;
  font-size: 14px;
  font-weight: 700;
}

.login-form input,
.login-form select {
  height: 42px;
  padding: 0 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #fff;
  color: #17202c;
  font-size: 14px;
}

.login-form button {
  height: 44px;
  border: 0;
  border-radius: 6px;
  background: #1f5f99;
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
}

.error-msg {
  color: #c2410c;
  font-size: 13px;
}

.role-card {
  padding: 32px;
}

.role-card h2 {
  font-size: 24px;
}

.role-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.role-list span {
  padding: 8px 12px;
  border-radius: 6px;
  background: #eef5fb;
  color: #1f5f99;
  font-size: 13px;
  font-weight: 700;
}

@media (max-width: 860px) {
  .login-page {
    grid-template-columns: 1fr;
    padding: 24px;
  }
}
</style>
