---
outline: [2, 3]
---

# Components

## Premise

```vue
<script>
export default {
  inheritAttrs: false,
}
</script>

<template>
  <el-dialog v-bind="$attrs" v-on="$listeners"></el-dialog>
</template>
```

- **v-bind="$attrs"**

  `$attrs` 包含 除 prop 传递的属性、class 和 style 的父组件属性，v-bind 绑定这些属性。可简单记为 `属性穿透` ；
  以上文“父组件中引用方式”为例，属性 visible 和 title 最终都会绑定到 el-dialog 中，而我们并没有在 child.vue 中声明 visible 和 title。

- **v-on="$listeners"**

  `$listeners` 包含了 (除.native 修饰器的) 父组件事件，v-on 监听这些事件。可简单记为 `事件穿透`。

- **inheritAttrs: false**

  `v-bind="$attrs"` 传递属性后，浏览器查看 html 代码能看见 visible，title 等属性；设置 `inheritAttrs: false` 可以隐藏此类属性。

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
  provide() {
    return {
      form: this,
    }
  },
  data() {
    return {
      fields: [],
    }
  },
  created() {
    this.$on('on-form-item-add', field => {
      if (field) this.fields.push(field)
    })

    this.$on('on-form-item-remove', field => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1)
    })
  },
  methods: {
    // 重置表单
    resetFields() {
      this.fields.forEach(field => field.resetField())
    },
    validate(callback) {
      return new Promise(resolve => {
        let valid = true,
          count = 0

        this.fields.forEach(field => {
          field.validate('', errors => {
            errors && (valid = false)
            if (++count === this.fields.length) {
              resolve(valid)

              typeof callback === 'function' && callback(valid)
            }
          })
        })
      })
    },
  },
}
</script>
```

### FormItem.vue

```vue
<template>
  <div>
    <label v-if="label" :class="{ 'i-form-item-label-required': required }">
      {{ label }}
    </label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="i-form-item-message">
        {{ validateMessage }}
      </div>
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

### Input.vue

```vue
<template>
  <input
    type="text"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import Emitter from '@/mixins/emitter.js'

export default {
  name: 'iInput',
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentValue: this.value,
    }
  },
  methods: {
    handleInput(event) {
      const value = event.target.value

      this.currentValue = value
      this.$emit('input', value)
      this.dispatch('iFormItem', 'on-form-change', value)
    },
    handleBlur() {
      this.dispatch('iFormItem', 'on-form-blur', this.currentValue)
    },
  },
}
</script>
```

### Emitter.js

```js
function broadcast(componentName, eventName, params) {
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
    dispatch(componentName, eventName, params) {
      let parent = this.$options || this.$root,
        name = parent.$options.name

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        parent && (name = parent.$options.name)
      }

      parent && parent.$emit.apply(parent, [eventName].concat(params))
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    },
  },
}
```

## Element Plus 目录结构

```txt
internal/build
├── build.config.ts         # unbuild 配置文件
├── dist                    # 构建产物
├── gulpfile.ts             # 构建脚本
├── package.json
├── src
│   ├── build-info.ts       # 构建信息
│   ├── constants.ts        # 一些常量
│   ├── index.ts            # 入口文件
│   ├── plugins             # 插件
│   │   └── element-plus-alias.ts  # 导入别名
│   ├── tasks
│   │   ├── full-bundle.ts  # 构建完整产物
│   │   ├── helper.ts       # 生成 WebStorm 提示文件
│   │   ├── index.ts
│   │   ├── modules.ts      # 构建 bundleless 产物
│   │   └── types-definitions.ts # 生成 d.ts 文件
│   ├── type-safe.json      # 「类型安全」列表
│   └── utils               # 工具函数
│       ├── gulp.ts
│       ├── index.ts
│       ├── log.ts
│       ├── paths.ts
│       ├── pkg.ts
│       ├── process.ts
│       └── rollup.ts
├── tsconfig.json
└── vue-jest-transformer.js
```

