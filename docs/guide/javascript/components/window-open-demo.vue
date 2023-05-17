<script lang="ts" setup>
const open = () => {
  window.open(
    'https://www.google.com',
    'MY_GOOGLE',
    'top=150,left=150,width=300,height=150,scrollbars=no,menubar=no,status=no'
  )
}
</script>

<template>
  <button @click="open">Window.open()</button>
</template>
