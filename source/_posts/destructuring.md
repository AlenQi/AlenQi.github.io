---
layout:     post
title:      "Destructuring"
subtitle:   "Destructuring ES6"
date:       2017-02-21 21:33:31
author:     "AlenQi"
catalog:    true
header-img: "1.png"
tags:
    - ES6
    - JavaScript
---

## Catagory

1. [Foreword](#Foreword)
2. [交换变量的值](#交换变量的值)
3. [从函数返回多个值](#从函数返回多个值)
4. [函数参数的定义](#函数参数的定义)
5. [提取JSON数据](#提取JSON数据)
6. [函数参数的默认值](#函数参数的默认值)
7. [遍历Map结构](#遍历Map结构)
8. [输入模块的指定方法](#输入模块的指定方法)

## Foreword

> ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为结构（Destructuring）.

## 交换变量的值

``` JavaScript
[x,y] = [y,x]
```
上面代码交换变量x和y的值，这样的写法不仅简介，而且易读，语义非常清晰。

## 从函数返回多个值

函数只能返回一个值，如果要返回多个值，只能将它们放在数组或者对象里返回。有了结构赋值，取出这些值就非常方便。
```JavaScript
// 返回一个数组

function example() {
  return [1, 2, 3]
}

//返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  }
}
let { foo , bar } = example()
```

## 函数参数的定义

结构赋值可以方便地将一组参数与变量名对应起来

``` JavaScript
//参数是一组有次序的值

function f([x, y, z]) { ... }
f([1, 2, 3])

//参数是一组无次序的值

function f([x, y, z]) { ... }
f({z: 3, y: 2, x: 1})
```

## 提取JSON数据

结构赋值对提取JSON对象中的数据，尤其有用。

``` JavaScript
const jsonData = {
  id: 2,
  status: 'OK',
  data: [879, 3551]
}

const { id, status, data: number } = jsonData

console.log(id, status, number)
// 2, 'OK', [879, 3551]
```

上面代码可以快速提取JSON数据的值。


## 函数参数的默认值

``` JavaScript
JQuery.ajax = function (url, {
  saync = true,
  beforeSend = function() {}
  cache = true,
  complete = function() {}
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
}
```

制定参数的默认值，就避免了在函数体内部再写`let foo = config.foo || default foo`这样的语句。

## 遍历Map结构

任何部署了`lterator`接口的对象，都可以用`for...of`循环遍历。Map结构原生支持`lterator`接口，配合变量的结构赋值，获取键名和键值就非常方便。

``` JavaScript
let map = new Map()
map.set('first', 'hello')
map.set('second', 'world')

for(let [key, value] of map) {
  console.log(key + 'is ' + value)
}
// first is hello
// second is world
```

如果只想获取键名，或者只想获取键值，可以写成下面这样。

``` JavaScript
//获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [, value] of map) {
  //...
}
```

## 输入模块的指定方法

加载模块是，往往需要指定输入那些方法。解构赋值使得输入语句非常清晰。

``` JavaScript
const { SourceMapConsumer, SourceNode } = require('source-map')
```
