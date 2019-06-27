---
layout: post
title: 算法实现系列（5）—— 找到数组中几个数相加和等于一个固定值
date: 2019-06-27 15:13:21
author: AlenQi
header-img: bg.jpg
tags:
  - 前端开发
  - 算法
---

> 从一个长度为 n 的数组中，选出 m 个数，使得这 m 个数之和等于 sum

### 简要步骤：

1. 要得到所有数字的排列组合，如果是[1,2,3,4,5]取出 3 个，那么可能性就有 10 种 `C(5,3)= C(5,2)`，全排列 `P(n,m)=n!/(n-m)!`，组合排列 `P(n,m)=n!/m!/(n-m)!`，`C(5,2)=5!/2!*3!=5*4*3*2*1/[(2*1)*(3*2\*1)]=10`

2. 用二进制来模拟排列组合的情况，比如`array = [1, 2, 3]`,二进制的`111`三个位，`0`表示未选取，`1`表示已经选取，正好可以排列组合出所有情况

3. 用位掩码来计算迭代情况，来化简运算。位移运算来判断当前的数是否被选取

### 具体实现：

```js
/**
 * @param arr 目标数组
 * @param count 要选取的元素数目
 * @param sum 目标和
 * @returns [] 计算结果的数组
 */
const search = (arr, count, sum) => {
  // 利用二进制，选择元素的个数
  const n = num => {
    let count = 0;
    while (num) {
      num &= num - 1;
      count++;
    }
    return count;
  };

  let len = arr.length;
  let bit = 1 << len; // 换算成二进制，所有情况的总和
  let res = [];

  // 遍历所有的选择情况, 这里忽略了 0 的情况(n = 0)
  for (let i = 1; i < bit; i++) {
    // 满足选择的元素个数 === count
    if (n(i) === count) {
      let s = 0;
      let temp = [];

      // 每一种满足个数为 n 的选择情况下，继续判断是否满足 和为 m
      for (let j = 0; j < len; j++) {
        // 建立映射，找出选择位上的元素
        if ((i & (1 << j)) !== 0) {
          s += arr[j];
          temp.push(arr[j]);
        }
      }

      // 如果这种选择情况满足和为 M , 添加到结果数组中
      if (s === sum) {
        res.push(temp);
      }
    }
  }

  return res;
};
```
