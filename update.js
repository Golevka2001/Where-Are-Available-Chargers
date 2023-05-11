import CONFIG from "./auto_gen/config.js";
import api_query from "./api_query.js";

window.is_first_start = true;

async function update(api_endpoint, sign_key) {
    switch (CONFIG["cache"]["cache_mode"]) {
        case 1: {
            console.log("case 1");
            const kv = await Deno.openKv();
            const result = await kv.get(["KV_ALL"]);
            let ALL_INFORMATION = null;
            try {
                if (result.value == null) {
                    window.is_first_start = true;
                } else {
                    ALL_INFORMATION = result.value;
                }
                if (
                    !window.is_first_start &&
                    new Date().getTime() -
                        ALL_INFORMATION["update_message"][
                            "last_success_start_time"
                        ] <
                        CONFIG["cache"]["refresh_time"] * 1000 * 60
                ) {
                    console.log("cache hit!");
                    return ALL_INFORMATION;
                } else {
                    const ALL_INFORMATION = await api_query(
                        api_endpoint,
                        sign_key
                    );
                    console.log("cache miss!");
                    window.is_first_start = false;
                    kv.set(["KV_ALL"], ALL_INFORMATION);
                    return ALL_INFORMATION;
                }
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
