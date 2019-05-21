---
layout:     post
title:      'Atom 使用插件精选(FE)'
date:       2017-03-10 21:56:25
author:     'AlenQi'
catalog:    true
header-img: 'atom-bg.png'
tags:

    - 前端开发
    - atom
    - 编辑器
    - 插件

---

## Foreword

> Atom 琳琅满目的插件中， 很多插件良莠不齐， 根据我的实践情况， 为前端 coder 推荐一些实用的插件。 

1. <big>[sync-settings](https://atom.io/packages/sync-settings)</big>

首先， 这是一个配置备份插件， 方便以后的迁移， 配合 gist 实用快捷。 

2. <big>[atom-beautify](https://atom.io/packages/atom-beautify)</big>

使你的代码一键格式化， 支持多种语言， 相对较全。 

3. <big>[autoclose-html](https://atom.io/packages/autoclose-html)</big>

html 代码自动化闭合， 更加便捷的写 div.

4. <big>[autocomplete-paths](https://atom.io/packages/autocomplete-paths)</big>

更加智能的补全你的资源路径。 

5. <big>[autoprefixer](https://atom.io/packages/autoprefixer)</big>

为 CSS 和 SCSS 增加浏览器前缀。 

6. <big>[color-picker](https://atom.io/packages/color-picker)</big>

在编辑器选择你想要的颜色， 找到颜色， 点击就 OK.

7. <big>[docblockr](https://atom.io/packages/docblockr)</big>

辅助编写你的注释， 让你爱上写注释。 

8. <big>[elastic-tabstops](https://atom.io/packages/elastic-tabstops)</big>

弹性制表符， 适用于对于 tab 有强迫症的 coder。 

9. <big>[emmet](https://atom.io/packages/emmet)</big>

前端神器多年， 前端必备， 配合快捷键更个性化。 

10. <big>[file-icons](https://atom.io/packages/file-icons)</big>

指定文件扩展名的图标和颜色， 改善视觉。 

11. <big>[git-control](https://atom.io/packages/git-control)</big>

提供了一个 GUI 界面来管理所有常用的 git 命令。 （如果你不喜欢命令行）

12. <big>[gulp-control](https://zhuanlan.zhihu.com/p/24753739)</big>

显示 gulp 任务的列表, 在 atom 里实现 GUI 执行。 

13. <big>[highlight-selected](https://atom.io/packages/highlight-selected)</big>

双击时高亮当前选择的词。 

14. <big>[jquery-snippets](https://atom.io/packages/jquery-snippets)</big>

支持 jquery 代码编写。 

15. <big>[language-vue](https://atom.io/packages/language-vue)</big>

高亮显示 Vue 代码, 支持 Vue 组件。 

16. <big>[linter-csslint](https://atom.io/packages/linter-csslint)</big>

检测你的 CSS 是否基本规范， 减少你的错误， 提高代码质量。 

17. <big>[linter-eslint](https://atom.io/packages/linter-eslint)</big>

看你上面的， 我想你也了解这个是干嘛的了。 

18. <big>[linter-sass-lint](https://atom.io/packages/linter-sass-lint)</big>

如果你使用 SASS/SCSS， 这个检测是必要的。 

19. <big>[minimap](https://atom.io/packages/minimap)</big>

一个完整源代码的预览， 让你看到代码地图。 （不建议在一个文件里写很长的代码）

20. [minimap-highlight-selected](https://atom.io/packages/minimap-highlight-selected)</big>

在你代码概览地图上高亮显示你的选择。 

21. <big>[open-in-browsers](https://atom.io/packages/open-in-browsers)</big>

你想在哪个浏览器里运行你的代码， 安装这个吧。 

22. <big>[regex-railroad-diagram](https://atom.io/packages/regex-railroad-diagram)</big>

如果你经常要写正则表达式， 这个插件可以显示光标下的正则表达式铁路图。 

23. <big>[simplified-chinese-menu](https://atom.io/packages/simplified-chinese-menu)</big>

Atom 的简体中文语言包， 完整汉化， 兼容所有已发布版本 Atom。 

24. <big>[tree-view-git-status](https://atom.io/packages/tree-view-git-status)</big>

树形文件视图中显示 Git 存储库状态。 

25. <big>[prettier-atom](https://atom.io/packages/prettier-atom)</big>

An atom package for the prettier formatter.

### Tips:

1. 之前找了很久 atom 的自动保存插件， 没找到， 原来骑驴找驴， 在自带的核心扩展里面就有。 [autosave](https://atom.io/packages/autosave)， 把里面的配置 settings 里的"Enabled"勾选中， 就可以在当前编辑页面失去焦点的时候自动保存。 

2. 在编辑器的核心包里有[line-ending-selector](https://atom.io/packages/line-ending-selector)可以定义你的换行类型。 

3. 这个链接是我的配置 gist： 

   [GitHubGist](https://gist.github.com/AlenQi/e84eca296c2a5f274234e3212f8a6736)（包含上面所有的插件， 还有我自己的配置， 可以直接导入扩展）

4. 如果你想更改 atom-beautify 里的换行符， LF or CRLF ， see:

- Retrieves the default line ending based upon the Atom configuration

- `line-ending-selector.defaultLineEnding` . If the Atom configuration

- indicates "OS Default", the `process.platform` is queried, returning

- CRLF for Windows systems and LF for all other systems.

- Code modified from atom/line-ending-selector

- returns: The correct line-ending character sequence based upon the Atom

- configuration, or `null` if the Atom line ending configuration was not

- recognized.

- see: [line-ending](https://github.com/atom/line-ending-selector/blob/master/lib/main.js)

- 在下面的路径下修改你想要的： 

- `packages\atom-beautify\src\beautifiers\js-beautify.coffee` 

  

```coffee
  getDefaultLineEnding= ->
  switch atom.config.get('line-ending-selector.defaultLineEnding')
    when 'LF'
      return '\n'
    when 'CRLF'
      return '\r\n'
    when 'OS Default'
      return if process.platform is 'win32' then '\r\n' else '\n'
    else
      return null
  ```

