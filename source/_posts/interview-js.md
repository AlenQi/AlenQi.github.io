---
layout: post
title: 前端面试系列 -- JS
subtitle: interview, js
date: 2019-07-02 11:45:24
author: AlenQi
catalog: true
header-img: bg.jpg
tags:
  - JavaScript
  - 面试
---

> 前端基础面试 JS 部分，不定期更新

### 1. 问： 原型/原型链/构造函数，解释

- 原型：在 JavaScript 中，原型也是一个对象，通过原型可以实现对象的属性继承，JavaScript 的对象中都包含了一个`[[Prototype]]`内部属性，这个属性所对应的就是该对象的原型。`[[Prototype]]`作为对象的内部属性，是不能被直接访问的。所以为了方便查看一个对象的原型，`Firefox`和 C`hrome`中提供了`__proto__`这个非标准（不是所有浏览器都支持）的访问器（ECMA 引入了标准对象原型访问器`Object.getPrototype(object)`）。

- 原型链：因为每个对象和原型都有原型，对象的原型指向对象的父，而父的原型又指向父的父，这种原型层层连接起来的就构成了原型链。当查找一个对象的属性时，JavaScript 会向上遍历原型链，直到找到给定名称的属性为止，到查找到达原型链的顶部（也就是 `Object.prototype`）， 如果仍然没有找到指定的属性，就会返回`undefined`。

- 构造函数：js 语言中使用构造函数`constructor`作为对象的模板。所谓构造函数，就是提供一个生成对象的模板，并描述对象的基本结构的函数。一个构造函数，可以生成多个对象，每个对象都有相同的结构。

### 2. 有几种方式可以实现继承

1. 原型链：

> 原型链是实现继承最原始的模式，即通过 prototype 属性实现继承。

```js
function Father() {
  this.fatherProp = true;
}

Father.prototype.getFatherValue = function() {
  return this.fatherProp;
};

function Son() {
  this.sonProp = false;
}

Son.prototype = new Father();

Son.prototype.getSonValue = function() {
  return this.sonProp;
};

const son = new Son();

console.log(son.getFatherValue()); // true
```

2. 借用构造函数：

> 方式一中引用类型带来的问题可借用构造函数的方式解决。其核心思想是：在子级构造函数中调用父级构造函数

```js
function Father(name) {
  this.name = name;
}

function Son(name) {
  Father.call(this, name);
}

const son1 = new Son('tom');
const son2 = new Son('jerry');
```

3. 组合继承

> 组合继承 = 原型链 + 借用构造函数。取其长避其短：共享的用原型链，各自的借用构造函数

```js
function Father(name) {
  this.name = name;
  this.arr = [1, 2, 3];
}

Father.prototype.getName = function() {
  console.log(this.name);
};

function Son(name, age) {
  Father.call(this, name);
  this.age = age;
}

Son.prototype = new Father();
Son.prototype.construcor = Son;
Son.prototype.getAge = function() {
  console.log(this.age);
};

const son1 = new Son('tom', 23);
son1.arr.push(4);
console.log(son1.arr);
son1.getName();
son1.getAge();

const son2 = new Son('jerry', 21);
console.log(son2.arr);
son2.getName();
son2.getAge();
```

### 3. arguments

`arguments` 对象是所有函数中可用的局部变量。你可以使用 `arguments` 对象在函数中引用函数的参数。此对象包含传递给函数的每个参数的条目，第一个条目的索引从 0 开始。
`arguments` 对象不是一个 `Array` 。它类似于数组，但除了 长度之外没有任何数组属性。

将`arguments`转换成一个数组：

```js
// 1
const args1 = Array.prototype.slice.call(arguments);

// 2
const args2 = [].slice.call(arguments);

// 3
const args3 = Array.from(arguments);

// 4
const args4 = [...arguments];
```

### 4. 数据类型判断

在 ECMAScript 规范中，共定义了 7 种数据类型，分为 `基本类型` 和 `引用类型`

> 基本类型：String、Number、Boolean、Undefined、Null、Symbol
> 引用类型：Object

1. typeof

操作符右侧跟一个一元表达式，并返回这个表达式的数据类型，返回的结果用该类型的字符串(全小写字母)形式表示。
对于基本类型，除 `null` 以外，均可以返回正确的结果。
对于引用类型，除 `function` 以外，一律返回 object 类型。

```js
typeof null; // object
typeof new Function(); // function
```

2. instanceof

`instanceof` 是用来判断 A 是否为 B 的实例，表达式为：A instanceof B，如果 A 是 B 的实例，则返回 `true`,否则返回 `false`。 在这里需要特别注意的是：`instanceof` 检测的是原型。
`instanceof` 只能用来判断两个对象是否属于实例关系， 而不能判断一个对象实例具体属于哪种类型。

3. constructor

