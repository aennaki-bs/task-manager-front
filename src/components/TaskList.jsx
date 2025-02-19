import React, { useState, useEffect } from 'react';
import { fetchTasks, deleteTask, updateTask } from '../services/api';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  Box,
  Divider,
  TextField,
  Button,
  Fab,
  Switch,
  FormControlLabel,
  Collapse,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null); // Holds task object currently being edited
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [editCompleted, setEditCompleted] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(null); // Track which task is expanded

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetchTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  // Toggle completion using the check icon
  const handleComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (taskToUpdate) {
        const updatedTask = { 
          ...taskToUpdate, 
          isCompleted: !taskToUpdate.isCompleted 
        };
        await updateTask(id, updatedTask);
        loadTasks();
      }
    } catch (error) {
      console.error('Error updating task status', error);
      setError('Failed to update task status');
    }
  };

  // When clicking edit, set the editing state
  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStartDate(task.startDate || '');
    setEditEndDate(task.endDate || '');
    setEditCompleted(task.isCompleted);
  };

  // Save the edited task
  const handleSaveEdit = async (id) => {
    try {
      const updatedData = { 
        title: editTitle, 
        description: editDescription, 
        startDate: editStartDate,
        endDate: editEndDate,
        isCompleted: editCompleted 
      };
      await updateTask(id, updatedData);
      setEditingTask(null);
      loadTasks();
    } catch (error) {
      console.error('Error updating task', error);
      setError('Failed to update task');
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Toggle task details visibility
  const toggleTaskDetails = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error('Error deleting task', error);
      setError('Failed to delete task');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Task List
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <Box
          sx={{
            maxHeight: '70vh',
            overflow: 'auto',
            padding: 2,
            background: 'linear-gradient(45deg, #f5f7fa, #c3cfe2)',
            borderRadius: 2,
          }}
        >
          <List>
            {tasks.map((task, index) => (
              <React.Fragment key={task.id}>
                <Card
                  sx={{
                    marginBottom: 2,
                    boxShadow: 3,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <ListItem>
                      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => toggleTaskDetails(task.id)}>
                          {expandedTaskId === task.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                        <ListItemText
                          primary={task.title}
                          sx={{ cursor: 'pointer' }}
                          onClick={() => toggleTaskDetails(task.id)}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          onClick={() => handleComplete(task.id)}
                          sx={{ color: task.isCompleted ? 'green' : 'blue' }}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                        <IconButton onClick={() => handleEditClick(task)} sx={{ color: 'gray' }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(task.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                    <Collapse in={expandedTaskId === task.id}>
                      {editingTask && editingTask.id === task.id ? (
                        <>
                          <TextField
                            fullWidth
                            label="Title"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            margin="normal"
                          />
                          <TextField
                            fullWidth
                            label="Description"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            margin="normal"
                          />
                          <TextField
                            fullWidth
                            label="Start Date"
                            type="date"
                            value={editStartDate}
                            onChange={(e) => setEditStartDate(e.target.value)}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                          />
                          <TextField
                            fullWidth
                            label="End Date"
                            type="date"
                            value={editEndDate}
                            onChange={(e) => setEditEndDate(e.target.value)}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={editCompleted}
                                onChange={(e) => setEditCompleted(e.target.checked)}
                                color="primary"
                              />
                            }
                            label="Completed"
                            sx={{ mt: 1 }}
                          />
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <Button variant="contained" color="primary" onClick={() => handleSaveEdit(task.id)} sx={{ mr: 1 }}>
                              Save
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>
                              Cancel
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <Box sx={{ pl: 4 }}>
                          <Typography variant="body2" color="text.secondary">
                            Description: {task.description}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Start Date: {new Date(task.startDate).toLocaleDateString('en-GB')}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            End Date: {new Date(task.endDate).toLocaleDateString('en-GB')}
                          </Typography>
                        </Box>
                      )}
                    </Collapse>
                  </CardContent>
                </Card>
                {index < tasks.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}
      <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Fab color="primary" aria-label="add" onClick={() => {/* Open task form */}}>
          <AddIcon />
        </Fab>
      </Box>
    </Container>
  );
};

export default TaskList;