function startPage() {
    var inputEl = document.getElementById("city-input");
    var searchEl = document.getElementById("search-button");
    var nameEl = document.getElementById("city-name");
    var currentPicEl = document.getElementById("current-picture");
    var currentTempEl = document.getElementById("temperature");
    var currentHumidityEl = document.getElementById("humidity");
    var currentWindEL = document.getElementById("wind");
    var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

    var APIKey = "a334fc8eab2946f09e9251d1c9294338"

    function getWeather(cityName) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName  + "&appid"+ APIKey;
        fetch(queryURL)
            .then(function (response) {

                var currentDate = new Date(response.formData.dt * 1000);
                var day = currentDate.getDate();
                var month = currentDate.getMonth() + 1;
                var year = currentDate.getFullYear();
                nameEl.innerHTML = response.data.date + "(" + month + "/" + day + "/" + year + ")";
                var weatherPic = response.data.weather[0].icon;
                currentPicEl.setAttribute("src", "http://openweathermap.org/img/wn/10d@2x.png" + weatherPic + "@2x.png");
                currentPicEl.setAttribute("alt", response.data.weather[0].description);
                currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + "&#176F";
                currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                currentWindEL.innerHTML = "Wind: " + response.data.wind.speed + " MPH";

                var lat = response.data.coord.lat;
                var lon = response.data.coord.lon;
            });

        var cityID = response.data.id;
        var forecastQueryURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon=" + cityID + "&appid=" + APIKey;
        fetch(forecastQueryURL)
            .then(function (response) {
                var forecastEls = document.querySelectorAll(".forecast");
                for (i = 0; i < forecastEls.length; i++) {
                    forecastEls[i].innerHTML = "";
                    var forecastIndex = i*8 + 4;
                    var forecastDate = new date(response.data.list[forecastIndex].dt * 1000);
                    var forecastDay = forecastDate.getDate();
                    var forecastMonth = forecastDate.getMonth() + 1;
                    var forecastYear = forecastDate.getFullYear();
                    var forecastDateEl = document.createElement("p");
                    forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                    forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                    forecastEls[i].append(forecastDateEl);
                    var forecastWeatherEl = document.createElement("img");
                    forecastWeatherEl.setAttribute("src", "http://openweathermap.org/img/wn/10d@2x.png" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                    forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                    forecastEls[i].append(forecastWeatherEl);
                    var forecastTempEl = document.createElement("p");
                    forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + "&#176F";
                    forecastEls[i].append(forecastTempEl);
                    var forecastHumidityEl = document.createElement("p");
                    forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                    forecastEls[i].append(forecastHumidityEl);
                }

            });
    }

    searchEl.addEventListener("click",function(){
        var searchTerm =inputEl.value;
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        renderSearchHistory();
    })

    function k2f(K)
    return Math.floor(1.8 *( K-273) + 32);
    console.log(math.floor)
}

function renderSearchHistory(){
    historyEl.innerHTML = "";
        for (var i=0; i < searchHistory.length; i++){
            var historyItem =document.createElement("input");
            historyItem.setAttribute("type","text");
            historyItem.setAttribute("readonly",true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click", function(){
                getWeather(historyItem.value);
            })
            historyEl.append(historyItem);
        }
}

renderSearchHistory();
if (searchHistory.length > 0){
getWeather(searchHistory[searchHistory.length - 1]);

}

initPage();