当一个函数 F 被定义时，JS 引擎会为 F 添加 `prototype` 原型，然后再在 `prototype` 上添加一个 `constructor` 属性，并让其指向 F 的引用。F 利用原型对象上的 `constructor` 引用了自身，当 F 作为构造函数来创建对象时，原型上的 `constructor` 就被遗传到了新创建的对象上， 从原型链角度讲，构造函数 F 就是新对象的类型。这样做的意义是，让新对象在诞生以后，就具有可追溯的数据类型。

4. toString

`toString()` 是 `Object` 的原型方法，调用该方法，默认返回当前对象的 `[[Class]]` 。这是一个内部属性，其格式为 `[object Xxx]` ，其中 `Xxx` 就是对象的类型。
对于 `Object` 对象，直接调用 `toString()` 就能返回 `[object Object]` 。而对于其他对象，则需要通过 `call / apply` 来调用才能返回正确的类型信息。

### 4. 作用域链. 闭包. 作用域

- 作用域链：当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

- 闭包：闭包是指那些能够访问自由变量的函数。自由变量也就是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。在谷歌浏览器中，将自由变量所在的作用域叫做闭包。

- 作用域：作用域是指程序源代码中定义变量的区域。作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。`JavaScript` 采用词法作用域(lexical scoping)，也就是静态作用域。函数的作用域在函数定义的时候就决定了。

### 5. 对象深拷贝. 浅拷贝

- 浅拷贝
  例如使用了 `concat` 方法，克隆的并不彻底，如果数组元素是基本类型，就会拷贝一份，互不影响，而如果是对象或者数组，就会只拷贝对象和数组的引用，这样我们无论在新旧数组进行了修改，两者都会发生变化。

- 浅拷贝的实现

```js
var shallowCopy = function(obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {};
  // 遍历obj，并且判断是obj的属性才拷贝
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};
```

- 深拷贝
  深拷贝就是指完全的拷贝一个对象，即使嵌套了对象，两者也相互分离，修改一个对象的属性，也不会影响另一个。

- 深拷贝的实现

```js
//方法一：
var new_arr = JSON.parse(JSON.stringify(arr)); // 有一个缺点是不能拷贝函数

// 方法二：
var deepCopy = function(obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
};
```

### 6. 图片懒加载. 预加载

- 懒加载
  将页面中的 img 标签 src 指向一张小图片或者 src 为空，然后定义一个自定义属性（例如 data-src），属性指向真实的图片。src 指向一张默认的图片，否则当 src 为空时也会向服务器发送一次请求。可以指向 loading 的地址。当载入页面时，先把可视区域内的 img 标签的 data-src 属性值负给 src，然后监听滚动事件，把用户即将看到的图片加载。这样便实现了懒加载。

- 预加载
  核心原理是浏览器请求过的资源会自动缓存。用 js 创建一个看不见的 Image 标签，浏览器会发出请求。到了页面上真正要显示这张图片的时候，浏览器就可以从缓存里面拿到图片，不用再去下载图片。

### 7. this 关键字

var obj = {a: 1, b: function(){console.log(this);}}

- 作为对象调用时，指向该对象 `obj.b()`; // 指向 obj
- 作为函数调用, `var b = obj.b; b()`; // 指向全局 window
- 作为构造函数调用 `var b = new Fun()`; // this 指向当前实例对象
- 作为 call 与 apply 调用 `obj.b.apply(object, [])`; // this 指向当前的 object

### 8. 函数式编程

它将计算机运算视为函数运算，并且避免使用程序状态以及易变对象。其中，λ 演算（lambda calculus）为该语言最重要的基础。而且，λ 演算的函数可以接受函数当作输入（引数）和输出（传出值）。

比起指令式编程，函数式编程更加强调程序执行的结果而非执行的过程，倡导利用若干简单的执行单元让计算结果不断渐进，逐层推导复杂的运算，而不是设计一个复杂的执行过程。

### 9. 手动实现 parseInt

```js
function _parseInt(str, radix) {
  let str_type = typeof str;
  let res = 0;
  if (str_type !== 'string' && str_type !== 'number') {
    return NaN;
  }

  str = String(str)
    .trim()
    .split('.')[0];
  let length = str.length;

  if (!length) {
    return NaN;
  }

  if (!radix) {
    radix = 10;
  }

  if (typeof radix !== 'number' || radix < 2 || radix > 36) {
    return NaN;
  }

  for (let i = 0; i < length; i++) {
    let arr = str
      .split('')
      .reverse()
      .join('');
    res += Math.floor(arr[i]) * Math.pow(radix, i);
  }

  return res;
}
```

### 10. 怎么判断两个对象是否相等

