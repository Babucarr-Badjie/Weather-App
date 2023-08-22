// API key from AccuWeather "MY APPS"
const myAPIKey = "Oxxfbd4VY6AGZlGhk4PDSga4OHG23xnn";

// get weather information
const getWeatherInfo = async (id) => {
  // current conditions resource URL
  const baseURL = "http://dataservice.accuweather.com/currentconditions/v1/";

  // current condtion query parameters
  const query = `${id}?apikey=${myAPIKey}`;

  // fetch weather data
  const response = await fetch(baseURL + query);

  const data = await response.json();

  return data[0];

  // console.log(data);
};

// get city  information
const getCity = async (city) => {
  // city search Resource URL
  const baseURL =
    "http://dataservice.accuweather.com/locations/v1/cities/search";

  // city search Query Parameters
  const query = `?apikey=${myAPIKey}&q=${city}`;

  // fetch city data
  const response = await fetch(baseURL + query);
  const data = await response.json();

  return data[0];

  // console.log(data);
};
