const submitBtn = document.getElementById('searchsubmitbutton');
const searchBarError = document.getElementById('searchbarerror');
const key = '1c241f369222261b5980cb0c4f78ee8a';
const locationInput = document.getElementById('locationsearch');

const resultsLocationName = document.getElementById('resultslocationname');
const resultsCoordinates = document.getElementById('resultscoordinates');
const resultsTemp = document.getElementById('resultstemp');
const resultsFeelsLike = document.getElementById('resultsfeelslike');

const resultsContainer2 = document.getElementById('resultscontainer2');
const resultsParagraph = document.getElementById('resultsparagraph');
const resultsImageContainer = document.getElementById('resultsimagecontainer');
const resultsImage = document.getElementById('resultsimage');
const resultsImageCaption = document.getElementById('resultsimagecaption');

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

  console.log(`Running getWeather wtih city: ${citya}, units: ${unitsa}, language: ${langa}`);

  try {

    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${citya}&units=${unitsa}&lang=${langa}&APPID=${key}`);

    const results = await data.json();
    let resultsUnits;

    if (unitsa === 'imperial') {
      resultsUnits = 'Farenheit';
    } else if (unitsa === 'metric') {
      resultsUnits = 'Celcius';
    }


    if (langa === 'en') {
      resultsParagraph.innerHTML = 
      `It's currently <span class='data'>${results.main.temp}\xB0 ${resultsUnits}</span> at <span class='data'>Longitude ${results.coord.lon}, Latitude ${results.coord.lat}</span> in <span class='data'>${results.name}</span>. It feels like <span class='data'>${results.main.feels_like}\xB0 ${resultsUnits}</span>.`
    } else if (langa === 'fr') {
      resultsParagraph.innerHTML = 
      `Il fait actuellement <span class='data'>${results.main.temp}\xB0 ${resultsUnits}</span> à <span class='data'>Longitude ${results.coord.lon}, Latitude ${results.coord.lat}</span> à <span class='data'>${results.name}</span>. Il semble qu'il fait <span class='data'>${results.main.feels_like}\xB0 ${resultsUnits}</span>.`
    }

    const description = results.weather[0].description;

    showGIF(description);
    resultsImage.classList.remove('hidden');
    resultsImageCaption.textContent=`"${description}"`;

    console.log(results);
    console.log(`Name: ${results.name}`);
    console.log(`Coordinates: Longitude ${results.coord.lon}, Latitude ${results.coord.lat}`);
    console.log(`Temp: ${results.main.temp}`);
    console.log(`Feels like: ${results.main.feels_like}`);
    console.log(`Description: ${results.weather[0].description}`);

  } catch(err) {
      console.log(err);
  }

}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


const showGIF = function(keyword) {
  // generate random index (0-8)
  const index = getRandomInt(9);
  // search GIPHY with keyword
  async function getGIFs() {
    try {
      const response = await   fetch(`https://api.giphy.com/v1/gifs/search?api_key=dNW6NhV3umI5BEbDAYmtZDp44FPquBSg&q=${keyword}&limit=9&offset=0&rating=g&lang=en`, {mode: 'cors'});
      const gifData = await response.json();
      resultsImage.src = gifData.data[index].images.fixed_height.url;
    } catch (err) {
      console.log(err);
    }
  }
  getGIFs();
}






// OpenWeatherMap API has several types of data that you can request. To get the current weather in a specific location, you can pass in the name of a city (optionally, you can also add a state code or a country code) as a URL query string parameter, like so:

// api.openweathermap.org/data/2.5/weather?q=London

// Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.

// Set up a simple form that will let users input their location and will fetch the weather info (still just console.log() it).

// Display the information on your webpage!

// Add any styling you like!

// Optional: add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API.