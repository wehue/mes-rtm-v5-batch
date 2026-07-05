<template>
  <router-view />
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --rtm-bg: #eef1f4;
  --rtm-panel: #ffffff;
  --rtm-line: #d8dee6;
  --rtm-text: #17202c;
  --rtm-text-soft: #5f6b7a;
  --rtm-primary-dark: #17466f;
  --rtm-success: #198754;
  --rtm-steel-dark: #17202c;
  --rtm-radius: 6px;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans SC', 'Microsoft YaHei', sans-serif;
}

body {
  background: var(--rtm-bg);
  color: var(--rtm-text);
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
