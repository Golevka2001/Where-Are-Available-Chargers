import { mtemplate } from "./mustache_templates.js";
import CONFIG from "./config.js";
import mustache from "mustache/mustache.mjs";

/*
    请注意：因为开发中经历了改需求、换渲染引擎， rend.js 充满了屎山代码和重复操作。
    but it works well 所以并没有改。
    请先运行 pretreat.py 生成 mustache_templates.js

    用法： ALL_INFOMATION 是一个 Map，可由 example/all_information.json 进行 JSON.parse() 得到。
    async function data_process(ALL_INFOMATION) -> Map: 一种中间 Map
    async function render_chinese_error(String?: 错误信息) -> String: HTML 错误页（新版）
    async function render_chinese(ALL_INFOMATION) -> String: HTML 结果页（新版）
    async function render_classical_error(String?: 错误信息) -> String: HTML 错误页（经典版）
    async function render_classical(ALL_INFOMATION) -> String: HTML 结果页（经典版）
*/

export async function render_chinese_error(message = "发生错误，请稍后再试") {
    return mustache.render(mtemplate.error, {
        error_message: message,
    });
}

export async function render_chinese(ALL_INFOMATION) {
    // 命名方便使用
    const Raw_Detail = ALL_INFOMATION["status_detail"];

    // detail 表示详细信息表格
    // message 表示总览表格
    let stations_detail_arr = Array();
    let stations_message = Array();
    let available_num_in_all_station = 0;
    let success_chargers_num = 0;
    let all_chargers_num = 0;
    for (let station in Raw_Detail) {
        // 遍历充电桩
        let charger_detail_arr = new Array();
        let charger_message = Array();
        let available_num_in_a_station = 0;

        /*
            Feat - 支持用 Map 指定充电桩名。
            station 可能为 Array 或 Map.
            Array: 系统自动将充电桩编号为 1, 2, 3, 4,...
                {"LocationFoo": [[0,0,0,1,1,1,0,0,0,0], [0,0,0,1,1,1,0,0,0,0]]}
                                  ^ LocationFoo 1 ^      ^ LocationFoo 2 ^
            Map: 以 Key 作为充电桩编号
                {"LocationFoo": {"A": [0,0,0,1,1,1,0,0,0,0], "B": [0,0,0,1,1,1,0,0,0,0]}}
                                       ^ LocationFoo A ^           ^ LocationFoo A ^
        */
        const get_charger_name = Array.isArray(Raw_Detail[station])
            ? function (charger_key) {
                  return parseInt(charger_key) + 1;
              }
            : function (charger_key) {
                  return charger_key;
              };

        for (let charger_key in Raw_Detail[station]) {
            ++all_chargers_num;
            // 判断参数缺失，直接写入充电桩Array和总览表格充电桩Array
            // 使用场景是充电桩ID没有获取全就上线
            if (Raw_Detail[station][charger_key] == undefined) {
                // 注：没使用 type of，可以同时判断 null 与 undefined
                // 渲染充电桩表格 (detail) - undefined
                charger_detail_arr.push(
                    mustache.render(mtemplate.charger_detail, {
                        charger_no: get_charger_name(charger_key),
                        socket_detail: "* 充电桩参数缺失 *",
                    })
                );
                // 渲染充电桩总览 (message) - undefined
                charger_message.push(
                    mustache.render(mtemplate.remain, {
                        charger_no: get_charger_name(charger_key),
                        charger_a_num: "N/A",
                    })
                );
                --all_chargers_num; //不计入查询失败
            }
            // 充电桩失败，直接写入充电桩Array和总览表格充电桩Array
            else if (Raw_Detail[station][charger_key].length === 0) {
                // 渲染充电桩表格 (detail) - Error
                charger_detail_arr.push(
                    mustache.render(mtemplate.charger_detail, {
                        charger_no: get_charger_name(charger_key),
                        socket_detail: "* 获取失败 *",
                    })
                );
                // 渲染充电桩总览 (message) - Error
                charger_message.push(
                    mustache.render(mtemplate.remain, {
                        charger_no: get_charger_name(charger_key),
                        charger_a_num: "Error",
                    })
                );
            } else {
                ++success_chargers_num;
                // 遍历插座
                let socket_detail_arr = new Array(); // 插座Array (detail)
                let available_num_in_a_charger = 0; // 充电桩的可用插座数量
                for (let socket_no in Raw_Detail[station][charger_key]) {
                    // 插座信息写入插座Array (detail)
                    socket_detail_arr.push(
                        mustache.render(mtemplate.socket_detail, {
                            socket_status:
                                Raw_Detail[station][charger_key][socket_no] == 1
                                    ? 1
                                    : 0,
                            socket_num: parseInt(socket_no) + 1,
                        })
                    );
                    // 增加充电桩的可用插座数量
                    if (Raw_Detail[station][charger_key][socket_no] == 1) {
                        ++available_num_in_a_charger;
                    }
                }
                // 插座Array拼装成充电桩Array，渲染充电桩表格 (detail)
                charger_detail_arr.push(
                    mustache.render(mtemplate.charger_detail, {
                        charger_no: get_charger_name(charger_key),
                        socket_detail: socket_detail_arr.join("  "),
                    })
                );
                // 插座Array拼装成充电桩总览Array，渲染充电桩总览 (message)
                charger_message.push(
                    mustache.render(mtemplate.remain, {
                        charger_no: get_charger_name(charger_key),
                        charger_a_num: available_num_in_a_charger,
                    })
                );
                available_num_in_a_station += available_num_in_a_charger;
            }
        }
        available_num_in_all_station += available_num_in_a_station;
        // 充电桩Array拼装成充电桩Array，渲染充电桩表格 (detail)
        stations_detail_arr.push(
            mustache.render(mtemplate.station_detail, {
                station_name: station,
                available_num: available_num_in_a_station,
                enough:
                    available_num_in_a_station >
                    CONFIG["conditions"]["enough_socket_num"] *
                        CONFIG.stations[station].length,
                charger_detail: charger_detail_arr.join("\n"),
            })
        );
        // 渲染充电站总览 (message) 推入 充电站Array
        stations_message.push(
            mustache.render(mtemplate.station, {
                station_name: station,
                available_num: available_num_in_a_station,
                remain: charger_message.join(", "),
                enough:
                    available_num_in_a_station >
                    CONFIG["conditions"]["enough_socket_num"] *
                        CONFIG.stations[station].length,
            })
        );
    }

    //渲染完整页面
    let ret_page = mustache.render(mtemplate.main, {
        chongzu:
            available_num_in_all_station >
            CONFIG["conditions"]["enough_sum_num"],
        error: success_chargers_num != all_chargers_num,
        stations: stations_message.join("\n"),
        station_detail: stations_detail_arr.join("\n"),
        query_id: ALL_INFOMATION["update_message"]["last_success_query_id"],
    });
    return ret_page;
}

