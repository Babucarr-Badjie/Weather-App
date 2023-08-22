// hookup the form
const locationForm = document.querySelector(".location");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

// udate UI function
const updateUI = (data) => {
  const locationDetails = data.locationDetails;
  const weather = data.weather;

  // update details template
  details.innerHTML = `
   <h5 class="my-3">${locationDetails.EnglishName}</h5>
   <div class="my-3">${weather.WeatherText}</div>
   <div class="my-3">${weather.LocalObservationDateTime
   }</div>
   <div class="display-4 my-4">
     <span>${weather.Temperature.Metric.Value}</span>
     <span>&deg;C</span>
   </div>
  `;

  // update night/day & icon images
  let timeSource = null;

  // check if weather is day or night time
  if (weather.IsDayTime) {
    timeSource = `img/day.svg`;
  } else {
    timeSource = `img/night.svg`;
  }
  time.setAttribute("src", timeSource);

  // weather icon images
  const iconSource = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSource);

  // remove existing d-none class when the user enter the location
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateLocation = async (city) => {
  // console.log(city);
  const locationDetails = await getCity(city);

  const weather = await getWeatherInfo(locationDetails.Key);

  return { locationDetails: locationDetails, weather: weather };
};

// add event listeners to the form
locationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputLocation = locationForm.city.value.trim();
  locationForm.reset();

  updateLocation(inputLocation)
    .then((data) => {
      console.log(data);
      updateUI(data);
    })
    .catch((error) => {
      console.log(error);
    });

  // set local strorage
  localStorage.setItem("location", inputLocation);
});

// check if location is store in local storage
// when a user lands on the page

if (localStorage.getItem("location")) {
  updateLocation(localStorage.getItem("location"))
    .then((data) => updateUI(data))
    .catch((error) => {
      console.log(error);
    });
}
