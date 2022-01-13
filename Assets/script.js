var cityFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityname');
var cityContainerEl = document.querySelector('#city-container');
var citySearchTerm = document.querySelector('#city-search-term');

// Submit Button For Weather
var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = cityInputEl.value.trim();
  
    if (cityName) {
      //need to change based on city name
      getWeather(cityName);
  
      citySearchTerm.textContent = cityName;
      cityInputEl.value = '';
    } else {
      alert('Please enter a City name!');
    }
    console.log(cityName);
  };
  
  
  // Function to get city's weather
  var getWeather = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=690b389bbce06cc3766da916b5049efd';
    fetch(apiUrl)
      .then(function (response) {
        
        if (response.ok) {
          response.json().then(function (data) {
          console.log(data)
           // console.log(data.weather[0].main);
           // console.log(data.main.temp) 
           // repoContainerEl.textContent = data.main.temp-273 + " Celcius";
            // displayRepos(data, city);
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
  