function jlhWeather() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./weatherapi/jiulonghu", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var weather = JSON.parse(xhr.responseText);
            var currentTime = Math.floor(Date.now() / 1000);
            var weatherTimestamp = weather.timestamp;

            if (
                weather.status === "RM.RSC200" &&
                currentTime - weatherTimestamp <= 1800 &&
                typeof weather.weather_text === "string" &&
                weather.weather_text.trim() !== ""
            ) {
                var weatherSpan = document.getElementById("weather-span");
                if (weatherSpan) {
                    weatherSpan.innerHTML = weather.weather_text;
                    document.getElementById("weather-div").style.display =
                        "inline";
                } else {
                    window.addEventListener("DOMContentLoaded", function () {
                        var weatherSpan =
                            document.getElementById("weather-span");
                        weatherSpan.innerHTML = weather.weather_text;
                        document.getElementById("weather-div").style.display =
                            "inline";
                    });
                }
            }
        }
    };
    xhr.send();
}

jlhWeather();
