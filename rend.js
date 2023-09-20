import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
import mustache from "https://deno.land/x/mustache_ts@v0.4.1.1/mustache.ts";
import CONFIG from "./auto_gen/config.js";

async function mustacheTemplate(template_name) {
    const template_dir = new URL("./mustache-templates/", import.meta.url);
    const template_url = new URL(`${template_name}.mustache`, template_dir);
    return await Deno.readTextFile(template_url);
}

/**
 * @param {"ver4"|"classical"} templateType
 * @param {"htmlFrame"|"container"|"tips"|"summaryStation"|"summaryStationPile"|"detailStation"|"detailStationPile"|"detailStationPileSocket"|"error"|"maintenance"} pageType
 **/
async function pageTemplateMapper(templateType, pageType)  {
    if (templateType === "ver4"){
        switch (pageType){
            case "htmlFrame":
                return await mustacheTemplate("main")
            case "container":
                return await mustacheTemplate("main1_container")
            case "tips":
                return await mustacheTemplate("main1_tips")
            case "summaryStation":// 显示 `A门B侧 空插座数 桩号 余量` 的单个格子模板
                return await mustacheTemplate("main1_station")
            case "summaryStationPile": // 显示 `桩号 余量` 中 `<sup>A·</sup>1` 的模板
                return await mustacheTemplate("main1_remain")
            case "detailStation": // 详情中的 `A门B侧 空插座数 [表格]` 的模板
                return await mustacheTemplate("main1_station_detail")
            case "detailStationPile": // 详情表格里，一个充电桩的模板（e.g. `| A | [1] [3] [10]|`，模板是一行）
                return await mustacheTemplate("main1_charger_detail")
            case "detailStationPileSocket": // 详情表格里，表示一个充电插座的模板 （e.g. `[1]`）
                return await mustacheTemplate("main1_socket_detail")
            case "error": // 错误页模板
                return await mustacheTemplate("main2_error_container")
            case "maintenance": // 维护页模板
                return await mustacheTemplate("main2_maintenance_container")
            default:
                return ""
        }
    } else if (templateType === "classical") {
        switch (pageType) {
            case "htmlFrame":
                return await mustacheTemplate("classical")
            case "container":
                return await mustacheTemplate("classical1_container")
            case "tips":
                return ""
            case "summaryStation":// 显示 `A门B侧 空插座数 桩号 余量` 的单个格子模板
                return ""
            case "summaryStationPile": // 显示 `桩号 余量` 中 `<sup>A·</sup>1` 的模板
                return ""
            case "detailStation": // 详情中的 `A门B侧 空插座数 [表格]` 的模板
                return await mustacheTemplate("classical1_station")
            case "detailStationPile": // 详情表格里，一个充电桩的模板（e.g. `| A | [1] [3] [10]|`，模板是一行）
                return await mustacheTemplate("classical1_charger")
            case "detailStationPileSocket": // 详情表格里，表示一个充电插座的模板 （e.g. `[1]`）
                return "{{#socket_status}}[{{socket_num}}] {{/socket_status}}"
            case "error": // 错误页模板
                return await mustacheTemplate("classical2_error_container")
            case "maintenance": // 维护页模板
                return ""
            default:
                return ""
        }
    } else {
        return ""
    }
}

export async function renderMaintenance(templateType = "ver4") {
    const maintenanceContainer = mustache.render(
        await pageTemplateMapper(templateType, "maintenance"),
        null
    )

    return mustache.render(
        await pageTemplateMapper(templateType, "htmlFrame"),
        {
            status_success: false,
            container: maintenanceContainer,
            copyright_year: moment().utcOffset(8).format("YYYY"),
            display_version: CONFIG["system"]["display_version"]
        }
    );
}

/**
 * @param message
 * @param {"ver4"|"classical"} templateType
 */
export async function renderError(message = "发生错误，请稍后再试", templateType = "ver4") {
    const maintenanceContainer = mustache.render(
        await pageTemplateMapper(templateType, "error"),
        {
            error_message: message
        }
    )

    return mustache.render(
        await pageTemplateMapper(templateType, "htmlFrame"),
        {
            status_success: false,
            container: maintenanceContainer,
            copyright_year: moment().utcOffset(8).format("YYYY"),
            display_version: CONFIG["system"]["display_version"]
        }
    );
}

/**
 * @param KV_ALL
 * @param {"ver4"|"classical"} templateType
 */
