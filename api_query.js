import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import CONFIG from "./auto_gen/config.js";

async function hmacSha256(message, secret_key) {
    // 使用 UTF-8 编码将消息和密钥转换成字节数组
    const encoded_message = new TextEncoder().encode(message);
    const encoded_secret_key = new TextEncoder().encode(secret_key);

    const crypto_key = await crypto.subtle.importKey(
        "raw",
        encoded_secret_key,
        { name: "HMAC", hash: "SHA-256" },
        true,
        ["sign"],
    );
    const signature = await crypto.subtle.sign(
        "HMAC",
        crypto_key,
        encoded_message.buffer,
    );

    return [...new Uint8Array(signature)]
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase(); // 转为 Hex 并大写
}

export async function apiQuery(api_endpoint, sign_key) {
    // 请求头
    const cur_timestamp = Math.floor(new Date().getTime() / 1000);
    const sign = await hmacSha256(
        `timestamp=${cur_timestamp.toString()}&key=${sign_key}`,
        sign_key,
    );

    // 请求数据
    const chargers_raw_data = await axiod
        .get(api_endpoint, {
            headers: {
                timestamp: cur_timestamp,
                sign: sign,
            },
            timeout: 5000,
        })
        .then((response) => {
            if (response.status !== 200) {
                console.log(
                    "Error: API query failed[" + response.status + ", " +
                        response.statusText + "]",
                );
                throw new Error("Error: API query failed");
            } else {
                if (response.data["status_code"] !== 200) {
                    console.log(
                        "Error: API query failed[" +
                            response.data["status_code"] + ", " +
                            response.data["message"] + "]",
                    );
                    throw new Error("Error: API query failed");
                } else {
                    return response.data["data"];
                }
            }
        });

    const ret_all = {
        update_message: {
            last_success_start_time: new Date().getTime(),
            last_success_end_time: 0,
        },
        status_detail: structuredClone(CONFIG["status_detail_template"]),
    };

    // 遍历充电桩，将数据填入模板
    for (const charger in chargers_raw_data) {
        try {
            const station =
                CONFIG["stations_r"][chargers_raw_data[charger]["name"]][
                    "station"
                ];
            const friendly_no =
                CONFIG["stations_r"][chargers_raw_data[charger]["name"]][
                    "charger_friendly_no"
                ];
            const sockets = [];
            for (const channel in chargers_raw_data[charger]["channels"]) {
                if (
                    chargers_raw_data[charger]["channels"][channel][
                        "status"
                    ] === 1
                ) {
                    sockets.push(1);
                } else {
                    sockets.push(0);
                }
            }
            ret_all["status_detail"][station][friendly_no] = sockets;
        } catch {
            console.log(
                `Error: New charger ${[chargers_raw_data[charger]["name"]]}`,
            );
        }
    }
    ret_all["update_message"]["last_success_end_time"] = new Date().getTime();

    return ret_all;
}

export default apiQuery;
