<script setup>
import { reactive } from 'vue'

const iterateObject = reactive({
  normal: '普通',
  hard: '困难',
  hell: '地狱',
})
</script>

<template>
  <p v-for="(m_val, m_key, m_index) in iterateObject" :key="m_key">
    {{ m_index + 1 }}. {{ m_key }} - {{ m_val }}
  </p>
</template>
