---
layout: post
title: 优雅的JS
subtitle: graceful, js
date: 2017-10-29 18:14:06
author: AlenQi
catalog: true
header-img: bg.jpg
tags:
  - JavaScript
---

> 有很多有趣的 JS 的写法,比如：`[[]] == 0`,这里只总结一些华而实的 JS 优雅写法,随手补充

- `首先致敬stackoverflow` JavaScript 如何优雅的处理错误

```JavaScript
try {
  // something
} catch (e) {
  window.location.href ="http://stackoverflow.com/search?q=[js]+" + e.message
}
```

- 如何优雅的取整

```JavaScript
var a = ~~2.33
var b= 2.33 | 0
var c= 2.33 >> 0
```

- 何优雅的实现金钱格式化：e.g. 1234567890 --> 1,234,567,890

```JavaScript
//正则魔法实现：
var test1 = '1234567890'
var format = test1.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
console.log(format) // 1,234,567,890

//非正则的优雅实现：
function formatCash(str) {
  return str.split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + ',')) + prev
  })
}
console.log(formatCash('1234567890')) // 1,234,567,890
```

- 如何优雅的让两个整数交换数值

```JavaScript
a ^= b
b ^= a
a ^= b
a= [b, b=a][0]
```

- 如何优雅的给数组去重

```JavaScript
[...new Set([1, "1", 2, 1, 1, 3])]
```

- 如果优雅的筛选数组中的最大值和最小值

```JavaScript
var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
var maxInNumbers = Math.max.apply(Math, numbers);
var minInNumbers = Math.min.apply(Math, numbers);
```
