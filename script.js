import {
  isCityValid,
  formatCity,
  getSuitableCities,
  isGuessPossible,
  removeCity,
} from "./utils/cities.js";
import { getRandomInt } from "./utils/helpers.js";

const $ = (query) => document.querySelector(query);

const game = $("#game");
game.addEventListener("submit", handleCitySubmit);

const initialCities = [
  "moscow",
  "washington",
  "nice",
  "elista",
  "new york",
  "kuala lumpur",
  "riga",
];

let cities = [...initialCities];
let previousCity = null;

const city = $("#city");
function handleCitySubmit(e) {
  e.preventDefault();

  handlePlayerGuess(city.value);
}

const cityMessage = $("#city-message");
function handlePlayerGuess(city) {
  const formattedCity = formatCity(city);
  if (isCityValid(previousCity, formattedCity, cities)) {
    cities = removeCity(formattedCity, cities);
    handleComputerGuess(formattedCity);
  } else {
    cityMessage.textContent = "city not found";
  }
}

const previousCityContainer = $("#previous-city");
function handleComputerGuess(playerCity) {
  if (isGuessPossible(playerCity, cities)) {
    const suitableCities = getSuitableCities(playerCity, cities);
    const randomCity = suitableCities[getRandomInt(suitableCities.length)];
    cities = removeCity(randomCity, cities);

    previousCity = randomCity;
    previousCityContainer.textContent = previousCity;

    // next user guess
    if (!isGuessPossible(previousCity, cities)) endGame();
  } else {
    endGame();
  }
}

const restart = $("#restart");
function endGame() {
  cityMessage.textContent = "all cities guessed";
  restart.classList.remove("not-visible");
  console.log(restart);
}

restart.addEventListener("click", handleRestart);

function handleRestart() {
  restart.classList.add("not-visible");

  cities = initialCities;
  previousCity = null;

  cityMessage.innerHTML = "&nbsp;";
  previousCityContainer.innerHTML = "&nbsp;";
  city.value = "";
}
