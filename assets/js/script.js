function startPage() {
    var inputEl = document.getElementById("city-input");
    var searchEl = document.getElementById("search-button");
    var nameEl = document.getElementById("city-name");
    var currentPicEl = document.getElementById("current-picture");
    var currentTempEl = document.getElementById("temperature");
    var currentHumidityEl = document.getElementById("humidity");
    var currentWindEL = document.getElementById("wind");
    var currentUVEl = document.getElementById("UV");
    var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

    var APIKey = "a334fc8eab2946f09e9251d1c9294338"

    function getWeather(cityName) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + APIKey;
        fetch(queryURL)
        .then(function(response){

            var currentDate = new Date(response.formData.dt*1000);
            var day = currentDate.getDate();
            var month = currentDate.getMonth();
            var year = currentDate.getFullYear();
            nameEl.innerHTML = response.data.date + "(" + month + "/" + day + "/" + year + ")";
            var weatherPic = response.data.weather[0].icon;
            currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
        })

        }

    }

}