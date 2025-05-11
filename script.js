import {
  isCityValid,
  formatCity,
  getSuitableCities,
  isGuessPossible,
  removeCity,
} from "./utils/cities.js";
import { getRandomInt } from "./utils/helpers.js";

const $ = (query) => document.querySelector(query);

const play = $("#play");
const game = $("#game");

play.addEventListener("click", handlePlayClick);
game.addEventListener("submit", handleCitySubmit);

let cities = [
  "moscow",
  "washington",
  "nice",
  "elista",
  "new york",
  "kuala lumpur",
  "riga",
];
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
    if (!isGuessPossible(previousCity, cities)) {
      cityMessage.textContent = "all cities guessed";
    }
  } else {
    cityMessage.textContent = "all cities guessed";
  }
}

function handlePlayClick() {
  game?.classList.remove("hidden");
  play?.classList.add("hidden");
}
