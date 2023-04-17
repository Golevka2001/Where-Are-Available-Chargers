#!user/bin/env python
# -*- coding:utf-8 -*-
"""Where-Are-Available-Chargers:
    希望这个脚本可以帮助你更容易给小电驴找到充电桩。
@File: status_converter.py
@Brief: 将 Ver 2 `get_status()` 返回的 `status` 转换为 Ver 3 使用的格式
"""

from datetime import datetime, timezone, timedelta


def v2status_to_v3allinfo(status: dict, list=False, Array=False) -> dict:
    """Convert `status` (ver 2 `get_status()`) to `ALL_INFORMATION` (ver 3)

    Argument: `status`
        dict: {东门:{北侧-1:[[1, 0, 00:30:00, 90%],...],...},...}
    Return:
        dict: {东门:{北侧-1:[1,0,0,0,1,0,0,0,0,0],...},...}
        dict: {东门:[[1,0,0,0,1,0,0,0,0,0],...],...}

    推荐将`东门:北侧-1`改为`东门北侧:1`，因为`北侧-1`这种显示方法在 Version 3 的网页里空间不够。
    将调用 find_chargers.py 得到的 dict 喂给它，即可得到适用于 Version 3 的 `ALL_INFORMATION`。
    `list=True` 或 `Array=True` 时，输出将使用编号法而不是原样命名。**推荐使用此模式**。
    """

    output_in_list: bool = list or Array

    all_information: dict = {
        "update_message": {
            "last_success_end_time": int(
                datetime.now(timezone(timedelta(hours=8))).timestamp() * 1000
            ),
            "last_success_query_id": 123456789,  # 请自行定义一个生成方式，建议使用严格增长的 64 位以下的整数
            "last_success_num": 0,
            "update_success_time": datetime.now(timezone(timedelta(hours=8))).strftime(
                "%H:%M"
            ),
        },
        "status_sum": dict(),
        "status_detail": dict(),
    }

    for station in status:
        if output_in_list:
            available_sum: int = 0
            all_information["status_detail"][station]: list = []
            # 由于 10 号元素用于判断是否查询成功，所以直接不使用推导式
            for charger in status[station]:
                if status[station][charger][10] == -1:
                    all_information["status_detail"][station].append([])
                else:
                    all_information["status_detail"][station].append(
                        [value[1] for value in status[station][charger][0:-1]]
                    )
                    available_sum += status[station][charger][10]
                    all_information["update_message"]["last_success_num"] += 1
            all_information["status_sum"][station]: int = available_sum
        else:
            available_sum: int = 0
            all_information["status_detail"][station]: dict = dict()
            for charger in status[station]:
                if status[station][charger][10] == -1:
                    all_information["status_detail"][station][charger]: list = list()
                else:
                    all_information["status_detail"][station][charger] = [
                        value[1] for value in status[station][charger][0:-1]
                    ]
                    available_sum += status[station][charger][10]
                    all_information["update_message"]["last_success_num"] += 1
            all_information["status_sum"][station]: int = available_sum

    return all_information


if __name__ == "__main__":

    from find_chargers import FindChargers
    import os, json

    config_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), "config.yml")
    chargers = FindChargers(config_path)
    status, _ = chargers.get_status()
    all_info = v2status_to_v3allinfo(status, Array=False)

    print(json.dumps(all_info))
    os.environ["CHARGERS_VER3_ALL_INFO"] = json.dumps(all_info)
