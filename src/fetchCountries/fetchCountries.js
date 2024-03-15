export async function fetchCountries(name) {
  const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,flags/{name},{flags}`);
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }
  const data = await response.json();
  return data;
}