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
              var windSpeed = Math.round(data.wind.speed);
              temp.textContent = Math.round(data.main.temp) - 273 + "\u00B0 Celcius";
              wind.textContent = windSpeed.toFixed(1) * 3.6 + " KPH";
              humidity.textContent = Math.round(data.main.humidity) + "%";
          console.log(data)
             console.log(data.weather[0].main);
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