---
outline: deep
---

# 基础

## BEM 规范

```html
<div class="health-account">
  <div class="health-account__head"></div>
  <div class="health-account__body">
    <div class="tag"></div>
    <button class="health-account__button--primary"></button>
    <button class="health-account__button--success"></button>
  </div>
</div>
```

### 命名建议

1. \- 中划线：仅作为连字符，表示某个块或者某个子元素的多单词之间的连接记号，如 `health-account`。
2. \_\_ 双下划线：用来连接块和块的子元素
3. -- 双中划线：用来描述一个块或者块的子元素的一种状态
4. 合理的属性书写顺序
5. 建议按照布局定位、自身属性、文本属性、其他属性的顺序来书写，而不是想到什么写什么
6. 不要滥用 `id` 选择器和 `!important`
7. `Vue` 中建议使用 `scoped`

### css 预处理器

`less` `sass` `scss` `stylus`

## 浏览器滚动条

```css
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #a9a9a9;
}
```

## 文字溢出显示省略号

```css
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```
