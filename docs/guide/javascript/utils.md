---
outline: deep
---

# Utils

## debounce

```js{3-6,8}
/**
 * 防抖
 * @param {function} callback
 * @param {number} delay
 * @param {boolean} immediate
 * @returns {function}
 */
function debounce(callback, delay = 500, immediate = true) {
  let timer = null

  return (...args) => {
    timer && clearTimeout(timer)

    if (immediate) {
      !timer && callback.apply(this, args)

      timer = setTimeout(() => {
        timer = null
      }, delay)
    } else {
      timer = setTimeout(() => {
        callback.apply(this, args)
        timer = null
      }, delay)
    }
  }
}
```

## throttle

```js
/**
 * 节流
 * @param {function} callback
 * @param {number} delay
 * @returns {function}
 */
function throttle(callback, delay = 2000) {
  let flag = false
  let timer = null

  return (...args) => {
    if (flag) return

    flag = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(this, args)
      flag = false
    }, delay)
  }
}
```

## isNumber

```ts
/**
 * 判断是否是数字
 * @param {number} n
 * @returns {boolean}
 */
function isNumber(n: number): boolean {
  return !isNaN(Number.parseFloat(n)) && isFinite(n)
}
```

## isEmptyObj

```js
function isEmptyObj1(obj) {
  return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object
}
```

```js
const isEmptyObj2 = obj => Object.keys(obj).length
```

```js
const isEmptyObj3 = obj => JSON.stringify(obj) !== '{}'
```

## 禁止浏览器右键和选中文字

```js
function prohibit() {
  document.oncontextmenu = () => false // 禁止右键
  document.onselectstart = () => false // 禁止选中
}
```

## 一个完美的 toFixed()

> toFixed 函数可以满足一部分小数的四舍五入，但是因为浮点数不能精确地用二进制表示所有小数，所以 toFixed 四舍五入会在部分情况下出现异常。如：
>
> ```js
> ;(2.55).toFixed(1) // 返回2.5
> ```

```js
/**
 * 一个完美的 toFixed() 函数
 * @param {number} num 数字
 * @param {number} digits 位数
 * @returns {number}
 */
function toFixed(num, digits = 0) {
  let zeroStrNum = num.toString()

  // 处理科学计算情况
  if (zeroStrNum.includes('e')) {
    const m = zeroStrNum.match(/\d(?:\.(\d*))?e([+-]\d+)/)
    zeroStrNum = num.toFixed(Math.max(0, (m[1] || '').length - m[2]))
  }

  let isNegativeNum = false
  // 判断是否为负数
  if (zeroStrNum.startsWith('-')) {
    isNegativeNum = true
    zeroStrNum = zeroStrNum.slice(1)
  }
  // 获取小数点位置
  const dotIndex = zeroStrNum.indexOf('.')
  // 如果是整数/保留小数位数等于超过当前小数长度，则直接用toFixed返回
  if (dotIndex === -1 || zeroStrNum.length - (dotIndex + 1) <= digits)
    return num.toFixed(digits)

  // 找到需要进行四舍五入的部分
  let numArr = zeroStrNum.match(/\d/g) || []
  numArr = numArr.slice(0, dotIndex + digits + 1)

  // 核心处理逻辑
  if (Number.parseInt(numArr[numArr.length - 1], 10) > 4) {
    // 如果最后一位大于4，则往前遍历+1
    for (let i = numArr.length - 2; i >= 0; i--) {
      numArr[i] = String(Number.parseInt(numArr[i], 10) + 1)
      // 判断这位数字 +1 后会不会是 10
      if (numArr[i] === '10') {
        // 10的话处理一下变成 0，再次for循环，相当于给前面一个 +1
        numArr[i] = '0'
      } else {
        // 小于10的话，就打断循环，进位成功
        break
      }
    }
  }
  // 将小数点加入数据
  numArr.splice(dotIndex, 0, '.')

  // 处理多余位数
  numArr.pop()

  // 如果事负数，添加负号
  if (isNegativeNum) numArr.unshift('-')

  return Number(numArr.join('')).toFixed(digits)
}

toFixed(1.255, 2) // 1.26
```

## JavaScript 浮点数缺陷解决办法

### 数据展示

```js
const strip = (num, precision = 12) =>
  +Number.parseFloat(num.toPrecision(precision))
```

### 数据运算

```js
function sum(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length
  const num2Digits = (num2.toString().split('.')[1] || '').length
  const baseNum = 10 ** Math.max(num1Digits, num2Digits)
  return (num1 * baseNum + num2 * baseNum) / baseNum
}
```

