export async function fetchCountries(name) {
  const response = await fetch(`https://restcountries.com/v2/name/${name}?fields=name.official,capital,population,flags.svg,languages`);
  if (!response.ok) {
      throw new Error('Failed to fetch countries');
  }
  const data = await response.json();
  return data;
}