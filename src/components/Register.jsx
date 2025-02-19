import React, { useState } from 'react';
import { register } from '../services/api';
import { TextField, Button, Card, Typography, Container, Box } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      setSuccess('Registration successful! You can now log in.');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Registration failed', error);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8 }}>
        <Card sx={{ padding: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Register
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
            {success && (
              <Typography color="primary" align="center">
                {success}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              color="text"
              fullWidth
              sx={{ marginTop: 1 }}
              onClick={() => window.location.href = '/'}
            >
              Back to Login
            </Button>
          </form>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;
