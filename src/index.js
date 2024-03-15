import { fetchCountries } from './fetchCountries';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

let lastSearch = '';

searchBox.addEventListener('input', debounce(handleInput, 300));

async function handleInput() {
    const searchTerm = searchBox.value.trim();

    if (!searchTerm) {
        clearResults();
        return;
    }

    if (searchTerm === lastSearch) {
        return;
    }

    loader.style.display = 'block';
    error.style.display = 'none';

    try {
        const countries = await fetchCountries(searchTerm);
        displayCountries(countries);
    } catch (err) {
        console.error('Error fetching countries:', err);
        showError();
        Notiflix.Notify.failure('Oops, there is a problem with the search.');
    } finally {
        loader.style.display = 'none';
    }
}

function displayCountries(countries) {
    clearResults();

    if (countries.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'No countries found.';
        countryList.appendChild(message);
        return;
    }

    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    }

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

function showError() {
    error.style.display = 'block';
}

function clearResults() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}


