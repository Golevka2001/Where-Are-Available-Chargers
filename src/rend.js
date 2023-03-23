import { mtemplate } from "./mustache_templates.js";
import CONFIG from "./config.js";
import mustache from "mustache/mustache.mjs";


/*
    请注意：因为开发中经历了改需求、换渲染引擎， rend.js 充满了屎山代码和重复操作。
    but it works well 所以并没有改。
    请先运行 pretreat.py 生成 mustache_templates.js

    用法： all_infomation 是一个 map，可由 example/all_information.json 进行 JSON.parse() 得到。
    async function data_process(all_infomation) -> map: 一种中间 map
    async function render_chinese_error(str?: 错误信息) -> str: HTML 错误页
    async function render_chinese(all_infomation) -> str: HTML 结果页
*/

export async function data_process(all_infomation) {
    /*
    we need
    const chongzu = true;
    const stations = {
        "Bei": {
            "available_num": 12,
            "en": "BBBEI",
            "chargers": { 1: 3, 2: 5 }
        },
        "Nan": {
            "available_num": 12,
            "en": "BBBBB",
            "chargers": { 1: 3, 2: 5 }
        }
    }
    */
    let stations_map = new Map();
    let available_num_sum = 0;
    for (let station in all_infomation["status_sum"]) {
        available_num_sum += all_infomation["status_sum"][station];
        stations_map[station] = { "available_num": all_infomation["status_sum"][station] };
        stations_map[station]["chargers"] = all_infomation["status_summary"][station];
        stations_map[station]["en"] = CONFIG.station_EN["station"];
    }
    let error = false
    if (all_infomation["update_message"]["last_success_num"] !== 21) {
        error = true;
    }
    let chongzu = true
    if (available_num_sum < 50) {
        chongzu = false;
    }
    return {
        "chongzu": chongzu,
        "error": error,
        "stations": stations_map
    }
}

export async function render_chinese_error(message = "发生错误，请稍后再试") {
    return await mustache.render(mtemplate.error, {
        error_message: message
    })
}

export async function render_chinese(all_infomation) {
    const render_start_time = (new Date()).getTime()
    const info = await data_process(all_infomation)
    console.log(JSON.stringify(info));
    let stations_message = Array();
    for (let station in info.stations) {
        let charger_message = Array();
        for (let charger in info.stations[station]["chargers"]) {
            charger_message.push(await mustache.render(mtemplate.remain, {
                charger_no: charger,
                charger_a_num: info.stations[station]["chargers"][charger]
            }))
        }
        stations_message.push(
            await mustache.render(mtemplate.station, {
                station_name: station,
                available_num: info.stations[station]["available_num"],
                remain: charger_message.join(" "),
                enough: (info.stations[station]["available_num"] > 2.5 * CONFIG.stations[station].length)
            })
        )
    }

    let stations_detail_arr = Array()
    for (let station in all_infomation["status_detail"]) {
        // 遍历充电桩
        let charger_detail_arr = new Array()
        for (let charger_no in all_infomation["status_detail"][station]) {
            // 充电桩失败，直接写入充电桩Array
            if (all_infomation["status_detail"][station][charger_no].length === 0) {
                charger_detail_arr.push(await mustache.render(mtemplate.charger_detail, {
                    charger_no: charger_no + 1,
                    socket_detail: "* 获取失败 *"
                }))
            }
            else {
                // 遍历插座
                let socket_detail_arr = new Array()
                for (let socket_no in all_infomation["status_detail"][station][charger_no]) {
                    // 插座信息写入插座Array
                    socket_detail_arr.push(await mustache.render(mtemplate.socket_detail, {
                        socket_status: all_infomation["status_detail"][station][charger_no][socket_no],
                        socket_num: parseInt(socket_no) + 1
                    }))
                }
                // 插座Array拼装成充电桩Array
                charger_detail_arr.push(await mustache.render(mtemplate.charger_detail, {
                    charger_no: parseInt(charger_no) + 1,
                    socket_detail: socket_detail_arr.join(" ")
                }))
            }
        }
        stations_detail_arr.push(await mustache.render(mtemplate.station_detail, {
            station_name: station,
            charger_detail: charger_detail_arr.join("\n")
        }))
    }

    console.log(JSON.stringify(stations_detail_arr));

    let ret_page = await mustache.render(mtemplate.main, {
        chongzu: info.chongzu,
        error: info.error,
        stations: stations_message.join("\n"),
        station_detail: stations_detail_arr.join("\n"),
        query_id: all_infomation["update_message"]["last_success_query_id"],
        rendering_time: ((new Date()).getTime() - render_start_time)
    })
    console.log(ret_page);
    return ret_page;
}
