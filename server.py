#!user/bin/env python
# -*- coding:utf-8 -*-
"""Where-Are-Available-Chargers:
    希望这个脚本可以帮助你更容易给小电驴找到充电桩。
@File: find_chargers.py
@Brief: 使用 flask 框架搭建的简单服务，将爬取的信息显示在网页上。
@Author: Golevka2001<gol3vka@163.com>
@Version: 2.3.6
@Created Date: 2022/11/01
@Last Modified Date: 2022/12/07
"""

import os
import time
from datetime import datetime, timedelta, timezone
from threading import Thread

from find_chargers import FindChargers
from flask import Flask, abort, redirect, render_template, request

version = "dev"
config_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), "config.yml")
min_interval = timedelta(minutes=1, seconds=30)
# max_interval = timedelta(minutes=3)
refresh_times: int = 0
refresh_limit: int = 5
max_refresh_waiting_time = timedelta(minutes=5)

chargers = FindChargers(config_path)
status, _ = chargers.get_status()
app = Flask(__name__)


def update_func() -> None:
    global chargers
    global status
    global refresh_times
    if (
        chargers.process_over
        or chargers.refresh_start_time - datetime.now(timezone.utc)
        > max_refresh_waiting_time
    ):
        status, success = chargers.get_status()
        if success:
            refresh_times = 0
        else:
            refresh_times = refresh_times + 1


@app.route("/", methods=["GET", "HEAD", "POST"])
def index(enable_refresh: bool = True):
    # if refresh_times > 5 and enable_refresh:
    #    pass  # 还没想好要怎么办

    interval = datetime.now(timezone.utc) - chargers.refresh_time
    last_update_time = chargers.refresh_time.astimezone(
        timezone(timedelta(hours=8))
    ).strftime("%Y-%m-%d %H:%M:%S")

    # if exceed minimum refresh interval: request & refresh:
    if interval > min_interval and enable_refresh:
        update_thread = Thread(target=update_func)
        update_thread.start()
        return render_template(
            "loading.html",
            version=version,
        )

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
    return index(enable_refresh=False)


@app.route("/error", methods=["GET", "HEAD", "POST"])
def error(message: str = "请求错误，请稍后重试 ..."):
    return render_template("error.html", message=message), 508


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
