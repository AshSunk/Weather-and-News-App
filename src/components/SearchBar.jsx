import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';

function SearchBar({ setCoordinates, setLocationName }) {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLoading(true);
        setError(null);

        try {
            // Pulling the hidden key from our .env file
            const API_KEY = import.meta.env.VITE_WEATHER_KEY;

            // The Geocoding API converts a city name/zip into Lat and Lon
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(input)}&limit=1&appid=${API_KEY}`);

            if (!response.ok) {
                throw new Error(`Geocoding Error: ${response.status}`);
            }

            const data = await response.json();

            if (data.length === 0) {
                throw new Error("Location not found. Please try a valid city or zip code.");
            }

            // Extract the data we need
            const locationData = data[0];

            // Pass the data UP the component tree to the parent (Layout.jsx)
            setCoordinates({ lat: locationData.lat, lon: locationData.lon });
            setLocationName(`${locationData.name}${locationData.state ? `, ${locationData.state}` : ''}`);

            // Clear the input bar
            setInput('');

        } catch (err) {
            console.error("Geocoding failed:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSearch} sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter City or Zip Code"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading || !input.trim()}
                    sx={{ minWidth: '120px' }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
                </Button>
            </Box>

            {error && (
                <Typography color="error" variant="body2">
                    {error}
                </Typography>
            )}
        </Box>
    );
}

export default SearchBar;