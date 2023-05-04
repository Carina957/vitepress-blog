---
outline: deep
---

# Utils

## debounce

```js
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
  let flag = false,
    timer = null

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
  return !isNaN(parseFloat(n)) && isFinite(n)
}
```

## isEmptyObj

```js
const isEmptyObj1 = obj =>
  Reflect.ownKeys(obj).length === 0 && obj.constructor === Object
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
  if (dotIndex === -1 || zeroStrNum.length - (dotIndex + 1) <= digits) {
    return num.toFixed(digits)
  }

  // 找到需要进行四舍五入的部分
  let numArr = zeroStrNum.match(/\d/g) || []
  numArr = numArr.slice(0, dotIndex + digits + 1)

  // 核心处理逻辑
  if (parseInt(numArr[numArr.length - 1], 10) > 4) {
    // 如果最后一位大于4，则往前遍历+1
    for (let i = numArr.length - 2; i >= 0; i--) {
      numArr[i] = String(parseInt(numArr[i], 10) + 1)
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
  if (isNegativeNum) {
    numArr.unshift('-')
  }

  return Number(numArr.join('')).toFixed(digits)
}

toFixed(1.255, 2) // 1.26
```

## JavaScript 浮点数缺陷解决办法

### 数据展示

```js
function strip(num, precision = 12) {
  return +parseFloat(num.toPrecision(precision))
}
```

### 数据运算

```js
/**
 * 精确加法
 */
function add(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length
  const num2Digits = (num2.toString().split('.')[1] || '').length
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits))
  return (num1 * baseNum + num2 * baseNum) / baseNum
}
```

### 综合解决办法

引入 npm 包 [number-precision](https://github.com/nefe/number-precision)

```sh
$ npm i numer-precision -S
```

#### Methods

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
    if (opts.hasOwnProperty(k)) {
      rootClone[k] = k === 'query' ? { ...rootClone[k], ...opts[k] } : opts[k]
    }
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

// 手机号码
export const isMobile = (s: string) => /^1[0-9]{10}$/.test(s)

// 电话号码
export const isPhone = (s: string) => /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)

// 是否URL地址
export const isURL = (s: string) => /^http[s]?:\/\/.*/.test(s)

// 是否字符串
export const isString = (o: any) =>
  Object.prototype.toString.call(o).slice(8, -1) === 'String'

// 是否数字
export const isNumber = (o: any) =>
  Object.prototype.toString.call(o).slice(8, -1) === 'Number'

// 是否boolean
export const isBoolean = (o: any) =>
  Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'

// 是否函数
export const isFunction = (o: any) =>
  Object.prototype.toString.call(o).slice(8, -1) === 'Function'

// 是否为null
export const isNull = (o: any) =>
  Object.prototype.toString.call(o).slice(8, -1) === 'Null'

// 是否undefined
export const isUndefined = (o: any) =>
  Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'

// 是否对象
export const isObj = (o: any) =>
  Object.prototype.toString.call(o).slice(8, -1) === 'Object'

// 是否数组
export const isArray = (o: any) =>
  Object.prototype.toString.call(o).slice(8, -1) === 'Array'

// 是否时间
export const isDate = (o: any) =>
  Object.prototype.toString.call(o).slice(8, -1) === 'Date'

// 是否正则
export const isRegExp = (o: any) =>
  Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'

// 是否错误对象
export const isError = (o: any) =>
  Object.prototype.toString.call(o).slice(8, -1) === 'Error'

// 是否Symbol函数
export const isSymbol = (o: any) =>
  Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'

// 是否Promise对象
export const isPromise = (o: any) =>
  Object.prototype.toString.call(o).slice(8, -1) === 'Promise'

// 是否Set对象
export const isSet = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
}
```

:::

## Permission

```js
import store from '@/store'

/**
 * check permission
 * @param {Array} value
 * @returns {Boolean}
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value
    const hasPermission = roles.some(role => permissionRoles.includes(role))

    return hasPermission
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)

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
  let tempArr = []
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

  return JSON.parse('{"' + str + '"}')
}
```

## clearFields

清除表单提交

```js
const clearFields = queryForm =>
  Object.keys(queryForm).forEach(field => (queryForm[field] = ''))

const _clearFields = queryForm =>
  Object.assign(
    queryForm,
    Object.fromEntries(Object.keys(queryForm).map(k => [k, '']))
  )
```

## 数组对象去重

```js
const dedupe = (arr, key) => {
  if (typeof key !== 'string') return arr
  if (arr.constructor !== Array) return arr

  let hash = {}
  const sortArr = arr.reduce((pre, cur) => {
    hash[cur[key]] ? '' : (hash[cur[key]] = true && pre.push(cur))
    return pre
  }, [])
  return sortArr
}
```

## 对象过滤空值

```js
const filterNullValues = obj => {
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
              title: '请求错误: ' + res.errMsg,
              icon: 'none',
            })
          }
        },
        fail(err) {
          uni.hideLoading()
          uni.showToast({
            title: '请求错误: ' + err.errMsg,
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
