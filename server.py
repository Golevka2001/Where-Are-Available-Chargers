#!user/bin/env python
# -*- coding:utf-8 -*-
'''Where-Are-Available-Chargers:
    希望这个脚本可以帮助你更容易给小电驴找到充电桩。
@File: find_chargers.py
@Brief: 使用 flask 框架搭建的简单服务，将爬取的信息显示在网页上。
@Author: Golevka2001<gol3vka@163.com>
@Version: 2.1.4
@Created Date: 2022/11/01
@Last Modified Date: 2022/11/07
'''

# NOTE: 时间的获取和计算都改成了UTC，传到html显示前做了一下+08:00

from find_chargers import FindChargers

from datetime import datetime, timedelta
from flask import Flask, render_template
from threading import Thread
import os
import time

config_path = os.path.join(os.path.abspath(os.path.dirname(__file__)),
                           'config.yml')
min_duration = timedelta(minutes=1)  # minimum refresh duration
max_duration = timedelta(minutes=3)

chargers = FindChargers(config_path)
app = Flask(__name__)


# page & pass result in
@app.route("/")
def index():
    duration = datetime.utcnow() - chargers.last_time
    # if exceed minimum refresh interval: request & refresh:
    if duration > min_duration:
        update_thread = Thread(target=chargers.where_are_you, kwargs={})
        update_thread.start()
    if duration > max_duration:
        return render_template('loading.html')

    result = chargers.tell_me('html')
    # UTC+08:00 and format time:
    display_last_time = (chargers.last_time +
                         timedelta(hours=8)).strftime('%Y-%m-%d %H:%M:%S')
    duration = time.strftime("%H:%M:%S", time.gmtime(duration.seconds))

    try:
        retpage = render_template('index.html',
                                  east_gate=result['东门'],
                                  west_gate=result['西门'],
                                  north_gate=result['北门'],
                                  last_time=display_last_time,
                                  duration=duration)
    except:
        return render_template('loading.html')

    return retpage


# run server
if __name__ == "__main__":
    while True:
        app.run(host='0.0.0.0', port=3000, debug=False)
