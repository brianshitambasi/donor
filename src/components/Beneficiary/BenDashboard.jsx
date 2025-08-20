import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Chip,
  CircularProgress,
  Avatar,
  Badge,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import {
  Search,
  FilterList,
  FavoriteBorder,
  ShoppingBasket,
  LocationOn,
  Person,
  CheckCircle
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { teal, orange, deepPurple, green } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: teal[500],
  '&:hover': {
    backgroundColor: teal[700],
  },
}));

const BenDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('/api/donations');
        setDonations(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch donations');
        setLoading(false);
        console.error('Error fetching donations:', err);
      }
    };

    fetchDonations();
  }, []);

  const handleRequestDonation = async (donationId) => {
    try {
      await axios.post('/api/requests', {
        donation: donationId,
        beneficiary: localStorage.getItem('userId'), // Assuming you store user ID
        status: 'pending'
      });
      alert('Request submitted successfully!');
    } catch (err) {
      console.error('Error requesting donation:', err);
      alert('Failed to submit request');
    }
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         donation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || donation.type === filterType;
    return matchesSearch && matchesFilter && donation.status === 'available';
  });

  const donationTypes = [...new Set(donations.map(d => d.type))];

  if (loading) return (
    <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <CircularProgress />
    </Container>
  );

  if (error) return (
    <Container sx={{ textAlign: 'center', mt: 4 }}>
      <Typography color="error">{error}</Typography>
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontWeight: 'bold', 
        color: teal[700],
        mb: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <ShoppingBasket fontSize="large" /> Available Donations
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Filter by Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter by Type"
              startAdornment={<FilterList sx={{ mr: 1, color: 'action.active' }} />}
            >
              <MenuItem value="all">All Types</MenuItem>
              {donationTypes.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {filteredDonations.length === 0 ? (
        <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
          No available donations matching your criteria
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {filteredDonations.map((donation) => (
            <Grid item key={donation._id} xs={12} sm={6} md={4}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3
                }
              }}>
                <Badge
                  overlap="rectangular"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  badgeContent={
                    <Chip 
                      label={donation.status} 
                      size="small" 
                      sx={{ 
                        backgroundColor: donation.status === 'available' ? green[500] : orange[500],
                        color: 'white',
                        fontWeight: 'bold'
                      }} 
                    />
                  }
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={donation.image || 'https://source.unsplash.com/random/300x200/?donation'}
                    alt={donation.type}
                  />
                </Badge>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {donation.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {donation.description}
                  </Typography>
                  <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <Chip 
                        icon={<Person />} 
                        label={`Qty: ${donation.quantity}`} 
                        variant="outlined"
                        sx={{ color: deepPurple[500] }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Chip 
                        icon={<LocationOn />} 
                        label={donation.donor?.address || 'N/A'} 
                        variant="outlined"
                        sx={{ color: teal[500] }}
                      />
                    </Grid>
                  </Grid>
                  <Typography variant="caption" display="block" sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: orange[700],
                    mb: 2
                  }}>
                    <CheckCircle fontSize="small" sx={{ mr: 0.5 }} /> 
                    Posted {new Date(donation.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardContent sx={{ pt: 0 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Avatar 
                        src={donation.donor?.image} 
                        sx={{ bgcolor: teal[100], color: teal[600] }}
                      >
                        {donation.donor?.name?.charAt(0) || 'D'}
                      </Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="subtitle2">
                        {donation.donor?.name || 'Anonymous Donor'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {donation.donor?.email || ''}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <ColorButton
                        variant="contained"
                        size="small"
                        startIcon={<FavoriteBorder />}
                        onClick={() => handleRequestDonation(donation._id)}
                      >
                        Request
                      </ColorButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BenDashboard;