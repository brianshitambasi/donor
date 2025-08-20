import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Paper,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const statusOptions = ['available', 'reserved', 'delivered'];

const DonorEdit = () => {
  const { id } = useParams(); // Assumes route like /donations/edit/:id

  const [form, setForm] = useState({
    type: '',
    quantity: '',
    description: '',
    status: 'available',
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch donation data
  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const res = await axios.get(`https://burnix-website.onrender.com/api/donations/${id}`);
        const data = res.data;
        setForm({
          type: data.type,
          quantity: data.quantity,
          description: data.description || '',
          status: data.status || 'available',
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch donation:', err);
        setLoading(false);
      }
    };

    fetchDonation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.put(`/api/donations/${id}`, form);
      alert('Donation updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update donation');
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #1d976c, #93f9b9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper elevation={8} sx={{ p: 4, maxWidth: 500, width: '100%' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1d976c' }}>
          Edit Donation
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Donation Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />

          <TextField
            label="Status"
            name="status"
            select
            value={form.status}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: '#1d976c',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#168f5c',
              },
            }}
            disabled={submitting}
          >
            {submitting ? 'Saving...' : 'Update Donation'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default DonorEdit;
