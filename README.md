# :electric_plug::rage: Where Are Available Chargers ?!

---

<h4> 📢 开发中，欢迎加入 </h4>

---

## :page_facing_up: 简介

本分支是 Version 5 (dev) 的前端部分

此版本采用了**前后端分离**的架构，降低耦合度，便于未来功能的扩展和维护；服务端渲染改为**客户端渲染**

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

## :rocket: 快速开始

### 准备工作

_注：需要使用 16.0 或更高版本的 [Node.js](https://nodejs.org/) 以及 [npm](https://www.npmjs.com/)_

```bash
# 克隆到本地
git clone git@github.com:Golevka2001/Where-Are-Available-Chargers.git && cd Where-Are-Available-Chargers

# 检出分支
git checkout dev

# 安装依赖
npm install # 或使用 yarn install
```

### 开发服务器，启动！

```bash
npm run dev # 或使用 yarn run dev
```

浏览器访问 <http://localhost:3000>

### 开发 & 调试

在 `src` 目录下进行组件、功能的开发

目录说明请参考 [src 目录结构](#open_file_folder-src-目录结构)

遵守 [开发规范](#triangular_ruler-开发规范) 以便于协作和后续的维护

查看 [Todo List](#memo-todo-list) 以了解当前开发进度和规划，完成一部分工作后请及时更新，也可以向其中添加新的任务

## :open_file_folder: src 目录结构

- `apis/`：网络请求、获取数据（按功能、模块划分子目录）
- `assets/`：静态资源
- `components/`：所使用到的组件（按功能、模块划分子目录）
- `layouts/`：页面布局、框架
- `plugins/`：插件的引入和注册
- `router/`：路由配置
- `store/`：状态管理
- `types/`：类型定义
- `views/`：页面

## :triangular_ruler: 开发规范

### UI 相关

- 尽可能使用 Vuetify 提供的 UI 组件，少造轮子
- 优先使用 Vuetify 提供的工具类来定义样式（类似 Tailwind，查阅 Vuetify 文档的 `Styles and animations` 部分），更细粒度的样式直接在 HTML 的 `style` 属性中定义
- 图标优先使用 [Material Design Icons](https://materialdesignicons.com/)，引用方式参考 Vuetify 文档
- 适当拆分 Vue 组件，避免单个组件过于臃肿
- 布局框架放在 `layouts` 目录下，而其中的组件（如：Bar、Footer）放在 `components/app` 目录下；页面（如：StatusPage、AboutPage）放在 `views` 目录下；页面中使用到的组件放在 `components` 目录下

### 代码风格相关

- 单文件组件、类型名：`PascalCase`；变量、函数、方法名：`camelCase`；TypeScript 文件名：`kebab-case`...
- 组件的模板中适当添加注释，指明用途、划分边界
- 推荐使用 Vue3 的组合式 API 和其他较新的语法

### 依赖相关

- 添加新依赖时，注意区分在开发环境用（-D）还是生产环境用（-S）
- 插件类依赖统一在 `@/plugins/index.ts` 中引入并注册
- 当前开发阶段暂时不锁版本，等基本功能完成后再添加 `package-lock.json`

## :memo: Todo List

_注：并非按照优先级排序_

- [x] 基本布局（TopBar、SideBar、Footer）
- [x] 状态管理、路由等基本配置
- [x] 分享按钮
- [x] 深色主题
- [ ] Loading、Error、About 等页面以及相关路由配置
- [ ] 状态概览组件（完成了一部分）
- [ ] 状态详情组件
- [ ] 回到顶部按钮
- [ ] Axios 封装（请求拦截、响应拦截、错误处理都未配置）
- [ ] 与后端的交互
- [ ] 数据过期提醒
- [ ] 顶部进度条
- [ ] 不同设备的适配（建议先以移动端为主开发组件，大致完成后再设计响应式布局）
- [ ] 迁移旧版页面
- [ ] 迁移文档
- [ ] ...

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
