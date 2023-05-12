import CONFIG from "./auto_gen/config.js";
import api_query from "./api_query.js";

async function kv_update(api_endpoint, sign_key, kv) {
    const ALL_INFORMATION = await api_query(api_endpoint, sign_key);
    kv.set(["KV_ALL"], ALL_INFORMATION);
    return ALL_INFORMATION;
}

async function update(api_endpoint, sign_key) {
    switch (CONFIG["cache"]["cache_mode"]) {
        case 1: {
            console.log("case 1");
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
                        console.log("cache hit!");
                        return ALL_INFORMATION;
                    }
                }
                return await kv_update(api_endpoint, sign_key, kv);
            } catch {
                console.log("case 1 err");
                return await api_query(api_endpoint, sign_key);
            }
        }

        case 2: {
            const kv = await Deno.openKv();
            const result = await kv.get(["KV_ALL"]);
            const ALL_INFORMATION = JSON.parse(result.value);
            return ALL_INFORMATION;
        }

        default:
            console.log("case 0");
            return await api_query(api_endpoint, sign_key);
    }
}

export default update;
