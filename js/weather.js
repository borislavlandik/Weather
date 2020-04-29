async function getCoordinates() 
{
    let coordinates = {};

    let geolocation = await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(resolve, 
        (error) => {
            console.warn("Error(" + error.code + "): " + error.message);
        }, 
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    });

    coordinates.lat = geolocation.coords.latitude.toFixed(3);
    coordinates.lon = geolocation.coords.longitude.toFixed(3);

    return coordinates;
}

export async function getCurrentWeatherByCoordinates() 
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

    let json = {};

    await fetch(url)
        .then((response) => {
            if(response.ok)
                return response.json();

            return Promise.reject(response);
        })
        .then((data) => {
            json = data;
        })
        .catch(() => {
            json = null;
        });

    return json;
}

export async function getCurrentWeatherByCityName(city)
{
    const url = new URL("http://api.openweathermap.org/data/2.5/weather");
    let params = {
            appid: "321ac0bbf2380bbabc93a0aa768d1e89",
            units: "metric",
            lang: "ru",
            q: city
        };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    let json = {};

    await fetch(url)
        .then((response) => {
            if(response.ok)
                return response.json();
            else 
                return Promise.reject(response);
        })
        .then((data) => json = data)
        .catch(() => {
            json = null;
        });

    return json;
}