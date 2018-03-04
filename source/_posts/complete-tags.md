---
layout:     post
title:      利用标签完善你的网站
subtitle:   "consummate your website"
date:       2018-03-04 13:18:29
author:     "AlenQi"
header-img: "title-bg.jpg"
tags:
    - 前端开发
    - 优化
    - HTML
---

有很多标签，有助于网站的SEO，资源加载，提升体验等等，这里总结了一些能常用到的，共勉。

# `<meta>`标签

> The `<meta>` tag provides metadata about the HTML document. Metadata will not be displayed on the page, but will be machine parsable.
The metadata can be used by browsers (how to display content or reload page), search engines (keywords), or other web services.

## `name`属性

name属性主要用于描述网页，比如网页的关键词，叙述等。与之对应的属性值为content，content中的内容是对name填入类型的具体描述，便于搜索引擎抓取。meta标签中name属性语法格式是：

``` html
<meta name="参数" content="具体的描述">
```

| Name | Content | Explain |
| :--- | :----   | ----    |
| keywords | 前端，网站优化（网站关键字） | 用于告诉搜索引擎，你网页的关键字。 |
| description | 致力于前端领域（网站描述）| 用于告诉搜索引擎，你网站的主要内容。|
| author | AlenQi | 用于标注网页作者 |
| copyright | AlenQi | 用于标注版权信息 |
| robots | <p>1.none : 搜索引擎将忽略此网页，等价于noindex，nofollow。</p><p>2.noindex : 搜索引擎不索引此网。</p><p>3.nofollow:搜索引擎不继续通过此网页的链接索引搜索其它的网页。</p><p>4.all : 搜索引擎将索引此网页与继续通过此网页的链接索引，等价于index，follow。</p><p>5.index : 搜索引擎索引此网页。</p><p>6.follow : 搜索引擎继续通过此网页的链接索引搜索其它的网页。</p>  | robots用来告诉爬虫哪些页面需要索引，哪些页面不需要索引。content的参数有all,none,index,noindex,follow,nofollow。默认是all。 |
| revisit-after | 7 days（搜索引擎爬虫重访时间） | 如果页面不是经常更新，为了减轻搜索引擎爬虫对服务器带来的压力，可以设置一个爬虫的重访时间。如果重访时间过短，爬虫将按它们定义的默认时间来访问。 |
| renderer(双核浏览器渲染方式) | <p>1.webkit：默认webkit内核</p><p>2.ie-comp：默认IE兼容模式</p><p>3.ie-stand：默认IE标准模式</p> | renderer适用于双核浏览器，用于指定双核浏览器默认以何种方式渲染页面。比如说360浏览器。|
| fragment | ! | 表示一个无hash段的URL，通过Ajax获取内容的页面。爬虫会临时地将页面映射为www.example.com?_escapedfragment= 并向服务器发出请求。服务器就相应的返回www.example.com的HTML快照。 |

## `http-equiv`属性

使用带有 http-equiv属性的`<meta>`标签时，服务器将把名称/值对添加到发送给浏览器的内容头部。meta标签中http-equiv属性语法格式是：

``` html
<meta http-equiv="参数" content="具体的描述">
```

