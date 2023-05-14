import mustache from "https://deno.land/x/mustache_ts@v0.4.1.1/mustache.ts";
import CONFIG from "./auto_gen/config.js";
//import { mtemplate } from "./auto_gen/mustache_templates.js";
import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";

async function mtemplate(template_name) {
    const template_dir = new URL("./mustache-templates/", import.meta.url);
    const template_url = new URL(`${template_name}.mustache`, template_dir);
    return await Deno.readTextFile(template_url);
}

function cache_mode_to_string(cache_mode) {
    const cache_mode_map = {
        0: "实时查询",
        1: "智能缓存",
        2: "自动更新",
    };
    return cache_mode_map[cache_mode];
}

export async function render_maintenance() {
    return mustache.render(await mtemplate("maintenance"));
}

export async function render_chinese_error(message = "发生错误，请稍后再试") {
    return mustache.render(await mtemplate("error"), {
        error_message: message,
    });
}

export async function render_chinese(KV_ALL) {
    let for_display_update_time = "Unknown";
    if (
        new Date().getTime() -
            KV_ALL["update_message"]["last_success_start_time"] >
        CONFIG.cache.refuse_time * 60 * 1000
    ) {
        return render_chinese_error("数据多次更新失败");
    } else {
        console.log(KV_ALL["update_message"]["last_success_start_time"]);
        for_display_update_time = moment(
            KV_ALL["update_message"]["last_success_start_time"]
        )
            .utcOffset(8)
            .format("YYYY-MM-DD HH:mm:ss");
        console.log(for_display_update_time);
    }

    // 过期判定
    const Is_Outdated =
        new Date().getTime() -
            KV_ALL["update_message"]["last_success_start_time"] >
        CONFIG.cache.survival_time * 60 * 1000;
    // 命名方便使用
    const Raw_Detail = KV_ALL["status_detail"];

    // detail 表示详细信息表格
    // message 表示总览表格
    const stations_detail_arr = [];
    const stations_message = [];
    let available_num_in_all_station = 0;
    let success_chargers_num = 0;
    let all_chargers_num = 0;
    for (const station in Raw_Detail) {
        // 遍历充电桩
        const charger_detail_arr = [];
        const charger_message = [];
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

        for (const charger_key in Raw_Detail[station]) {
            ++all_chargers_num;
            // 判断参数缺失，直接写入充电桩Array和总览表格充电桩Array
            // 使用场景是充电桩ID没有获取全就上线
            if (Raw_Detail[station][charger_key] == undefined) {
                // 注：没使用 type of，可以同时判断 null 与 undefined
                // 渲染充电桩表格 (detail) - undefined
                charger_detail_arr.push(
                    mustache.render(await mtemplate("charger_detail"), {
                        charger_no: get_charger_name(charger_key),
                        socket_detail: "* 充电桩参数缺失 *",
                    })
                );
                // 渲染充电桩总览 (message) - undefined
                charger_message.push(
                    mustache.render(await mtemplate("remain"), {
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
                    mustache.render(await mtemplate("charger_detail"), {
                        charger_no: get_charger_name(charger_key),
                        socket_detail: "* 获取失败 *",
                    })
                );
                // 渲染充电桩总览 (message) - Error
                charger_message.push(
                    mustache.render(await mtemplate("remain"), {
                        charger_no: get_charger_name(charger_key),
                        charger_a_num: "Error",
                    })
                );
            } else {
                ++success_chargers_num;
                // 遍历插座
                const socket_detail_arr = []; // 插座Array (detail)
                let available_num_in_a_charger = 0; // 充电桩的可用插座数量
                for (const socket_no in Raw_Detail[station][charger_key]) {
                    // 插座信息写入插座Array (detail)
                    socket_detail_arr.push(
                        mustache.render(await mtemplate("socket_detail"), {
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
                    mustache.render(await mtemplate("charger_detail"), {
                        charger_no: get_charger_name(charger_key),
                        socket_detail: socket_detail_arr.join("  "),
                    })
                );
                // 插座Array拼装成充电桩总览Array，渲染充电桩总览 (message)
                charger_message.push(
                    mustache.render(await mtemplate("remain"), {
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
            mustache.render(await mtemplate("station_detail"), {
                station_name: station,
                available_num: available_num_in_a_station,
                enough:
                    available_num_in_a_station >
                    CONFIG["conditions"]["enough_socket_num"] *
                        CONFIG["stations_chargers_num"][station],
                charger_detail: charger_detail_arr.join("\n"),
            })
        );
        // 渲染充电站总览 (message) 推入 充电站Array
        stations_message.push(
            mustache.render(await mtemplate("station"), {
                station_name: station,
                available_num: available_num_in_a_station,
                remain: charger_message.join(", "),
                enough:
                    available_num_in_a_station >
                    CONFIG["conditions"]["enough_socket_num"] *
                        CONFIG["stations_chargers_num"][station],
            })
        );
    }

    //渲染完整页面
    const ret_page = mustache.render(await mtemplate("main"), {
        outdate: Is_Outdated,
        update_time: for_display_update_time,
        chongzu:
            available_num_in_all_station >
            CONFIG["conditions"]["enough_sum_num"],
        error: success_chargers_num != all_chargers_num,
        stations: stations_message.join("\n"),
        station_detail: stations_detail_arr.join("\n"),
        display_version: CONFIG["system"]["display_version"],
        cache_mode: cache_mode_to_string(CONFIG["cache"]["cache_mode"]),
    });
    return ret_page;
}

export async function render_classical_error(message = "发生错误，请稍后再试") {
    return mustache.render(await mtemplate("classical_error"), {
        message: message,
    });
}

export async function render_classical(KV_ALL) {
    let for_display_update_time = null;
    if (
        new Date().getTime() -
            KV_ALL["update_message"]["last_success_start_time"] >
        CONFIG.cache.survival_time * 60 * 1000
    ) {
        return render_old_error("数据过期");
    } else {
        for_display_update_time = moment(
            KV_ALL["update_message"]["last_success_start_time"]
        )
            .utcOffset(8)
            .format("YYYY-MM-DD HH:mm:ss");
    }
    // 命名方便使用
    const Raw_Detail = KV_ALL["status_detail"];

    const stations_detail_arr = [];
    for (const station in Raw_Detail) {
        // 遍历充电桩
        const charger_detail_arr = [];

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

        for (const charger_key in Raw_Detail[station]) {
            // 判断参数缺失，直接写入充电桩Array和总览表格充电桩Array
            // 使用场景是充电桩ID没有获取全就上线
            if (Raw_Detail[station][charger_key] == undefined) {
                // 注：没使用 type of，可以同时判断 null 与 undefined
                charger_detail_arr.push(
                    mustache.render(await mtemplate("classical_charger"), {
                        charger_no: get_charger_name(charger_key),
                        socket_detail: "* 充电桩参数缺失 *",
                    })
                );
            }
            // 充电桩失败，直接写入充电桩Array
            else if (Raw_Detail[station][charger_key].length === 0) {
                charger_detail_arr.push(
                    mustache.render(await mtemplate("classical_charger"), {
                        charger_no: get_charger_name(charger_key),
                        socket_detail: "* 获取失败 *",
                    })
                );
            } else {
                // 遍历插座
                const socket_detail_arr = [];
                let no_available_socket = true;
                for (const socket_no in Raw_Detail[station][charger_key]) {
                    if (Raw_Detail[station][charger_key][socket_no] == 1) {
                        socket_detail_arr.push(`[${parseInt(socket_no) + 1}]`);
                        no_available_socket = false;
                    }
                }
                if (no_available_socket) {
                    charger_detail_arr.push(
                        mustache.render(await mtemplate("classical_charger"), {
                            charger_no: get_charger_name(charger_key),
                            socket_detail: "* 无 *",
                        })
                    );
                } else {
                    charger_detail_arr.push(
                        mustache.render(await mtemplate("classical_charger"), {
                            charger_no: get_charger_name(charger_key),
                            socket_detail: socket_detail_arr.join("  "),
                        })
                    );
                }
            }
        }
        stations_detail_arr.push(
            mustache.render(await mtemplate("classical_station"), {
                station_name: station,
                charger_detail: charger_detail_arr.join("\n"),
            })
        );
    }

    const ret_page = mustache.render(await mtemplate("classical_main"), {
        update_time: for_display_update_time,
        station_detail: stations_detail_arr.join("\n"),
    });

    return ret_page;
}
