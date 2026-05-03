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
  const currentRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_KEY}`
  );
  
  const forecastRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_KEY}`
  );

  if (!currentRes.ok || !forecastRes.ok) {
    throw new Error("Free API rejected the request");
  }

  const current = await currentRes.json();
  const forecast = await forecastRes.json();
  
  return { current, forecast };
};

export const fetchNews = async () => {
  const response = await fetch(
    `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${NYT_KEY}`
  );
  const data = await response.json();
  return data.results.slice(0, 5); 
};