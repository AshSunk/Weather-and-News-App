import { Typography, Card, CardContent, List, ListItem, ListItemText, Grid } from '@mui/material';

export default function WeatherDisplay({ weatherData }) {
  const { current, forecast } = weatherData;

  // Safety check
  if (!current || !forecast) {
    return <Typography color="error">Data format error. Please check the console.</Typography>;
  }

  // The free API gives 3-hour chunks. We take the next 8 to equal 24 hours.
  const hourlyData = forecast.list.slice(0, 8);
  
  // To get "daily" data from the 3-hour list, we filter for a specific time of day (e.g., noon)
  const dailyData = forecast.list.filter(item => item.dt_txt.includes('12:00:00'));

  return (
    <div>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5">Current Weather: {current.name}</Typography>
          <Typography variant="h3">{Math.round(current.main.temp)}°F</Typography>
          <img
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
            alt={current.weather[0].description}
          />
          <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
            {current.weather[0].description}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>Forecast (Next 24h)</Typography>
      <List sx={{ maxHeight: 300, overflow: 'auto', mb: 3 }}>
        {hourlyData.map((hour, index) => (
          <ListItem key={index} divider>
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              alt={hour.weather[0].description}
            />
            <ListItemText
              primary={`${new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              secondary={`${Math.round(hour.main.temp)}°F - ${hour.weather[0].description}`}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" gutterBottom>5-Day Forecast</Typography>
      <Grid container spacing={2}>
        {dailyData.map((day, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">
                  {new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                </Typography>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                />
                <Typography variant="body2">Temp: {Math.round(day.main.temp)}°F</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}