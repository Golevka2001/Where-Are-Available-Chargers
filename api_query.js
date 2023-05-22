import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import CONFIG from "./auto_gen/config.js";

async function hmac_sha256(message, secret) {
    // 使用 UTF-8 编码将消息和密钥转换成字节数组
    const messageBytes = new TextEncoder().encode(message);
    const secretKeyBytes = new TextEncoder().encode(secret);

    const key = await crypto.subtle.importKey(
        "raw",
        secretKeyBytes,
        { name: "HMAC", hash: "SHA-256" },
        true,
        ["sign"]
    );
    const result = await crypto.subtle.sign("HMAC", key, messageBytes.buffer);

    return [...new Uint8Array(result)]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase(); // 转为 Hex 并大写
}

export async function api_query(api_endpoint, sign_key) {
    const now_timestamp = Math.floor(new Date().getTime() / 1000);

    const sign = await hmac_sha256(
        `timestamp=${now_timestamp.toString()}&key=${sign_key}`,
        sign_key
    );

    const api_raw_json = await axiod
        .get(api_endpoint, {
            headers: {
                timestamp: now_timestamp,
                sign: sign,
            },
            timeout: 5000,
        })
        .then((response) => {
            if (response.status !== 200) {
                throw "Error! StatusCode !== 200";
            } else {
                return response.data;
            }
        });

    const ret_all = {
        update_message: {
            last_success_start_time: new Date().getTime(),
            last_success_end_time: 0,
        },
        status_detail: structuredClone(CONFIG["status_detail_template"]),
    };

    const chargers_raw_data = api_raw_json["data"];

    for (const charger in chargers_raw_data) {
        const station =
            CONFIG["stations_r"][chargers_raw_data[charger]["name"]]["station"];
        const friendly_no =
            CONFIG["stations_r"][chargers_raw_data[charger]["name"]][
                "charger_friendly_no"
            ];
        const sockets = [];
        for (const channel in chargers_raw_data[charger]["channels"]) {
            if (
                chargers_raw_data[charger]["channels"][channel]["status"] === 1
            ) {
                sockets.push(1);
            } else {
                sockets.push(0);
            }
        }
        ret_all["status_detail"][station][friendly_no] = sockets;
    }

    ret_all["update_message"]["last_success_end_time"] = new Date().getTime();

    return ret_all;
}

export default api_query;
