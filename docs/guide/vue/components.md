---
outline: deep
---

# 组件

## Form

具有数据校验功能的表单组件 —— Form

### Form.vue

```vue
<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'iForm',
  props: {
    model: Object,
  }
}
</script>
```
