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

简单说一下

浏览器的缓存机制分为两块，也就是规范中的4.2. Freshness 和 4.3. Validation

Freshness

Cache Control与Expires是一组，他们是用来进行Freshness验证，也就是提供客户端检测文件是否足够新鲜，可以无需向服务端发起Validation请求就能保证并未过期可以直接使用。

所有的from cache的请求实际上都是由于浏览器认为本地的缓存资源足够新鲜，所以无需额外请求而直接使用。

具体的判断方法可以参考协议，实际上就是根据本地的时间和服务器返回头的约定信息进行对比验证。

历史问题

为何有两个参数而不是一个参数则是由于历史原因，在HTTP1.0中定义的是Expires，Expires的值是一个明确的过期时间，而后来使用中发现一旦客户端时间与服务器时间不一致就会引发很多缓存问题。

因此在HTTP 1.1中新添加了Cache Control，实现了更优的文件过期声明，比如max-age配置，是一个timespan，告知客户端这个文件多长时间不会过期而不是直接告知过期时间。

Validation

Last-Modified和ETag则是另一组控制信息，他们用来实现Validation。他们的职责是在本地缓存被浏览器判断可能不够新鲜的时候，会用这两组信息向服务器请求数据，如果服务器内容没有改变，那么约定服务器会返回304 HTTP Code表明这个缓存可以直接使用，无需重新拉取，而一旦服务器内容改变了就会返回200，同时返回新的文件内容。

历史问题

至于为何有两组字段来解决这个问题依然是历史问题，在HTTP 1.0中约定的是Last-Modified，他代表的含义是文件最后一次修改的时间，那么这种约定带来的问题是一旦内容是动态生成的，这个时间在服务器端不一定可以正确的生成，其次是Last-Modified只有秒级的精度，如果在一秒内有一次以上的文件修改，这样的缓存就会造成额外的问题。

因此HTTP1.1中新引入了ETag，他的实现不尽相同，对于动态内容，常规做法是对动态内容做HASH计算，作为ETAG返回，对于静态资源，一般是使用inode+mtime进行计算。

额外的问题

ETag也有他自己的问题，所以经常在使用中会关闭ETag。举例来说，同一个文件在不同物理机上的inode是不同的，这就导致了在分布式的Web系统中，当访问落在不同的物理机上时会返回不同的ETag，进而导致304失效，降级为200请求。解决办法也有从ETag算法中剥离inode，只是使用mtime，但是这样实际上和Last-Modified就一样了。当然你也可以额外的做一些改进，使ETag对静态资源的算法也是通过hash计算的。不过由于一般我们会使用CDN技术，因此集群部署中的ETag问题并不会造成太大的影响，所以折腾的人也不太是很多。

总结

总结一下，ETag的设置并不会影响Freshness验证，Freshness验证会和浏览器策略以及Cache Control与Expires有关。