## Virtual List

虚拟列表

### Github

- [vue-virtual-scroll-list](https://github.com/tangbc/vue-virtual-scroll-list)

### Usage

- [USAGE](https://github.com/tangbc/vue-virtual-scroll-list#readme)

## SvgIcon

### 文件目录

```txt
|-- src
|--|-- components
|----|-- SvgIcon
|------|-- icons
|--------|-- up.svg
|--------|-- down.svg
|------|-- index.vue
|------|-- index.js
```

::: warning Notice

注意：`svg` 命名不要不要有中文和其他特殊字符!!!

找到外层有 `fill` 属性的 `g` 标签或者 `path` 标签将 `fill` 属性设置为 `currentColor` ，一般 `svg` 文件都会有多个嵌套的 `g` 标签或者 `path` 标签并且比较靠外层的会有个 `fill` 属性为这个 `svg` 文件的填充色值，如果没有的话就自己找到外层的添加上 `fill="currentColor"`。

:::

::: details Example

```html
<svg>
  <path d="M507.1......" p-id="2033" fill="currentColor"></path>
</svg>
```

**or**

```html
<svg>
  <desc>Created with Sketch</desc>
  <g id="ola" stroke="none" fill="currentColor">
    <g>
      <path d="M6,0 L78...."></path>
    </g>
  </g>
</svg>
```

:::

### SvgIcon 组件

```vue
<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconName: () => `#icon-${this.iconClass}`,
    svgClass: () => `svg-icon ${this.className || ''}`,
  },
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

### index.js

```js
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg component

// register globally
Vue.component('SvgIcon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./icons', false, /\.svg$/)

requireAll(req)
```

### webpack 配置

```sh
npm i svg-sprite-loader
```

**在 vue.config.js 中增加配置**

```js
const path = require('path')
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(path.resolve('src/components/SvgIcon'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve('src/components/SvgIcon'))
      .end()
      .use('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  },
}
```

### 在 main.js 中引入配置好的组件

```js
import '@/components/SvgIcon'
```

### usage

```vue
<template>
  <div>
    <SvgIcon class="my-icon" icon-class="up" />
  </div>
</template>

<style>
.my-class {
  font-size: 20px;
  color: #f00;
}
</style>
```

> icon-class 属性值必须为对应 svg 文件的文件名。
>
> class 属性为自定义，如需设置图标大小或颜色，则可如上示例自定义 class 通过 font-size 属性修改大小，color 属性修改图标颜色。

## Dialog

基于 [Element UI](https://element.eleme.cn/#/zh-CN/component/dialog) 的二次封装

```vue
<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisiable"
      :append-to-body="appendToBody"
      :modal-append-to-body="modalAppendToBody"
      :title="title"
      :width="width"
      :custom-class="customClass"
      :fullscreen="fullscreen"
      :top="top"
      :lock-scroll="lockScroll"
      :modal="modal"
      :center="center"
      :destroy-on-close="destoryOnClose"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :show-close="showClose"
      :before-close="beforeClose"
    >
      <slot name="title" />
      <slot />
      <span slot="footer">
        <slot name="footer" />
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    title: {
      type: String,
      default: '提示',
    },
    width: {
      type: String,
      default: '30%',
    },
    customClass: {
      type: String,
      default: 'wisdom-dialog--borderRadius',
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    modalAppendToBody: {
      type: Boolean,
      default: true,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    top: {
      type: String,
      default: '15vh',
    },
    modal: {
      type: Boolean,
      default: true,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    center: {
      type: Boolean,
      default: false,
    },
    destoryOnClose: {
      type: Boolean,
      default: false,
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    beforeClose: {
      type: Function,
      default: done => done(),
    },
  },
  data() {
    return {
      dialogVisiable: false,
    }
  },
  methods: {
    open() {
      this.dialogVisiable = true
    },
    close() {
      this.dialogVisiable = false
    },
  },
}
</script>

<style>
.custom-dialog--borderRadius {
  border-radius: 5px !important;
}
</style>
```

## Table

```vue
<template>
  <div>
    <el-table
      v-loading="loading"
      :element-loading-text="loadingText"
      :data="data"
      ref="table"
      :stripe="stripe"
      :border="border"
      :max-height="maxHeight"
      :highlight-current-row="highlightCurrentRow"
      @selection-change="selectionChange"
    >
      <template v-for="col in columns">
        <el-table-column
          v-if="col.slot"
          :key="col.prop + ' ' + col.name"
          :type="col.type || ''"
          :prop="col.prop"
          :label="col.name"
          :width="col.width"
          :fiexd="col.fixed || false"
          :align="col.align || 'center'"
          :sortable="col.sortable"
        >
          <template #default="{ row, column, $index }">
            <slot
              :row="row"
              :column="column"
              :[$index]="$index"
              :name="col.slot"
            ></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="col.prop + ' ' + col.name"
          :type="col.type || ''"
          :prop="col.prop"
          :label="col.name"
          :width="col.width"
          :fiexd="col.fixed || false"
          :align="col.align || 'center'"
          :sortable="col.sortable"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'SelfTable',
  props: {
    data: {
      type: Array,
      required: true,
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
      default: '拼命加载中',
    },
    maxHeight: {
      type: Number || String,
    },
    highlightCurrentRow: {
      type: Boolean,
      default: true,
    },
    selectionChange: {
      type: Function,
      default: () => {},
    },
    sortable: {
      type: Boolean || String,
      default: false,
    },
  },
  methods: {
    toggleAllSelection() {
      this.$refs.table.toggleAllSelection()
    },
    clearSelection() {
      this.$refs.table.clearSelection()
    },
  },
}
</script>
```

## [Crud](https://github.com/Carina957/vue-crud/tree/main/Crud)

[`README`](https://github.com/Carina957/vue-crud#readme.md)

## ElAutoTooltip

- desc: 文本超出显示省略号，并且显示 `tooltip`
- feat: 支持自定义多行显示省略
- usage:
  - `<el-auto-tooltip>显示文本</el-auto-tooltip>`
  - `<el-auto-tooltip text="显示文本"></el-auto-tooltip>`
  - `<el-auto-tooltip content="显示文本">显示文本</el-auto-tooltip>`
  - `<el-auto-tooltip :lineNumber="3">显示文本</el-auto-tooltip>`

多行文本文字超过行数限制后显示省略号

[`caniuse`](https://caniuse.com/?search=-webkit-line-clamp): 兼容性(不支持 IE)

```vue
<script lang="ts" setup>
import { computed, ref } from 'vue'

interface IProps {
  // 显示内容
  text?: string
  // 显示位置
  placement?: string
  // tip 内容
  content?: string
  // 要显示的行数
  lineNumber: number
}

const prop = withDefaults(defineProps<IProps>(), {
  placement: 'top',
  lineNumber: 1,
})

let showTooltip = ref(true)

const onMouseEnter = ({ target }) =>
  (showTooltip.value = !(
    dom.offsetWidth < dom.scrollWidth || dom.offsetHeight < dom.scrollHeight
  ))
</script>

<template>
  <el-tooltip
    v-bind="$attrs"
    :disabled="showTooltip"
    :placement="placement"
    class="elli-tip-box"
  >
    <template #content>
      <span v-if="content || text">{{ content || text }}</span>
      <span v-else><slot></slot></span>
    </template>

    <div
      :class="[
        { lineNumber > 1 ? 'text-ellipsis-multiple' : 'text-ellipsis' }
      ]"
      @mouseenter.stop="onMouseEnter"
    >
      <slot>{{ text }}</slot>
    </div>
  </el-tooltip>
</template>

<style scoped>
.text-ellipsis-multiple {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -moz-box;
  display: -webkit-box;
  display: -ms-flexbox;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -webkit-line-clamp: v-bind('prop.lineNumber');
}

.text-ellipsis {
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
```
