# 服务端

当前文档适用于 Ver 4.1.0

## 特性

- 使用百骑客官方接口获取数据。
- 提供 API 用于公众查询。
- 同时支持服务器部署与 Deno Deploy Serverless 部署。
- 支持多种模式，详见[配置文件](#配置文件)。
- **暂未支持并发更新锁。**（暂无支持计划，欢迎 PR）

## 运行环境

1. `Deno >= 1.32` （如需使用更早版本，请见[配置文件](#配置文件)一节）
2. 非必须：`Python >= 3.11`（稍后说明，请见[配置文件](#配置文件)一节）

## 准备工作

1. 克隆项目
   `git clone https://github.com/Golevka2001/Where-Are-Available-Chargers.git && cd Where-Are-Available-Chargers`
2. 检出分支 `git checkout dev`

## 配置文件

`config.toml` 内为原始配置文件。`auto_gen/config.js`
为运行时实际使用的配置文件。

**编辑原始配置文件后，需要执行 `python3 pretreat.py` 生成
`auto_gen/config.js`，不推荐直接改写 `auto_gen/config.js`。** `pretreat.py` 需要
`Python >= 3.11` 方可运行。Repo 内提供了一个可用的 `auto_gen/config.js`。

### `config.toml` 详述

`config_file_version`: 仅用于表示配置文件版本，不影响运行。

#### `[system]`

用于记录总体配置。

- `display_version`: 配置前端显示的版本号，如 `4.0.0`。

#### `[cache]`

配置缓存和刷新。

- `cache_mode`: 缓存模式
  - `cache_mode = 0` 表示所有请求都会查询数据源接口，前端显示为“实时查询”。
  - `cache_mode = 1` 表示智能刷新，前端显示为“智能缓存”。当 Deno KV
    里存在未过期的缓存数据时，返回缓存数据；否则会查询数据源接口并写入缓存。缓存有效期配置见
    `[cache]` 下 `refresh_time`。
  - `cache_mode = 2`
    表示不处理刷新，前端显示为“自动更新”。该模式下需要使用其他方式（如定期调用
    `update.js` 中的 `kv_update` 函数）更新 Deno KV 中的数据。

> **Note**
>
> - 当 `cache_mode = 1` 或 `cache_mode = 2` 时，`Deno` 的版本需要大于等于
  > `1.32`，且需要开启 `--unstable` 运行参数以启用 Deno KV。（默认的运行指令
  > `deno task devserver` 已经包含了 `--unstable` 参数。）
> - 当 `cache_mode = 0` 时，程序不需使用 Deno KV。
> - 出于适配 Serverless 的考虑，我们采用 Deno KV 。您也可以使用其他方式改造
  > `update.js` 以使用变量、数据库等作为缓存或数据储存。

> **Note**
>
> 自 `4.1.0` 开始，前端不再显示更新模式。

- `refresh_time`: 刷新间隔（单位：分钟）
  - `cache_mode = 1` 时，用于判断缓存是否过期。小于 `refresh_time`
    则直接返回缓存结果，大于 `refresh_time` 就更新缓存。
  - `cache_mode` 为其他值时，该字段无效。
- `survival_time`: “过期提示”间隔（单位：分钟） 当 Deno KV
  中缓存距“现在”（请求渲染的时刻）超过 `survival_time`
  时，前端会显示数据过期提示，但仍然会显示结果。
- `refuse_time`: “过期拒绝”间隔（单位：分钟） 当 Deno KV
  中缓存距“现在”（请求渲染的时刻）超过 `refuse_time`
  时，前端会显示为“多次更新失败”错误，不显示结果。

> **Note** 一般情况下，`survival_time` 和 `refuse_time`仅当 `cache_mode = 2`
> 时有效。

#### `[conditions]`

用于充电桩数量“充足”“不足”的判定。

- `enough_sum_num`: 对于所有充电站，空闲充电插座总量小于 `enough_sum_num`
  时，页面顶端横幅提示“充电桩余量紧张”。
- `enough_socket_num`: 对于每个充电站，其空闲充电插座总量小于
  `enough_socket_num * 该站的充电桩数量`
  时，该充电站为“余量紧张”，空插座数显示为橙色；否则显示为绿色。

#### `[stations]`

- 可以仿照 `config.toml` 内的格式配置充电站和充电桩。格式范例:
  ```toml
  [station."甲门北侧"]
  A = "XYlF000111222" # A 为显示在前端的充电桩名
  B = "甲门北侧 XYvI3334445556号设备" # 右侧需要与百骑客给的设备名一致
  ```

* 充电站、充电桩的顺序都是有序的，前端展示顺序同配置文件内的顺序。

## 设置环境变量

- `API_ENDPOINT`: 设置为百骑客公司提供的 API endpoint。需要包含`https://`
- `SIGN_KEY`: 设置为百骑客公司提供的签名密钥。

> **Note** 您可能需要自行向百骑客公司申请接口和密钥。

## 启动服务

运行 `deno task devserver` 在 `8000` 端口启动。

## 惯用翻译对照表

|    中文    |      英文/变量名      |
| :--------: | :-------------------: |
| 充电桩方位 | `area` 或 `direction` |
|   充电站   |       `station`       |
|   充电桩   |       `charger`       |
|  充电插座  | `socket` 或 `channel` |
