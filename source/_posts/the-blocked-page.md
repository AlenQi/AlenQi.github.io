---
layout: post
title: 那些被阻止的页面
date: 2017-10-04 16:53:36
author: "AlenQi"
catalog: true
header-img: "bg.jpg"
tags:
---

## 我们遇到了什么？

---------------

![blocked](blocked.jpg)

有时候需要我们跳到新的窗口，比如跳出到支付，比如跳出到详情页面。
你说这简单，我们有`window.open()`有`target="_blank"`，但是有时这些方法会是失效，被浏览器拦截掉，不能直接跳出到新的页面，需要用户手动放行。
有种说法是：打开新窗口到操作必须是用户主动触发到，这样的描述有些模糊。下面到3种方法都是用户主动触发的

``` html
<input type="button" id="btn" onclick="openwin()" />
<script>
  // function1
  document.getElementById('btn').onclick = function() {
    window.open('http://www.alenqi.site')
  }
  // function2
  document.getElementById('btn').onclick = function() {
	setTimeout(function () {
	  window.open('http://segmentfault.com');
	}, 1000)
  }
  // function3
  window.open('http://www.alenqi.site')
</script>
```
function1会入预期跳出新的页面，function2则不会，这两个方法都是用户主动触发的。
实际是浏览器如果判断到这个跳出是`异步`的，也就是没有立即响应用户的操作，它会把此次行为判定为是脚本在跑，从而拦截掉页面的跳出。function3针对不通版本的浏览器有不同的表现。

## 我们需要如何做？

-  同步的环境里：

	1. 利用模拟生成`a`标签，然后触发标签的点击事件。

		```  javascript
			function openNewWindow(url, id) {
			  var a = document.createElement('a')
			  a.setAttribute('href', url)
			  a.setAttribute('target', '_blank')
			  a.setAttribute('id', id)
			  if (!document.getElementById(id)) document.body.appendChild(a)
			  a.click()
		    }
	  ```

	2. 使用form的submit方法打开一个页面  

	  ``` javascript
      const alipayForm = document.createElement('form')
      alipayForm.id = alipayForm.name = 'alipayForm'
      alipayForm.method = "GET"
      alipayForm.action = 'https://mapi.alipay.com/gateway.do'
      Object.keys(params).forEach(key => {
        const hidden = document.createElement('input')
        hidden.type = 'hidden'
        hidden.name = key
        hidden.value = params[key]
        alipayForm.appendChild(hidden)
      })
      const alipaySubmit = document.createElement('input')
      alipaySubmit.type = alipaySubmit.value = 'submit'
      alipaySubmit.style = 'display: none'
      alipayForm.appendChild(alipaySubmit)
      document.body.appendChild(alipayForm)
      document.querySelector('#alipayForm').submit()
	  ```

-  异步的环境里：

	1. 先通过用户点击打开页面，然后再对页面进行重定向

	``` javascript
		document.getElementById('btn').addEventListener('click', function() {
		  var newWindow = window.open('loading page')
		  setTimeout(function() {
		    newWindow.location.href = 'http://www.alenqi.site'
		  }, 1000)
		})
     ```
以上基本可以解决浏览器拦截页面的问题了。
