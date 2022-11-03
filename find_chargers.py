#!user/bin/env python
# -*- coding:utf-8 -*-
'''Where-Are-Available-Chargers:
    希望这个脚本可以帮助你更容易给小电驴找到充电桩。
@Author: Golevka2001<gol3vka@163.com>
@Version: 1.1.0
@Created Date: 2022/11/01
@Last Modified Date: 2022/11/03
'''

# TODO: 现在只存了少数几个充电桩的码，还有很多二维码需要之后添加进来
# TODO: 之后会想一个更方便查询的方法，比如邮件、网页什么的

import requests
import yaml
import os


class FindChargers:
    '''Traverse all the charging stations, print available ones
    '''

    def __init__(self, config_path: str) -> None:
        self.token = str()
        self.available = list()
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

    def where_are_you(self):
        '''Traverse all the charging stations in the list
        '''
        self._get_token()
        url_base = 'https://mapi.7mate.cn/api/chargers/'
        self.config['headers']['authorization'] = str(
            'Bearer ' + self.token)  # authorization key is needed
        # traverse all stations:
        for location, number in self.config['charger_list']:
            available_channels = str()
            response = requests.get(url=url_base + number,
                                    headers=self.config['headers']).json()
            if response['status_code'] != 200:
                available_channels = ' * 故障 *'
            else:
                # traverse 10 sockets:
                content = response['data']
                for socket in content['channels']:
                    if socket['status'] == 1:
                        available_channels += (' [%d]' % socket['channel'])
                # no available sockets:
                if len(available_channels) == 0:
                    available_channels = ' /'
            self.available.append('%s:%s' % (location, available_channels))
        # delete the authorization key:
        del [self.config['headers']['authorization']]

    def tell_me(self, type: str) -> str:
        '''Return different result using different line break character

        Args:
            type (str): type: 'str', 'html'

        Returns:
            str: result
        '''
        if type == 'str':
            return '\n'.join(self.available)
        if type == 'html':
            return '<br />'.join(self.available)


# test:
if __name__ == '__main__':
    config_path = os.path.join(os.path.abspath(os.path.dirname(__file__)),
                               'config.yml')
    test = FindChargers(config_path)
    test.where_are_you()
    print(test.tell_me('str'))
