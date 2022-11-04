#!user/bin/env python
# -*- coding:utf-8 -*-
'''Where-Are-Available-Chargers:
    希望这个脚本可以帮助你更容易给小电驴找到充电桩。
@File: find_chargers.py
@Brief: 使用 requests 爬取充电桩信息，返回字典或字符串类型数据。
@Author: Golevka2001<gol3vka@163.com>
@Version: 2.1.0
@Created Date: 2022/11/01
@Last Modified Date: 2022/11/04
'''

# TODO: 现有的大部分充电桩已经添加进来啦，还差西门北侧3个

import requests
import yaml
import os
import time
from datetime import datetime, timedelta


class FindChargers:
    '''Traverse all the charging stations, print available ones
    '''

    def __init__(self, config_path: str) -> None:
        self.token = str()
        self.available = dict()
        self.last_time = datetime.now() - timedelta(days=1)  # yesterday
        with open(config_path, 'r', encoding='utf-8') as config_file:
            self.config = yaml.safe_load(config_file)
            config_file.close()

    def _get_token(self) -> None:
        '''Use openid and phone number to login and get a token
        '''
        url = 'https://mapi.7mate.cn/api/authorizations'
        login_data = {
            'openid': self.config['openid'],
            'phone': self.config['phone']
        }
        response = requests.post(url=url,
                                 json=login_data,
                                 headers=self.config['headers'],
                                 allow_redirects=False).json()
        self.token = response['data']['token']

    def _update_time(self) -> None:
        '''Record current time
        '''
        self.last_time = datetime.now()

    def where_are_you(self) -> None:
        '''Traverse all the charging stations in the list
        '''
        self._get_token()
        url_pri = 'https://mapi.7mate.cn/api/chargers/'
        self.config['headers'][
            'authorization'] = 'Bearer ' + self.token  # authorization key is needed
        # traverse all stations:
        for area, chargers in self.config['charger_list'].items():
            charger_list = list()
            for charger_name, url_post in chargers:
                available_sockets = str()
                response = requests.get(url=url_pri + url_post,
                                        headers=self.config['headers']).json()
                if response['status_code'] != 200:
                    available_sockets = ' * 查询失败 * '
                else:
                    # traverse 10 sockets:
                    content = response['data']
                    for socket in content['channels']:
                        if socket['status'] == 1:
                            available_sockets += (' [%d] ' % socket['channel'])
                    # no available sockets:
                    if len(available_sockets) == 0:
                        available_sockets = ' * 无 * '
                charger_list.append([charger_name, available_sockets])
            self.available.update({self.config['en2zh'][area]: charger_list})
        # update time:
        self._update_time()
        # delete the authorization key:
        del [self.config['headers']['authorization']]

    def tell_me(self, type: str) -> str | dict:
        '''Return different result using different line break character

        Args:
            type (str): type: 'str', 'html'

        Returns:
            str: result
        '''
        if type == 'str':
            result = str()
            for area, chargers in self.available.items():
                result += '%s: \n' % area
                for charger_name, status in chargers:
                    result += '  %s:%s\n' % (charger_name, status)
            return result
        if type == 'html':
            return self.available


# test:
if __name__ == '__main__':
    config_path = os.path.join(os.path.abspath(os.path.dirname(__file__)),
                               'config.yml')
    test = FindChargers(config_path)
    test.where_are_you()
    print(test.tell_me('str'))
