export default function v5apiConverter(KV_ALL, v5cfg) {
    const v5api_result = {
        "code": 200,
        "last_update_time": KV_ALL["update_message"]["last_success_end_time"],
        "status": {
            "available_count": 0,
            "total_count": 0,
            "stations": [],
        },
    };
    const status_detail = KV_ALL["status_detail"];

    for (const station in status_detail) {
        const chargers_in_current_station = [];
        let available_count_in_current_station = 0;
        let total_count_in_current_station = 0;
        for (const charger in status_detail[station]) {
            if (v5cfg && v5cfg[station] && v5cfg[station][charger]) {
                chargers_in_current_station.push({
                    "name": charger,
                    "fault_info": v5cfg[station][charger],
                    "available_count": 0,
                    "sockets": []
                })
            } else if (!status_detail[station][charger]) {
                chargers_in_current_station.push({
                    "name": charger,
                    "fault_info": "充电桩参数错误",
                    "available_count": 0,
                    "sockets": []
                })
            } else {
                const available_count_in_current_charger = status_detail[station][charger].reduce((a, b) => a + b);
                available_count_in_current_station += available_count_in_current_charger;
                total_count_in_current_station += 10;
                chargers_in_current_station.push({
                    "name": charger,
                    "fault_info": null,
                    "available_count": available_count_in_current_charger,
                    "sockets": status_detail[station][charger]
                })
            }
        }
        v5api_result["status"]["stations"].push({
            "name": station,
            "description": null,
            "available_count": available_count_in_current_station,
            "total_count": total_count_in_current_station,
            "chargers": chargers_in_current_station,
        })
        v5api_result["status"]["available_count"] += available_count_in_current_station;
        v5api_result["status"]["total_count"] += total_count_in_current_station;
    }
    return v5api_result;
}
