#!user/bin/env python
# -*- coding:utf-8 -*-
"""Where-Are-Available-Chargers:
    希望这个脚本可以帮助你更容易给小电驴找到充电桩。
@File: find_chargers.py
@Brief: 使用 requests 爬取充电桩信息，返回字典或字符串类型数据。
@Author: Golevka2001<gol3vka@163.com>
@Version: 2.3.5
@Created Date: 2022/11/01
@Last Modified Date: 2022/11/20
"""

import asyncio
import os
import time
from datetime import datetime, timedelta

import requests
import yaml
from aiohttp import ClientSession, ClientTimeout


class FindChargers:

    def __init__(self, config_path: str) -> None:
        """Initialize the class

        Args:
            config_path (str): path of 'config.yml'
        """
        # load config:
        self.config = dict()
        with open(config_path, "r", encoding="utf-8") as config_file:
            self.config = yaml.safe_load(config_file)
        self.token = str()
        self.utc_time = datetime.utcnow()
        self.cn_time = datetime.utcnow() + timedelta(hours=8)
        self.timeout = ClientTimeout(total=5,
                                     connect=None,
                                     sock_connect=None,
                                     sock_read=None)
        self.event_loop = asyncio.new_event_loop()
        self.process_over = True
        # store all status:
        # {东门:{北侧-1:[[1, 0, 00:30:00, 90%],...],...},...}
        self.status = dict()
        for area, stations in self.config["stations"].items():
            self.status[area] = dict()
            for station in stations:
                self.status[area][station] = list()
                for i in range(10):
                    self.status[area][station].append(list())
                self.status[area][station].append(0)

    def _update_time(self) -> None:
        self.utc_time = datetime.utcnow()
        self.cn_time = datetime.utcnow() + timedelta(hours=8)

    def _get_token(self) -> None:
        """Send 'openid' and 'phone' to get token

        Raises:
            Exception: if token is not received
        """
        # send request:
        login_data = {
            "openid": self.config["openid"],
            "phone": self.config["phone"]
        }
        with requests.Session() as session:
            # retry 3 times:
            session.adapters.DEFAULT_RETRIES = 3
            session.keep_alive = False
            # request:
            with session.post(
                    url=self.config["login_url"],
                    json=login_data,
                    headers=self.config["headers"],
                    allow_redirects=False,
                    stream=False,
                    timeout=5,
            ) as response:
                response = response.json()
                # check:
                if "data" not in response:
                    raise Exception("[Error] Login failed!")
                else:
                    self.token = response["data"]["token"]

    async def _get_response(self, args: tuple) -> tuple:
        """[ASYNC]Inquire the status of a station

        Args:
            args (tuple): (area, station_name, station_url)

        Returns:
            tuple: (response, area, station_name)
        """
        # parse arguments:
        area, station_name, station_url = args
        # request:
        try:
            async with ClientSession(timeout=self.timeout) as session:
                async with await session.get(
                        url=(self.config["inquiry_url"] + station_url),
                        headers=self.config["headers"]) as response:
                    response = await response.json()
        except:
            # TODO: 异常处理，待解决
            response = dict()
        return (response, area, station_name)

    def _process_response(self, task: asyncio.Task) -> None:
        """Callback function of get_response(), process response

        Args:
            task (asyncio.Task): task returned by get_response()
        """
        # parse arguments:
        response, area, station_name = task.result()
        # check:
        if ("data" not in response) or (bool(response["data"]) is False):
            self.status[area][station_name][10] = -1
        else:
            total = 0
            data = response["data"]
            # traverse 10 sockets:
            for socket in data["channels"]:
                remain_time = str()
                percentage = str()
                # check status:
                if socket["status"] == 1:
                    # finished:
                    remain_time = "00:00:00"
                    percentage = "100%"
                    total += 1
                else:
                    # charging:
                    # NOTE: 无法判断是5h还是10h，结果仅供参考。
                    start_time = datetime.strptime(socket["updated_at"],
                                                   "%Y-%m-%d %H:%M:%S")
                    duration = self.cn_time - start_time
                    # calculate percent complete:
                    percentage = duration.seconds / timedelta(hours=10).seconds
                    percentage = str(round(percentage * 100)) + "%"
                    # calculate remaining time:
                    remain_time = timedelta(hours=10) - duration
                    remain_time = time.strftime(
                        "%H:%M:%S", time.gmtime(remain_time.seconds))
                # record:
                self.status[area][station_name][socket["channel"] - 1] = ([
                    socket["channel"], socket["status"], remain_time,
                    percentage
                ])
            self.status[area][station_name][10] = total

    def get_status(self) -> dict:
        """Traversal all stations, get status

        Returns:
            dict: {东门:{北侧-1:[[1, 0, 00:30:00, 90%],...],...},...}
        """
        self.process_over = False
        tasks = set()
        # add authorization key:
        self._get_token()
        self.config["headers"]["authorization"] = "Bearer " + self.token
        # traverse all stations:
        asyncio.set_event_loop(self.event_loop)
        for area, stations in self.config["stations"].items():
            for station_name, station_url in stations.items():
                task = asyncio.ensure_future(
                    self._get_response((area, station_name, station_url)),
                    loop=self.event_loop,
                )
                task.add_done_callback(self._process_response)
                tasks.add(task)
        # run loop:
        self.event_loop.run_until_complete(asyncio.wait(tasks))
        tasks.clear()
        # delete authorization key:
        del self.config["headers"]["authorization"]
        self._update_time()
        self.process_over = True
        return self.status


if __name__ == "__main__":
    config_path = os.path.join(os.path.abspath(os.path.dirname(__file__)),
                               "config.yml")
    fc = FindChargers(config_path)
    while True:
        start = time.time()
        status = fc.get_status()
        print(status)
        end = time.time()
        print(end - start)
        input('Press "Enter" to continue...')
