import React, { useState } from 'react';
import { Container, Typography, Box, Switch, FormControlLabel } from '@mui/material';

function Layout({ darkMode, toggleTheme }) {
    // We will store our API data here later so it can flow down to the Weather and News components
    const [coordinates, setCoordinates] = useState(null);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header Section */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h3" fontWeight="bold">
                    Weather & News Dashboard
                </Typography>

                {/* Stretch Goal: Light/Dark Mode Toggle */}
                <FormControlLabel
                    control={<Switch checked={darkMode} onChange={toggleTheme} />}
                    label={darkMode ? "Dark Mode" : "Light Mode"}
                />
            </Box>

            {/* Future Components will go here:
        <SearchBar />
        <WeatherDisplay />
        <NewsFeed />
      */}
            <Typography variant="body1" color="text.secondary">
                Enter a location to get started...
            </Typography>

        </Container>
    );
}

export default Layout;