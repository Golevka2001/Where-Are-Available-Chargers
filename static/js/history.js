(function () {
    var date_obj = (function () {
        var _date = new Date();
        console.log(_date);
        return {
            getDate: function () {
                return _date;
            },
            setDate: function (date) {
                _date = date;
            }
        };
    })();

    renderHtml();
    showCalendarData();
    bindEvent();

    function renderHtml() {
        var calendar = document.getElementById("calendar");
        var titleBox = document.createElement("div");
        var bodyBox = document.createElement("div");

        titleBox.className = 'title_box';
        titleBox.innerHTML = "<span class='title_box' id='prev_month_button'></span>" +
            "<span class='calendar_title' id='calendar_title'></span>" +
            "<span class='title_box' id='next_month_button'></span>";
        calendar.appendChild(titleBox);

        bodyBox.className = 'calendar_body_box';
        var _headHtml = "<tr>" +
            "<th>日</th>" +
            "<th>一</th>" +
            "<th>二</th>" +
            "<th>三</th>" +
            "<th>四</th>" +
            "<th>五</th>" +
            "<th>六</th>" +
            "</tr>";
        var _bodyHtml = "";

        for (var i = 0; i < 6; i++) {
            _bodyHtml += "<tr>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "</tr>";
        }
        bodyBox.innerHTML = "<table class='calendar_table' id='calendar_table'>" +
            _headHtml + _bodyHtml +
            "</table>";
        calendar.appendChild(bodyBox);
    }

    function showCalendarData() {
        var _year = date_obj.getDate().getFullYear();
        var _month = date_obj.getDate().getMonth() + 1;
        var _dateStr = getDateStr(date_obj.getDate());

        var calendar_title = document.getElementById("calendar_title");
        var titleStr = _dateStr.substr(0, 4) + "年 " + _dateStr.substr(4, 2) + "月";
        calendar_title.innerText = titleStr;

        var _table = document.getElementById("calendar_table");
        var _tds = _table.getElementsByTagName("td");
        var _firstDay = new Date(_year, _month - 1, 1);
        for (var i = 0; i < _tds.length; i++) {
            var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
            var _thisDayStr = getDateStr(_thisDay);
            _tds[i].innerText = _thisDay.getDate();
            _tds[i].setAttribute('data', _thisDayStr);
            if (_thisDayStr == getDateStr(new Date())) {
                _tds[i].className = 'today';
            } else if (_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)) {
                _tds[i].className = 'cur_month';
            } else {
                _tds[i].className = 'other_month';
            }
        }
    }

    function bindEvent() {
        var prev_month_button = document.getElementById("prev_month_button");
        var next_month_button = document.getElementById("next_month_button");
        addEvent(prev_month_button, 'click', clickPrevMonth);
        addEvent(next_month_button, 'click', clickNextMonth);
        var table = document.getElementById("calendar_table");
        var tds = table.getElementsByTagName('td');
        for (var i = 0; i < tds.length; i++) {
            addEvent(tds[i], 'click', function (e) {
                console.log(e.target.getAttribute('data'));
            });
        }
    }

    function addEvent(dom, eType, func) {
        if (dom.addEventListener) {
            dom.addEventListener(eType, function (e) {
                func(e);
            });
        } else if (dom.attachEvent) {
            dom.attachEvent('on' + eType, function (e) {
                func(e);
            });
        } else {
            dom['on' + eType] = function (e) {
                func(e);
            }
        }
    }

    function clickPrevMonth() {
        var date = date_obj.getDate();
        date_obj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
        showCalendarData();
    }

    function clickNextMonth() {
        var date = date_obj.getDate();
        date_obj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
        showCalendarData();
    }

    function getDateStr(date) {
        var _year = date.getFullYear();
        var _month = date.getMonth() + 1;
        var _d = date.getDate();

        _month = (_month > 9) ? ("" + _month) : ("0" + _month);
        _d = (_d > 9) ? ("" + _d) : ("0" + _d);
        return _year + _month + _d;
    }
})();
