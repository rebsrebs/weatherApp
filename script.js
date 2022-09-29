const submitBtn = document.getElementById('searchsubmitbutton');
const searchBarError = document.getElementById('searchbarerror');
const key = '1c241f369222261b5980cb0c4f78ee8a';
const locationInput = document.getElementById('locationsearch');

const resultsLocationName = document.getElementById('resultslocationname');
const resultsCoordinates = document.getElementById('resultscoordinates');
const resultsTemp = document.getElementById('resultstemp');
const resultsFeelsLike = document.getElementById('resultsfeelslike');

const resultsContainer2 = document.getElementById('resultscontainer2');

// How to make an API call
// https://openweathermap.org/api/one-call-api#how

const handleSubmitClick = function() {
  const city = document.getElementById('locationsearch').value;
  const units = document.querySelector('input[name="units"]:checked').value;
  const lang = document.querySelector('input[name="language"]:checked').value;
  if (city != '') {
    getWeather(city, units, lang);
  } else {
    searchBarError.classList = 'active';
    searchBarError.textContent = 'Location must not be blank.'
  }
}

const handleLocationInput = function() {
  const location = document.getElementById('locationsearch').value;
  if (location != '') {
    searchBarError.classList = 'inactive';
    searchBarError.textContent = '';
  }
}



submitBtn.addEventListener('click', handleSubmitClick);

locationInput.addEventListener('input', handleLocationInput);


const getWeather = async function(citya, unitsa, langa) {

  try {

    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${citya}&units=${unitsa}&lang=${langa}&APPID=${key}`);

    // const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&lang=en&APPID=1c241f369222261b5980cb0c4f78ee8a`);

    const weather = await data.json();
    let resultsUnits;

    if (unitsa = 'imperial') {
      resultsUnits = 'Farenheit';
    } else if (unitsa = 'metric') {
      resultsUnits = 'Celcius';
    }

    resultsLocationName.textContent = `Location: ${weather.name}`;
    resultsCoordinates.textContent = `Coordinates: Longitude ${weather.coord.lon}, Latitude ${weather.coord.lat}`;
    resultsTemp.textContent = `Current temperature: ${weather.main.temp}\xB0 ${resultsUnits}`;
    resultsFeelsLike.textContent = `Feels like: ${weather.main.feels_like}\xB0 ${resultsUnits}`;

    resultsContainer2.innerHTML = `
    It's currently <span class='data'>${weather.main.temp}\xB0 ${resultsUnits}</span> at <span class='data'>Longitude ${weather.coord.lon}, Latitude ${weather.coord.lat}</span> in <span class='data'>${weather.name}</span>. It feels like <span class='data'>${weather.main.feels_like}\xB0 ${resultsUnits}</span>.
    `


    console.log(weather);
    console.log(`Name: ${weather.name}`);
    console.log(`Coordinates: Longitude ${weather.coord.lon}, Latitude ${weather.coord.lat}`);
    console.log(`Temp: ${weather.main.temp}`);
    console.log(`Feels like: ${weather.main.feels_like}`);

  } catch(err) {
      console.log(err);
  }

}









// Write the functions that hit the API. You’re going to want functions that can take a location and return the weather data for that location. For now, just console.log() the information.

// OpenWeatherMap API has several types of data that you can request. To get the current weather in a specific location, you can pass in the name of a city (optionally, you can also add a state code or a country code) as a URL query string parameter, like so:

// api.openweathermap.org/data/2.5/weather?q=London

// Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.

// Set up a simple form that will let users input their location and will fetch the weather info (still just console.log() it).

// Display the information on your webpage!

// Add any styling you like!

// Optional: add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API.