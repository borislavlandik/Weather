async function init()
{
    initEvents();
    initData();

    await getCountryNames();
    loadWeather(await getCurrentWeatherByCityName("Иркутск"));

    let ctx = $(".chart-temperature").get(0).getContext("2d");
    let gradientLine = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
    gradientLine.addColorStop(0, "#00bbe0");
    gradientLine.addColorStop(0.5, "#c91a1a");
    gradientLine.addColorStop(0.50001, "#d2d2d2");
    gradientLine.addColorStop(1, "#d2d2d2");
    

    let myChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: 
            ["2", "5", "8", "11", "14", "17", "20", "23"],
        datasets: [{
            fill: false,
            borderColor: gradientLine,
            lineTension: 1,
            data: [-6, -7, -5, -2, 2, 5, 4, -3],
        }]
    },
    options: {
        tooltips: {
            enabled: false
        },
        elements: {
            point: {
                radius: 0
            },
            line: {
                cubicInterpolationMode: "monotone"
            }
        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                gridLines: false,
                ticks: {
                    suggestedMin: -8,
                    suggestedMax: 28,
                    display: false
                }
            }],
            xAxes: [{
                gridLines: false
            }]
        }
    }
    });
}

init()