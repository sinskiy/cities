export function isCityValid(previousCity, city, cities) {
  const suitableCities = getSuitableCities(previousCity, cities);
  return suitableCities.includes(city);
}

export function isGuessPossible(city, cities) {
  const suitableCities = getSuitableCities(city, cities);
  return suitableCities.length !== 0;
}

export function getSuitableCities(city, cities) {
  if (!city) return cities;

  const lastLetter = city.at(-1);
  return cities.filter((city) => city[0] === lastLetter);
}

export function removeCity(cityToRemove, cities) {
  return cities.filter((city) => city !== cityToRemove);
}

export function formatCity(city) {
  return city
    .toLowerCase()
    .replace(/[ \-]/, " ")
    .replace(/[^a-z\- ]/g, "");
}
