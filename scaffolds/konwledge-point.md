# HTML

1. 语义化
2. 新标签新特性
3. input 和 textarea 的区别
4. 用一个 div 模拟 textarea 的实现
5. 移动设备忽略将页面中的数字识别为电话号码的方法

# ES6

1. 声明 let. const
2. 解构赋值
3. 声明类与继承：class. extend
4. Promise 的使用与实现
5. generator（异步编程. yield. next(). await . async）
6. 箭头函数 this 指向问题. 拓展运算符
7. map 和 set 有没有用过，如何实现一个数组去重，map 数据结构有什么优点？
8. ES6 怎么编译成 ES5,css-loader 原理,过程
9. ES6 转成 ES5 的常见例子 使用 es5 实现 es6 的 class

# 浏览器

1. 输入 url 到展示页面过程发生了什么？
2. 重绘与回流 重绘(repaint): 当元素样式的改变不影响布局时，浏览器将使用重绘对元素进行更新，此时由于只需要 UI 层面的重新像素绘制，因此 损耗较少回流(reflow): 当元素的尺寸. 结构或触发某些属性时，浏览器会重新渲染页面，称为回流。此时，浏览器需要重新经过计算，计算后还需要重新页面布局，因此是较重的操作。会触发回流的操作:_ 页面初次渲染_ 浏览器窗口大小改变* 元素尺寸. 位置. 内容发生改变* 元素字体大小变化* 添加或者删除可见的 dom 元素* 激活 CSS 伪类（例如：:hover）_ 查询某些属性或调用某些方法_ clientWidth. clientHeight. clientTop. clientLeft* offsetWidth. offsetHeight. offsetTop. offsetLeft* scrollWidth. scrollHeight. scrollTop. scrollLeft* getComputedStyle()* getBoundingClientRect()\* scrollTo()回流必定触发重绘，重绘不一定触发回流。重绘的开销较小，回流的代价较高。
3. 防抖与节流
4. cookies. session. sessionStorage. localStorage
5. 浏览器内核
6. 为什么会有同源策略

# 服务端与网络

1. 常见状态码
2. 缓存 200 From cache 和 200 ok400,401,403 状态码分别代表什么浏览器缓存
3. cookie, session, token
4. 前端持久化的方式. 区别
5. DNS 是怎么解析的
6. cdn
7. 计算机网络的相关协议
8. http/https/http2.0
9. get post 区别
10. ajax. axios 库
11. tcp 三次握手，四次挥手流程
12. 跨域
13. 前端安全 XSS. CSRF
14. websocket
15. Http 请求中的 keep-alive 有了解吗
16. 网络分层
17. 即时通信，除了 Ajax 和 websocket
18. 模块化，commonJS，es6，cmd，amd

# Vue

1. vue 解决了什么问题
2. MVVM 的理解
3. 如何实现一个自定义组件，不同组件之间如何通信的？
4. nextTick
5. 生命周期
6. 虚拟 dom 的原理
7. 双向绑定的原理？数据劫持？
8. 组件通信 父->子子->父非父子组件
9. Proxy 相比于 defineProperty 的优势
10. watch computed 区别
11. virtual dom 原理实现
12. vue-router(hash， HTML5 新增的 pushState 单页应用，如何实现其路由功能---路由原理 vue-router 如何做用户登录权限等你在项目中怎么实现路由的嵌套
13. vuex 的理解前端性能优化页面 DOM 节点太多，会出现什么问题？如何优化？如何做性能监测 SEO 和语义化 这个没被问过 微信小程序 微信小程序和 h5 差异，如果有开发 weex 的经验，可能会加上 weexgit 一些基本命令 打包工具

# WebPack

1. 打包原理
2. 打包插件
3. webpack 热更新原理
4. 优化构建速度

# 算法

1. 排序算法
2. 动态规划，参见背包问题
3. 二叉树
4. 加油站问题(贪心算法)
5. 二分法
6. 二叉树遍历
7. 单链表反转
8. 取 1000 个数字里面的质数
9. 找出数组中和为给定值的两个元素，如：[1, 2, 3, 4, 5]中找出和为 6 的两个元素。
10. 线性顺序存储结构和链式存储结构有什么区别？以及优缺点

# 移动端

1. 自适应
2. pwa
3. 移动端手势

# 附加

1. 无限滚动方案
2. 如何处理兼容性问题
3. 你遇到过最难的问题是什么
4. ES6 class 与 ES5 function 区别及联系
5. vue 怎么监听数组
6. 写过 webpack loader 吗
7. 微信网页版登录机制思考
