#!user/bin/env python
# -*- coding:utf-8 -*-
'''Where-Are-Available-Chargers:
    希望这个脚本可以帮助你更容易给小电驴找到充电桩。
@Author: Golevka2001<gol3vka@163.com>
@Version: 1.0.0
@Created Date: 2022/11/01
@Last Modified Date: 2022/11/02
'''

# TODO: 现在只存了少数几个充电桩的码，还有很多二维码需要之后添加进来
# TODO: 之后会想一个更方便查询的方法，比如邮件什么的

import requests

# use this header to fake a visit by android mobile
headers = {
    'Host': 'mapi.7mate.cn',
    'Connection': 'keep-alive',
    'accept': 'application/vnd.ws.v1+json',
    'User-Agent':
    'Mozilla/5.0 (Linux; Android 7.1.2; MI 9 Build/N2G48C; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.198 Mobile Safari/537.36 MicroMessenger/8.0.2.1860(0x28000234) Process/appbrand2 WeChat/arm32 Weixin NetType/WIFI Language/zh_CN ABI/arm32 MiniProgramEnv/android',
    'charset': 'utf-8',
    'Accept-Encoding': 'gzip,compress,br,deflate',
    'content-type': 'application/json',
    'Referer':
    'https://servicewechat.com/wx26caa1e6b60d4ef5/32/page-frame.html',
}

# I will later explain how to get this:
charger_list = [['XYV5mv5tnKHV9', '西门南侧-1'], ['XY31g0OtIZA711', '西门南侧-2'],
                ['XYcjSf9nqvK612', '西门南侧-3'], ['XYSfeYzOvLwN5', '忘了是哪个了-1']]

# I find it unnecessary to use real openid and phone...
openid = '00'
phone = '00'

# maybe useful someday...
# appid = 'wx26caa1e6b60d4ef5'


class FindCharger:
    '''Traverse all the charging stations, print available ones
    '''

    def __init__(self) -> None:
        self.token = str()
        self.available = list()

    def _get_token(self) -> None:
        '''Use openid and phone number to login and get a token
        '''
        url = 'https://mapi.7mate.cn/api/authorizations'
        login_data = {'openid': openid, 'phone': phone}
        content = requests.post(url=url,
                                json=login_data,
                                headers=headers,
                                allow_redirects=False).json()['data']
        self.token = content['token']

    def where_are_you(self):
        '''Traverse all the charging stations in the list
        '''
        self._get_token()
        url_base = 'https://mapi.7mate.cn/api/chargers/'
        headers['authorization'] = str(
            'Bearer ' + self.token)  # authorization key is needed
        # traverse all stations:
        for number, location in charger_list:
            content = requests.get(url=url_base + number,
                                   headers=headers).json()['data']
            available_channels = str()
            # traverse 10 sockets:
            for socket in content['channels']:
                if socket['status'] == 1:
                    available_channels += (' [%d]' % socket['channel'])
            self.available.append('%s:%s' % (location, available_channels))
        # delete the authorization key:
        del [headers['authorization']]

    def tell_me(self):
        '''Print the result
        '''
        for line in self.available:
            print(line)


# test:
if __name__ == '__main__':
    test = FindCharger()
    test.where_are_you()
    test.tell_me()
