<script setup lang="ts">
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'

interface PoemsProps {
  title?: string
  author?: string
  content?: string[]
}

const { title, author, content } = withDefaults(defineProps<PoemsProps>(), {
  title: '',
  author: '',
  content: () => [],
})
const source = ref(`${title} ${author} ${content.join('')}`)
const { copy } = useClipboard({ source })
</script>

<template>
  <div class="demo">
    <span class="demo-copy" @click="copy(source)">copy</span>

    <p
      v-if="title"
      :style="{
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
      }"
    >
      《{{ title }}》
    </p>

    <p
      v-if="author"
      :style="{
        fontSize: '14px',
        textAlign: 'center',
      }"
    >
      {{ author }}
    </p>

    <div
      v-if="content.length"
      :style="{
        textAlign: 'center',
      }"
    >
      <p v-for="c in content">
        {{ c }}
      </p>
    </div>
  </div>
</template>
