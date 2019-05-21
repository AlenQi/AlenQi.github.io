---
layout:     post
title:      函数节流和去抖之间的区别
date:       2017-10-06 15:52:35
author:     'AlenQi'
catalog:     true
header-img: 'bg.jpg'
tags:
  - 前端开发
  - javascript
---

> 函数节流和去抖都是限制基于 DOM 事件执行的 javascript 数量的方法， 都是为了提高 JS 性能， 但是两者是有区别的。 

## 函数节流

调节强制执行一段时间内可以调用函数的最大次数， 如“每 100 毫秒最多执行一次”。 
在正常情况下， 我们可以在 10 秒钟内调用此函数 1000 次。 如果您每 100 毫秒将其限制为仅一次， 则最多只能执行该功能 100 次。 

## 函数去抖

强制一个函数在一段时间内只被调用一次。 如“一个函数 100 毫秒内只执行一次”。 
也许一个函数在很集中的时间内被调用 1000 次， 超过 3 秒， 然后停止调用。 如果我们在 100 毫秒内将其去抖动， 该函数将仅启动一次 3.1 秒。 函数去抖就是对于一定时间段的连续的函数调用， 只让其执行一次。 

## 重点

这些概念的一个主要用例是某些 DOM 事件， 如滚动和调整大小。 例如， 如果我们将一个滚动处理程序附加到元素， 并将该元素向下滚动到 5000px， 则可能会看到超过 100 个事件触发。 如果我们的事件处理程序执行一些工作（如重计算和其他 DOM 操作）， 我们可能会看到性能问题。 如果你可以使执行该处理程序的次数减少， 而没有太多的中断， 那这些工作是值得的。 

- 一些小例子

1.  等到用户停止调整窗口大小
2.  在用户停止打字之前， 不要触发 ajax 事件
3.  计算页面的滚动位置， 每 50ms 最多执行一次
4.  在应用程序中拖动元素时， 请确保良好的性能

## 如何实现

这两个功能都在 [Underscore](http://underscorejs.org/) 和 [Lodash](https://lodash.com/) 中已经实现。 当然即使我们不使用这些库， 我们也可以随时从中抽出这些功能供自己使用。 

- throttled scroll:

  

```javascript
  /**
   * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
   *
   * @param  {function}   func      传入函数
   * @param  {number}     wait      表示时间窗口的间隔
   * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
   *                                如果想忽略结尾边界上的调用，传入{trailing: false}
   * @return {function}             返回客户调用函数
   */
  _.throttle = function(func, wait, options) {
      var context, args, result;
      var timeout = null;
      // 上次执行时间点
      var previous = 0;
      if (!options) options = {};
      // 延迟执行函数
      var later = function() {
          // 若设定了开始边界不执行选项，上次执行时间始终为0
          previous = options.leading === false ? 0 : _.now();
          timeout = null;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
      };
      return function() {
          var now = _.now();
          // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
          if (!previous && options.leading === false) previous = now;
          // 延迟执行时间间隔
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
          // remaining大于时间窗口wait，表示客户端系统时间被调整过
          if (remaining <= 0 || remaining > wait) {
              clearTimeout(timeout);
              timeout = null;
              previous = now;
              result = func.apply(context, args);
              if (!timeout) context = args = null;
              //如果延迟执行不存在，且没有设定结尾边界不执行选项
          } else if (!timeout && options.trailing !== false) {
              timeout = setTimeout(later, remaining);
          }
          return result;
      };
  };
```

- debounced resize:

  

```javascript
  /**
   * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
   *
   * @param  {function} func        传入函数
   * @param  {number}   wait        表示时间窗口的间隔
   * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
   * @return {function}             返回客户调用函数
   */
  _.debounce = function(func, wait, immediate) {
      var timeout, args, context, timestamp, result;

      var later = function() {
          // 据上一次触发时间间隔
          var last = _.now() - timestamp;

          // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
          if (last < wait && last > 0) {
              timeout = setTimeout(later, wait - last);
          } else {
              timeout = null;
              // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
              if (!immediate) {
                  result = func.apply(context, args);
                  if (!timeout) context = args = null;
              }
          }
      };

      return function() {
          context = this;
          args = arguments;
          timestamp = _.now();
          var callNow = immediate && !timeout;
          // 如果延时不存在，重新设定延时
          if (!timeout) timeout = setTimeout(later, wait);
          if (callNow) {
              result = func.apply(context, args);
              context = args = null;
          }

          return result;
      };
  };
```

## 应用场景

- 函数节流

  - DOM 元素的拖拽功能实现（mousemove）
  - 计算鼠标移动的距离（mousemove）
  - 搜索联想（keyup）
  - 监听滚动事件判断是否到页面底部自动加载更多内容

- 函数去抖

  - 窗口缩放， 每次 resize/scroll 触发事件
  - 文本输入的验证（连续输入文字后发送 AJAX 请求进行验证， 验证一次就好）
