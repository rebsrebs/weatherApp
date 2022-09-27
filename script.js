
// My API Key
// 1c241f369222261b5980cb0c4f78ee8a

// How to make an API call
// https://openweathermap.org/api/one-call-api#how



// http://api.openweathermap.org/data/2.5/weather?q=London&APPID=1111111111



// `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=1c241f369222261b5980cb0c4f78ee8a`

// URL (required), options (optional)
// fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=1c241f369222261b5980cb0c4f78ee8a`)
//   .then(function(response) {
//     // Successful response :)
//     return response.json();
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

const getWeather = async function() {

  // currently using Farenheit
  const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&APPID=1c241f369222261b5980cb0c4f78ee8a`);

  const weather = await data.json();

  console.log(weather);
  console.log(`Name: ${weather.name}`);
  console.log(`Coordinates: Longitude ${weather.coord.lon}, Latitude ${weather.coord.lat}`);
  console.log(`Temp: ${weather.main.temp}`);
  console.log(`Feels like: ${weather.main.feels_like}`);

}

getWeather();


// Write the functions that hit the API. You’re going to want functions that can take a location and return the weather data for that location. For now, just console.log() the information.

// OpenWeatherMap API has several types of data that you can request. To get the current weather in a specific location, you can pass in the name of a city (optionally, you can also add a state code or a country code) as a URL query string parameter, like so:

// api.openweathermap.org/data/2.5/weather?q=London

// Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.

// Set up a simple form that will let users input their location and will fetch the weather info (still just console.log() it).

// Display the information on your webpage!

// Add any styling you like!

// Optional: add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API.