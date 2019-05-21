---
layout: post
title: 'Promise ES6'
subtitle: 'Promise，ES6'
date: 2017-01-17 14:34:52
author: 'AlenQi'
catalog: true
header-img: 'post-bg-js-promise-es6.jpg'
tags:
  - 前端开发
  - JavaScript
  - promise
  - ES6
---

<!-- ## Catagory

1. [Foreword](#Foreword)
2. [什么是Promise?](#什么是Promise?)
3. [Promise如何用?](#Promise如何用?)
4. [Promise的同步与异步](#Promise的同步与异步)
5. [Promise的方法链](#Promise的方法链)
6. [Promise.all&&Promise.race](#Promise.all&&Promise.race)
  1. [Promise.all](#Promise.all)
  2. [Promise.race](#Promise.race) -->

## Foreword

> promise

## 什么是 Promise?

Promise 是抽象异步处理对象以及对其进行各种操作的组件。Promise 最早被提出与基于并列/并行处理设计的**_E 语言_**，JavaScript 也因为 Promise 拥有 5 投入这种特性。

ES6 Promises 的规范来源于 Promises/A+社区，它有很多版本的实现。

- 用 new Promise 实例化的 promise 对象有三个状态。
  1. **_Pending_**
  2. **_Fulfilled_**
  3. **_Rejected_**

根据 ES6 Promises 定义的 API 大致可以分为下面三种

- Constructor

  - Promise 类似于 XMLHttpRequest，从构造函数 Promise 来创建一个新建新 promise 对象作为接口。
    要想创建一个 promise 对象、可以使用 new 来调用 Promise 的构造器来进行实例化

    ```Javascript
    let promise = new Promise(function(resolve, reject) {
        // 异步处理
        // 处理结束后、调用resolve 或 reject
    })
    ```

    promise 对象刚被创建后的初始化状态就是 `Pending`

- Instance Method

  - 对通过 new 生成的 promise 对象为了设置其值在 resolve(成功) / reject(失败)时调用的回调函数
    可以使用 promise.then() 实例方法。

    ```JavaScript
    promise.then(onFulfilled, onRejected)
    ```

  - resolve(成功)时
    此时的对象状态改变为 `Fulfilled`
    onFulfilled 会被调用
  - reject(失败)时
    此时的对象状态改变为 `Rejected`
    onRejected 会被调用
    > promise 对象的状态，从 Pending 转换为 Fulfilled 或 Rejected 之后， 这个 promise 对象的状态就不会再发生任何变化。也就是说，在[.then]后执行的函数只会被调用一次。

- Static Method
  - Promise 全局对象还拥有一些静态方法

## Promise 如何用?

- 我们先用 Promise 来通过异步处理方式来获取 XMLHttpRequest(XHR)的数据看看

```Javascript
function getURL(URL) {
    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest()
        req.open('GET', URL, true)
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.status)
            } else {
                reject(new Error(req.statusText))
            }
        }
        req.onerror = function () {
            reject(new Error(req.statusText))
        }
        req.send()
    })
}
// 成功时调用resolve
// 失败时调用reject
let URL = "http://AlenQi.site/get"
// 抛错方法一
getURL(URL).then(function onFulfilled(value){
    console.log(value)
}，function onRejected(error){
    console.error(error)
})
// 抛错方法二
getURL(URL).then(function onFulfilled(value){
    console.log(value)
}).catch(function onRejected(error){
    console.error(error)
})
//  被resolve处理后会将promise对象变为Fulfilled状态，
//  并调用onFulfilled函数,即第一个参数

//  被reject处理后会将promise对象变为Rejected状态，
//  并调用onRejected函数，即第二个参数或者catch中的函数
```

## Promise 的同步与异步

- 在 promise 状态就算是在注册时立即转变为 Settled（不变的），Promise 也会以异步的方式调用该回调函数，这是在 Promise 设计时的规定

```JavaScript
let promise = new Promise(function (resolve){
    console.log("1") // 1
    resolve(2)
})
promise.then(function(value){
    console.log(value) // 3
})
console.log("3") // 2

// 输出结果为1、3、2
```

- 这样的设计是合理且符合规范的，如果是同步调用那么 promise 状态转变是否是立即转变就会影响程序执行的顺序，难以控制预期。
- [Effective JavaScript](//effectivejs.com/)也对同步异步有所解释
  > 绝对不能对异步回调函数（即使在数据已经就绪）进行同步调用。
  > 如果对异步回调函数进行同步调用的话，处理顺序可能会与预期不符，可能带来意料之外的后果。
  > 对异步回调函数进行同步调用，还可能导致栈溢出或异常处理错乱等问题。
  > 如果想在将来某时刻调用异步回调函数的话，可以使用 setTimeout 等异步 API。

## Promise 的方法链

- Promise.prototype.then 方法返回的是一个新的 Promise 对象，因此可以采用链式写法。由于这种 promise chain,promise 适合处理这种异步处理较多的应用场景。

```JavaScript
let correctChain = new Promise(function (resolve) {
    resolve(1)
})
correctChain.then(function(value) {
  // first
  // value === 1
  return value + 1
}).then(function(value) {
  // second
  // value === 2
  return value + 1
}).then(function(value) {
  // third
  // value === 3
  return value + 1
}).catch(function onRejected(error){
    console.log(error)
})
```

> promise chain - 方法链越短越好。

- 这里`then`没有第二个方法，在发生异常的时候，或者状态变为 reject 是会被 catch 捕获。我们只能捕获到错误，无法判断错误来源，我们也无法判断错误是主动抛出还是其他异常导致的，这也是建议 reject 而不是 throw。
- 方法链值的传递，传给每个`then`方法的`value`的值都是前一个 promise 对象通过`return`返回的值。
- 每次 promise.then 调用都会返回一个新创建的 promise 对象，所以链式调用不能写在成下面的样子

```JavaScript
let errorChain = new Promise(function (resolve) {
    resolve(1)
})
errorChain.then(function (value) {
    return value * 2
})
errorChain.then(function (value) {
    return value * 2
})
errorChain.then(function (value) {
    console.log("1: " + value)  // => 100
})
```

- 这样传给每个`then`的 value 值都是相同的`1`,而且几乎是同时调用的

## Promise.all&&Promise.race

- Promise.all

```JavaScript
Promise.all(promiseArray)
// 生成并返回一个新的promise对象
let array1 = Promise.resolve(1)
let array2 = Promise.resolve(2)
let array3 = Promise.resolve(3)
Promise.all([array1, array1, array1]).then(function (results) {
  console.log(results) // results === [1,2,3]
  //参数传递promise数组中所有的promise对象都变为resolve的时候，该方法才会返回，
  //新创建的promise则会使用这些promise的值
  //如果参数中的任何一个promise为reject的话，则整个Promise.all调用会立即终止，
  //并返回一个reject的新的promise对象。
})
```

- Promise.race

```JavaScript
Promise.race(promiseArray);
// 生成并返回一个新的promise对象
let array1 = Promise.resolve(1)
let array2 = Promise.resolve(2)
let array3 = Promise.resolve(3)
Promise.race([array1, array1, array1]).then(function (results) {
  console.log(results) // results === 1
  //promise 数组中的任何一个promise对象如果变为resolve或者reject的话， 该函数就会返回，
  //并使用这个promise对象的值进行resolve或者reject。
})
```
