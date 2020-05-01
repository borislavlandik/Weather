import {getStringDate, convertUnixToHourString, getCountryCodes, getWeatherCondition} from "./utils.js"

let countries = null;
const OFFSET_IN_SECONDS = new Date().getTimezoneOffset() * 60;

function getTomorrowForecast(forecast)
{
    const today = new Date();
    const tomorrow = new Date(today);
    const afterTomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    afterTomorrow.setDate(afterTomorrow.getDate() + 2);

    tomorrow.setHours(0, 0, 0, 0);
    afterTomorrow.setHours(0, 0, 0, 0);

    const tomorrowTime = tomorrow.getTime();
    const afterTomorrowTime = afterTomorrow.getTime()

    return forecast.list.filter(item => 
        (item.dt * 1000 >= tomorrowTime) &&
        (item.dt * 1000 <= afterTomorrowTime));
}

export function updateChart(forecast)
{
    const tomorrowForecast = getTomorrowForecast(forecast);
    let data = [];
    let labels = [];

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const tomorrowTime = tomorrow.getTime() / 1000;

    tomorrowForecast.forEach(item => {
        data.push(item.main.temp);
        labels.push(((item.dt - tomorrowTime) / 60 / 60).toString())
    });

    const min = Math.min(...data);
    const max = Math.max(...data);

    const chartOptions = {
        tooltips: {
            enabled: false
        },
        elements: {
            point: {
                radius: 0
            }
        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                gridLines: false,
                ticks: {
                    suggestedMin: min - 2,
                    suggestedMax: max + 2,
                    stepSize: 5,
                    padding: 20,
                    callback: function(value) {
                        return `${value}°`;
                    }
                }
            }],
            xAxes: [{
                gridLines: false,
                ticks: {
                    padding: 20
                }
            }]
        }
    };

    new Chart($(".chart-temperature").get(0).getContext("2d"), { 
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                fill: false,
                borderCapStyle: "round",
                borderColor: "#0053ee",
                data: data
            }]
        }, options: chartOptions}
    );
}

export function updateLocalStorage(value)
{
    for(let key in value)
    {
        if(value[key] === null)
            continue;
        else
            localStorage.setItem(key, value[key]);
    }
}

export async function update(weather) 
{
    updateLocalStorage({
        city: weather.name,
        isSideMenuHidden: null
    });

    if(countries === null)
        countries = await getCountryCodes();

    $(".value-cloud").html(`${weather.clouds.all}%`);
    $(".value-humidity").html(`${weather.main.humidity}%`);
    $(".value-pressure").html(`${Math.round(weather.main.pressure * 0.75)} мм.рт.ст.`);
    $(".value-wind").html(`${weather.wind.speed} м/с`);
    $(".value-sunrise").html(`${convertUnixToHourString(weather.sys.sunrise + weather.timezone + OFFSET_IN_SECONDS)}`);
    $(".value-sunset").html(`${convertUnixToHourString(weather.sys.sunset + weather.timezone + OFFSET_IN_SECONDS)}`);

    $(".value-date").html(getStringDate());
    $(".value-temperature").html(`${Math.round(weather.main.temp)}`);
    $(".value-city").html(weather.name);
    $(".value-country").html(countries[weather.sys.country]);

    $(".value-temp-feels").html(`${Math.round(weather.main.feels_like)}°`);
    $(".value-temp-min").html(`${Math.floor(weather.main.temp_min)}°`);
    $(".value-temp-max").html(`${Math.ceil(weather.main.temp_max)}°`);

    const condition = getWeatherCondition(weather.weather[0].id);

    $(".value-description").html(`${condition.description}`);
    $(".value-advice").html(`${condition.advice}`);
    $(".background__video").attr("src", condition.video);

}