| http-equiv | Content | Explain |
| :---       | :----   | ----    |
| content-Type | text/html; charset=utf-8 | 用于设定网页字符集，便于浏览器解析与渲染页面（HTML5格式为:&lt;meta charset="utf-8"&gt;） |
| X-UA-Compatible | IE=edge,chrome=1（指定IE和Chrome使用最新版本渲染当前页面） | 用于告知浏览器以何种版本来渲染页面。 |
| cache-control | <p>1.no-cache: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。</p><p>2.no-store: 不允许缓存，每次都要去服务器上，下载完整的响应。（安全措施）</p><p>3.public: 缓存所有响应，但并非必须。因为max-age也可以做到相同效果</p><p>4.private: 只为单个用户缓存，因此不允许任何中继进行缓存。（比如说CDN就不允许缓存private的响应）</p><p>5.maxage: 表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如：max-age=60表示响应可以再缓存和重用 60 秒。</p><p>6.no-siteapp:用于禁止当前页面在移动端浏览时，被百度自动转码。虽然百度的本意是好的，但是转码效果很多时候却不尽人意。有时候需要避免百度自动转码。</p> | 指导浏览器如何缓存某个响应以及缓存多长时间。 |
| expires | Sunday, 8-Jan-15 8:00:00 GMT（必须使用GMT的时间格式，或直接设为0(数字表示多少时间后过期)。） | 用于设定网页的到期时间，过期后网页必须到服务器上重新传输。 |
| refresh | content="2；URL=http://www.alenqi.site"（2秒后跳转向我的博客） | 网页将在设定的时间内，自动刷新并调向设定的网址。 |
| set-cookie | user=alenqi; path=/; expires=Sunday, 8-Jan-15 8:00:00 GMT（必须使用GMT的时间格式。） | 如果网页过期。那么这个网页存在本地的cookies也会被自动删除。 |
| Content-Secutity-Policy | <p>1.base-uri：用于限制可在页面的 &lt;base> 元素中显示的网址。</p><p>2.child-src：用于列出适用于工作线程和嵌入的帧内容的网址。例如：child-src https://youtube.com 将启用来自 YouTube（而非其他来源）的嵌入视频。 使用此指令替代已弃用的 frame-src 指令。</p><p>3.connect-src：用于限制可（通过 XHR、WebSockets 和 EventSource）连接的来源。</p><p>4.font-src：用于指定可提供网页字体的来源。Google 的网页字体可通过 font-src https://themes.googleusercontent.com 启用。</p><p>5.form-action：用于列出可从 &lt;form> 标记提交的有效端点。</p><p>6.frame-ancestors：用于指定可嵌入当前页面的来源。此指令适用于 &lt;frame>、&lt;iframe>、&lt;embed> 和 &lt;applet> 标记。此指令不能在 &lt;meta> 标记中使用，并仅适用于非 HTML 资源。</p><p>7.img-src：用于定义可从中加载图像的来源。</p><p>8.media-src：用于限制允许传输视频和音频的来源。</p><p>9.upgrade-insecure-requests：指示 User Agent 将 HTTP 更改为 HTTPS，重写网址架构。</p> | CSP 定义 Content-Security-Policy HTTP 标头，其允许您创建信任的内容的来源白名单，并指示浏览器仅执行或渲染来自这些来源的资源，而不要盲目地信任服务器提供的所有内容。即使攻击者能够发现可从中注入脚本的漏洞，由于此脚本也不符合此白名单，因此，也不会执行该脚本 |
| x-dns-prefetch-control | <p>1.on:启用 DNS 预解析。在浏览器支持 DNS 预解析的特性时即使不使用该标签浏览器依然会进行预解析。</p><p>2.off:关闭 DNS 预解析。这个属性在页面上的链接并不是由你控制的或是你根本不想向这些域名引导数据时是非常有用的。</p> | 如果网页过期。那么这个网页存在本地的cookies也会被自动删除。 |

# `<link>`标签

> The HTML `<link>` element specifies relationships between the current document and an external resource. Possible uses for this element include defining a relational framework for navigation. This element is most used to link to style sheets.

## `rel`属性

这个属性表明了链接的文档对于当前文档的关系。

| rel   | Example | Explain |
| :---  | :----   | ----    |
| preload | <p>1.&lt;link rel="preload" href="style.css" as="style"></p><p>2.&lt;link rel="preload" href="bg-image-narrow.png" as="image" media="(max-width: 600px)">（当用户在使用较窄屏幕的设备时，较窄的图片将会被预加载，而在较宽的设备上，较宽的图片将被预加载。然后我们仍需要在header元素上附加合适的图片——通过Window.matchMedia / MediaQueryList 来加以实现）</p> | preload 属性值能够让你在你的HTML页面中&lt;head>元素内部书写一些声明式的资源获取请求，可以指明哪些资源是在页面加载完成后即刻需要的。对于这种即刻需要的资源，你可能希望在页面加载的生命周期的早期阶段就开始获取，在浏览器的主渲染机制介入前就进行预加载。这一机制使得资源可以更早的得到加载并可用，且更不易阻塞页面的初步渲染，进而提升性能。 |
| prefetch | &lt;link rel="prefetch"  href="style.css"> | 它是意图预获取一些资源，以备下一个导航/页面使用（比如，当你去到下一个页面时） |

# Other

## `image`标签

| Example | Explain |
| :---    | :----   |
| &lt;img src="/flower.jpg"  alt="鲜花" /> | 1.可以增加关键词密度</br>2.可以让引擎更好的判断这张图片的相关内容</br>3.图片未加载出来时，占位显示文字 ||
