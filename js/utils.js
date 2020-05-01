export async function getCountryCodes()
{
    return await fetch("https://raw.githubusercontent.com/umpirsky/country-list/master/data/ru/country.json")
        .then((response) => response.json());
}

export function getStringDate()
{
    let date = new Date();
    let dateTimeFormat = new Intl.DateTimeFormat("ru", {
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const [
        {value: weekday},,
        {value: day},,
        {value: month},,
        {value: year},,
        {value: hour},,
        {value: minute}
    ] = dateTimeFormat.formatToParts(date)

    return `Обновлено: ${hour}:${minute} - ${weekday[0].toUpperCase() + weekday.slice(1)}, ${day} ${month} ${year}`;
}

export function convertUnixToHourString(timestamp)
{
    let date = new Date(timestamp * 1000);
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export function getWeatherCondition(id)
{
    let condition = {
        description: "",
        advice: "",
        video: ""
    };

    switch(id)
    {
        case 200: case 201: 
        case 202: case 210: 
        case 211: case 212:
        case 221: case 230: 
        case 231: case 232:
        {
            condition.description = "На улице гроза";
            condition.advice = "Опасайтесь одиночных деревьев";
            condition.video = "/assets/videos/Thunderstorm.mp4";
            break;
        }
        case 300: case 301:
        case 302: case 310:
        case 311: case 312:
        case 313: case 314:
        case 321:
        {
            condition.description = "На улице небольшой дождь";
            condition.advice = "Не забудьте взять зонт";
            condition.video = "/assets/videos/Rain.mp4";
            break;
        }
        case 500: case 501:
        case 502: case 503:
        case 504: case 511:
        case 520: case 521:
        case 522: case 531:
        {
            condition.description = "На улице идет дождь";
            condition.advice = "Не забудьте взять зонт";
            condition.video = "/assets/videos/Rain.mp4";
            break;
        }
        case 600: case 601:
        case 602: case 611:
        case 612: case 613:
        case 615: case 616:
        case 520: case 621:
        case 622:
        {
            condition.description = "На улице идет снег";
            condition.advice = "Одевайтесь потеплее";
            condition.video = "/assets/videos/Snow.mp4";
            break;
        }
        case 700: case 711:
        case 721: case 731:
        case 741: case 751:
        case 761: case 762:
        case 771: case 781:
        {
            condition.description = "Пониженная видимость";
            condition.advice = "Будьте осторожны на дорогах";
            condition.video = "/assets/videos/Mist.mp4";
            break;
        }
        case 800:
        {
            condition.description = "На улице ясно";
            condition.advice = "Прекрасное время сходить на прогулку";
            condition.video = "/assets/videos/Night Sky.mp4";
            break;
        }
        case 801: case 802:
        case 803: case 804:
        {
            condition.description = "На улице облачно";
            condition.advice = "Прекрасное время отдохнуть";
            condition.video = "/assets/videos/Clouds.mp4";
            break;
        }
    }

    return condition;
}