---
outline: deep
---

# 算法

## 全排列

### 递归

```js
const permute = arr => {
  const permArr = []
  const usedChars = []

  const main = arr => {
    let ch = null

    for (let i = 0, len = arr.length; i < len; i++) {
      ch = arr.splice(i, 1)[0]
      usedChars.push(ch)

      if (!arr.length) {
        // usedChars.slice() 浅拷贝
        permArr.push(usedChars.slice())
      }

      main(arr)

      arr.splice(i, 0, ch)
      usedChars.pop()
    }

    return permArr
  }

  return main(arr)
}
```

### 回溯

```js
const permute = nums => {
  const permArr = []

  const backtrack = path => {
    if (path.length === nums.length) {
      permArr.push(path)
      return
    }

    nums.forEach(n => {
      if (path.includes(n)) return
      backtrack(path.concat(n))
    })
  }

  backtrack([])

  return permArr
}
```
