# :electric_plug::rage:Where Are Available Chargers?

---

<p align="center" style="font-size: 1.5rem; font-weight:bold;">Version 3 "🌊Water Wave": New Style</p>

## 查询网址：<http://chargers.injs.eu>

这是一个用来查询校园内各个充电桩的使用情况的小工具，希望它可以帮你更方便给小电驴找到充电桩。

希望它可以帮你更方便给小电驴找到充电桩。

如果它对你有帮助的话，可以点击右上角的 :star:**Star** 按钮（~~或者**v我50**~~）感谢您的支持！ :tada::tada::tada:

## 目录
- [:electric\_plug::rage:Where Are Available Chargers?](#electric_plugragewhere-are-available-chargers)
  - [查询网址：http://chargers.injs.eu](#查询网址httpchargersinjseu)
  - [目录](#目录)
  - [使用方法](#使用方法)
    - [准备工作](#准备工作)
    - [修改模板](#修改模板)
    - [渲染 HTML](#渲染-html)
    - [备注](#备注)
  - [更新日志](#更新日志)
  - [使用许可](#使用许可)


## 使用方法

**本工具获取原始数据的部分在 [`main`](https://github.com/Golevka2001/Where-Are-Available-Chargers/tree/main) 和 [`dev`](https://github.com/Golevka2001/Where-Are-Available-Chargers/tree/dev) 分支。本分支是 version 3 新界面的渲染模板与代码，需要使用位于 `main` 或 `dev` 分支的代码获取充电桩状态，再传入本部分代码渲染。**

本分支采用 ES modules，您可以在 `src/test.js` 中查看使用样例。

### 准备工作
0. 安装 `node` 和 `yarn`。开发时使用的是 `node@18` 和 `yarn@4`。目前依赖项目较少，您也可以尝试迁移依赖链到 `npm`。
1. 克隆项目 `git clone https://github.com/Golevka2001/Where-Are-Available-Chargers.git&&cd Where-Are-Available-Chargers`
2. 检出分支 `git checkout version-3`
3. 安装依赖 `yarn install` 

### 修改模板
您可以按 HTML 语法和 mustache 语法修改 `./src/mustache-templates` 下的模板。

**初次运行或每次修改模板后均需要运行 `pretreat.py` 重新生成 `src/mustache_templates.js`**

### 渲染 HTML
0. 通过 `dev` 分支的代码获取充电桩数据。
1. 将数据处理为格式与 `example/all_information.json` 类似的 Map ，记为 `ALL_INFORMATION`。`0` 表示占用，`1` 表示空闲。
2. 调用 `src/rend.js` 中的方法，传入 `ALL_INFORMATION` 参数或相应字符串渲染 HTML 文件。注意异步函数需要 `await`。

### 备注
1. 结果编号（`ALL_INFORMATION["update_message"]["last_success_query_id"]`）可自行生成。建议使用严格递增的数字作为结果编号。公共实例中返回的结果编号规则可见其文档。

## 更新日志

**2023-04-10** Version `3.4.1`
1. 更名： `北门东侧A` -> `北门东北侧` ，`北门东侧B` -> `北门东南侧` 。
2. 总数“余量紧张”判定条件改为 `空余充电插座数 < 100`。

**2023-04-09** Version `3.4.0`
1. 完善北门东侧B。
2. 更新 `all_infomation.json`。

**2023-04-09** Version `3.4.0-RC.1`
1. 新增充电桩：`北门东侧B`，进度 3/6。
2. 调整充电桩：`北门东侧` -> `北门东侧A`。
3. 调整充电桩：南门东侧充电桩被移动（物理）到东门北侧。
4. 支持渲染ID不完整/不连续的充电桩列表。
5. 微调显示：现在可以显示7\~8组充电桩速览数据。

存在的问题：`all_infomation.json` 有待更新，`北门东侧B` 不完整。

**2023-03-25** Version `3.3.4`
1. 修复不显示“存在部分充电桩未获取到数据”的bug。
2. 新增“结果已过期”提示（浏览器JS实现）。
3. 微调样式：避免在页面宽度接近一栏/两栏切换的临界值附近时显示错位。

**2023-03-25** Version `3.3.3`
1. 尝试修复夜间模式的兼容性问题。
2. 经典页面支持夜间模式。

**2023-03-25** Version `3.3.2`
1. 支持夜间模式。

**2023-03-25** Version `3.3.1`
1. 修复总览条一直显示`充电桩余量紧张`的 bug。

**2023-03-24** Version `3.3.0-RC.2`
1. 清理 `rend.js` 中无用循环。
2. 修改 `example/all_information.json` 和 `test.js` 以符合新 `rend.js`。

**2023-03-24** Version `3.2.1`
1. 修改 HTML 元数据：
   - 提供了 Apple “添加到主屏幕” 自动采用的应用图标。
   - 添加了 `description`。
2. 浏览器兼容性：
   - 测试了 IE 的浏览器兼容性，略有错位但是能用。
   - 待测试腾讯 X5、远古 Android Webview 的兼容性。
3. 无障碍：
   - 先前的版本考虑了红绿色盲问题，仍需测试。
   - 考虑了缩放倍数（大字号、页面放大）问题，略有错位但是不影响使用。
   - 测试了缺失CSS时的网站体验：能用，但是不如旧版。
4. 调整文件名。

**2023-03-23** Version `3.2.0-RC.6`
1. 调整界面
   - 表格详情上显示空插座数量，“回到顶部”按钮移至右侧。
   - 上方总览部分增加“查看详情”视觉提示。
   - “余量：”改为 “桩号·余量” 样例，便于理解。
2. 页面最上方提示余量紧张的判定条件改为小于 75 个充电插座（原为 50 个）。

**2023-03-23** Version `3.2.0-RC.2`
1. 支持渲染为经典页面。
2. 微调界面。

**2023-03-23** Version `3.1.12`
1. 微调界面。
2. 充电站的空插座总数：占用率高低变色（绿/橙）。
3. 显示结果编号。

**2023-03-22** Version `3.1.0-RC.6`
1. 增加与经典界面类似的充电插座状态显示表格。
2. 微调界面。
3. 公共实例 `https://chargers.injs.eu/` 改用 Version 3

**2023-03-21** Version `3.0.0-RC.13`
1. 初版，页面改自 GitHub Status Page。
2. 支持每个充电站的空插座总数显示、每个充电桩空余数量显示。


## 使用许可

本分支采用 AGPLv3 许可证。 

[GNU AFFERO GENERAL PUBLIC LICENSE, Version 3](https://www.gnu.org/licenses/agpl-3.0.html)

```
Copyright (C) 2022 - Present Gol3vka, Csimide, and other contributors

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
```


- `src/static/css/style.pure.css` 中引入的css文件和字体文件具有不同的许可证，详情请参阅该文件。

- `src/static/img/favicon.ico` 来自 [Google Fonts - Noto Emoji](https://github.com/googlefonts/noto-emoji)。该项目的 Emoji 图像按 [Apache license, version 2.0](http://www.apache.org/licenses/LICENSE-2.0) 授权。

- `src/static/img/apple-touch-icon.png` 采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可证。
  - `Copyright (C) 2023 Gol3vka and Csimide`
  - 该文件采用了来自 [Twemoji](https://github.com/twitter/twemoji) 的 Emoji 字形。Twemoji 按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 授权使用。
  - 文件采用了来自 Segoe UI Emoji (Version `1.29`) 的 Emoji 字形。Segoe UI Emoji 按微软文档 [Font redistribution FAQ (Frequently Asked Questions) for Windows](https://learn.microsoft.com/en-us/typography/fonts/font-faq) 使用。
