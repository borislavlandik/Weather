let countryCodes;

async function getCoordinates() 
{
    let coordinates = {};

    let geolocation = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, 
        (error) => {
            console.warn("Error(${error.code}): ${error.message}");
        }, 
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    });

    coordinates.lat = geolocation.coords.latitude.toFixed(2);
    coordinates.lon = geolocation.coords.longitude.toFixed(2);

    return coordinates;
}

async function getCurrentWeatherByCoordinates() 
{
    let coordinates = await getCoordinates();

    const url = new URL("http://api.openweathermap.org/data/2.5/weather");
    let params = {
            appid: "321ac0bbf2380bbabc93a0aa768d1e89",
            units: "metric",
            lang: "ru",
            lat: coordinates.lat,
            lon: coordinates.lon
        };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    await fetch(url)
        .then((response) => {
            if(response.ok)
                return response.json();

            return Promise.reject(response);
        })
        .then((data) => {
            getWeatherObject(data);
        });
}

async function getCurrentWeatherByCityName(city)
{
    const url = new URL("http://api.openweathermap.org/data/2.5/weather");
    let params = {
            appid: "321ac0bbf2380bbabc93a0aa768d1e89",
            units: "metric",
            lang: "ru",
            q: city
        };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    await fetch(url)
        .then((response) => {
            if(response.ok)
                return response.json();
            else 
                return Promise.reject(response);
        })
        .then((data) => {
            getWeatherObject(data);
        })
        .catch((error) => {
            console.log("Неверный город");
        });

}

function getWeatherObject(jsonWeather) 
{
    let weather = {};
    weather.location = {
        cityName: jsonWeather.name,
        country: jsonWeather.sys.country
    };

    weather.time = {
        currentTime: jsonWeather.dt,
        timezone: jsonWeather.timezone,
        sunrise: jsonWeather.sys.sunrise,
        sunset: jsonWeather.sys.sunset
    };

    weather.mainInfo = {
        main: jsonWeather.weather[0].main,
        description: jsonWeather.weather[0].description
    };

    weather.mainInfo.description =
        weather.mainInfo.description[0].toUpperCase() + 
        weather.mainInfo.description.slice(1);

    weather.additionalInfo = {
        temperature: jsonWeather.main.temp,
        feelsLike: jsonWeather.main.feels_like,
        pressure: jsonWeather.main.pressure,
        humidity: jsonWeather.main.humidity,
        windSpeed: jsonWeather.wind.speed,
        windDegree: jsonWeather.wind.deg,
        clouds: jsonWeather.clouds.all
    };

    const country  = document.getElementById("country");
    const city     = document.getElementById("city");
    const temp     = document.getElementById("temperature");
    const pressure = document.getElementById("pressure");
    const humidity = document.getElementById("humidity");

    country.innerHTML = countryCodes[weather.location.country]; 
    city.innerHTML = weather.location.cityName;    
    temp.innerHTML = Math.round(weather.additionalInfo.temperature) + "°";    
    pressure.innerHTML = Math.round(0.750062 * weather.additionalInfo.pressure) + " мм. рт. ст.";
    humidity.innerHTML = weather.additionalInfo.humidity + "%";



    console.log(weather);
}

async function getCountryNames()
{
    await fetch("https://raw.githubusercontent.com/umpirsky/country-list/master/data/ru/country.json")
        .then((response) => response.json())
        .then((data) => countryCodes = data);
}

function init()
{
    getCountryNames();

    const searchButton = document.getElementById("btn-search");
    const searchInput = document.getElementById("inp-search");

    searchButton.onclick = () => {
        getCurrentWeatherByCityName(searchInput.value);
    };

    const locationButton = document.getElementById("btn-use-location");
    locationButton.onclick = () => {
        getCurrentWeatherByCoordinates();
    };

    const country = document.getElementById("country");
    const city = document.getElementById("city");
    const temp = document.getElementById("temperature");
    const pressure = document.getElementById("pressure");
    const humidity = document.getElementById("humidity");

    
}

getCurrentWeatherByCityName("Канзас-Сити");
init();