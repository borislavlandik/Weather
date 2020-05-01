import {initEvents} from "./events.js";
import {update, updateChart} from "./update.js";
import {getCurrentWeatherByCityName, getForecast} from "./weather.js";

(async () => {
    let city = localStorage.getItem("city");
    let sideMenu = localStorage.getItem("isSideMenuHidden");

    $(".side-menu").toggleClass("hidden", sideMenu == "true");

    if(city === null)
    {
        $(".btn-close-search").hide();

        $(".progress__value").animate({width: "100%"}, 1250, "swing", () => {
            $(".search").fadeToggle(() => {
                $(".loading").fadeToggle(() => {
                    $(".progress__value").css("width", 0);
                });
            });
        });
    }
    else
    {
        update(await getCurrentWeatherByCityName(city));
        updateChart(await getForecast(city));

        $(".progress__value").animate({width: "100%"}, 1250, "swing", () => {
            $(".loading").fadeToggle(() => {
                $(".progress__value").css("width", 0);
                const video = $(".background__video").get(0);
                video.currentTime = 0;
                video.play();
            });
        });
    }

    initEvents();
})();