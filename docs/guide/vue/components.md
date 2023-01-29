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
    rules: Object,
  },
  provide () {
    return {
      form: this,
    }
  },
  data () {
    return {
      fields: [],
    }
  },
  created () {
    this.$on.('on-form-item-add', field => {
      if (field) this.fields.push(field)
    })

    this.$on.('on-form-item-remove', field => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1)
    })
  },
  methods: {
    // 重置表单
    resetFields () {
      this.fields.forEach(field => field.resetField())
    },
    validate (callback) {
      return new Promise(resolve => {
        let valid = true, count = 0

        this.fields.forEach(field => {
          field.validate('', errors => {
            errors && (valid = false)
            if (++count === this.fields.length) {
              resolve(valid)
              if (typeof callback === 'function') callback(valid)
            }
          })
        })
      })
    }
  },
}
</script>
```

### FormItem.vue

```vue
<template>
  <div>
    <label
      v-if="label"
      :class="{ 'i-form-item-label-required': required }"
    >{{ label }}</label>
    <div>
      <slot></slot>
      <div
        v-if="validateState === 'error'"
        class="i-form-item-message"
      >{{ validateMessage }}</div>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator'
import Emitter from '@/mixins/emitter.js'

export default {
  name: 'iFormItem',
  mixins: [ Emitter ],
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: String,
  },
  data () {
    return {
      isRequired: false, // 是否为必填
      validateState: '', // 校验状态
      validateMessage: '', // 校验不通过时的提示
    }
  },
  computed: {
    fieldValue () {
      return this.form.model[this.prop]
    },
  },
  // 组件渲染时，将实例缓存在 Form 中
  mounted () {
    // 如果没有传入 prop，则无需校验，也就无需缓存
    this.prop && this.dispatch('iForm', 'on-form-item-add')

    // 设置初始值，以便在重置时恢复默认值
    this.initialValue = this.fieldValue

    this.setRules()
  },
  // 组件销毁前，将实例从 Form 的缓存中删除
  beforeDestory () {
    this.dispatch('iForm', 'on-form-item-add', this)
  },
  methods: {
    setRules () {
      let rules = this.getRules()

      // 如果当前校验规则中有必填项，则标记
      rules.length && rules.every(rule => (this.isRequired = rule.required))

      this.$on.('on-form-blur', this.onFieldBlur)
      this.$on.('on-form-change', this.onFieldChange)
    },
    // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
    getRules () {
      let formRules = this.form.rules

      formRules = formRules ? formRules[this.prop] : []

      return [].concat(formRules || [])
    },
    // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
    getFilteredRule (trigger) {
      const rules = this.getRules()

      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },
    /**
     * 校验表单数据
     * @param {string} 校验类型
     * @param {function} 回调函数
     */
    validate (trigger, callback = function () {}) {
      let rules = this.getFilterdRule(trigger)

      if (!rules || rules.length === 0) return false

      // 设置状态为校验中
      this.validateState = 'validating'

      let descriptor = {}
      descriptor[this.prop] = rules

      const validator = new AsyncValidator(descriptor)
      let model = {}

      model[this.prop] = this.fieldValue

      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''

        callback(this.validateMessage)
      })
    },
    // 重置表单数据以及校验
    resetField () {
      this.validateState = ''
      this.validateMessage = ''

      this.form.model[this.prop] = this.initialValue
    },
    onFieldBlur () {
      this.validate('blur')
    },
    onFieldChange () {
      this.validate('change')
    },
  },
}
</script>

<style>
.i-form-item-label-required:before {
  content: '*';
  color: red;
}
.i-form-item-message {
  color: red;
}
</style>
```

### Emitter.js

```js
function broadcast (componentName, eventName, params) {
  this.$children.forEach(child => {
    // 获取子级的组件名
    const name = child.$options.name

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

export default {
  methods: {
    dispatch (componentName, eventName, params) {
      let parent = this.$options || this.$root,
        name = parent.$options.name

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        parent && (name = parent.$options.name)
      }

      parent && parent.$emit.apply(parent, [eventName].concat(params))
    },
    broadcast (componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  }
}
```
