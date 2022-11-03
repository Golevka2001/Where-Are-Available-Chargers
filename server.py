#!user/bin/env python
# -*- coding:utf-8 -*-
'''Where-Are-Available-Chargers:
    希望这个脚本可以帮助你更容易给小电驴找到充电桩。
@File: find_chargers.py
@Brief: 使用 flask 框架搭建的简单服务，将爬取的信息显示在网页上。
@Author: Golevka2001<gol3vka@163.com>
@Version: 2.0.1
@Created Date: 2022/11/01
@Last Modified Date: 2022/11/04
'''

from flask import Flask, render_template
from find_chargers import FindChargers
import os

app = Flask(__name__)


# page & pass result in
@app.route("/")
def index():
    config_path = os.path.join(os.path.abspath(os.path.dirname(__file__)),
                               'config.yml')
    chargers = FindChargers(config_path)
    chargers.where_are_you()
    result = chargers.tell_me('html')
    last_time = chargers.get_time()
    return render_template('index.html',
                           east_gate=result['东门'],
                           west_gate=result['西门'],
                           last_time=last_time)


# run server
if __name__ == "__main__":
    while True:
        app.run(host='0.0.0.0', port=1234, debug=False)
