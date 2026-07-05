<template>
  <article class="module-page">
    <div class="hero">
      <p>{{ module }}</p>
      <h1>{{ title }}</h1>
      <span>{{ description }}</span>
    </div>

    <div class="grid">
      <section v-for="item in cards" :key="item.title" class="card">
        <strong>{{ item.value }}</strong>
        <h2>{{ item.title }}</h2>
        <p>{{ item.text }}</p>
      </section>
    </div>
  </article>
</template>

<script setup>
defineProps({
  module: {
    type: String,
    default: 'MES-RTM',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cards: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.module-page {
  display: grid;
  gap: 18px;
}

.hero {
  min-height: 150px;
  padding: 26px;
  border: 1px solid #d8e0ea;
  border-radius: 8px;
  background: #fff;
}

.hero p {
  color: #1f5f99;
  font-size: 13px;
  font-weight: 800;
}

.hero h1 {
  margin-top: 10px;
  font-size: 28px;
}

.hero span {
  display: block;
  max-width: 720px;
  margin-top: 12px;
  color: #65758a;
  line-height: 1.7;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.card {
  min-height: 132px;
  padding: 20px;
  border: 1px solid #d8e0ea;
  border-radius: 8px;
  background: #fff;
}

.card strong {
  color: #1f5f99;
  font-size: 24px;
}

.card h2 {
  margin-top: 10px;
  font-size: 17px;
}

.card p {
  margin-top: 8px;
  color: #65758a;
  line-height: 1.6;
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
