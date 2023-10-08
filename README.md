# :electric_plug::rage:Where Are Available Chargers?

---

<p align="center">Version 4 "🌌Milky Way"</p>

> **Important**
> 
> 此项目的开发分支为 [`dev`](https://github.com/Golevka2001/Where-Are-Available-Chargers/tree/dev) 分支。
> 
> 当前分支 `version-4` 是 Version 4 "🌌Milky Way" 的代码归档。Ver 4 的前端部分已中止开发；后端部分可能会作为独立分支或储存库提供。**除非必要情况，此分支将不再更新。**
> 
> Version 5 "🔮Crystal Ball" 采用了现代化的前端框架，优化了 UI 设计。请切换到 [`dev`](https://github.com/Golevka2001/Where-Are-Available-Chargers/tree/dev) 分支获取更多关于 Version 5 的信息。欢迎加入 Where Are Available Chargers 的开发。

## 查询网址：<http://chargers.injs.eu>

这是一个用来查询校园内各个充电桩的使用情况的小工具，希望它可以帮你更方便给小电驴找到充电桩。

希望它可以帮你更方便给小电驴找到充电桩。

如果它对你有帮助的话，可以点击右上角的 :star:**Star** 按钮（~~或者**v 我
50**~~）感谢您的支持！ :tada::tada::tada:

## 目录

- [:electric_plug::rage:Where Are Available Chargers?](#electric_plugragewhere-are-available-chargers)
  - [查询网址：http://chargers.injs.eu](#查询网址httpchargersinjseu)
  - [目录](#目录)
  - [使用方法](#使用方法)
  - [更新日志](#更新日志)
  - [使用许可](#使用许可)

## 使用方法

请见源代码 `doc` 目录。

## 更新日志

**2023-10-08** Version `4.2.1`

1. 支持充电插座状态渲染为灰色“故障”。
2. `rend.js` 添加注释。
3. 位置示意图更新至 202310 (Ver 1.1)

**2023-09-20** Version `4.2.0`

1. 修复错误页面可能无法渲染的问题。
2. 简化 `rend.js` 内经典界面、Ver 4 界面渲染的重复逻辑。

**2023-09-19**
1. 统一标识符命名格式。
2. 增加 `deno task precommit` 格式化代码。

**2023-09-19** Version `4.1.4`

1. 新增一批充电桩： `东门北侧` N1~N4， `南门东侧` A B  （共6个）。
2. 总览 UI 变化：现在已满的充电桩不会在 `桩号·余量` 中显示。

**2023-09-14**

1. 修复 Internet Explorer 10
   或更高版本及其他浏览器中，充电桩详情显示错位的问题。（IE 显示效果还是有很多
   bug，不打算修了）

**2023-09-13** Version `4.1.3`

1. 整理页首页脚。

**2023-09-12** Version `4.1.2`

1. 标题栏支持自适应显示。在显示环境较窄时，改为显示 ":electric_plug::rage:SEU
   Chargers" 以免长标题溢出。
2. 启用菜单栏，加入充电桩位置示意图。
3. 新增“提示”等样式，需要自行改 HTML 代码（文档之后补，咕咕咕）。
4. 修复 Bug 并为未来添加新充电桩准备: 现在 `chargers_raw_data` 中出现不在
   `config` 里的充电桩时，会打印 log 但不会报错中止。

**2023-07-29** Version `4.1.1`

1. 天气，使用方法见文档 （`doc` 目录）。

**2023-05-29** Version `4.1.0`

1. 调整页脚设计。
2. 修复 `mustache-template/station.mustache` 中 `<span>` 标签不闭合的问题。

**2023-05-22**

1. 代码清理。

**2023-05-12** Version `4.0.1`

1. 补全基础文档。
2. 修了一点点 bug。

**2023-05-11** Version `4.0.0`

1. 完善数据源鉴权。

**2023-05-06** Version `4.0.0-RC.3`

1. 加入基于 Deno KV 的缓存功能。
2. 提供新 API 接口。

**2023-05-05** Version `4.0.0-RC.1`

1. 使用新数据源。

**2023-05-02 之前的版本**<br />

1. Ver 1、Ver 2 请见 `deprecated` 分支。
2. Ver 3 请见 `version-3` 分支。

## 使用许可

本项目 Ver 3 及更新版本采用 AGPLv3 许可证。

[GNU AFFERO GENERAL PUBLIC LICENSE, Version 3](https://www.gnu.org/licenses/agpl-3.0.html)

```
Copyright (C) 2022 - Present Gol3vka, Csimide, and other contributors

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
```

- `src/static/css/style.pure.css` 中引入的 css
  文件和字体文件具有不同的许可证，详情请参阅该文件。

- `src/static/img/favicon.ico` 来自
  [Google Fonts - Noto Emoji](https://github.com/googlefonts/noto-emoji)。该项目的
  Emoji 图像按
  [Apache license, version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
  授权。

- `src/static/img/apple-touch-icon.png` 采用
  [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可证。

  - `Copyright (C) 2023 Gol3vka and Csimide`
  - 该文件采用了来自 [Twemoji](https://github.com/twitter/twemoji) 的 Emoji
    字形。Twemoji 按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
    授权使用。
  - 文件采用了来自 Segoe UI Emoji (Version `1.29`) 的 Emoji 字形。Segoe UI Emoji
    按微软文档
    [Font redistribution FAQ (Frequently Asked Questions) for Windows](https://learn.microsoft.com/en-us/typography/fonts/font-faq)
    使用。

- `src/static/img/map202310_1_1.webp` 采用
  [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可证。
