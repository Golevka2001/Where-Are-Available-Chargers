#!user/bin/env python
# -*- coding:utf-8 -*-
"""Where-Are-Available-Chargers:
    希望这个脚本可以帮助你更容易给小电驴找到充电桩。
@File: find_chargers.py
@Brief: 使用 flask 框架搭建的简单服务，将爬取的信息显示在网页上。
@Author: Golevka2001<gol3vka@163.com>
@Version: 2.3.5
@Created Date: 2022/11/01
@Last Modified Date: 2022/11/20
"""

import os
import time
from datetime import datetime, timedelta
from threading import Thread

from find_chargers import FindChargers
from flask import Flask, abort, redirect, render_template, request


def update_func() -> None:
    global chargers
    global status
    if chargers.process_over:
        status = chargers.get_status()


version = "dev"
config_path = os.path.join(os.path.abspath(os.path.dirname(__file__)),
                           "config.yml")
min_interval = timedelta(minutes=1, seconds=30)
# max_interval = timedelta(minutes=3)

chargers = FindChargers(config_path)
status = chargers.get_status()
app = Flask(__name__)


@app.route("/", methods=["GET", "HEAD", "POST"])
def index():
    interval = datetime.utcnow() - chargers.utc_time
    # if exceed minimum refresh interval: request & refresh:
    if interval > min_interval:
        update_thread = Thread(target=update_func)
        update_thread.start()
        return render_template(
            "loading.html",
            version=version,
        )

    last_update_time = chargers.cn_time.strftime("%Y-%m-%d %H:%M:%S")
    interval = time.strftime("%H:%M:%S", time.gmtime(interval.seconds))

    try:
        retpage = render_template(
            "index.html",
            result=status,
            last_update_time=last_update_time,
            interval=interval,
            version=version,
        )
    except:
        return redirect("/error")

    return retpage


@app.route("/show", methods=["GET", "HEAD", "POST"])
def show():
    interval = datetime.utcnow() + timedelta(hours=8) - chargers.cn_time
    last_update_time = chargers.cn_time.strftime("%Y-%m-%d %H:%M:%S")
    interval = time.strftime("%H:%M:%S", time.gmtime(interval.seconds))

    try:
        retpage = render_template(
            "index.html",
            result=chargers.status,
            last_update_time=last_update_time,
            interval=interval,
            version=version,
        )
    except:
        return redirect("/error")

    return retpage


@app.route("/error", methods=["GET", "HEAD", "POST"])
def error():
    return render_template("error.html")


@app.route("/force_update", methods=["GET"])
def force_update():
    if not ("UPDATE_KEY" in os.environ and "key" in request.args):
        abort(401)
    elif os.environ["UPDATE_KEY"] == request.args["key"]:
        start = time.time()
        update_func()
        end = time.time()
        return str(end - start)
    else:
        abort(401)


@app.route("/favicon.ico", methods=["GET", "HEAD", "POST"])
def favicon():
    return redirect("/static/favicon.ico")


# run server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=False)
