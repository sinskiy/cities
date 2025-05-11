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
  if (doesCityExist(formattedCity)) {
    removeCity(formattedCity);
    handleComputerGuess(formattedCity);
  } else {
    cityMessage.textContent = "city not found";
  }
}

function handleComputerGuess(playerCity) {
  if (isGuessPossible(playerCity)) {
    const suitableCities = getSuitableCities(playerCity);
    const randomCity = suitableCities[getRandomInt(suitableCities.length)];
    removeCity(randomCity);

    previousCity = randomCity;
    previousCityContainer.textContent = previousCity;

    // next user guess
    if (!isGuessPossible(previousCity)) {
      cityMessage.textContent = "all cities guessed";
    }
  } else {
    cityMessage.textContent = "all cities guessed";
  }
}

const previousCityContainer = $("#previous-city");
function computerTurn(suitableCities) {
  previousCity = suitableCities[getRandomInt(suitableCities.length)];
  removeCity(previousCity);
  previousCityContainer.textContent = previousCity;
}

function handlePlayClick() {
  game?.classList.remove("hidden");
  play?.classList.add("hidden");
}

function formatCity(city) {
  return city
    .toLowerCase()
    .replace(/[ \-]/, " ")
    .replace(/[^a-z\- ]/g, "");
}

function doesCityExist(city) {
  const suitableCities = getSuitableCities(previousCity);
  return suitableCities.includes(city);
}

function isGuessPossible(city) {
  const suitableCities = getSuitableCities(city);
  return suitableCities.length !== 0;
}

function getSuitableCities(city) {
  if (!city) return cities;

  const lastLetter = city.at(-1);
  return cities.filter((city) => city[0] === lastLetter);
}

function removeCity(cityToRemove) {
  cities = cities.filter((city) => city !== cityToRemove);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
