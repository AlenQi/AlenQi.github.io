---
title: {{ title }}
tags:
---

- == 的运算规则

如果x不是正常值（比如抛出一个错误），中断执行。
如果y不是正常值，中断执行。
如果Type(x)与Type(y)相同，执行严格相等运算x === y。
如果x是null，y是undefined，返回true。
如果x是undefined，y是null，返回true。
如果Type(x)是数值，Type(y)是字符串，返回x == ToNumber(y)的结果。
如果Type(x)是字符串，Type(y)是数值，返回ToNumber(x) == y的结果。
如果Type(x)是布尔值，返回ToNumber(x) == y的结果。
如果Type(y)是布尔值，返回x == ToNumber(y)的结果。
如果Type(x)是字符串或数值或Symbol值，Type(y)是对象，返回x == ToPrimitive(y)的结果。
如果Type(x)是对象，Type(y)是字符串或数值或Symbol值，返回ToPrimitive(x) == y的结果。
返回false。

0.1 + 0.2 = 0.3

大数相加

function addFn(a, b) {
   var lenA = a.length
   var lenB = b.length
   var len = lenA > lenB ? lenA : lenB
   if (lenA > lenB) {
     for (var i = 0; i < lenA - lenB; i++) {
       b = '0' + b
     }
   } else {
     for (var i = 0; i < lenB - lenA; i++) {
       a = '0' + a
     }
   }
   var arrA = a.split('').reverse()
   var arrB = b.split('').reverse()
   var arr = []
   for (i = 0; i < len; i++) {
     arr.push(parseInt(arrA[i]) + parseInt(arrB[i]))
   }

   for (i = 0; i < arr.length; i++) {
     if (arr[i] >= 10) {
       arr[i] -= 10
       arr[i + 1] = parseInt(arr[i + 1]) + 1
     }
   }

   return arr.reverse().join('')
 }


 console.log(addFn('1234599999999999999999999999999999', '66666666'))


 千位分割符


function thousandBitSeparator(num) {
  return num && (num
    .toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
      return $1 + ",";
    }) : num.toString().replace(/(\d)(?=(\d{3}))/g, function($0, $1) {
      return $1 + ",";
    }));
}
console.log(thousandBitSeparator(1000));
