---
outline: deep
---

# 基础

## Provide / Inject

`provide` 和 `inject` 的绑定并不是响应式的，这是刻意为之的，然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。

### 替代 Vuex

只需要把整个 `app.vue` 实例通过 `provide` 对外提供。

```vue
<template>
  <router-view />
</template>

<script>
import request from '@/utils/request'

export default {
  provide () {
    return {
      app: this,
    }
  },
  data () {
    return {
      userInfo: null,
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const { userInfo } = await request('/user/info')

      this.userInfo = userInfo
    },
  },
}
</script>
```

```vue
<template>
  <div>
    <span @click="updateUserInfo">{{ app.userInfo }}</span>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  inject: ['app'],
  methods: {
    async updateUserInfo () {
      const { code } = await request('user/update')

      (code === 1) && this.app.getUserInfo()
    }
  }
}
</script>
```
