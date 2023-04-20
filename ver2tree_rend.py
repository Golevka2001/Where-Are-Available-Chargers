#!user/bin/env python
# -*- coding:utf-8 -*-
"""Where-Are-Available-Chargers:
    希望这个脚本可以帮助你更容易给小电驴找到充电桩。
@File: ver2tree_rend.py
@Brief: 使用 Python 和 Version 2 的主要程序渲染 Version 3 的界面
@Version: 2.4.1+Tree-3.4.3
"""

import chevron as mustache
import os, yaml

config_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), "config.yml")


def mtemplate(template_name: str):
    file_path: str = os.path.join(
        os.path.abspath(os.path.dirname(__file__)),
        "mustache-templates",
        (template_name + ".mustache"),
    )
    with open(file_path, "r", encoding="utf-8") as template:
        return template.read()


def render_chinese(ALL_INFOMATION, config_path=config_path):
    config = dict()
    with open(config_path, "r", encoding="utf-8") as config_file:
        config = yaml.safe_load(config_file)

    # 命名方便使用
    Raw_Detail = ALL_INFOMATION["status_detail"]

    # detail 表示详细信息表格
    # message 表示总览表格
    stations_detail_arr = []
    stations_message = []
    available_num_in_all_station = 0
    success_chargers_num = 0
    all_chargers_num = 0
    for station in Raw_Detail:
        # 遍历充电桩
        charger_detail_arr = []
        charger_message = []
        available_num_in_a_station = 0

        """
            Python 版本目前仅支持 dict 式。
        """
        get_charger_name = lambda charger_key: charger_key
        # get_charger_name = None
        # if isinstance(Raw_Detail[station], list):
        #     get_charger_name = lambda charger_key: int(charger_key) + 1
        # else:
        #     get_charger_name = lambda charger_key: charger_key

        for charger_key in Raw_Detail[station]:
            all_chargers_num += 1
            # 判断参数缺失，直接写入充电桩Array和总览表格充电桩Array
            # 使用场景是充电桩ID没有获取全就上线
            if Raw_Detail[station][charger_key] is None:
                # 渲染充电桩表格 (detail) - undefined
                charger_detail_arr.append(
                    mustache.render(
                        mtemplate("charger_detail"),
                        {
                            "charger_no": get_charger_name(charger_key),
                            "socket_detail": "* 充电桩参数缺失 *",
                        },
                    )
                )
                # 渲染充电桩总览 (message) - undefined
                charger_message.append(
                    mustache.render(
                        mtemplate("remain"),
                        {
                            "charger_no": get_charger_name(charger_key),
                            "charger_a_num": "N/A",
                        },
                    )
                )
                all_chargers_num -= 1  # 不计入查询失败
            # 充电桩失败，直接写入充电桩Array和总览表格充电桩Array
            elif len(Raw_Detail[station][charger_key]) == 0:
                # 渲染充电桩表格 (detail) - Error
                charger_detail_arr.append(
                    mustache.render(
                        mtemplate("charger_detail"),
                        {
                            "charger_no": get_charger_name(charger_key),
                            "socket_detail": "* 获取失败 *",
                        },
                    )
                )
                # 渲染充电桩总览 (message) - Error
                charger_message.append(
                    mustache.render(
                        mtemplate("remain"),
                        {
                            "charger_no": get_charger_name(charger_key),
                            "charger_a_num": "Error",
                        },
                    )
                )
            else:
                success_chargers_num += 1
                # 遍历插座
                socket_detail_arr = []  # 插座Array (detail)
                available_num_in_a_charger = 0  # 充电桩的可用插座数量
                for socket_no, socket_status_bool in enumerate(
                    Raw_Detail[station][charger_key]
                ):
                    # 插座信息写入插座Array (detail)
                    socket_detail_arr.append(
                        mustache.render(
                            mtemplate("socket_detail"),
                            {
                                "socket_status": 1
                                if socket_status_bool
                                == 1  # Raw_Detail[station][charger_key][socket_no] == 1
                                else 0,
                                "socket_num": int(socket_no) + 1,
                            },
                        )
                    )
                    # 增加充电桩的可用插座数量
                    if Raw_Detail[station][charger_key][socket_no] == 1:
                        available_num_in_a_charger += 1
                # 插座Array拼装成充电桩Array，渲染充电桩表格 (detail)
                charger_detail_arr.append(
                    mustache.render(
                        mtemplate("charger_detail"),
                        {
                            "charger_no": get_charger_name(charger_key),
                            "socket_detail": "  ".join(socket_detail_arr),
                        },
                    )
                )
                # 插座Array拼装成充电桩总览Array，渲染充电桩总览 (message)
                charger_message.append(
                    mustache.render(
                        mtemplate("remain"),
                        {
                            "charger_no": get_charger_name(charger_key),
                            "charger_a_num": available_num_in_a_charger,
                        },
                    )
                )
                available_num_in_a_station += available_num_in_a_charger
        available_num_in_all_station += available_num_in_a_station
        # 充电桩Array拼装成充电桩Array，渲染充电桩表格 (detail)
        stations_detail_arr.append(
            mustache.render(
                mtemplate("station_detail"),
                {
                    "station_name": station,
                    "available_num": available_num_in_a_station,
                    "enough": available_num_in_a_station
                    > len(Raw_Detail[station])
                    * config["conditions"]["enough_socket_num"],
                    "charger_detail": "\n".join(charger_detail_arr),
                },
            )
        )
        # 渲染充电站总览 (message) 推入 充电站Array
        stations_message.append(
            mustache.render(
                mtemplate("station"),
                {
                    "station_name": station,
                    "available_num": available_num_in_a_station,
                    "remain": ", ".join(charger_message),
                    "enough": available_num_in_a_station
                    > len(Raw_Detail[station])
                    * config["conditions"]["enough_socket_num"],
                },
            )
        )

    # 渲染完整页面
    ret_page = mustache.render(
        mtemplate("main"),
        {
            "chongzu": available_num_in_all_station
            > config["conditions"]["enough_sum_num"],
            "error": success_chargers_num != all_chargers_num,
            "stations": "\n".join(stations_message),
            "station_detail": "\n".join(stations_detail_arr),
            "query_id": ALL_INFOMATION["update_message"]["last_success_query_id"],
        },
    )
    return ret_page


def render_error(message="发生错误，请稍后再试"):
    return mustache.render(mtemplate("error"), {message: message})


def render_loading():
    return mustache.render(mtemplate("loading"))
