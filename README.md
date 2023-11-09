# :electric_plug::rage: Where Are Available Chargers ?!

- [:electric_plug::rage: Where Are Available Chargers ?!](#electric_plugrage-where-are-available-chargers-)
  - [:page_facing_up: 简介](#page_facing_up-简介)
  - [:rocket: 快速开始](#rocket-快速开始)
    - [准备工作](#准备工作)
    - [开发服务器，启动！](#开发服务器启动)
    - [开发 \& 调试](#开发--调试)
    - [构建](#构建)
    - [部署](#部署)
  - [:open_file_folder: 目录结构](#open_file_folder-目录结构)
  - [:triangular_ruler: 开发规范](#triangular_ruler-开发规范)
    - [提交相关](#提交相关)
    - [UI 相关](#ui-相关)
    - [代码风格相关](#代码风格相关)
    - [依赖相关](#依赖相关)
  - [:memo: Todo List](#memo-todo-list)
  - [:lady_beetle: Bugs](#lady_beetle-bugs)
  - [:book: API 文档](#book-api-文档)
  - [:scroll: 使用许可](#scroll-使用许可)

## :page_facing_up: 简介

<h4>
  查询网址：
  <a href="https://chargers.injs.eu" target="_blank">
    https://chargers.injs.eu
  </a>
</h4>

本项目开始于 2022 年 11 月，初衷是为了帮助 SEUers 更便捷地找到空闲充电桩，可在[关于页面](https://chargers.injs.eu/about)查看更多信息。如果它对您有帮助的话，可以点击右上角的 ⭐Star 按钮，感谢您的支持 :tada::tada::tada:

当前版本为 _Version 5_，本分支中代码目前仅为前端部分（后续考虑合并后端）

此版本采用了**前后端分离**的架构，降低耦合度，便于未来功能的扩展和维护；服务端渲染改为**客户端渲染**（经典版页面出于兼容性考虑仍使用服务端渲染）

前端所使用到的技术栈如下：

<table style="text-align: center;">
  <thead>
    <tr>
      <th>语言</th>
      <th>框架</th>
      <th>构建工具</th>
      <th>UI 组件库</th>
      <th>路由</th>
      <th>状态管理</th>
      <th>网络请求库</th>
      <th>数据模拟</th>
      <th>单元测试</th>
    </tr>

  </thead>
  <tbody>
    <tr>
      <td><a href="https://www.typescriptlang.org/">TypeScript</a></td>
      <td><a href="https://vuejs.org/">Vue.js</a></td>
      <td><a href="https://vitejs.dev/">Vite</a></td>
      <td><a href="https://vuetifyjs.com/">Vuetify</a></td>
      <td><a href="https://router.vuejs.org/">Vue Router</a></td>
      <td><a href="https://pinia.vuejs.org/">Pinia</a></td>
      <td><a href="https://axios-http.com/">Axios</a></td>
      <td><a href="http://mockjs.com/">Mock.js</a></td>
      <td><a href="https://vitest.dev/">Vitest</a></td>
    </tr>
  </tbody>
</table>

代码风格遵循 [Vue 风格指南](https://v2.cn.vuejs.org/v2/style-guide) 以及 Vue3 的 [组合式 API 风格](https://vuejs.org/guide/introduction.html#api-styles)，格式化工具使用 [Prettier](https://prettier.io/)

---

:bulb: _以下内容更多面向开发者，如果您只是想使用查询功能，可直接从上方的[网址](https://chargers.injs.eu)进入_

---

## :rocket: 快速开始

### 准备工作

_注：需要使用 16.0 或更高版本的 [Node.js](https://nodejs.org/) 与 [Yarn](https://yarnpkg.com/) `^4.0.1`。_

```bash
# 克隆到本地
git clone git@github.com:Golevka2001/Where-Are-Available-Chargers.git && cd Where-Are-Available-Chargers

# 检出分支
git checkout dev

# 安装依赖
yarn install
```

### 开发服务器，启动！

```bash
yarn run dev
```

浏览器访问 <http://localhost:3000>

### 开发 & 调试

在 `src` 目录下进行组件、功能的开发

目录说明请参考 [src 目录结构](#open_file_folder-src-目录结构)

遵守 [开发规范](#triangular_ruler-开发规范) 以便于协作和后续的维护

查看 [Todo List](#memo-todo-list) 以了解当前开发进度和规划，完成一部分工作后请及时更新，也可以向其中添加新的任务

### 构建

```bash
yarn run build
```

构建后的文件位于 `dist` 目录下，请不要提交该目录下的文件到仓库

如需在本地预览构建后的应用，可以执行以下命令：

```bash
yarn run preview
```

浏览器访问 <http://localhost:4173>

### 部署

部署到生产环境时，`Mock` 将会被自动禁用，数据将从后端获取

需要配置环境变量 `VITE_API_URL`，指向后端 API 的地址

## :open_file_folder: 目录结构

- `mock/`：模拟后端返回数据（仅用于开发环境，尽可能模拟各种情况）
- `src/`
  - `apis/`：网络请求、获取数据（目前包含 `充电桩状态` 和 `天气预报`）
  - `assets/`：在构建时参与打包的静态资源
  - `components/`
    - `global/`：可能全局使用的组件
    - `layouts/`：页面布局相关的组件
    - `xxx-page/`：特定页面使用的组件
  - `layouts/`：页面布局、框架
  - `plugins/`：插件的引入和注册
  - `router/`：路由配置
  - `store/`：状态管理
  - `types/`：类型定义
  - `views/`：页面

## :triangular_ruler: 开发规范

### 提交相关

- 提交代码到远程仓库前，请执行以下检查：
  - **执行 `yarn run build` 检查构建是否成功【重要】**
  - 执行 `yarn run lint` 检查代码风格
  - 执行 `yarn run format` 格式化代码
- Commit message 推荐遵循 [Angular 提交规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)，使用 `<Type> | <Subject>` 的格式，例如：
  - `Feat | Add a progress linear`
  - `Fix | Incorrect judgment in status page`
  - `Docs | Update todo list in README`

### UI 相关

- 尽可能使用 Vuetify 提供的 UI 组件，少造轮子
- 优先使用 Vuetify 提供的工具类来定义样式（类似 Tailwind，查阅 Vuetify 文档的 `Styles and animations` 部分），更细粒度的样式直接在 HTML 的 `style` 属性中定义
- 图标优先使用 [Material Design Icons](https://materialdesignicons.com/)，为减小体积，请在组件中按需从 `@mdi/js` 中引入，具体方式见 [Vuetify 文档](https://vuetifyjs.com/features/icon-fonts/#mdi-js-svg)
- 适当拆分 Vue 组件，避免单个组件过于臃肿
- 布局框架放在 `layouts` 目录下，而其中的组件（如：Bar、Footer）放在 `components/app` 目录下；页面（如：StatusPage、AboutPage）放在 `views` 目录下；页面中使用到的组件放在 `components` 目录下

### 代码风格相关

- 单文件组件、类型名：`PascalCase`；变量、函数、方法名：`camelCase`；TypeScript 文件名：`kebab-case`...
- 组件的模板中适当添加注释，指明用途、划分边界
- 推荐使用 Vue3 的组合式 API 和其他较新的语法

### 依赖相关

- 添加新依赖时，注意区分在开发环境用（-D）还是生产环境用（-S）
- 需要全局使用的插件统一在 `@/plugins/index.ts` 中引入并注册（如：Vuetify、Pinia 等）；而使用频率较低的插件推荐在组件中按需引入（如：V-Viewer 等）
- 当前开发阶段暂时不锁版本，等基本功能完成后再添加 `package-lock.json`

## :memo: Todo List

_注：并非按照优先级排序_

- [x] 整体布局

  - [x] 主题切换 & 自动检测
  - [x] 模拟进度条
  - [x] 分享菜单
  - [x] 旧版本跳转
  - [ ] 多语言支持【待定】

- [x] 状态页面

  - [x] 状态概览
  - [x] 状态详情
  - [x] 天气预报
  - [x] 自动刷新
  - [x] 数据过期提醒 & 刷新按钮
  - [x] 位置描述 & 标号顺序提示
  - [x] 跳转到地图页面
  - [x] “仅供参考” 免责声明
  - [x] 预留公告栏

- [x] 位置图示页面

- [x] 地图页面

  - [x] 回到首页
  - [x] 快速切换充电站
  - [ ] 定位【待定】

- [x] 错误页面

- [x] 关于页面

- [ ] 文档页面

- [ ] 历史数据页面【待定】

## :lady_beetle: Bugs

- 在微信的 Webview 中，弹出抽屉（包括 `侧栏菜单` 和 `详细状态`）会导致页面立即滚动到顶部
- 首次加载时，页面跳转会卡在 Loading，页面内容（如 `img`、`iframe`）不加载或不触发 `load` 事件

## :book: API 文档

临时文档： <https://app.swaggerhub.com/apis/Golevka2001/where-are-available-chargers-api/5.0.0>

## :scroll: 使用许可

本项目 Ver 3 及后续版本采用 AGPLv3 许可证。

[GNU AFFERO GENERAL PUBLIC LICENSE, Version 3](https://www.gnu.org/licenses/agpl-3.0.html)

```

Copyright (C) 2022 - Present Gol3vka, Csimide, and other contributors

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

```

- `public/favicon.svg` 来自 [Google Fonts - Noto Emoji](https://github.com/googlefonts/noto-emoji)，该项目的 Emoji 图像按 [Apache license, version 2.0](http://www.apache.org/licenses/LICENSE-2.0) 授权。

- `public/apple-touch-icon.png` 采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可证。

- `public/img/illustration.webp` 采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可证。
