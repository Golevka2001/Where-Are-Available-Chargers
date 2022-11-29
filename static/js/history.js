function CalendarControl() {
    // NOTE：Date和moment混用的原因是，Date在时区、格式化输出上不方便，但是moment居然不支持一个月31天，现在可能在31号的时候还是有些问题，待测试。
    const imgUrlPri = "https://cdn.jsdelivr.net/gh/Golevka2001/Resources-for-Webpages/chargers_history/charts/";
    const startDate = new Date(2022, 10, 20);  // 2022-11-20
    const calendar = new Date(moment().tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss"));
    const calendarControl = {
        localDate: new Date(moment().tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss")),
        prevMonthLastDate: null,
        daysInMonth: function (month, year) {
            return new Date(year, month, 0).getDate();
        },
        firstDay: function () {
            return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
        },
        lastDay: function () {
            return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
        },
        firstDayNumber: function () {
            return calendarControl.firstDay().getDay() + 1;
        },
        lastDayNumber: function () {
            return calendarControl.lastDay().getDay() + 1;
        },
        getPreviousMonthLastDate: function () {
            return new Date(
                calendar.getFullYear(),
                calendar.getMonth(),
                0
            ).getDate();
        },
        navigateToPreviousMonth: function () {
            calendar.setMonth(calendar.getMonth() - 1);
            calendarControl.attachEventsOnNextPrev();
        },
        navigateToNextMonth: function () {
            calendar.setMonth(calendar.getMonth() + 1);
            calendarControl.attachEventsOnNextPrev();
        },
        navigateToCurrentMonth: function () {
            calendar.setYear(calendarControl.localDate.getFullYear());
            calendar.setMonth(calendarControl.localDate.getMonth());
            calendarControl.attachEventsOnNextPrev();
        },
        displayYear: function () {
            document.querySelector(".calendar .calendar-year-label").innerHTML = calendar.getFullYear();
        },
        displayMonth: function () {
            document.querySelector(".calendar .calendar-month-label").innerHTML = moment(calendar).format("MMM");
        },
        displayToday: function () {
            document.querySelector(".calendar .calendar-today-date").innerHTML = "Today:&nbsp;&nbsp;&nbsp;" +
                moment(calendarControl.localDate).format("YYYY年MM月DD日");
        },
        selectDate: function (e) {
            let selDate = moment([calendar.getFullYear(), calendar.getMonth(), e.target.textContent]);
            if (selDate.valueOf() > calendarControl.localDate.getTime() || selDate.valueOf() < startDate.getTime())
                alert("有效日期范围为：2022/11/20-今天");
            else {
                let imgUrl = imgUrlPri + selDate.format("YYYYMMDD") + ".png";
                document.querySelector(".history").innerHTML = `<marquee behavior="scroll" direction="left" scrollamount="20" hspace="85" onMouseOut="this.start()" onMouseOver="this.stop()">
                <h1>&#x1F6F5;&#x1F4A8;</h1>
                </marquee><br />
                图片加载中,请稍等...`;
                let imgRequest = new XMLHttpRequest();
                imgRequest.open('Get', imgUrl, true);
                imgRequest.onreadystatechange = function () {
                    console.log(this.status);
                    if (this.status == 404) {
                        alert("暂无当日数据");
                    }
                    else {
                        document.querySelector(".history").innerHTML = `<div class="image">
                            <a href="${imgUrl}">
                            <img src="${imgUrl}" />
                            </a></div>`;
                    }
                }
                imgRequest.send()
            }
        },
        plotDayNames: function () {
            document.querySelector(
                ".calendar .calendar-body"
            ).innerHTML += `
                <div>日</div>
                <div>一</div>
                <div>二</div>
                <div>三</div>
                <div>四</div>
                <div>五</div>
                <div>六</div>`;

        },
        plotDates: function () {
            document.querySelector(".calendar .calendar-body").innerHTML = "";
            calendarControl.displayYear();
            calendarControl.displayMonth();
            calendarControl.displayToday();
            calendarControl.plotDayNames();
            let count = 1;
            let prevDateCount = 0;

            calendarControl.prevMonthLastDate = calendarControl.getPreviousMonthLastDate();
            let prevMonthDatesArray = [];
            let calendarDays = calendarControl.daysInMonth(
                calendar.getMonth() + 1,
                calendar.getFullYear()
            );
            // dates of current month
            for (let i = 1; i < calendarDays; i++) {
                if (i < calendarControl.firstDayNumber()) {
                    prevDateCount += 1;
                    document.querySelector(
                        ".calendar .calendar-body"
                    ).innerHTML += `<div class="prev-dates"></div>`;
                    prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
                } else {
                    document.querySelector(
                        ".calendar .calendar-body"
                    ).innerHTML += `<div class="number-item" data-num=${count}>
                    <a class="dateNumber" href="#">${count++}</a></div>`;
                }
            }
            //remaining dates after month dates
            for (let j = 0; j < prevDateCount + 1; j++) {
                document.querySelector(
                    ".calendar .calendar-body"
                ).innerHTML += `<div class="number-item" data-num=${count}>
                <a class="dateNumber" href="#">${count++}</a></div>`;
            }
            calendarControl.highlightToday();
            calendarControl.plotPrevMonthDates(prevMonthDatesArray);
            calendarControl.plotNextMonthDates();
        },
        attachEvents: function () {
            let prevBtn = document.querySelector(".calendar .calendar-prev a");
            let nextBtn = document.querySelector(".calendar .calendar-next a");
            let todayDate = document.querySelector(".calendar .calendar-today-date");
            let dateNumber = document.querySelectorAll(".calendar .dateNumber");
            prevBtn.addEventListener(
                "click",
                calendarControl.navigateToPreviousMonth
            );
            nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
            todayDate.addEventListener(
                "click",
                calendarControl.navigateToCurrentMonth
            );
            for (var i = 0; i < dateNumber.length; i++) {
                dateNumber[i].addEventListener(
                    "click",
                    calendarControl.selectDate,
                    false
                );
            }
        },
        highlightToday: function () {
            let currentMonth = calendarControl.localDate.getMonth() + 1;
            let changedMonth = calendar.getMonth() + 1;
            let currentYear = calendarControl.localDate.getFullYear();
            let changedYear = calendar.getFullYear();
            if (
                currentYear === changedYear &&
                currentMonth === changedMonth &&
                document.querySelectorAll(".number-item")
            ) {
                document
                    .querySelectorAll(".number-item")
                [calendar.getDate() - 1].classList.add("calendar-today");
            }
        },
        plotPrevMonthDates: function (dates) {
            dates.reverse();
            for (let i = 0; i < dates.length; i++) {
                if (document.querySelectorAll(".prev-dates")) {
                    document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
                }
            }
        },
        plotNextMonthDates: function () {
            let childElemCount = document.querySelector('.calendar-body').childElementCount;
            //7 lines
            if (childElemCount > 42) {
                let diff = 49 - childElemCount;
                calendarControl.loopThroughNextDays(diff);
            }

            //6 lines
            if (childElemCount > 35 && childElemCount <= 42) {
                let diff = 42 - childElemCount;
                calendarControl.loopThroughNextDays(42 - childElemCount);
            }

        },
        loopThroughNextDays: function (count) {
            if (count > 0) {
                for (let i = 1; i <= count; i++) {
                    document.querySelector('.calendar-body').innerHTML += `<div class="next-dates">${i}</div>`;
                }
            }
        },
        attachEventsOnNextPrev: function () {
            calendarControl.plotDates();
            calendarControl.attachEvents();
        },
        init: function () {
            calendarControl.plotDates();
            calendarControl.attachEvents();
        }
    };
    calendarControl.init();
}

const calendarControl = new CalendarControl();
