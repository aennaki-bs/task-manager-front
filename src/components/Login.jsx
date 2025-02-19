import React, { useState } from 'react';
import { login } from '../services/api';
import { setAuthToken } from '../services/api';
import { TextField, Button, Card, Typography, Container, Box } from '@mui/material';
// import backgroundImage from '../assets/adnia-scaled.webp'; // Import your image

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      const token = response.data.token;
      localStorage.setItem('token', token); // Store the token
      setAuthToken(token); // Set the token in Axios headers
      onLogin(token); // Notify the app that the user is authenticated
    } catch (error) {
      console.error('Login failed', error);
      setError('Invalid username or password');
    }
  };  

  return (
    <Container 
      maxWidth="sm" 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <Card sx={{ padding: 4, backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>

            {/* Registration button */}
            <Button
              variant="outlined"
              color="text"
              fullWidth
              sx={{ marginTop: 1 }}
              onClick={() => window.location.href = '/register'}
            >
              Register
            </Button>
          </form>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
