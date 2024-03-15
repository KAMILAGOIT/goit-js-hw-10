import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(handleInput, 300));

async function handleInput() {
  const searchTerm = searchBox.value.trim();

  if (!searchTerm) {
    clearResults();
    return;
  }

  try {
    const countries = await fetchCountries(searchTerm);
    displayCountries(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    clearResults();
  }
}

function displayCountries(countries) {
  clearResults();

  countries.forEach(country => {
    const listItem = document.createElement('li');
    listItem.textContent = country.name.official;
    listItem.addEventListener('click', () => {
      displayCountryInfo(country);
    });
    countryList.appendChild(listItem);
  });
}

function displayCountryInfo(country) {
  countryInfo.innerHTML = '';

  const name = document.createElement('h2');
  name.textContent = country.name.official;
  const capital = document.createElement('p');
  capital.textContent = `Capital: ${country.capital}`;
  const population = document.createElement('p');
  population.textContent = `Population: ${country.population}`;
  const flag = document.createElement('img');
  flag.src = country.flags.svg;
  flag.alt = `${country.name.official} flag`;

  countryInfo.appendChild(name);
  countryInfo.appendChild(capital);
  countryInfo.appendChild(population);
  countryInfo.appendChild(flag);
}

function clearResults() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}