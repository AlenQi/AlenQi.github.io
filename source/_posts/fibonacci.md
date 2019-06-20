---
layout:     post
title:      算法实现系列（4）——斐波那契数列
date:       2019-06-20 13:32:21
author:     "AlenQi"
header-img: "bg.png"
tags:
  - 前端开发
  - 算法
---

``` js 
let Fibonacci = n => (n > 1 ? Fibonacci(n - 1) + Fibonacci(n - 2) : n); 

let Fibonacci_ = (curr, next, n) =>
  Object.is(n, 0) ? curr : Fibonacci_(next, curr + next, n - 1); 

let Fibonacci = n => Fibonacci_(0, 1, n); 

```

  