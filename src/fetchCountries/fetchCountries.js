export async function fetchCountries(name) {
  const url = `https://restcountries.com/v2/name/${name}?fields=name.official,capital,population,flags.svg,languages`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
}