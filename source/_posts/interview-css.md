---
layout: post
title: 前端面试系列 -- CSS
subtitle: interview, css
date: 2019-07-11 11:17:22
author: AlenQi
catalog: true
header-img: bg.png
tags:
  - CSS
  - 面试
---

> 前端基础面试 CSS 部分，不定期更新

## Catagory

- [1-盒模型](#1-盒模型)
- [2-flex:1](#2-flex:1)
- [3-css 单位](#3-css 单位)
- [4-BFC](#4-BFC)
- [5-相邻的两个 inline-block 节点为什么会出现间隔，该如何解决](#5-相邻的两个 inline-block 节点为什么会出现间隔，该如何解决)
- [6-写一个 meta 标签，宽度等于设备宽度，不允许用户缩放](#6-写一个 meta 标签，宽度等于设备宽度，不允许用户缩放)
- [7-CSS 实现宽度自适应 100%，宽高 16:9 的比例的矩形](#7-CSS 实现宽度自适应 100%，宽高 16:9 的比例的矩形)
- [8-移动端布局](#8-移动端布局)
- [9-画三角形](#9-画三角形)
- [10-1px 像素问题](#10-1px 像素问题)

### 1-盒模型

- W3C 标准盒模型：属性`width`，`height`只包含内容`content`，不包含`border`，`padding`
- IE 盒模型：属性`width`，`hegiht`包含`border`，`padding`，`content`

> 盒模型可以使用 `box-sizing` 控制，`content-box` 为标准盒模型，`border-box` 为 IE 盒模型

### 2-flex:1

flex 是 `flex-grow` , `flex-shrink`, `flex-basis`的缩写

flex-grow: 定义弹性盒子项的拉伸因子
flex-shrink: 属性指定了 flex 元素的收缩规则

```css
.item {
  flex: 1;
}
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}
```

### 3-css 单位

- % 百分比
- in 英寸
- cm 厘米
- mm 毫米
- em 1em 为当前字体的尺寸
- ex 1ex 是一个字体的 x-height
- pt 磅
- pc 12 点活字
- px 像素
- rem 和 em 以同样的方式工作，但它总是等于默认基础字体大小的尺寸；继承的字体大小将不起作用
- vw,vh 分别是视口宽度的 1/100 和视口高度的 1/100

### 4-BFC

BFC 即 Block Formatting Contexts (块级格式化上下文)，它属于上述定位方案的普通流。
具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

满足以下任一条件即可触发 BFC 特性：

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

### 5-相邻的两个 inline-block 节点为什么会出现间隔，该如何解决

空白字符压缩（white space collapse）是西文排版的必然结果。SGML、TeX 都是如此。不过对于不使用空格作为词分界的语言，比如东亚语言来说，就造成了问题。

- font-size: 0
- 去掉源代码中的空白
- Skip the closing tag

### 6-写一个 meta 标签，宽度等于设备宽度，不允许用户缩放

```html
<meta
  name="viewport"
  content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cove"
/>
```

### 7-CSS 实现宽度自适应 100%，宽高 16:9 的比例的矩形

```css
.test {
  width: 100vw;
  height: 56.25vw;
}
```

### 8-移动端布局

- 响应式

利用@media 进行断点，在每个断点中编写 css。

优点：兼容性好，@media 在 ie9 以上是支持的，PC 和 MOBILE 是同一套代码的，不用分开。

缺点：要写得 css 相对另外两个多很多，而且各个断点都要做好。css 样式会稍微大点，更麻烦。

- REM

rem 根据 html 的 font-size 大小进行转换

优点：能维持能整体的布局效果，移动端兼容性好，不用写多个 css 代码，而且还可以利用@media 进行优化。

缺点：开头要引入一段 js 代码，单位都要改成 rem(font-size 可以用 px)，计算 rem 比较麻烦(可以引用预处理器，但是增加了编译过程，相对麻烦了点)。pc 和 mobile 要分开。

- 设置 viewport 中的 width

获取屏幕宽度，定死 viewport 中的 width 大小。

优点：和 REM 相同，而且不用写 rem，直接使用 px，更加快捷。

缺点：效果可能没 rem 的好，图片可能会相对模糊，而且无法使用@media 进行断点，不同 size 的手机上显示，高度间距可能会相差很大。

### 9-画三角形

```css
#demo {
  width: 0px;
  height: 0px;
  border: 40px solid transparent;
  border-bottom: 80px solid red;
}
```

### 10-1px 像素问题

设备物理像素和设备独立像素的比例并不是 1：1

- 伪类 + transform
  把原先元素的 border 去掉，然后利用 :before 或者 :after 重做 border ，并 transform 的 scale 缩小一半，原先的元素相对定位，新做的 border 绝对定位

  ```css
  li {
    position: relative;
  }
  li:after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 1px;
    border-top: 1px solid black;
    transform: scaleY(0.5); //注意兼容性
  }
  ```

- viewport + rem(ios)
  同时通过设置对应 viewport 的 rem 基准值
  在 devicePixelRatio = 2 时，输出 viewport：

  ```html
  <meta
    name="viewport"
    content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no"
  />
  ```

- 使用 box-shadow 模拟边框
  利用 css 对阴影处理的方式实现 0.5px 的效果。

  ```css
  .box-1px {
    box-shadow: inset 0px -1px 1px -1px black;
  }
  ```
