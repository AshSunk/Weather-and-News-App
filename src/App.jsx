import { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress } from '@mui/material';
import { fetchCoordinates, fetchWeather, fetchNews } from './services/api';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import NewsCard from './components/NewsCard';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInitialNews = async () => {
      try {
        const news = await fetchNews();
        setNewsData(news);
      } catch (err) {
        console.error(err);
      }
    };
    loadInitialNews();
  }, []);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    setError("");
    try {
      const { lat, lon } = await fetchCoordinates(searchTerm);
      const weather = await fetchWeather(lat, lon);
      setWeatherData(weather);
    } catch (err) {
      setError("Could not find weather for that location.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Weather & News Dashboard
      </Typography>

      <SearchBar onSearch={handleSearch} />
      
      {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          {weatherData ? (
            <WeatherDisplay weatherData={weatherData} />
          ) : (
            <Typography>Search for a city to see the weather.</Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>Top Stories</Typography>
          {newsData.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;