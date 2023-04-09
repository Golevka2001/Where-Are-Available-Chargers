const CONFIG = {
    "cache": {
        "survival_time": 4, //分钟
        "refuse_time": 8, //分钟
    },
    "conditions": {
        "enough_sum_num": 70, //小于这个数提示紧张
        "enough_socket_num": 2.5, //每个充电桩低于这个数字提示紧张
    },
    "login": {
        "openid": "01",
        "phone": "01",
        "survival_time": 1, //小时
    },
    "headers": {
        "Host": "mapi.7mate.cn",
        "Connection": "keep-alive",
        "accept": "application/vnd.ws.v1+json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 7.1.2; MI 9 Build/N2G48C; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.198 Mobile Safari/537.36 MicroMessenger/8.0.2.1860(0x28000234) Process/appbrand2 WeChat/arm32 Weixin NetType/WIFI Language/zh_CN ABI/arm32 MiniProgramEnv/android",
        "charset": "utf-8",
        "Accept-Encoding": "gzip,compress,br,deflate",
        "content-type": "application/json",
        "Referer": "https://servicewechat.com/wx26caa1e6b60d4ef5/32/page-frame.html"
    },
    "stations": {
        "东门北侧": ["XYlFl6DnfgZH3", "XY1eANYJoWM620", "XYvIqZM8oCmT19", "XYnfw8BeyiXS16", "XYEogTrLdXZx14", "XYxN6z9ZETBZ17", "XYBGw4c88NWd21"],
        "东门南侧": ["XYSfeYzOvLwN5", "XYDSUGrzkRfX6"],
        "西门北侧": ["XYS2hOWumHDa13", "XYp5iHwheZvf18", "XY9HNPbegRgV15"],
        "西门南侧": ["XYcjSf9nqvK612", "XY31g0OtIZA711", "XYV5mv5tnKHV9"],
        "南门西侧": ["XY679RB8P35Y10", "XYOGaVYy7OHu7"],
        //"南门东侧": ["XY1eANYJoWM620", "XYlFl6DnfgZH3"],
        "北门东北侧": ["XYeo2IsT1Sx61", "XYKCwwkZXBW62", "XYTbok829tYo8", "XYo7UstSCeu64"],
        "北门东南侧": ["XYbwFHY40PZK3","XYgbwesjiMEy6","XYnT1V47gbvQ5","XYwgYSUv41Ve2","XYWOjzU06jWc1","XYG9NcgUXBlg4"]
    },
    "stations_r": {
        "XYlFl6DnfgZH3": { station: "东门北侧", station_EN: "SE", num: 0 },
        "XY1eANYJoWM620": { station: "东门北侧", station_EN: "SE", num: 1 },
        "XYvIqZM8oCmT19": { station: "东门北侧", station_EN: "EN", num: 2 },
        "XYnfw8BeyiXS16": { station: "东门北侧", station_EN: "EN", num: 3 },
        "XYEogTrLdXZx14": { station: "东门北侧", station_EN: "EN", num: 4 },
        "XYxN6z9ZETBZ17": { station: "东门北侧", station_EN: "EN", num: 5 },
        "XYBGw4c88NWd21": { station: "东门北侧", station_EN: "EN", num: 6 },
        "XYSfeYzOvLwN5": { station: "东门南侧", station_EN: "ES", num: 0 },
        "XYDSUGrzkRfX6": { station: "东门南侧", station_EN: "ES", num: 1 },
        "XYS2hOWumHDa13": { station: "西门北侧", station_EN: "WN", num: 0 },
        "XYp5iHwheZvf18": { station: "西门北侧", station_EN: "WN", num: 1 },
        "XY9HNPbegRgV15": { station: "西门北侧", station_EN: "WN", num: 2 },
        "XYcjSf9nqvK612": { station: "西门南侧", station_EN: "WS", num: 0 },
        "XY31g0OtIZA711": { station: "西门南侧", station_EN: "WS", num: 1 },
        "XYV5mv5tnKHV9": { station: "西门南侧", station_EN: "WS", num: 2 },
        "XY679RB8P35Y10": { station: "南门西侧", station_EN: "SW", num: 0 },
        "XYOGaVYy7OHu7": { station: "南门西侧", station_EN: "SW", num: 1 },
        "XYeo2IsT1Sx61": { station: "北门东北侧", station_EN: "NEA", num: 0 },
        "XYKCwwkZXBW62": { station: "北门东北侧", station_EN: "NEA", num: 1 },
        "XYTbok829tYo8": { station: "北门东北侧", station_EN: "NEA", num: 2 },
        "XYo7UstSCeu64": { station: "北门东北侧", station_EN: "NEA", num: 3 },
        "XYbwFHY40PZK3": { station: "北门东南侧", station_EN: "NEB", num: 0 },
        "XYgbwesjiMEy6": { station: "北门东南侧", station_EN: "NEB", num: 1 },
        "XYnT1V47gbvQ5": { station: "北门东南侧", station_EN: "NEB", num: 2 },
        "XYwgYSUv41Ve2": { station: "北门东南侧", station_EN: "NEB", num: 3 },
        "XYWOjzU06jWc1": { station: "北门东南侧", station_EN: "NEB", num: 4 },
        "XYG9NcgUXBlg4": { station: "北门东南侧", station_EN: "NEB", num: 5 },
    },
    "station_ENs": {
        "东门北侧": "EN",
        "东门南侧": "ES",
        "西门北侧": "WN",
        "西门南侧": "WS",
        "南门西侧": "SW",
        //"南门东侧": "SE",
        "北门东北侧": "NEA",
        "北门东南侧": "NEB",
    },
    "station_ENs_r": {
        "EN": "东门北侧",
        "ES": "东门南侧",
        "WN": "西门北侧",
        "WS": "西门南侧",
        "SW": "南门西侧",
        //"SE": "南门东侧",
        "NEA": "北门东北侧",
        "NEB": "北门东南侧",
    },
    "station_EN": {
        "东门北侧": "East Gate - North",
        "东门南侧": "East Gate - South",
        "西门北侧": "West Gate - North",
        "西门南侧": "West Gate - South",
        "南门西侧": "South Gate - West",
        //"南门东侧": "South Gate - East",
        "北门东北侧": "Nouth Gate - East (A)",
        "北门东南侧": "Nouth Gate - East (B)",
    },
}

export default CONFIG