export async function renderMainPage(KV_ALL, templateType="ver4") {
    let for_display_update_time = "Unknown";
    if (
        new Date().getTime() -
        KV_ALL["update_message"]["last_success_start_time"] >
        CONFIG.cache.refuse_time * 60 * 1000
    ) {
        return renderError("数据多次更新失败");
    } else {
        for_display_update_time = moment(
            KV_ALL["update_message"]["last_success_start_time"]
        )
            .utcOffset(8)
            .format("YYYY-MM-DD HH:mm:ss");
        console.log("Last update time: " + for_display_update_time);
    }

    // 过期判定
    const is_expired =
        new Date().getTime() -
        KV_ALL["update_message"]["last_success_start_time"] >
        CONFIG.cache.survival_time * 60 * 1000;
    // 命名方便使用
    const raw_detail = KV_ALL["status_detail"];

    // detail 表示详细信息表格
    // message 表示总览表格
    const stations_detail_arr = [];
    const stations_message = [];
    let available_num_in_all_station = 0;
    let success_chargers_num = 0;
    let all_chargers_num = 0;
    for (const station in raw_detail) {
        // 遍历充电桩
        const charger_detail_arr = [];
        const charger_message = [];
        let available_num_in_a_station = 0;

        const get_charger_name = Array.isArray(raw_detail[station])
            ? function (charger_key) {
                return parseInt(charger_key) + 1;
            }
            : function (charger_key) {
                return charger_key;
            };

        for (const charger_key in raw_detail[station]) {
            ++all_chargers_num;
            // 判断参数缺失，直接写入充电桩Array和总览表格充电桩Array
            // 使用场景是充电桩ID没有获取全就上线
            if (raw_detail[station][charger_key] == null) {
                // 注：没使用 type of，可以同时判断 null 与 undefined
                // 渲染充电桩表格 (detail) - undefined
                charger_detail_arr.push(
                    mustache.render(await pageTemplateMapper(templateType, "detailStationPile"), {
                        charger_no: get_charger_name(charger_key),
                        socket_detail: "* 充电桩参数缺失 *",
                    })
                );
                // 渲染充电桩总览 (message) - undefined
                charger_message.push(
                    mustache.render(await pageTemplateMapper(templateType, "summaryStationPile"), {
                        charger_no: get_charger_name(charger_key),
                        charger_a_num: "N/A",
                    })
                );
                --all_chargers_num; //不计入查询失败
            } // 充电桩失败，直接写入充电桩Array和总览表格充电桩Array
            else if (raw_detail[station][charger_key].length === 0) {
                // 渲染充电桩表格 (detail) - Error
                charger_detail_arr.push(
                    mustache.render(await pageTemplateMapper(templateType, "detailStationPile"), {
                        charger_no: get_charger_name(charger_key),
                        socket_detail: "* 获取失败 *",
                    })
                );
                // 渲染充电桩总览 (message) - Error
                charger_message.push(
                    mustache.render(await pageTemplateMapper(templateType, "summaryStationPile"), {
                        charger_no: get_charger_name(charger_key),
                        charger_a_num: "Error",
                    })
                );
            } else {
                ++success_chargers_num;
                // 遍历插座
                const socket_detail_arr = []; // 插座Array (detail)
                let available_num_in_a_charger = 0; // 充电桩的可用插座数量
                for (const socket_no in raw_detail[station][charger_key]) {
                    // 插座信息写入插座Array (detail)
                    const socket_detail_html = mustache.render(
                        await pageTemplateMapper(templateType, "detailStationPileSocket"),
                        {
                            socket_status: raw_detail[station][charger_key][socket_no] === 1 ? 1 : 0,
                            socket_num: parseInt(socket_no) + 1,
                        }
                    )
                    if(socket_detail_html.trim() !== "") {
                        socket_detail_arr.push(socket_detail_html);
                    }
                    // 增加充电桩的可用插座数量
                    if (raw_detail[station][charger_key][socket_no] === 1) {
                        ++available_num_in_a_charger;
                    }
                }
                // 插座Array拼装成充电桩Array，渲染充电桩表格 (detail)
                charger_detail_arr.push(
                    mustache.render(await pageTemplateMapper(templateType, "detailStationPile"), {
                        charger_no: get_charger_name(charger_key),
                        socket_detail: socket_detail_arr.join(" "),
                    })
                );
                // 插座Array拼装成充电桩总览Array，渲染充电桩总览 (message)
                if (available_num_in_a_charger) { // 没有空插座就不渲染了
                    charger_message.push(
                        mustache.render(await pageTemplateMapper(templateType, "summaryStationPile"), {
                            charger_no: get_charger_name(charger_key),
                            charger_a_num: available_num_in_a_charger,
                        })
                    );
                }
                available_num_in_a_station += available_num_in_a_charger;
            }
        }
        available_num_in_all_station += available_num_in_a_station;
        // 充电桩Array拼装成充电桩Array，渲染充电桩表格 (detail)
        stations_detail_arr.push(
            mustache.render(await pageTemplateMapper(templateType, "detailStation"), {
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
            mustache.render(await pageTemplateMapper(templateType, "summaryStation"), {
                station_name: station,
                available_num: available_num_in_a_station,
                remain: charger_message.length
                    ? charger_message.join(", ")
                    : "<sup> </sup> 没有空闲插座",
                enough:
                    available_num_in_a_station >
                    CONFIG["conditions"]["enough_socket_num"] *
                    CONFIG["stations_chargers_num"][station],
            })
        );
    }

    const tips = CONFIG["tip"]["enable"] ?
        mustache.render(await pageTemplateMapper(templateType, "tips"), null) : null;

    //渲染 container
    const container =  mustache.render(await pageTemplateMapper(templateType, "container"), {
        is_expired: is_expired,
        update_time: for_display_update_time,
        tips: tips,
        all_enough:
            available_num_in_all_station >
            CONFIG["conditions"]["enough_sum_num"],
        stations: stations_message.join("\n"),
        station_detail: stations_detail_arr.join("\n"),
    });

    return mustache.render(
        await pageTemplateMapper(templateType, "htmlFrame"),
        {
            status_success: true,
            container: container,
            copyright_year: moment().utcOffset(8).format("YYYY"),
            display_version: CONFIG["system"]["display_version"]
        }
    );
}

export async function renderClassicalError(message = "发生错误，请稍后再试") {
    return renderError(message, "classical")
}

export async function renderClassicalPage(KV_ALL) {
    return renderMainPage(KV_ALL, "classical")
}