### 综合解决办法

引入 npm 包 [number-precision](https://github.com/nefe/number-precision)

```sh
$ npm i numer-precision -S
```

**usage**

```js
NP.strip(num) // strip a number to nearest right number
NP.plus(num1, num2, num3, ...) // addition, num + num2 + num3, two numbers is required at least.
NP.minus(num1, num2, num3, ...) // subtraction, num1 - num2 - num3
NP.times(num1, num2, num3, ...) // multiplication, num1 * num2 * num3
NP.divide(num1, num2, num3, ...) // division, num1 / num2 / num3
NP.round(num, ratio) // round a number based on ratio
```

## MergeOptions

```ts
function mergeOptions(root: {}, opts: {}): void {
  const rootClone = { ...root }

  for (const k in root) {
    if (opts.hasOwnProperty(k))
      rootClone[k] = k === 'query' ? { ...rootClone[k], ...opts[k] } : opts[k]
  }

  return rootClone
}
```

## Judge Type

::: details 一些基础的类型判断

```ts
// 邮箱
export const isEmail = (s: string) =>
  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)

// 是否必填
export const isRequire = (s: string) => /^.+$/.test(s)
export const isRequire = (s: string) => /[^\s]/.test(s)

// 手机号码
export const isMobile = (s: string) => /^1[0-9]{10}$/.test(s)

// 电话号码
export const isPhone = (s: string) => /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)

// 是否URL地址
export const isURL = (s: string) => /^http[s]?:\/\/.*/.test(s)

// 是否字符串
export function isString(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}

// 是否数字
export function isNumber(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
}

// 是否boolean
export function isBoolean(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
}

// 是否函数
export function isFunction(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
}

// 是否为null
export function isNull(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
}

// 是否undefined
export function isUndefined(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
}

// 是否对象
export function isObj(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}

// 是否数组
export function isArray(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
}

// 是否时间
export function isDate(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
}

// 是否正则
export function isRegExp(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
}

// 是否错误对象
export function isError(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
}

// 是否Symbol函数
export function isSymbol(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
}

// 是否Promise对象
export function isPromise(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
}

// 是否Set对象
export function isSet(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
}

// 是否 Vue 对象
import Vue from 'vue'
export function isVue(o) {
  return o instanceof Vue
}

// 是否DOM对象
export const isDOMElement = o => o!(o && o.nodeType === 1)
```

:::

## Permission

具体用法见 [vue/directives](/guide/vue/directives#permission)

```js
import store from '@/store'

/**
 * check permission
 * @param {Array} value
 * @returns {Boolean}
 */
export default function checkPermission(value) {
  if (value && Array.isArray(value) && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value
    const hasPermission = roles.some(role => permissionRoles.includes(role))

    return hasPermission
  } else {
    console.error("need roles! Like v-permission=\"['admin','editor']\"")

    return false
  }
}
```

## objToUrl

```js
const obj = {
  name: "Chi's",
  age: 60,
  hobby: 'ride',
}
const params = new URLSearchParams(param).toString()
// name=Chi%27s&age=60&hobby=ride
```

```js
function objToUrl(obj) {
  const tempArr = []
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key]
      tempArr.push(`${key}=${value}`)
    }
  }
  return tempArr.join('&')
}

function objToUrl(obj) {
  let tempStr = ''
  Object.entries(obj).forEach(([key, value]) => (tempStr += `${key}=${value}&`))

  return tempStr.slice(0, tempStr.length - 1)
}
```

## urlToObj

```js
function urlToObj(str) {
  str = decodeURIComponent(str)
    .match(/([^?]+)$/)[0]
    .replace(/&/g, '","')
    .replace(/=/g, '":"')

  return JSON.parse(`{"${str}"}`)
}
```

## clearFields

清除表单提交

```js
function clearFields(queryForm) {
  return Object.keys(queryForm).forEach(field => (queryForm[field] = ''))
}

function _clearFields(queryForm) {
  return Object.assign(
    queryForm,
    Object.fromEntries(Object.keys(queryForm).map(k => [k, '']))
  )
}
```

## 数组对象去重

```js
function dedupe(arr, key) {
  if (typeof key !== 'string') return arr
  if (arr.constructor !== Array) return arr

  const hash = {}
  const sortArr = arr.reduce((pre, cur) => {
    hash[cur[key]] ? '' : (hash[cur[key]] = true && pre.push(cur))
    return pre
  }, [])
  return sortArr
}
```

## 对象过滤空值

```js
function filterNullValues(obj) {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (
        params[key] === undefined ||
        params[key] === null ||
        params[key] === ''
      )
        delete params[key]
    }
  }

  return obj
}
```

## uni-app 请求封装

```js
class Request {
  static request(url, data, method = 'POST', contentType, isLoading = true) {
    const params = {
      url: BASE_URL + url,
      data,
      method,
      header: {
        'content-type': contentType || 'application/json',
      },
      dataType: 'json',
      responseType: 'text',
      cors_mode: 'cors',
    }
    const TOKEN = uni.getStorageSync('wisdom-progress-weapp__token')
    TOKEN && (params.header.Authorization = TOKEN)

    isLoading &&
      uni.showLoading({
        title: '加载中...',
      })

    return new Promise((resolve, reject) => {
      uni.request({
        ...params,
        success: res => {
          if (res.statusCode && res.statusCode === 200) {
            resolve(res)
          } else {
            uni.hideLoading()
            uni.showToast({
              title: `请求错误: ${res.errMsg}`,
              icon: 'none',
            })
          }
        },
        fail(err) {
          uni.hideLoading()
          uni.showToast({
            title: `请求错误: ${err.errMsg}`,
            icon: 'none',
          })
          reject(err)
        },
        complete() {
          isLoading && uni.hideLoading()
        },
      })
    })
  }

  static get(url, data) {
    return this.request(url, data, 'GET')
  }

  static post(url, data) {
    return this.request(url, data, 'POST')
  }

  static delete(url, data) {
    return this.request(url, data, 'DELETE')
  }

  static put(url, data) {
    return this.request(url, data, 'PUT')
  }
}
```

## 版本号排序

```js
function versionNumberSort(arr) {
  return arr.sort((a, b) => {
    let i = 0
    const arr1 = a.split('.')
    const arr2 = b.split('.')

    while (true) {
      const s1 = arr1[i]
      const s2 = arr2[i]
      i++

      if (s1 === undefined || s2 === undefined) return arr2.length - arr1.length

      if (s1 === s2) continue

      return s2 - s1
    }
  })
}
```

## DOM Drag

```js
// 拖拽功能
function drag(el: HTMLElement) {
  el.onmousedown = ev => {
    const e = ev || window.event
    const eX = e.clientX
    const eY = e.clientY
    const disX = eX - el.offsetLeft
    const disY = eY - el.offsetTop

    document.onmousemove = ev => {
      const e = ev || window.event
      const windowWidth = document.documentElement.clientWidth
      const windowHeight = document.documentElement.clientHeight
      let l = e.clientX - disX
      let t = e.clientY - disY

      l = range(l, 0, windowWidth - el.offsetWidth)
      t = range(t, 0, windowHeight - el.offsetHeight)
      el.style.left = `${l}px`
      el.style.top = `${t}px`
    }
  }

  document.onmouseup = _ => {
    document.onmousemove = null
  }
}

// 判断边界问题
const range = (loc, min, max) => (loc > max ? max : loc < min ? min : loc)
```

## dateTime

```js
/* eslint-disable */

/**
 * Date对象的补充函数，包括类似Python中的strftime()
 * 阿债 https://gitee.com/azhai/datetime.js
 */

Date.prototype.toMidnight = function () {
  this.setHours(0)
  this.setMinutes(0)
  this.setSeconds(0)
  this.setMilliseconds(0)
  return this
}

Date.prototype.daysAgo = function (days, midnight) {
  days = days ? days - 0 : 0
  const date = new Date(this.getTime() - days * 8.64e7)
  return midnight ? date.toMidnight() : date
}

Date.prototype.monthBegin = function (offset) {
  offset = offset ? offset - 0 : 0
  const days = this.getDate() - 1 - offset
  return this.daysAgo(days, true)
}

Date.prototype.quarterBegin = function () {
  const month = this.getMonth() - (this.getMonth() % 3)
  return new Date(this.getFullYear(), month, 1).toMidnight()
}

Date.prototype.yearBegin = function () {
  return new Date(this.getFullYear(), 0, 1).toMidnight()
}

Date.prototype.strftime = function (format, local) {
  if (!format) {
    const str = new Date(this.getTime() + 2.88e7).toISOString()
    return str.substr(0, 16).replace('T', ' ')
  }
  local = local && local.startsWith('zh') ? 'zh' : 'en'
  const padZero = function (str, len) {
    const pads = len - str.toString().length
    return (pads && pads > 0 ? '0'.repeat(pads) : '') + str
  }
  format = format.replace('%F', '%Y-%m-%d')
  format = format.replace(/%D|%x/, '%m/%d/%y')
  format = format.replace(/%T|%X/, '%H:%M:%S')
  format = format.replace('%R', '%H:%M')
  format = format.replace('%r', '%H:%M:%S %p')
  format = format.replace('%c', '%a %b %e %H:%M:%S %Y')
  const _this = this
  return format.replace(/%[A-Za-z%]/g, function (f) {
    let ans = f
    switch (f) {
      case '%%':
        ans = '%'
        break

      case '%Y':
      case '%G':
        ans = _this.getFullYear()
        break

      case '%y':
        ans = _this.getFullYear() % 100
        break

      case '%C':
        ans = _this.getFullYear() / 100
        break

      case '%m':
      case '%n':
        ans = _this.getMonth() + 1
        break

      case '%B':
        local = local.startsWith('en') ? 'english' : local

      case '%b':
        const m = _this.getMonth()
        ans = local_labels.monthes[local][m]
        break

      case '%d':
      case '%e':
        ans = _this.getDate()
        break

      case '%j':
        ans = _this.getDaysOfYear()
        break

      case '%U':
      case '%W':
        const ws = _this.getWeeksOfYear(f === '%W')
        ans = padZero(ws, 2)
        break

      case '%w':
        ans = _this.getDay()

      case '%u':
        ans = ans === 0 ? 7 : ans
        break

      case '%A':
        local = local.startsWith('en') ? 'english' : local

      case '%a':
        const d = _this.getDay()
        ans = local_labels.weekdays[local][d]
        break

      case '%H':
      case '%k':
        ans = _this.getHours()
        break

      case '%I':
      case '%l':
        ans = _this.getHours()
        ans = ans % 12
        break

      case '%M':
        ans = _this.getMinutes()
        break

      case '%S':
        ans = _this.getSeconds()
        break

      case '%s':
        ans = parseInt(_this.getTime() / 1e3)
        break

      case '%f':
        const ms = _this.getMilliseconds()
        ans = padZero(ms * 1e3, 6)
        break

      case '%P':
        local = local.startsWith('en') ? 'english' : local

      case '%p':
        const h = _this.getHours()
        ans = local_labels.meridians[local][h < 12 ? 0 : 1]
        break

      case '%z':
        let tzo = _this.getTimezoneOffset()
        const sign = tzo < 0 ? '-' : '+'
        tzo = Math.abs(tzo)
        const ho = padZero(tzo / 60, 2)
        const mo = padZero(tzo % 60, 2)
        ans = sign + ho + mo
        break

      default:
        break
    }
    if (
      f === '%C' ||
      f === '%y' ||
      f === '%m' ||
      f === '%d' ||
      f === '%H' ||
      f === '%M' ||
      f === '%S'
    ) {
      ans = padZero(ans, 2)
    }
    return ans.toString()
  })
}

Date.prototype.humanize = function (local) {
  local = local && local.startsWith('zh') ? 'zh' : 'en'
  const result = this.strftime('', local)
  const days = (Date.today() - this.toMidnight().getTime()) / 8.64e7
  if (days <= -10 || days >= 10) {
    return result
  }
  const labels = local_labels.dayagos[local]
  let lbl = ''
  if (days === 0 || days === 1) {
    lbl = labels[days]
  } else if (days === -1) {
    lbl = labels[2]
  } else if (days >= 2) {
    lbl = days + labels[3]
  } else {
    lbl = days + labels[4]
  }
  return lbl + result.substr(10, 6)
}

const local_labels = {
  monthes: {
    english: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    en: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    zh: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
  },
  weekdays: {
    english: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    zh: ['日', '一', '二', '三', '四', '五', '六'],
  },
  meridians: {
    english: ['a.m.', 'p.m.'],
    en: ['AM', 'PM'],
    zh: ['上午', '下午'],
  },
  dayagos: {
    english: ['Today', 'Yesterday', 'Tomorrow', ' days ago', ' days late'],
    en: ['Today', 'Yesterday', 'Tomorrow', ' days ago', ' days late'],
    zh: ['今天', '昨天', '明天', '天前', '天后'],
  },
}

export default Date
```

## deepClone

```js
/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object')
    throw new Error('error arguments', 'deepClone')

  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object')
      targetObj[keys] = deepClone(source[keys])
    else targetObj[keys] = source[keys]
  })
  return targetObj
}
```

```js
// 深拷贝对象
export function deepClone(obj) {
  const _toString = Object.prototype.toString

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  // DOM Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true)
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime())
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    const flags = []
    if (obj.global) flags.push('g')
    if (obj.multiline) flags.push('m')
    if (obj.ignoreCase) flags.push('i')

    return new RegExp(obj.source, flags.join(''))
  }

  const result = Array.isArray(obj)
    ? []
    : obj.constructor
    ? new obj.constructor()
    : {}

  for (const key in obj) {
    result[key] = deepClone(obj[key])
  }

  return result
}
```

## uniqueArr

```js
/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}
```

## uniapp storage deadtime

```js
const DEADTIME_TEXT = '_DEADTIME'

/**
 * @desc 设置缓存
 * @param {string} key 缓存名
 * @param {any} value 缓存值
 * @param {number} deadtime s(秒)
 */
export function setStorage(key, value, deadtime = 0) {
  uni.setStorageSync(key, value)
  const _deadtime = Number.parseInt(deadtime)

  if (_deadtime) {
    const timestamp = `${Date.now() / 1000 + _deadtime}`
    uni.setStorageSync(key + DEADTIME_TEXT, timestamp)
  } else {
    uni.removeStorageSync(key + DEADTIME_TEXT)
  }
}

/**
 * @desc 获取缓存
 * @param {string} key 缓存名
 * @param {any || Error} def 读取缓存失败或该缓存已过期的默认值
 * @returns
 */
export function getStorage(key, def = false) {
  const _deadtime = Number.parseInt(uni.getStorageSync(key + DEADTIME_TEXT))

  if (_deadtime && _deadtime < Date.now() / 1000) return def

  return uni.getStorageSync(key) || def
}

/**
 * 清除指定名称的缓存
 * @param {string} key 缓存名
 */
export function removeStorage(key) {
  uni.removeStorageSync(key)
  uni.removeStorageSync(key + DEADTIME_TEXT)
}

/**
 * 清除所有缓存
 */
export function clear() {
  uni.clearStorageSync()
}
```

## async forEach

支持异步的 `forEach`

```js
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++)
    await callback(array[index], index, array)
}
```

## measureText

测量文本显示宽度

### Canvas

```js
function measureText(text, element) {
  if (!text) {
    console.error('[Function measureText]: Need measure text!')
    return
  }
  if (!element || element.nodeType !== 1) {
    console.error('[Function measureText]: Need DOM Element!')
    return
  }

  const canvas = document.createElement('canvas').getContext('2d')
  canvas.font = (window && window.getComputedStyle(element).font) || ''
  return canvas.measureText(res).width
}
```

### [getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle)

```js
window.getComputedStyle(document.querySelector('.pcrtcr_one_left_title'))
/*
CSSStyleDeclaration({
  "0": "accent-color",
  "1": "align-content",
  "2": "align-items",
  "3": "align-self",
  "4": "alignment-baseline",
  "5": "animation-composition",
  ...
  "n": "width",
  "x": "inlineSize",
})
*/
```

### [getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

```js
document.querySelector('.pcrtcr_one_left_title').getBoundingClientRect()
/*
DOMRect({
  "x": 406,
  "y": 150,
  "width": 663.734375,
  `"height": 32,`
  "top": 150,
  "right": 1069.734375,
  "bottom": 182,
  "left": 406
})
*/
```

## Arrify

_Convert a value to an array_

```js
export default function arrify(value) {
  if (value === null || value === undefined) {
    return []
  }

  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === 'string') {
    return [value]
  }

  if (
    typeof value[Symbol.iterator] === 'function' &&
    typeof value.next === 'function'
  ) {
    return [...value]
  }

  return [value]
}
```

## 随机字符串

1. ```js
   const randomStr = (n = 4) =>
     Math.random()
       .toString(36)
       .slice(2, 2 + n)
   ```

2. ```js
   const CHARSTR =
     'abcdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ!@#$%?0123456789' // 65

   /**
    * @desc 获取指定长度的随机字符串
    * @param {number} len
    * @returns {string} 「randomStr」
    */
   export default function getRandomStr(len = 15) {
     let randomStr = ''
     for (let i = 0; i < len; i++) {
       randomStr += CHARSTR[Math.floor(Math.random() * (i < 4 ? 39 : 65))]
       /* Or */
       // randomStr += CHARSTR.charAt(Math.floor(Math.random() * (i < 4 ? 39 : 65)))
     }
     return randomStr
   }
   ```
