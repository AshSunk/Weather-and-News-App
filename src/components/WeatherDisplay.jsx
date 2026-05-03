import { Typography, Card, CardContent, List, ListItem, ListItemText, Grid } from '@mui/material';

export default function WeatherDisplay({ weatherData }) {
  const { current, hourly, daily } = weatherData;

  return (
    <div>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5">Current Weather</Typography>
          <Typography variant="h3">{Math.round(current.temp)}°F</Typography>
          <img
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
            alt={current.weather[0].description}
          />
          <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
            {current.weather[0].description}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>Hourly Forecast (Next 24h)</Typography>
      <List sx={{ maxHeight: 300, overflow: 'auto', mb: 3 }}>
        {hourly.slice(0, 24).map((hour, index) => (
          <ListItem key={index} divider>
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              alt={hour.weather[0].description}
            />
            <ListItemText
              primary={`${new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              secondary={`${Math.round(hour.temp)}°F - ${hour.weather[0].description}`}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" gutterBottom>7-Day Forecast</Typography>
      <Grid container spacing={2}>
        {daily.slice(0, 7).map((day, index) => (
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
                <Typography variant="body2">High: {Math.round(day.temp.max)}°F</Typography>
                <Typography variant="body2">Low: {Math.round(day.temp.min)}°F</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}