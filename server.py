#!user/bin/env python
# -*- coding:utf-8 -*-
'''Where-Are-Available-Chargers:
    希望这个脚本可以帮助你更容易给小电驴找到充电桩。
@File: find_chargers.py
@Brief: 使用 flask 框架搭建的简单服务，将爬取的信息显示在网页上。
@Author: Golevka2001<gol3vka@163.com>
@Version: 2.3.2
@Created Date: 2022/11/01
@Last Modified Date: 2022/11/16
'''

from find_chargers import FindChargers

from datetime import datetime, timedelta
from flask import Flask, render_template
from threading import Thread
import os
import time

config_path = os.path.join(os.path.abspath(os.path.dirname(__file__)),
                           'config.yml')
min_interval = timedelta(minutes=1)
max_interval = timedelta(minutes=3)

chargers = FindChargers(config_path)
chargers.get_status()
app = Flask(__name__)


@app.route("/")
def index():
    interval = datetime.utcnow() + timedelta(hours=8) - chargers.local_time
    # if exceed minimum refresh interval: request & refresh:
    if interval > min_interval:
        update_thread = Thread(target=chargers.get_status)
        update_thread.start()
    if interval > max_interval:
        return render_template('loading.html')

    last_update_time = chargers.local_time.strftime('%Y-%m-%d %H:%M:%S')
    interval = time.strftime("%H:%M:%S", time.gmtime(interval.seconds))

    try:
        retpage = render_template('index.html',
                                  result=chargers.status,
                                  last_update_time=last_update_time,
                                  interval=interval)
    except:
        return render_template('error.html')

    return retpage


# run server
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=False)
