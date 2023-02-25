---
outline: deep
---

# 工具函数 🔧

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
function isNumber (n: number): boolean {
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
 * @param {number} num
 * @param {number} digits
 * @returns {number}
 */
function toFixed (num, digits = 0) {
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
function mergeOptions (root: {}, opts: {}): void {
  const rootClone = { ...root }

  for (const k in root) {
    if (opts.hasOwnProperty(k)) {
      rootClone[k] = k === 'query' ?
        { ...rootClone[k], ...opts[k] } : opts[k]
    }
  }

  return rootClone
}
```
