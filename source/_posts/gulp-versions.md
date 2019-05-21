---
layout: post
title: 'gulp自动化构建html静态资源路径版本号添加和替换'
date: 2016-03-10 20:22:15
author: 'AlenQi'
catalog: true
header-img: 'bg.png'
tags:
  - 前端开发
  - gulp
---

## Foreword

> 在使用 gulp 自动添加版本号时稍作一点修改，欢迎指正。

## 开始问题

- 我使用的是（[gulp-rev](https://github.com/sindresorhus/gulp-rev) + [gulp-rev-collector](https://github.com/shonny-ua/gulp-rev-collector)），但是每次自动化构建都是依赖 rev 生成的 json 文件：

  ```json
  "style.css": "style-f048bfa0ab.css",
  "script.js": "scrip-5c69cf6d54.js",
  ```

- 利用上面的 json 去修改 html 里面的静态路径，第二次如果不想去删除 html，只想修改静态资源的路径，文件名被修改无法依赖。

- 最直接的方法就是修改插件，使 rev 生成的 json 文件变为下面的依赖关系：

  ```json
  "style.css": "style.css?v=f048bfa0ab",
  "script.js": "scrip.js?v=5c69cf6d54",
  ```

- 这样不会修改文件的名称，依赖关系依然成立。每次输出都能按照最新的依赖关系替换我们 html 文件的静态资源路径。

## 如何做

1. 分别安装`gulp-rev`、`gulp-rev-collerctor`
   npm install --save-dev gulp-rev
   npm install --save-dev gulp-rev-collector

2. 打开 node_modules\gulp-rev\index.js
   第 133 行 manifest[originalFile] = revisionedFile;
   更新为: manifest[originalFile] = originalFile + '?v=' + file.revHash;

3. 打开 node_modules\gulp-rev\node_modules\rev-path\index.js
   10 行 return filename + '-' + hash + ext;
   更新为: return filename + ext;

4. 打开 node_modules\gulp-rev-collector\index.js
   31 行 if ( path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' ) !== path.basename(key) ) {
   更新为: if ( path.basename(json[key]).split('?')[0] !== path.basename(key) )

## Tips:

- 这三个文件的路径不是绝对的，比如 rev-path 这个文件夹也可能直接在 node_modules\rev-path

- 修改之后再构建就能达到开始提到的效果了。

- 点击链接下载修改后的文件[https://pan.baidu.com/s/1c2vRIrY](https://pan.baidu.com/s/1c2vRIrY)
