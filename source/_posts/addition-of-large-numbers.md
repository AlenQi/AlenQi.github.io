---
layout:     post
title:      大数求和
date:       2019-06-16 17:12:46
author:     "AlenQi"
header-img: "bg.jpg"
tags:
  - 前端开发
  - 算法
---

> JS中只有一种类型数， 即64位（1bit 的符号位， 11bits 的指数部分 ， 以及52bits 的小数部分）双精度浮点数， 当整数数值过大时， 就会发生精度丢失。 

> 所谓安全整数即能够唯一确定的数字， 即能够使用64位二进制数唯一确定的整数。 考虑2^{53}， 转换成对应表示方式后其小数部分总共包括53位， 发生了精度丢失， 所以在JS中无法区别 2^{53} 与 2^{53} +1。 

> 安全整数与JS是否能够正确进行运算关系密切， 当运算数与运算结果都处于安全整数的范围内时， 才能保证JS运算结果正确。 

> 对于超过了JS安全范围的整数， 对于两个超过了JS安全范围的整数， 用加法求和并不能得到准确的结果， 所以我们要特殊实现超过安全范围的数计算方式。 

### 简要步骤： 

1： 采用手动计算求和的方法， 从最低位依次相加， 得到最后的结果； 
2： 把需要求和的大数， 分开每一位进行相加； 
3： 因为对于较大的数js会自动采用科学记数法的方式表示， 所以参与计算的参数用字符串表示。 

### 具体实现： 

``` js
//  对两个超过JavaScript安全范围的数求和
//  @param {string} d1 - 加数
//  @param {string} d2 - 被加数
//  @returns {string} - 返回计算结果

function additionOfLargeNumbers(d1, d2) {
    // 如果第一个数较大则交换两个数
    if (d1.length < d2.length) {

        [d1, d2] = [d2, d1];

    }
    // 将两个数转为数组形式
    let [arr1, arr2] = [
        [...d1].reverse(), [...d2].reverse()
    ];
    // num用作当对应位数相加大于10时做进位
    let num = 0;
    // 循环arr1.length次求和
    for (let i = 0; i < arr1.length; i++) {

        if (arr2[i]) {
            arr1[i] = Number.parseInt(arr1[i]) + Number.parseInt(arr2[i]) + num;
        } else {
            arr1[i] = Number.parseInt(arr1[i]) + num;
        }
        // 判断相加大于10时做进位
        if (arr1[i] >= 10) {
            [arr1[i], num] = [arr1[i] % 10, 1];
        } else {
            num = 0;
        }

    }
    // 如果最后进位为1， 则结果前应加1为
    if (num === 1) {

        arr1[arr1.length] = num;

    }
    // 返回结果字符串
    return arr1.reverse().join('');
}
```

### 算法分析： 

最佳情况： T(n) = O(n)
最差情况： T(n) = O(n)
平均情况： T(n) = O(n)