export async function render_classical_error(message = "发生错误，请稍后再试") {
    return mustache.render(mtemplate.classical_error, {
        message: message,
    });
}

export async function render_classical(ALL_INFOMATION) {
    // 命名方便使用
    const Raw_Detail = ALL_INFOMATION["status_detail"];

    let stations_detail_arr = Array();
    for (let station in Raw_Detail) {
        // 遍历充电桩
        let charger_detail_arr = new Array();

        /*
            Feat - 支持用 Map 指定充电桩名。
            station 可能为 Array 或 Map.
            Array: 系统自动将充电桩编号为 1, 2, 3, 4,...
                {"LocationFoo": [[0,0,0,1,1,1,0,0,0,0], [0,0,0,1,1,1,0,0,0,0]]}
                                  ^ LocationFoo 1 ^      ^ LocationFoo 2 ^
            Map: 以 Key 作为充电桩编号
                {"LocationFoo": {"A": [0,0,0,1,1,1,0,0,0,0], "B": [0,0,0,1,1,1,0,0,0,0]}}
                                       ^ LocationFoo A ^           ^ LocationFoo A ^
        */
        const get_charger_name = Array.isArray(Raw_Detail[station])
            ? function (charger_key) {
                  return parseInt(charger_key) + 1;
              }
            : function (charger_key) {
                  return charger_key;
              };

        for (let charger_key in Raw_Detail[station]) {
            // 判断参数缺失，直接写入充电桩Array和总览表格充电桩Array
            // 使用场景是充电桩ID没有获取全就上线
            if (Raw_Detail[station][charger_key] == undefined) {
                // 注：没使用 type of，可以同时判断 null 与 undefined
                charger_detail_arr.push(
                    mustache.render(mtemplate.classical_charger, {
                        charger_no: get_charger_name(charger_key),
                        socket_detail: "* 充电桩参数缺失 *",
                    })
                );
            }
            // 充电桩失败，直接写入充电桩Array
            else if (Raw_Detail[station][charger_key].length === 0) {
                charger_detail_arr.push(
                    mustache.render(mtemplate.classical_charger, {
                        charger_no: get_charger_name(charger_key),
                        socket_detail: "* 获取失败 *",
                    })
                );
            } else {
                // 遍历插座
                let socket_detail_arr = new Array();
                let no_available_socket = true;
                for (let socket_no in Raw_Detail[station][charger_key]) {
                    if (Raw_Detail[station][charger_key][socket_no] == 1) {
                        socket_detail_arr.push(`[${parseInt(socket_no) + 1}]`);
                        no_available_socket = false;
                    }
                }
                if (no_available_socket) {
                    charger_detail_arr.push(
                        mustache.render(mtemplate.classical_charger, {
                            charger_no: get_charger_name(charger_key),
                            socket_detail: "* 无 *",
                        })
                    );
                } else {
                    charger_detail_arr.push(
                        mustache.render(mtemplate.classical_charger, {
                            charger_no: get_charger_name(charger_key),
                            socket_detail: socket_detail_arr.join("  "),
                        })
                    );
                }
            }
        }
        stations_detail_arr.push(
            mustache.render(mtemplate.classical_station, {
                station_name: station,
                charger_detail: charger_detail_arr.join("\n"),
            })
        );
    }

    let ret_page = mustache.render(mtemplate.classical_main, {
        query_id: ALL_INFOMATION["update_message"]["last_success_query_id"],
        station_detail: stations_detail_arr.join("\n"),
    });

    return ret_page;
}
