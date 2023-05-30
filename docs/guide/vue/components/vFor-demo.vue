<script setup>
import { reactive } from 'vue'

const iterateObject = reactive({
  normal: '普通',
  hard: '困难',
  hell: '地狱',
})
</script>

<template>
  <p v-for="(value, key, index) in iterateObject" :key="key">
    {{ index + 1 }}. {{ key }} - {{ value }}
  </p>
</template>
