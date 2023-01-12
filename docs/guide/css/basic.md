---
outline: deep
---

# 基础

## BEM 规范

``` html
<div class='health-account'>
  <div class='health-account__head'></div>
  <div class='health-account__body'>
    <div class='tag'></div>
    <button class='health-account__button--primary'></button>
    <button class='health-account__button--success'></button>
  </div>
</div>
```

### 命名建议

1. \-  中划线：仅作为连字符，表示某个块或者某个子元素的多单词之间的连接记号，如 `health-account`。
2. __ 双下划线：用来连接块和块的子元素
3. -- 双中划线：用来描述一个块或者块的子元素的一种状态
4. 合理的属性书写顺序
5. 建议按照布局定位、自身属性、文本属性、其他属性的顺序来书写，而不是想到什么写什么
6. 不要滥用 `id` 选择器和 `!important`
7. `Vue` 中建议使用 `scoped`

### css 预处理器

`less` `sass` `scss` `stylus`
