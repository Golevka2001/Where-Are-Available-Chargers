import apiQuery from "./api_query.js";
import CONFIG from "./auto_gen/config.js";

async function kvUpdate(api_endpoint, sign_key, kv) {
    const ALL_INFORMATION = await apiQuery(api_endpoint, sign_key);
    kv.set(["KV_ALL"], ALL_INFORMATION);
    return ALL_INFORMATION;
}

async function update(api_endpoint, sign_key) {
    switch (CONFIG["cache"]["cache_mode"]) {
        case 1: {
            // 收到用户请求时读取/更新缓存
            console.log("[Cache mode 1] Passive update");
            const kv = await Deno.openKv();
            const result = await kv.get(["KV_ALL"]);
            let ALL_INFORMATION = null;
            try {
                if (!(result.value == null)) {
                    ALL_INFORMATION = result.value;

                    if (
                        new Date().getTime() -
                                ALL_INFORMATION["update_message"][
                                    "last_success_start_time"
                                ] <
                            CONFIG["cache"]["refresh_time"] * 1000 * 60
                    ) {
                        // 缓存有效期内，返回缓存数据
                        console.log("Cache hit!");
                        return ALL_INFORMATION;
                    }
                }
                return await kvUpdate(api_endpoint, sign_key, kv);
            } catch {
                console.log("Error: Cache hit failed, updating cache");
                return await apiQuery(api_endpoint, sign_key);
            }
        }

        case 2: {
            // TODO: UNFINISHED
            // case 2 时，会直接从 Deno KV 中读出数据。
            // 使用此配置时，应当有外部辅助方式触发更新并写入 Deno KV
            // TODO: 不使用外部刷新工具，使用 Deno cron 实现。
            const kv = await Deno.openKv();
            const result = await kv.get(["KV_ALL"]);
            return JSON.parse(result.value);
        }

        default:
            // 实时查询，不使用缓存
            console.log("[Cache mode 0] Real-time query, no cache");
            return await apiQuery(api_endpoint, sign_key);
    }
}

export default update;
