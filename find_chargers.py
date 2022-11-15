#!user/bin/env python
# -*- coding:utf-8 -*-
'''Where-Are-Available-Chargers:
    希望这个脚本可以帮助你更容易给小电驴找到充电桩。
@File: find_chargers.py
@Brief: 使用 requests 爬取充电桩信息，返回字典或字符串类型数据。
@Author: Golevka2001<gol3vka@163.com>
@Version: 2.3.0
@Created Date: 2022/11/01
@Last Modified Date: 2022/11/15
'''

from concurrent.futures import ThreadPoolExecutor, wait
from datetime import datetime, timedelta
from threading import Lock
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
        # load config:
        self.config = dict()
        with open(config_path, 'r', encoding='utf-8') as config_file:
            self.config = yaml.safe_load(config_file)
            config_file.close()
        # token:
        self.token = str()
        # local time (UTC+08:00):
        self.local_time = datetime.utcnow()
        # thread pool:
        self.thread_pool = ThreadPoolExecutor(
            max_workers=9, thread_name_prefix='inquiry_thread_')
        # mutex :
        self.mutex = Lock()
        # store all status:
        # {东门:{北侧-1:[[1, 0, 00:30:00, 90%],...],...},...}
        self.status = dict()
        for area, stations in self.config['stations'].items():
            self.status[area] = dict()
            for station in stations:
                self.status[area][station] = list()

    def update_time(self) -> None:
        '''Update local time (UTC+08:00)
        '''
        self.local_time = datetime.utcnow() + timedelta(hours=8)

    def get_token(self) -> None:
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

    def get_response(self, args) -> None:
        '''Inquire the status of each station

        Args:
            args (list): [area, station_name, station_url]
        '''
        area, station_name, station_url = args
        # send request:
        response = requests.get(url=(self.config['inquiry_url'] + station_url),
                                headers=self.config['headers']).json()
        # check:
        if 'data' in response:
            total = 0
            data = response['data']
            # traverse 10 sockets:
            for socket in data['channels']:
                # check status:
                if socket['status'] == 1:
                    # finished:
                    status = '00:00:00'
                    percentage = '100%'
                    total += 1
                else:
                    # charging:
                    # calculate the remaining time and percent complete:
                    # NOTE: 无法判断是5h还是10h，结果仅供参考。
                    # NOTE: 不确定 'updated_at' 是不是充电开始时间，看起来像，暂时当作这个来算。
                    start_time = datetime.strptime(socket['updated_at'],
                                                   '%Y-%m-%d %H:%M:%S')
                    duration = self.local_time - start_time
                    percentage = duration.seconds / timedelta(hours=10).seconds
                    percentage = str(round(percentage * 100)) + '%'
                    if duration < timedelta(minutes=530):
                        status = '充电中'
                    elif duration < timedelta(minutes=550):
                        status = '约半小时'
                    else:
                        remain_time = timedelta(hours=10) - duration
                        remain_time = time.strftime(
                            "%M", time.gmtime(remain_time.seconds))
                        status = '约%smin' % remain_time
                # record:
                self.mutex.acquire()
                self.status[area][station_name].append(
                    [socket['channel'], socket['status'], status, percentage])
                self.mutex.release()
            self.mutex.acquire()
            self.status[area][station_name].append(total)
            self.mutex.release()

    def get_status(self) -> None:
        '''Multithreading, traverse all stations, call get_response()
        '''
        thread_list = list()
        self.get_token()
        # add authorization key:
        self.config['headers']['authorization'] = 'Bearer ' + self.token
        self.update_time()
        # traverse all stations:
        for area, stations in self.config['stations'].items():
            for station_name, station_url in stations.items():
                # multithreading:
                thread_list.append(
                    self.thread_pool.submit(self.get_response,
                                            [area, station_name, station_url]))
        wait(thread_list)
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
