let appId = "66b606cf77f585b73663aa09caf12006";
let units = "imperial";
let searchMethod = 'zip';


function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm) {
        //Number.parseInt(searchTerm) + "" === searchTerm   checking that every itme in the search term is number.

        searchMethod = "zip";
    }
    else {
        searchMethod = "q";
    }
}


function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    if (location.protocol === 'http:') {
        fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appId}&units=${units}`)
            .then(result => {
                return result.json();
            }).then(result => {
                init(result);
            });
    }
    else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appId}&units=${units}`)
            .then(result => {
                return result.json();
            }).then(result => {
                init(result);
            });
    }


}

function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case "Clear":
            document.body.style.backgroundImage = 'url("clear.jpeg")';
            break;
        case "Clouds":
            document.body.style.backgroundImage = 'url("cloudy.jpeg")';
            break;
        case "Rain":
        case "Drizzle":
        case "Mist":
            document.body.style.backgroundImage = 'url("rain.jpeg")';
            break;
        case "Thunderstorm":
            document.body.style.backgroundImage = 'url("storm.jpeg")';
            break;
        case "Snow":
            document.body.style.backgroundImage = 'url("snow.jpeg")';
            break;
        default:
            document.body.style.backgroundImage = 'url("default.jpg")';
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.querySelector('.iconImg');

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';


    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + "&#176";
    windSpeedElement.innerHTML = "Winds at " + Math.floor(resultFromServer.wind.speed) + " m/s";
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = "Humidity levels at " + resultFromServer.main.humidity + "%";

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 2}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById("searchBtn").addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        searchWeather(searchTerm);
    }
});

window.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let searchTerm = document.getElementById('searchInput').value;
        if (searchTerm) {
            searchWeather(searchTerm);
        }
    }
});