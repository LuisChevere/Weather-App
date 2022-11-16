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
    
}