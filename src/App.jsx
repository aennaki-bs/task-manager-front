import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Box, Button } from '@mui/material';
import Login from './components/Login';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Register from './components/Register';
import theme from './theme';
import './index.css'; // Import the CSS file

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    setToken(newToken);
  };
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="app-background">
        <Router>
          <Container maxWidth="lg">
            <Routes>
              <Route
                path="/"
                element={token ? <Navigate to="/tasks" /> : <Login onLogin={handleLogin} />}
              />
              <Route path="/register" element={<Register />} />
              <Route
                path="/tasks"
                element={
                  token ? (
                    <>
                      <Box sx={{ marginBottom: 4 }}>
                        <TaskForm onTaskCreated={() => window.location.reload()} />
                      </Box>
                      <TaskList />
                      <Button
                        onClick={handleLogout}
                        variant="contained"
                        color="primary"
                        sx={{
                          position: 'fixed',
                          top: 16,
                          right: 16,
                          padding: '10px 20px',
                          fontSize: '16px',
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
          </Container>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;