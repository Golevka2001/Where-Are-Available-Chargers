# :electric_plug::rage:Where Are Available Chargers?


## 目录

- [:electric_plug::rage:Where Are Available Chargers?](#electric_plugragewhere-are-available-chargers)
  - [目录](#目录)
  - [背景](#背景)
  - [工作流程](#工作流程)
  - [使用说明](#使用说明)
    - [下载 & 解压](#下载--解压)
    - [安装 Python 环境](#安装-python-环境)
    - [安装依赖库](#安装依赖库)
    - [运行](#运行)
  - [提供二维码](#提供二维码)
  - [更新日志](#更新日志)
  - [使用许可](#使用许可)

## 背景

电瓶不让拎进宿舍之后只能去充电桩那充电了，之前有过好几次去的时候各个充电桩都插得满满当当，没地儿充又骑回去了。

后来想了个法，把二维码拍下来存手机相册里，要充电的时候提前扫一下。挺聪明的，不过还是麻烦，而且有时候会忘了哪个码是哪个桩子的。

:rage:然后就有了这个小脚本。

## 工作流程

```mermaid
flowchart TD
s(开始)
--> 0[微信授权登录]
--> |获取授权码 code| 2[向 mapi.7mate.cn/api/authorization_code <br> 发送 code]
--> |从响应中获取 openid 和 phone| 4[向 mapi.7mate.cn/api/authorizations <br> 发送 openid 和 phone]
--> |从响应中获取 token| 6[向 mapi.7mate.cn/api/chargers/XXXXXXXX <br> 发送带 authorization 字段的请求头, 将 token 填入]
--> |从响应中获取一组充电桩的信息| 7[显示各个插座的可用情况]
--> f(结束)
```

## 使用说明

本项目使用 Python 和 requests 库。

### 下载 & 解压

点击右上方的绿色 ```Code``` 按钮，在下拉菜单中点击 ```Download ZIP```

下载完成后，把它解压到你想要的位置。

### 安装 Python 环境

略。

### 安装依赖库

按 ```Windows``` + ```X```，点击菜单中的 ```Windows PowerShell```，输入以下命令：

```shell
pip install requests
```

### 运行

在编译器里运行，或者在脚本所在路径下进入终端输入以下命令：

```shell
python .\main.py
```

## 提供二维码

也许您也发现了，“为啥才能查到这么几个充电桩？”。

是因为我还没来得及去挨个拍照啦，平时不充电的时候也没空跑去拍个照。

所以欢迎大家提供一些充电桩上的二维码！:tada::tada::tada:

您可以通过以下方式提供：

- 点击页面上方的 [**Issues**](https://github.com/Golevka2001/Where-Are-Available-Chargers/issues) 提交；
- 通过**邮件**发送到 gol3vka@163.com。

希望您在提交时选择清晰的图片，并备注清楚充电桩的位置，如 “*西门南侧-东1*”。

感谢您的帮助与支持！

## 更新日志

**2022-11-02:**

1. 目前只是在本地运行显示，之后可能会加入使用邮件或者其他方式来方便查询，还没想好；
2. 目前可查询的充电桩：西门南侧（3个）和一个忘了是哪的充电桩。

## 使用许可

[GNU GENERAL PUBLIC LICENSE v2.0 © Gol3vka.](./LICENSE)
