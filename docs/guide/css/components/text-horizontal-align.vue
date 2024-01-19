<template>
  <div class="text-horizontal-align-wrppper">
    <span>姓名</span>
    <br />
    <span>家庭住址</span>
  </div>
</template>

<style scoped>
.text-horizontal-align-wrppper span {
  display: inline-block;
  width: 5em;
  text-align: justify;
  overflow: hidden;
  height: 1.2em;
}

.text-horizontal-align-wrppper span::after {
  content: '';
  display: inline-block;
  width: 100%;
}
</style>
