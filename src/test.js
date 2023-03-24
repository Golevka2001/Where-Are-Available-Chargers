import { render_chinese, render_chinese_error, render_classical, render_classical_error } from "./rend.js";

const ALL_INFOMATION = {
    "update_message": { "last_success_query_id": 123456789 },
    "status_detail": {
        "东门北侧": [[0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        "东门南侧": [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        "西门北侧": [[0, 1, 0, 0, 0, 1, 1, 1, 1, 0], [0, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 1, 0, 0, 1, 1]],
        "西门南侧": [[0, 0, 1, 1, 0, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0, 1, 1, 0], [0, 1, 1, 1, 1, 1, 0, 1, 0, 1]],
        "南门西侧": [[1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [0, 0, 1, 1, 0, 0, 1, 1, 1, 0]],
        "南门东侧": [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
        "北门东侧": [[1, 0, 1, 1, 0, 1, 1, 1, 0, 0], [1, 0, 0, 0, 1, 0, 1, 1, 1, 1], [1, 1, 0, 1, 0, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 0, 1, 1]]
    }
}

// 以下所有调用均返回 HTML String

await render_chinese(ALL_INFOMATION) // 渲染新版结果页面

await render_chinese_error() // 渲染新版错误页面（默认错误提示文字）

await render_chinese_error("发生了错误") // 渲染新版错误页面（自定义错误提示文字）

await render_classical(ALL_INFOMATION) // 渲染经典结果页面

await render_classical_error() // 渲染经典错误页面（默认错误提示文字）

await render_classical_error("发生了错误") // 渲染经典错误页面（自定义错误提示文字）
