<script setup lang="ts">
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
</script>

<template>
  <div class="demo">
    <span class="demo-copy">copy</span>

    <p
      v-if="title"
      :style="{
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
      }"
    >
      {{ title }}
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
      <p v-for="c in content">{{ c }}</p>
    </div>
  </div>
</template>
