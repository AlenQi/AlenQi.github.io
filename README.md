# Welcome

## Catalogue

- [前端面试系列 -- JS](http://www.alenqi.site/2019/07/02/interview-js/)
- [算法实现系列（5）—— 找到数组中几个数相加和等于一个固定值](http://www.alenqi.site/2019/06/27/find-addend/)
- [算法实现系列（4）—— 斐波那契数列](http://www.alenqi.site/2019/06/20/fibonacci/)
- [算法实现系列（3）—— 0.1+0.2](http://www.alenqi.site/2019/06/19/decimal-addition/)
- [算法实现系列（2）——大数求和](http://www.alenqi.site/2019/06/17/addition-of-large-numbers/)
- [算法实现系列（1）——算法排序算法](http://www.alenqi.site/2018/03/11/sort-algorithm/)
- [我们为什么需要 Node 中间层](http://www.alenqi.site/2018/11/16/node-interlayer/)
- [Git 使用分享](http://www.alenqi.site/2018/09/27/git-flow/)
- [你的 JavaScript 代码都经历了什么](http://www.alenqi.site/2018/08/19/code-course/)
- [利用标签完善你的网站](http://www.alenqi.site/2018/03/04/complete-tags/)
- [优雅的 JS](http://www.alenqi.site/2017/10/30/graceful-js/)
- [花式垂直居中](http://www.alenqi.site/2017/10/29/vertical-center/)
- [函数截流和去抖之间的区别](http://www.alenqi.site/2017/10/06/throttling-debouncing/)
- [那些被阻止的页面](http://www.alenqi.site/2017/10/05/the-blocked-page/)
- [Preference](http://www.alenqi.site/2017/07/11/preference/)
- [输入了 url 然后呢？ ](http://www.alenqi.site/2017/05/25/page-load/)
- [CORS 跨域资源共享](http://www.alenqi.site/2017/03/29/cors/)
- [Atom 使用插件精选(FE)](http://www.alenqi.site/2017/03/11/atom-edit/)
- [Array ES6](http://www.alenqi.site/2017/02/22/array-es6/)
- [Promise ES6](http://www.alenqi.site/2017/01/17/promise-es6/)
- [Git Command Summary](http://www.alenqi.site/2016/06/13/git-command/)
- [gulp 自动化构建 html 静态资源路径版本号添加和替换](http://www.alenqi.site/2016/03/11/gulp-versions/)
- [IT 2048](http://www.alenqi.site/2016/02/04/IT2048/)

## About

- [About](http://www.alenqi.site/about/)

## Usage

I didn't publish it as a single theme folder because a few of the pages are added and modified manually, so you should manually create some extra folders in `source` for the new pages and modify the `_config.yml` if you only have the single theme folder.

```
npm run build
```

#### 1. Init

```bash
git clone https://github.com/AlenQi/AlenQi.github.io.git
    cd AlenQi.github.io
npm install
```

#### 2. Modify

Modify `_config.yml` file with your own info.
Especially the section:

```bash
deploy:
    type: git
repo: https://github.com/AlenQi/AlenQi.github.io.git
    branch: master
```

Replace with your own repo!

#### 3. Writting/Serve/Deploy

```bash
hexo new post "IMAPOST"
hexo serve
# run hexo in local environment
hexo clean && hexo deploy
# hexo will push the static files automatically into the specific branch(master) of your repo!
```
