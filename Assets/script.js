var cityFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityname');
var cityContainerEl = document.querySelector('#city-container');
var citySearchTerm = document.querySelector('#city-search-term');
var temp = document.querySelector('#temp');
var humidity = document.querySelector('#humidity');
var wind = document.querySelector('#wind');
var humidity = document.querySelector('#humidity');
var uvIndex = document.querySelector('#uvIndex');
var currentDay = moment().format('dddd/MM/YY')

// Submit Button For Weather
var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = cityInputEl.value.trim();
  
    if (cityName) {
      // Change based on city name
      getWeather(cityName);
      // Display city name on dashboard and empty the input column.
      citySearchTerm.textContent = cityName + ' - ' +currentDay;
      cityInputEl.value = '';
    } else {
      alert('Please enter a City name!');
    }
    console.log(cityName);
  };
  
  
  // Function to get city's weather
  var getWeather = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=690b389bbce06cc3766da916b5049efd';
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data)
              //Rounding data from .00
              var windSpeed = Math.round(data.wind.speed);
              // Display Data to DOM
              temp.textContent = Math.round(data.main.temp) - 273 + "\u00B0 Celcius";
              wind.textContent = windSpeed.toFixed(1) * 3.6 + " km/h";
              humidity.textContent = Math.round(data.main.humidity) + "%";
              console.log(data.coord)

              // One call API
              var lon = data.coord.lon;
              var lat = data.coord.lat;
              console.log(lon, lat)
              //Getting More Data from One Call API for UV Index
              var testUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=690b389bbce06cc3766da916b5049efd";
              fetch (testUrl)
              .then (function(response) {
              if (response.ok){
              response.json().then(function(dataOneCall){
                console.log(dataOneCall)
                uvIndex.textContent = dataOneCall.current.uvi;
                if (dataOneCall.current.uvi < 2){
                  uvIndex.style.backgroundColor = "lightgreen"
                  uvIndex.style.color = "blue"
                }else{
                  uvIndex.style.backgroundColor = "red"
                  uvIndex.style.color = "white"
                }
        })
      }
    })
              

              
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {                   
        alert('Unable to find city');
      });
  };
  
  
  
  cityFormEl.addEventListener('submit', formSubmitHandler);


  // forecast weather for 5 days 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=690b389bbce06cc3766da916b5049efd'