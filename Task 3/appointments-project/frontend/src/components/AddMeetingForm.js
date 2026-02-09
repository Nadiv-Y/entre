import React, { useState } from 'react';
import { 
  TextField, Button, Box, Typography, Snackbar, Alert 
} from '@mui/material';

const AddMeetingForm = ({ teamId, onAdd }) => {
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    description: '',
    room: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field on change
    if (fieldErrors[e.target.name]) {
        setFieldErrors({ ...fieldErrors, [e.target.name]: false });
    }
  };

  const validate = () => {
      const errors = {};
      let isValid = true;
      if (!formData.startTime) { errors.startTime = true; isValid = false; }
      if (!formData.endTime) { errors.endTime = true; isValid = false; }
      if (!formData.description) { errors.description = true; isValid = false; }
      if (!formData.room) { errors.room = true; isValid = false; }
      
      if (isValid && new Date(formData.endTime) <= new Date(formData.startTime)) {
          setSnackbar({ open: true, message: 'End time must be after start time', severity: 'error' });
          return false;
      }
      
      setFieldErrors(errors);
      return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await onAdd({ ...formData, teamId });
      setFormData({ startTime: '', endTime: '', description: '', room: '' });
      setFieldErrors({});
      setSnackbar({ open: true, message: 'Meeting added successfully', severity: 'success' });
    } catch (err) {
      const errorMsg = typeof err === 'string' ? err : (err.response?.data || 'Failed to add meeting');
      setSnackbar({ open: true, message: errorMsg, severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
      setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Add New Meeting</Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Start Time"
        type="datetime-local"
        name="startTime"
        InputLabelProps={{ shrink: true }}
        value={formData.startTime}
        onChange={handleChange}
        error={!!fieldErrors.startTime}
        helperText={fieldErrors.startTime && "Start time is required"}
      />
      <TextField
        fullWidth
        margin="normal"
        label="End Time"
        type="datetime-local"
        name="endTime"
        InputLabelProps={{ shrink: true }}
        value={formData.endTime}
        onChange={handleChange}
        error={!!fieldErrors.endTime}
        helperText={fieldErrors.endTime && "End time is required"}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={!!fieldErrors.description}
        helperText={fieldErrors.description && "Description is required"}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Room"
        name="room"
        value={formData.room}
        onChange={handleChange}
        error={!!fieldErrors.room}
        helperText={fieldErrors.room && "Room is required"}
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Schedule Meeting
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddMeetingForm;
