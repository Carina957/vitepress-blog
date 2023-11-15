---
outline: deep
---

# 基础

## 命名规范

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

## 命名建议

1. \- 中划线：仅作为连字符，表示某个块或者某个子元素的多单词之间的连接记号，如 `health-account`。
2. \_\_ 双下划线：用来连接块和块的子元素
3. -- 双中划线：用来描述一个块或者块的子元素的一种状态
4. 合理的属性书写顺序
5. 建议按照布局定位、自身属性、文本属性、其他属性的顺序来书写，而不是想到什么写什么
6. 不要滥用 `id` 选择器和 `!important`
7. `Vue` 中建议使用 `scoped`

## BFC

BFC（Block Formatting Context）块级格式化上下文，是 Web 页面中盒模型布局的 CSS 渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。

### BFC 形成条件

1. 浮动元素，float 除 none 以外的值
2. 定位元素，position（absolute，fixed）
3. display 为以下其中之一的值 inline-block，table-cell，table-caption
4. overflow 除了 visible 以外的值（hidden，auto，scroll）

### BFC 特性

1. 内部的 Box 会在垂直方向上一个接一个的放置
2. 垂直方向上的距离由 margin 决定；（解决外边距重叠问题）
3. bfc 的区域不会与 float 的元素区域重叠（防止浮动文字环绕）
4. 计算 bfc 的高度时，浮动元素也参与计算（清除浮动）
5. bfc 就是页面上的一个独立容器，容器里面的子元素不会影响外面元素

## css 预处理器

`less` `sass` `scss` `stylus`

## 浏览器滚动条

### mixin.scss

```scss
// 通用滚动条
@mixin scrollbar {
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #f5f5f5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    background-color: #f5f5f5;
  }

  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #a9a9a9;
  }
}

@mixin scrollBar {
  &::-webkit-scrollbar-track-piece {
    background: #d3dce6;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
  }
}

// 通用清除浮动
@mixin clearfix {
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
```

### usage

```scss
@import '～assets/style/mixin.scss';

.app-container {
  @include scrollbar;
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

## [normalize.css](https://necolas.github.io/normalize.css/8.0.1/normalize.css)

## 清除浮动

```css
.clearfix::after,
.clearfix::before {
  content: '';
  display: table;
}

.clearfix::after {
  clear: both;
}

.clearfix {
  *zoom: 1;
}
```

## 高度塌陷

1. 设置元素浮动
2. 将元素设置为行内块元素：`display:inline-block`
3. 设置 `overflow` 为非 `visible` 的值：`overflow: hidden`
4. 在结尾处添加空 `div` 标签 `clear:both`
5. 给父元素设置伪元素选择器，并设置清除浮动的样式：`box::after{display:block;clear:both;content:"";}`
6. 父级 `div` 定义 `height`
