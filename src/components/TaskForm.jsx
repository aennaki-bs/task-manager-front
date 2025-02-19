import React, { useState } from 'react';
import { createTask } from '../services/api';
import { TextField, Button, Card, Typography, Container, Box, FormControlLabel, Switch } from '@mui/material';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [startDate, setStartDate] = useState(''); // New state for start date
  const [endDate, setEndDate] = useState('');     // New state for end date
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure the dates are in ISO format (e.g., "2025-02-18")
      const taskData = { 
        title, 
        description, 
        isComplete, 
        startDate, 
        endDate 
      };
      console.log('Task data being sent:', taskData);
      await createTask(taskData);
      setTitle('');
      setDescription('');
      setIsComplete(false);
      setStartDate('');
      setEndDate('');
      onTaskCreated();
    } catch (error) {
      console.error('Error creating task', error);
      setError('Failed to create task');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 2 }}>
        <Card sx={{ padding: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Create Task
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              margin="normal"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              margin="normal"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
            {/* Optionally, add a switch for isComplete */}
            <FormControlLabel
              control={
                <Switch
                  checked={isComplete}
                  onChange={(e) => setIsComplete(e.target.checked)}
                  color="primary"
                />
              }
              label="Mark as Complete"
            />
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Add Task
            </Button>
          </form>
        </Card>
      </Box>
    </Container>
  );
};

export default TaskForm;
