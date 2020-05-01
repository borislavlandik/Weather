import {getStringDate, convertUnixToHourString, getCountryCodes, getWeatherCondition} from "./utils.js"

let countries = null;
const OFFSET_IN_SECONDS = new Date().getTimezoneOffset() * 60;

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

    $(".value-temp-feels").html(`${weather.main.feels_like}°`);
    $(".value-temp-min").html(`${weather.main.temp_min}°`);
    $(".value-temp-max").html(`${weather.main.temp_max}°`);

    let condition = getWeatherCondition(weather.weather[0].id);

    $(".value-description").html(`${condition.description}`);
    $(".value-advice").html(`${condition.advice}`);
}