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
export async function renderContainer(KV_ALL, templateType){

    const for_display_update_time = moment(
        KV_ALL["update_message"]["last_success_start_time"]
    )
        .utcOffset(8)
        .format("YYYY-MM-DD HH:mm:ss");
    console.log("Last update time: " + for_display_update_time);

    // 过期判定，显示软过期提示
    const is_expired =
        new Date().getTime() -
        KV_ALL["update_message"]["last_success_start_time"] >
        CONFIG.cache.survival_time * 60 * 1000;
    // 命名方便使用
    const raw_detail = KV_ALL["status_detail"];

    // detail 表示详细信息表格
    // message 表示总览表格
    const stations_detail_arr = []; // 用于存储全校详情结果，每个充电站渲染后的 HTML 是 Array 的一个元素
    const stations_message = []; // 用于储存全校总览结果，每个充电站渲染后的 HTML 是 Array 的一个元素
    let available_num_in_all_station = 0; // 全校总可用充电插座数量
    let success_chargers_num = 0; // 查询成功的充电桩数量
    let all_chargers_num = 0; // 配置的充电桩总数（包含查询不成功的）

    // raw_detail 的格式见文档或 example 目录
    // 开始遍历每个充电站（东门北侧，东门南侧，……）
    for (const station in raw_detail) {
        const charger_detail_arr = []; // 用于存储站点详情结果，每个充电桩渲染后得到的表格（行） HTML 是 Array 的元素
        const charger_message = []; // 用于存储站点总览结果，每个充电桩渲染后得到的`桩号·余量` HTML 是 Array 的元素
        let available_num_in_a_station = 0;  // 充电站可用充电插座数量
        let success_chargers_num_in_a_station = 0; // 充电站查询成功的充电桩数量
        let chargers_num_in_a_station = 0; // 充电站内配置的充电桩总数（包含查询不成功的）

        /*
        下面这段代码是一个几乎废弃的 feat: 提供特定情境下 Object 和 Map 混用的功能
        具体用途见 https://github.com/Golevka2001/Where-Are-Available-Chargers/blob/version-3/README.md
        更新日志 - 2023-04-14 Version 3.4.3 - 1
         */
        const get_charger_name = Array.isArray(raw_detail[station])
            ? function (charger_key) {
                return parseInt(charger_key) + 1;
            }
            : function (charger_key) {
                return charger_key;
            };

        // 开始遍历该充电站的每个充电桩
        for (const charger_key in raw_detail[station]) {
            ++chargers_num_in_a_station; // 增加充电桩总数（含不可用充电桩）

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
                ++success_chargers_num_in_a_station; // 增加查询成功的充电桩数量
                const socket_detail_arr = []; // 插座Array (detail)
                let available_num_in_a_charger = 0; // 充电桩的可用插座数量

                // 开始遍历该充电桩的每个插座
                for (const socket_no in raw_detail[station][charger_key]) {
                    // 状态代码: 1-空闲 0-占用 2-故障

                    // 渲染详情中单个充电插座的图案。
                    // 对于 `ver4`，这里是渲染单个绿色圆圈数字（空闲）或者单个橙色圆圈（占用）
                    // 对于 `classical`，这里是渲染 `[数字]` （空闲）或者 ``（占用）
                    // 2023-10-07 补: 现在 `ver4` 可以显示为灰色圆圈数字（损坏）
                    const socket_detail_html = mustache.render(
                        await pageTemplateMapper(templateType, "detailStationPileSocket"),
                        {
                            // `socket_status` 只用于 `classical`
                            // `socket_color`  只用于 `ver4`
                            // `socket_num` 两种模板均使用
                            socket_status: raw_detail[station][charger_key][socket_no] === 1,
                            socket_color: ["orange", "green"][
                                raw_detail[station][charger_key][socket_no]] || "grey",
                            socket_num: ['-', parseInt(socket_no) + 1][
                                raw_detail[station][charger_key][socket_no]] || "x",
                        }
                    )
                    // 若上一步的渲染结果不是空字符串，则将插座信息写入插座Array (detail)
                    // 这是为了让 `classical` 模式下，若充电桩没有空位，Array 将是空的，
                    // 便于后续在 classical 详情中显示“* 无 *”
                    if(socket_detail_html.trim() !== "") {
                        socket_detail_arr.push(socket_detail_html);
                    }

                    // 增加充电桩的可用插座数量
                    if (raw_detail[station][charger_key][socket_no] === 1) {
                        ++available_num_in_a_charger;
                    }
                }
                // 结束遍历该充电桩的每个插座

                // 插座Array拼装成充电桩Array，渲染详情表格 (detail) 中该充电桩的一行
                // 在上一步遍历中，若生成的 `socket_detail_arr` 是空 Array，则 `socket_detail` 显示为 `* 无 *`
                // 否则，正常将 `socket_detail_arr` 拼合为 `socket_detail` HTML
                // 然后渲染详情表格中的一行
                charger_detail_arr.push(
                    mustache.render(await pageTemplateMapper(templateType, "detailStationPile"), {
                        charger_no: get_charger_name(charger_key),
                        socket_detail: socket_detail_arr.length ? socket_detail_arr.join(" ") : "* 无 *",
                    })
                );

                // 插座Array拼装成充电桩总览Array，渲染充电桩总览 (message) 中该充电桩的 `桩号·余量` 简略信息
                // 如果该充电桩的余量为 0，则不渲染。
                // 当 templateType 为 `classical` 时，返回的模板是 `""`
                if (available_num_in_a_charger) {
                    charger_message.push(
                        mustache.render(await pageTemplateMapper(templateType, "summaryStationPile"), {
                            charger_no: get_charger_name(charger_key),
                            charger_a_num: available_num_in_a_charger,
                        })
                    );
                }

                // 将该充电桩的空闲数量累加到充电站的空闲桩数上
                available_num_in_a_station += available_num_in_a_charger;
            }
        }
        // 结束遍历该充电站的每个充电桩

        // 将该充电站的空闲数量累加到全校的空闲插座数上
        available_num_in_all_station += available_num_in_a_station;
        // 将该充电站的全部（含不成功）充电桩数量累加到全校的全部（含不成功）充电桩数量上
        all_chargers_num += chargers_num_in_a_station;
        // 将该充电站的查询成功充电桩数量累加到全校的查询成功充电桩数量上
        success_chargers_num += success_chargers_num_in_a_station;

        // 充电桩Array拼装成充电桩Array，渲染充电桩表格 (detail)
        stations_detail_arr.push(
            mustache.render(await pageTemplateMapper(templateType, "detailStation"), {
                station_name: station,
                available_num: available_num_in_a_station,
                enough:
                    available_num_in_a_station >
                    CONFIG["conditions"]["enough_socket_num"] *
                    success_chargers_num_in_a_station,
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
                    : "<sup> </sup> 没有空闲插座", // 这里 `<sup> </sup>` 是为了统一块高度，防止高度不一致导致渲染崩坏。
                enough:
                    available_num_in_a_station >
                    CONFIG["conditions"]["enough_socket_num"] *
                    success_chargers_num_in_a_station,
            })
        );
        // 打本桩log（需要的时候再取消注释）
        /*
        console.log(
            `渲染 ${station} 完成，可用充电插座数 ${available_num_in_a_station}，` +
            `成功${success_chargers_num_in_a_station}桩/全部${chargers_num_in_a_station}桩。` +
            `余量 ${
                (available_num_in_a_station >
                    CONFIG["conditions"]["enough_socket_num"] * success_chargers_num_in_a_station) ?
                    "充足" : "紧张"
            }`
        )
         */
    }
    // 结束遍历每个充电站（东门北侧，东门南侧，……）

    //打本次log
    console.log(
        `充电站、充电桩、充电插座遍历结束。` +
        `KV_ALL 中共有充电桩${all_chargers_num}个，查询成功的为${success_chargers_num}个。` +
        `其中，有${available_num_in_all_station}个充电桩空闲。`
    )

    //渲染 tips
    const tips = CONFIG["tip"]["enable"] ?
        mustache.render(await pageTemplateMapper(templateType, "tips"), null) : null;

    //渲染 container
    return  mustache.render(await pageTemplateMapper(templateType, "container"), {
        is_expired: is_expired,
        update_time: for_display_update_time,
        tips: tips,
        all_enough:
            available_num_in_all_station >
            CONFIG["conditions"]["enough_sum_num"],
        stations: stations_message.join("\n"),
        station_detail: stations_detail_arr.join("\n"),
    });
}

/**
 * @param KV_ALL
 * @param {"ver4"|"classical"} templateType
 */
export async function renderMainPage(KV_ALL, templateType="ver4") {
    let for_display_update_time = "Unknown";
    // 过期判定，显示硬过期提示
    if (
        new Date().getTime() -
        KV_ALL["update_message"]["last_success_start_time"] >
        CONFIG.cache.refuse_time * 60 * 1000
    ) {
        return renderError("数据多次更新失败", "classical");
    }

    return mustache.render(
        await pageTemplateMapper(templateType, "htmlFrame"),
        {
            status_success: true,
            container: await renderContainer(KV_ALL, templateType),
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