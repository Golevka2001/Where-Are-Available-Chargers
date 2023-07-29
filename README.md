# :electric_plug::rage:Where Are Available Chargers?

---

<p align="center">Version 4 "🌌Milky Way"</p>

## 查询网址：<http://chargers.injs.eu>

这是一个用来查询校园内各个充电桩的使用情况的小工具，希望它可以帮你更方便给小电驴找到充电桩。

希望它可以帮你更方便给小电驴找到充电桩。

如果它对你有帮助的话，可以点击右上角的 :star:**Star** 按钮（~~或者**v 我 50**~~）感谢您的支持！ :tada::tada::tada:

## 目录

-   [:electric_plug::rage:Where Are Available Chargers?](#electric_plugragewhere-are-available-chargers)
    -   [查询网址：http://chargers.injs.eu](#查询网址httpchargersinjseu)
    -   [目录](#目录)
    -   [使用方法](#使用方法)
    -   [更新日志](#更新日志)
    -   [使用许可](#使用许可)

## 使用方法

请见源代码 `doc` 文件夹。

## 更新日志

**2023-07-29** Version `4.1.1`

1. 天气（非开箱即用，文档之后补）。

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

-   `src/static/css/style.pure.css` 中引入的 css 文件和字体文件具有不同的许可证，详情请参阅该文件。

-   `src/static/img/favicon.ico` 来自 [Google Fonts - Noto Emoji](https://github.com/googlefonts/noto-emoji)。该项目的 Emoji 图像按 [Apache license, version 2.0](http://www.apache.org/licenses/LICENSE-2.0) 授权。

-   `src/static/img/apple-touch-icon.png` 采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可证。
    -   `Copyright (C) 2023 Gol3vka and Csimide`
    -   该文件采用了来自 [Twemoji](https://github.com/twitter/twemoji) 的 Emoji 字形。Twemoji 按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 授权使用。
    -   文件采用了来自 Segoe UI Emoji (Version `1.29`) 的 Emoji 字形。Segoe UI Emoji 按微软文档 [Font redistribution FAQ (Frequently Asked Questions) for Windows](https://learn.microsoft.com/en-us/typography/fonts/font-faq) 使用。
