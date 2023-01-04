var APIKey = "08f8867238419bbdc310fbf3f96572e8"

//allows the search button to dig thru API info and return coordinates based on city name
var searchbtn = $("#searchbtn")
function getGeoLocation(city){
    var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + APIKey
    fetch(geoURL).then(function(response){
        return response.json()
    }).then(function (data){
        var lat = data[0].lat;
        var lon = data[0].lon;
        getWeather(lat, lon)
    })
}

//uses the city name and coordinates to display current weather
function getWeather(lat, lon){
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    fetch(queryURL).then(function(response){
        return response.json()
    }).then(function (data){
        var card = $("<div>").addClass("card")
        var cardBody = $("<div>").addClass("card-body")
        var cityName = $("<h3>").addClass("card-title").text(data.name)
        var temp = $("<h5>").addClass("card-subtitle").text("Temperature: " + Math.round(data.main.temp) + "F") 
        var max = $("<h5>").addClass("card-subtitle").text("Max: " + Math.round(data.main.temp_max) + "F")
        var min = $("<h5>").addClass("card-subtitle").text("Min: " + Math.round(data.main.temp_min) + "F")
        var wind = $("<h5>").addClass("card-subtitle").text("Wind: " + (data.wind.speed) + " MPH")

        $("#weather").append(card.append(cardBody.append(cityName, temp, max, min, wind)))
        getForecast(lat, lon)
    })
}

//5-day forcast
function getForecast(lat, lon){
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    fetch(forecastURL).then(function(response){
        return response.json()
    }).then(function (data){

        for(var i=1; i < 40; i+=8) {
            var day = $("<div>").addClass("card")
            var dayBody = $("<div>").addClass("card-body")
            var date = $("<h4>").addClass("card-subtitle")
            date.text(data.list[i].dt_txt)
            var temp = $("<h5>").addClass("card-subtitle").text("Temperature: " + Math.round(data.list[i].main.temp) + "F") 
            var max = $("<h5>").addClass("card-subtitle").text("Max: " + Math.round(data.list[i].main.temp_max) + "F")
            var min = $("<h5>").addClass("card-subtitle").text("Min: " + Math.round(data.list[i].main.temp_min) + "F")
            var wind = $("<h5>").addClass("card-subtitle").text("Wind: " + (data.list[i].wind.speed) + " MPH")

            $("#weather").append(day.append(dayBody.append(date, temp, max, min, wind)))
        }
    })
}

//event listener for search button
searchbtn.on("click", function(event){
    event.preventDefault()
    var city = $("#city").val().trim()
    getGeoLocation(city)
})