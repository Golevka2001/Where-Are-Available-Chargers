#!user/bin/env python
# -*- coding:utf-8 -*-
'''Where-Are-Available-Chargers:
    希望这个脚本可以帮助你更容易给小电驴找到充电桩。
@File: find_chargers.py
@Brief: 使用 requests 爬取充电桩信息，返回字典或字符串类型数据。
@Author: Golevka2001<gol3vka@163.com>
@Version: 2.3.2
@Created Date: 2022/11/01
@Last Modified Date: 2022/11/16
'''

from aiohttp import ClientSession
from datetime import datetime, timedelta
import asyncio
import os
import requests
import time
import yaml


class FindChargers:

    def __init__(self, config_path: str) -> None:
        '''Initialize the class

        Args:
            config_path (str): path of 'config.yml'
        '''
        # https:
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
        # load config:
        self.config = dict()
        with open(config_path, 'r', encoding='utf-8') as config_file:
            self.config = yaml.safe_load(config_file)
            config_file.close()
        # token:
        self.token = str()
        # local time (UTC+08:00):
        self.local_time = datetime.utcnow()
        # store all status:
        # {东门:{北侧-1:[[1, 0, 00:30:00, 90%],...],...},...}
        self.status = dict()
        for area, stations in self.config['stations'].items():
            self.status[area] = dict()
            for station in stations:
                self.status[area][station] = list()

    def _update_time(self) -> None:
        '''Update local time (UTC+08:00)
        '''
        self.local_time = datetime.utcnow() + timedelta(hours=8)

    def _get_token(self) -> None:
        '''Send 'openid' and 'phone' to get token

        Raises:
            Exception: if token is not received
        '''
        # send request:
        login_data = {
            'openid': self.config['openid'],
            'phone': self.config['phone']
        }
        response = requests.post(url=self.config['login_url'],
                                 json=login_data,
                                 headers=self.config['headers'],
                                 allow_redirects=False).json()
        # check:
        if 'data' not in response:
            raise Exception('[Error] Login failed!')
        else:
            self.token = response['data']['token']

    async def _get_response(self, args: list) -> list:
        '''[ASYNC]Inquire the status of a station

        Args:
            args (list): [area, station_name, station_url]

        Returns:
            list: [response, area, station_name]
        '''
        # parse arguments:
        area, station_name, station_url = args
        # request:
        async with ClientSession() as session:
            async with await session.get(
                    url=(self.config['inquiry_url'] + station_url),
                    headers=self.config['headers']) as response:
                response = await response.json()
                return [response, area, station_name]

    def process_response(self, task: asyncio.Task) -> None:
        '''Callback function of get_response(), process response

        Args:
            task (asyncio.Task): task returned by get_response()
        '''
        # parse arguments:
        response, area, station_name = task.result()
        # check:
        if 'data' in response:
            total = 0
            data = response['data']
            # traverse 10 sockets:
            for socket in data['channels']:
                remain_time = str()
                percentage = str()
                # check status:
                if socket['status'] == 1:
                    # finished:
                    remain_time = '00:00:00'
                    percentage = '100%'
                    total += 1
                else:
                    # charging:
                    # calculate the remaining time and percent complete:
                    # NOTE: 无法判断是5h还是10h，结果仅供参考。
                    start_time = datetime.strptime(socket['updated_at'],
                                                   '%Y-%m-%d %H:%M:%S')
                    duration = self.local_time - start_time
                    percentage = duration.seconds / timedelta(hours=10).seconds
                    percentage = str(round(percentage * 100)) + '%'
                    remain_time = timedelta(hours=10) - duration
                    remain_time = time.strftime(
                        "%M", time.gmtime(remain_time.seconds))
                # record:
                self.status[area][station_name].append([
                    socket['channel'], socket['status'], remain_time,
                    percentage
                ])
            self.status[area][station_name].append(total)

    async def traverse_stations(self) -> None:
        '''[ASYNC]Traverse all stations, call get_response()
        '''
        tasks = set()
        self._update_time()
        # traverse all stations:
        for area, stations in self.config['stations'].items():
            for station_name, station_url in stations.items():
                # create task, add to set(keep strong reference), discard when done:
                task = asyncio.create_task(
                    self._get_response([area, station_name, station_url]))
                tasks.add(task)
                task.add_done_callback(self.process_response)
        # FIXME: 这里我不确定该怎么做，不await一遍会提前结束
        # FIXME：也不太确定对响应的判断处理是还在原来函数里好还是现在这样另写一个好
        for task in tasks:
            await task
        tasks.clear()

    def get_status(self) -> None:
        # add authorization key:
        self._get_token()
        self.config['headers']['authorization'] = 'Bearer ' + self.token
        # async tasks:
        asyncio.run(self.traverse_stations())
        # delete authorization key:
        del self.config['headers']['authorization']


if __name__ == '__main__':
    config_path = os.path.join(os.path.abspath(os.path.dirname(__file__)),
                               'config.yml')
    fc = FindChargers(config_path)
    start = time.time()
    fc.get_status()
    end = time.time()
    print(end - start)
    print(fc.status)
