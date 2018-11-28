# Welcome

## Catalogue

- [我们为什么需要Node中间层](http://www.alenqi.site/2018/11/16/node-interlayer/)
- [Git 使用分享](http://www.alenqi.site/2018/09/27/git-flow/)
- [你的JavaScript代码都经历了什么](http://www.alenqi.site/2018/08/19/code-course/)
- [排序算法](http://www.alenqi.site/2018/03/11/sort-algorithm/)
- [利用标签完善你的网站](http://www.alenqi.site/2018/03/04/complete-tags/)
- [优雅的JS](http://www.alenqi.site/2017/10/30/graceful-js/)
- [花式垂直居中](http://www.alenqi.site/2017/10/29/vertical-center/)
- [函数截流和去抖之间的区别](http://www.alenqi.site/2017/10/06/throttling-debouncing/)
- [那些被阻止的页面](http://www.alenqi.site/2017/10/05/the-blocked-page/)
- [Preference](http://www.alenqi.site/2017/07/11/preference/)
- [输入了url然后呢？](http://www.alenqi.site/2017/05/25/page-load/)
- [CORS 跨域资源共享](http://www.alenqi.site/2017/03/29/cors/)
- [Atom使用插件精选(FE)](http://www.alenqi.site/2017/03/11/atom-edit/)
- [Array ES6](http://www.alenqi.site/2017/02/22/array-es6/)
- [Promise ES6](http://www.alenqi.site/2017/01/17/promise-es6/)
- [Git Command Summary](http://www.alenqi.site/2016/06/13/git-command/)
- [gulp自动化构建html静态资源路径版本号添加和替换](http://www.alenqi.site/2016/03/11/gulp-versions/)
- [IT 2048](http://www.alenqi.site/2016/02/04/IT2048/)

## About

- [About](http://www.alenqi.site/about/)

## Usage

I didn't publish it as a single theme folder because a few of the pages are added and modified manually, so you should manually create some extra folders in `source` for the new pages and modify the `_config.yml` if you only have the single theme folder.

```
npm run build
```

#### 1.Init

```
git clone https://github.com/AlenQi/AlenQi.github.io.git
cd AlenQi.github.io
npm install
```

#### 2.Modify
Modify `_config.yml` file with your own info.
Especially the section:

```
deploy:
 type: git
 repo: https://github.com/AlenQi/AlenQi.github.io.git
 branch: master
```
Replace with your own repo!

#### 3.Writting/Serve/Deploy

```
hexo new post IMAPOST
hexo serve // run hexo in local environment
hexo clean && hexo deploy // hexo will push the static files automatically into the specific branch(master) of your repo!
```