```js
function equals(x, y) {
  const f1 = x instanceof Object;
  const f2 = y instanceof Object;
  if (!f1 || !f2) {
    return x === y;
  }

  if (Object.keys(x).length !== Object.keys(y).length) {
    return false;
  }

  const newX = Object.keys(x);
  for (let p in newX) {
    p = newX[p];
    const a = x[p] instanceof Object;
    const b = y[p] instanceof Object;
    if (a && b) {
      equals(x[p], y[p]);
    } else if (x[p] !== y[p]) {
      return false;
    }
  }
  return true;
}
```

### 11. window 的 onload 事件和 DOMContentLoaded

- DOMContentLoaded HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。并且 DOMContentLoaded 事件必须等待其所属 script 之前的样式表加载解析完成才会触发。

- onload 属性是一个事件处理程序用于处理 Window, XMLHttpRequest, <img> 等元素的加载事件，当资源已加载时被触发。在文档装载完成后会触发 load 事件。此时，在文档中的所有对象都在 DOM 中，所有图片，脚本，链接以及子框都完成了装载。

### 12. for...in 迭代和 for...of 有什么区别

1. for...in 遍历对象, for...of 遍历数组
2. for...in 循环出的是 key, for...of 循环出的是 value
3. for...in 是 ES5 引入的, for...of 是 ES6 引入的
4. for...of 不能遍历普通对象, 需要和 Object.keys() 配合使用

### 13. call、apply、bind 三者区别，原生实现 bind

- call 和 apply 第一个参数都是指定函数体内的 this 对象的指向

- call 参数的数量不固定，可以传递多个，apply 第二个参数是一个带下标的集合，可以是数组或者类数组

- call 和 apply 改变了函数的 this 上下文后便执行该函数,而 bind 则是返回改变了上下文后的一个函数，bind 可以像 call 一样传参，也可在调用返回函数的时候传参

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      throw new TypeError('error');
    }

    let aArgs = Array.prototype.slice.call(arguments, 1);
    let fToBind = this;
    let fNOP = function() {};
    let fBound = function() {
      return fToBind.apply(
        this instanceof fBound ? this : oThis,
        aArgs.concat(Array.prototype.slice.call(arguments))
      );
    };

    if (this.prototype) {
      fNOP.prototype = this.prototype;
    }

    fBound.prototype = new fNOP();

    return fBound;
  };
}
```

### 14. 单例模式实现

- 定义：确保一个类仅有一个实例，并提供一个访问它的全局访问点

- 应用：比如线程池、全局缓存等。我们所熟知的浏览器的 window 对象就是一个单例

- 实现

```js
function Singleton(name) {
  this.name = name;
  this.instance = null;
}

Singleton.prototype.getName = function() {
  console.log(this.name);
};

Singleton.getInstance = function(name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};

const a = Singleton.getInstance('a');
const b = Singleton.getInstance('b');
console.log(a === b);
```

### 15. 数组去重

```js
function unique1(array) {
  const res = array.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });
  return res;
}

function unique2(array) {
  return array
    .concat()
    .sort()
    .filter(function(item, index, array) {
      return !index || item !== array[index - 1];
    });
}
```

### 16. 找出数组的重复项

```js
function duplicates_1(arr) {
  let newArr = [];
  arr.sort();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == arr[i + 1] && newArr.indexOf(arr[i]) == -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

function duplicates_2(arr) {
  let a = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j] && a.indexOf(arr[i]) == -1) {
        a.push(arr[i]);
      }
    }
  }
  return a.sort();
}
```

### 17. 数组扁平化

```js
function flatten_1(arr) {
  return arr
    .toString()
    .split(',')
    .map(item => {
      return +item;
    });
}

function flatten_2(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten_2(next) : next);
  }, []);
}

function flatten_3(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
```

### 18. BOM 属性对象方法

- location search,hash,host,hostname,pathname,port,protocl,assign,replace(),reload()
- history go(),back(),forward()
- navigator userAgent,cookieEnabled

### 19. 垃圾回收机制

- 标记清除：当变量进入执行环境时标记为`进入环境`，当变量离开执行环境时则标记为`离开环境`，被标记为`进入环境`的变量是不能被回收的，因为它们正在被使用，而标记为`离开环境`的变量则可以被回收

- 引用计数：统计引用类型变量声明后被引用的次数，当次数为 0 时，该变量被回收，但是引用计数的方式，有一个相对明显的缺点——循环引用，需要手动将变量的内存释放

### 20. 如何快速让字符串变成已千为精度的数字

```js
function exchange(num) {
  num += '';
  if (num.length <= 3) {
    return num;
  }

  num = num.replace(/\d{1,3}(?=(\d{1,3}))+$/g, v => v + ',');
  return num;
}
```

### 21. new 运算符都做了什么

```js
var a = new A();

// 等价于

var o = new Object();
o.__proto__ = A.prototype;
A.call(o);
return o;
```

### 22. 正则替换版本号

```js
const version = '1.1.1';
const str = 'www.alenqi.com/reg/version-2.2.2.js';
str.replace(/version-(?:\d\.\d\.\d)\.js/g, `version-${version}.js`);
```
