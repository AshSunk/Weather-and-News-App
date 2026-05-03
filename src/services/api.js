const WEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const NYT_KEY = import.meta.env.VITE_NYT_KEY;

export const fetchCoordinates = async (location) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${WEATHER_KEY}`
  );
  const data = await response.json();
  if (!data || data.length === 0) throw new Error("Location not found");
  return { lat: data[0].lat, lon: data[0].lon, name: data[0].name };
};

export const fetchWeather = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${WEATHER_KEY}`
  );
  return await response.json();
};

export const fetchNews = async () => {
  const response = await fetch(
    `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${NYT_KEY}`
  );
  const data = await response.json();
  return data.results.slice(0, 5); 
};