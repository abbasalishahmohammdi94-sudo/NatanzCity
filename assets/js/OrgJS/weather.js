const url =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=33.5102" +
    "&longitude=51.9196" +
    "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m" +
    "&daily=temperature_2m_max,temperature_2m_min,uv_index_max" +
    "&timezone=Asia%2FTehran";


function getWeather() {

    fetch(url)
        .then(response => response.json())
        .then(data => {

            // =========================
            // دمای فعلی
            // =========================

            const temperature =
                data.current.temperature_2m;

            document.getElementById("temperature").textContent =
                temperature + "°C";


            // =========================
            // بیشترین دمای امروز
            // =========================

            const maxTemperature =
                data.daily.temperature_2m_max[0];

            document.getElementById("max-temperature").textContent =
                maxTemperature;


            // =========================
            // کمترین دمای امروز
            // =========================

            const minTemperature =
                data.daily.temperature_2m_min[0];

            document.getElementById("min-temperature").textContent =
                minTemperature;


            // =========================
            // شاخص UV
            // =========================

            const uvIndex =
                data.daily.uv_index_max[0];

            document.getElementById("uv-index").textContent =
                uvIndex;


            // =========================
            // رطوبت
            // =========================

            const humidity =
                data.current.relative_humidity_2m;

            document.getElementById("humidity").textContent =
                humidity;


            // =========================
            // وضعیت هوا
            // =========================

            const weatherCode =
                data.current.weather_code;

            let weatherStatus;


            if (weatherCode === 0) {

                weatherStatus = "☀️ آسمان صاف";

            }

            else if (weatherCode === 1) {

                weatherStatus = "🌤️ عمدتاً صاف";

            }

            else if (weatherCode === 2) {

                weatherStatus = "⛅ نیمه‌ابری";

            }

            else if (weatherCode === 3) {

                weatherStatus = "☁️ ابری";

            }

            else if ([45, 48].includes(weatherCode)) {

                weatherStatus = "🌫️ مه‌آلود";

            }

            else if ([51, 53, 55, 56, 57].includes(weatherCode)) {

                weatherStatus = "🌦️ نم‌نم باران";

            }

            else if ([61, 63, 65, 66, 67].includes(weatherCode)) {

                weatherStatus = "🌧️ بارانی";

            }

            else if ([71, 73, 75, 77].includes(weatherCode)) {

                weatherStatus = "❄️ برفی";

            }

            else if ([80, 81, 82].includes(weatherCode)) {

                weatherStatus = "🌧️ رگبار";

            }

            else if ([95, 96, 99].includes(weatherCode)) {

                weatherStatus = "⛈️ رعدوبرق";

            }

            else {

                weatherStatus = "🌡️ نامشخص";

            }


            document.getElementById("weather-status").textContent =
                weatherStatus;


            // نمایش اطلاعات کامل در Console
            console.log(data);

        })


        // =========================
        // مدیریت خطا
        // =========================

        .catch(error => {

            document.getElementById("temperature").textContent =
                "خطا";

            document.getElementById("weather-status").textContent =
                "خطا در دریافت اطلاعات";

            console.error(
                "خطا در دریافت آب‌وهوا:",
                error
            );

        });

}


// =========================
// دریافت اولیه
// =========================

getWeather();
// =========================
// بروزرسانی هر ۱۵ دقیقه
// =========================

setInterval(getWeather, 15 * 60 * 1000)