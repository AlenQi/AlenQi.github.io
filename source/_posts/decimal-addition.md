---
layout:       post
title:        算法实现系列（3）——0.1+0.2
date:         2019-06-18 17:22:18
author:       'AlenQi'
header-img:   'bg.png'
tags:
  - 前端开发
  - 算法
---

> 众所周知， 在js的运算中有如下的骚逻辑

![0.1+0.2现场](1.png)

> JavaScript使用Number类型表示数字（整数和浮点数）， 遵循 IEEE 754 标准 通过64位来表示一个数字

![IEEE 754 浮点数三个域](2.png)

- 第0位： 符号位， 0表示正数， 1表示负数(s)
- 第1位到第11位： 储存指数部分（e）
- 第12位到第63位： 储存小数部分（即有效数字）f

> 0.1和0.2写成二进制标准， 会变成无限循环， 后面超出标准的位数会被截掉， 现在已经失去了精度

> 在进制的转换和对阶运算过程中， 会丢失精度

### 简要步骤

1. 获取加数和被加数小数位数
2. 得到小数位数的数量级
3. 加数和被加数换算成整数相加， 再还原到小数

### 具体实现

``` js 
function decimalAddition() {
  const args = [...arguments]
  const maxLen = Math.max.apply(

      null,
      args.map(item => {
          const str = String(item).split('.')[1]
          return str ? str.length : 0
      })

  )
  return (

      args.reduce((sum, cur) => sum + cur * 10 ** maxLen, 0) / 10 ** maxLen

  )
}
```

