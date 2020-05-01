import {getCurrentWeatherByCityName, getCurrentWeatherByCoordinates, getForecast} from "./weather.js";
import {update, updateLocalStorage, updateChart} from "./update.js";


export function initEvents()
{
    $(".btn-menu").click(() => {
        $(".side-menu").toggleClass("hidden");

        updateLocalStorage({
            city: null,
            isSideMenuHidden: $(".side-menu").hasClass("hidden")
        });
    });
    
    $(".btn-search").click(() => {
        $(".btn-close-search").show();
        $(".search").fadeToggle(500);
        $(".inp-city").focus();
    });
    
    $(".btn-close-search").click(() => {
        $(".search").fadeToggle(500);
    });
    
    $(".btn-location").click(async () => {
        checkWeather(await getCurrentWeatherByCoordinates());
    });

    $(".btn-update").click(async () => {
        checkWeather(await getCurrentWeatherByCityName(localStorage.getItem("city")));
    });
    
    $(".inp-city").keyup(async (event) => {
        if(event.key === "Enter")
            checkWeather(await getCurrentWeatherByCityName($(".inp-city").val()));
    });
    
    $(".btn-theme").click(() => {
        $(".active-icon, .hidden-icon").toggleClass("active-icon hidden-icon");
    });    

}

function loadWeather()
{
    $(".loading").fadeToggle(() => {
        $(".inp-city").removeClass("error");
        $(".search").fadeOut(500, () => {
            $(".inp-city").val("");
        });
    
        $(".progress__value").animate({width: "100%"}, 1250, "swing", () => {
            $(".loading").fadeToggle(() => {
                $(".progress__value").css("width", 0);
                
                const video = $(".background__video").get(0);
                video.currentTime = 0;
                video.play();
            });
        });
    });
}

export async function checkWeather(weatherJson) {
    if(weatherJson === null)
        $(".inp-city").addClass("error");
    else
    {
        update(weatherJson);
        updateChart(await getForecast(weatherJson.name));
        loadWeather();
    } 
}

