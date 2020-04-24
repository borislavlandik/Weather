function init() 
{
    const weather = document.getElementById("weather");

    fetch("http://api.openweathermap.org/data/2.5/weather?q=Irkutsk&units=metric&lang=ru&appid=321ac0bbf2380bbabc93a0aa768d1e89")
        .then(function (resp) {
            return resp.json() 
        })
        .then(function (data) {
            weather.innerHTML = JSON.stringify(data, null, 2);
        });

    
}


init();