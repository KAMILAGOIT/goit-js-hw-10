import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

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
    Notiflix.Notify.failure('Oops, there is no country with that name');
    clearResults();
  }
}

function displayCountries(countries) {
  clearResults();

  if (countries.length === 0) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    return;
  }

  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  countries.forEach(country => {
    const listItem = document.createElement('li');
    const flagImg = document.createElement('img');
    flagImg.src = country.flags.svg;
    flagImg.alt = `${country.name.official} flag`;
    listItem.appendChild(flagImg);
    const countryName = document.createElement('span');
    countryName.textContent = country.name.official;
    listItem.appendChild(countryName);
    listItem.addEventListener('click', () => {
      displayCountryInfo(country);
    });
    countryList.appendChild(listItem);
  });
}

function displayCountryInfo(country) {
  countryInfo.innerHTML = '';

  const flagImg = document.createElement('img');
  flagImg.src = country.flags.svg;
  flagImg.alt = `${country.name.official} flag`;
  countryInfo.appendChild(flagImg);

  const name = document.createElement('h2');
  name.textContent = country.name.official;
  countryInfo.appendChild(name);

  const capital = document.createElement('p');
  capital.textContent = `Capital: ${country.capital}`;
  countryInfo.appendChild(capital);

  const population = document.createElement('p');
  population.textContent = `Population: ${country.population}`;
  countryInfo.appendChild(population);

  const languages = document.createElement('p');
  languages.textContent = `Languages: ${country.languages.map(language => language.name).join(', ')}`;
  countryInfo.appendChild(languages);
}

function clearResults() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}