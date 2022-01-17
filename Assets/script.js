var cityFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityname');
var cityContainerEl = document.querySelector('#city-container');
var citySearchTerm = document.querySelector('#city-search-term');
var temp = document.querySelector('#temp');
var humidity = document.querySelector('#humidity');
var wind = document.querySelector('#wind');
var historySearch = document.querySelector("#history-search");
var humidity = document.querySelector('#humidity');
var forecastCard = document.querySelector("forecast")
var uvIndex = document.querySelector('#uvIndex');
var currentDay = moment().format('dddd/MM/YY')
var iconWeather = document.querySelector("#iconWeather")
var description = document.querySelector("#descriptionWeather")
var historyButton = $(".btn-history");
var forecastCard = $("#five-day");

// Forecast for 5 Days
var firstDay = document.querySelector('#firstDay');
var secondDay = document.querySelector('#secondDay');
var thirdDay = document.querySelector('#thirdDay');
var forthDay = document.querySelector('#forthDay');
var fifthDay = document.querySelector('#fifthDay');
var forecastFiveDays = document.getElementsByClassName("column")

// Setup Local Storage


// Submit Button For Weather
var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = $("#cityname").val();
    if (cityName) {
      console.log(cityName);
      // Empty the 5 days forecast
      $("#five-day").empty();
      getWeather(cityName);
      makeMemory()

      // Setup Local Storage
      function makeMemory(){
      var localMemory = localStorage.getItem("cities");
      var localMemoryArray = JSON.parse(localMemory);
      if (!localMemoryArray){
        localMemoryArray = []
      }
      var value = cityName;
      localMemoryArray.push(value)
      localStorage.setItem("cities", JSON.stringify(localMemoryArray));
      // Create Button History List
      var histBtn = document.createElement("button");
      histBtn.setAttribute("class", "btn-history");

      histBtn.textContent = cityName;
      historySearch.append(histBtn);
    }
          
      // Display city name on dashboard and empty the input column.
      citySearchTerm.textContent = cityName + ' - ' +currentDay;
      cityInputEl.value = '';
    } else {
      alert('Please enter a City name!');
    }
  };

function renderButton(){
  let searchList = JSON.parse(localStorage.getItem("cities"));
  if (searchList) {
      for (var i = 0; i < searchList.length; i++) {
        var citi = searchList[i]
          console.log(searchList.length);
          var histBtn = document.createElement("button");
          histBtn.setAttribute("class", "btn-history btn" + (i + 1));
          histBtn.setAttribute("data-city", i);
          histBtn.setAttribute("value", searchList[i])
          histBtn.textContent = searchList[i];
          historySearch.append(histBtn);
        }
    }
  }

  // Function to get city's weather
  var getWeather = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=690b389bbce06cc3766da916b5049efd';
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
              //Rounding data from .00
              var windSpeed = Math.round(data.wind.speed);
              var iconCode = data.weather[0].icon;
              iconWeather.src = "https://openweathermap.org/img/w/" + iconCode + ".png";
              description.textContent = data.weather[0].description;
              temp.textContent = Math.round(data.main.temp) - 273 + "\u00B0 Celcius";
              wind.textContent = windSpeed.toFixed(1) * 3.6 + " km/h";
              humidity.textContent = Math.round(data.main.humidity) + "%";
              console.log(data.coord);

              // One call API Coordinate to get UVI
              var lon = data.coord.lon;
              var lat = data.coord.lat;
              console.log(lon, lat);
              //Getting More Data from One Call API for UV Index
              var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=690b389bbce06cc3766da916b5049efd";
              fetch (forecastUrl)
              .then (function(response) {
              if (response.ok){
              response.json().then(function(dataOneCall){
                console.log(dataOneCall)
                // Value UV Index will be displayed and represent with the colour and brief description.
                var uvValue = dataOneCall.current.uvi;
                if ( uvValue < 2){
                  uvIndex.style.backgroundColor = "#25ad25"
                  uvIndex.style.color = "#dadaf0"
                  uvIndex.textContent = uvValue + " | LOW"
                }else if (uvValue >= 2 && uvValue <= 5) {
                  uvIndex.style.backgroundColor = "#a0b125"
                  uvIndex.style.color = "#dadaf0"
                  uvIndex.textContent = uvValue + " | MODERATE"
                }else if (uvValue > 5 && uvValue <= 7){
                  uvIndex.style.backgroundColor = "#b95000"
                  uvIndex.style.color = "#dadaf0"
                  uvIndex.textContent = uvValue + " | HIGH"
                }else if (uvValue > 7 && uvValue <= 10){
                  uvIndex.style.backgroundColor = "#b90000"
                  uvIndex.style.color = "#dadaf0"
                  uvIndex.textContent = uvValue + " | VERY HIGH"
                }else{
                  uvIndex.style.backgroundColor = "rgb(138 0 185)"
                  uvIndex.style.color = "#dadaf0"
                  uvIndex.textContent = uvValue + " | EXTREME"
                }

              // 5 Days Forecast
              for (let i = 1; i < 6; i++) {
              let cardbodyElem = $("<div>").addClass("card-body-forecast");
              let fiveDayCard = $("<div>").addClass(".cardbody");
              let fiveDate = $("<p>").text(moment.unix(dataOneCall.daily[i].dt).format("dddd"));
              fiveDayCard.addClass("headline");

              // let todayDesc = $("<p>").text(dataOneCall.daily[i].weather[i].description);
              // todayDesc.attr("id", "#todayDesc")
            
              var celciusForecast = Math.round(dataOneCall.daily[i].temp.max) - 273;
              let fiveDayTemp = $("<p>").text("Temp: " + celciusForecast + "\u00B0C");
              fiveDayTemp.attr("id", "#fiveDayTemp[i]");
              let fiveHumidity = $("<p>").attr("id", "humDay").text("Humidity: " + JSON.stringify(dataOneCall.daily[i].humidity) + "%");
              fiveHumidity.attr("id", "#fiveHumidity[i]");
              let iconCode = dataOneCall.daily[i].weather[0].icon;
              let iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
              let weatherImgDay = $("<img>").attr("src", iconURL);
              $("#testImage").attr("src", iconURL);

              // cardbodyElem.append(todayDesc);
              cardbodyElem.append(fiveDate);
              cardbodyElem.append(weatherImgDay);
              cardbodyElem.append(fiveDayTemp);
              cardbodyElem.append(fiveHumidity);
              fiveDayCard.append(cardbodyElem);
              $("#five-day").append(fiveDayCard);
              $("#fiveDayTemp[i]").empty();
              $(".jumbotron").append(cardbodyElem);
              }
        })
      }
    });        
          });
        } else {
          location.reload();
          alert('Error: ' + response.statusText);
          
        }
      })
      .catch(function (error) {                   
        alert('Unable to find city');
      });
  };


  historySearch.addEventListener("click", function(event) {
    var element = event.target;
    console.log(element);
    $("#five-day").empty();
    // Checks if element is a button
    if (element.matches("button") === true) {
      citySearchTerm.textContent = element.value + ' - ' + currentDay;
      // Get its data-index value and remove the todo element from the list
      var thisOne = event.target.value;
      // Store updated todos in localStorage, re-render the list
      getWeather(thisOne)
    }
  })
  // Render the button everytime we reload the page from 
  renderButton()
  
  cityFormEl.addEventListener('submit', formSubmitHandler);
