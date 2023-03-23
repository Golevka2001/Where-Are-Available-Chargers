# :electric_plug::rage:Where Are Available Chargers?

---

<p align="center" style="font-size: 1.5rem; font-weight:bold;">Version 3 "🌊Water Wave": New Style</p>

## 查询网址：<http://chargers.injs.eu>

这是一个用来查询校园内各个充电桩的使用情况的小工具，希望它可以帮你更方便给小电驴找到充电桩。

希望它可以帮你更方便给小电驴找到充电桩。

如果它对你有帮助的话，可以点击右上角的 :star:**Star** 按钮（~~或者**v我50**~~）感谢您的支持！ :tada::tada::tada:

---

**本工具获取原始数据的部分在 [`main`](https://github.com/Golevka2001/Where-Are-Available-Chargers/tree/main) 和 [`dev`](https://github.com/Golevka2001/Where-Are-Available-Chargers/tree/dev) 分支。本分支是 version 3 新界面的渲染模板与代码，需要使用位于 `main` 或 `dev` 分支的代码获取充电桩状态，再传入本部分代码渲染。**

## 更新日志

**2023-03-23** Version 3.2.0-RC.6
1. 调整界面
   - 表格详情上显示空插座数量，“回到顶部”按钮移至右侧。
   - 上方总览部分增加“查看详情”视觉提示。
   - “余量：”改为 “\[桩号\]·余量” 样例，便于理解。
2. 页面最上方提示余量紧张的判定条件改为小于 75 个充电插座（原为 50 个）。

**2023-03-23** Version 3.2.0-RC.2
1. 支持渲染为旧版页面。
2. 微调界面。

**2023-03-23** Version 3.1.12
1. 微调界面。
2. 充电站的空插座总数：占用率高低变色（绿/橙）。
3. 显示结果编号。

**2023-03-22** Version 3.1.0-RC.6
1. 增加与旧版类似的充电插座状态显示表格。
2. 微调界面。
3. 公共实例 `https://chargers.injs.eu/` 改用 Version 3

**2023-03-21** Version 3.0.0-RC.13
1. 初版，页面改自 GitHub Status Page。
2. 支持每个充电站的空插座总数显示、每个充电桩空余数量显示。


## 使用许可

本分支采用 AGPLv3 许可证。`style.pure.css` 中引入的css文件具有不同的许可证，详情请参阅该文件。

[GNU AFFERO GENERAL PUBLIC LICENSE, Version 3](https://www.gnu.org/licenses/agpl-3.0.html)
