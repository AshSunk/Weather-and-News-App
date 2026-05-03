import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input); // This is the exact function App.jsx is passing down
      setInput('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 4 }}>
      <TextField 
        label="Enter City or Zip Code" 
        variant="outlined" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ width: '300px' }}
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
}