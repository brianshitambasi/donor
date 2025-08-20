import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';

const BenDashboard = () => {
  const [donations, setDonations] 
  = useState([]);

  const [loading, setLoading] = useState('Loading your donations...');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [request, setRequest] = useState({
    item: '',
    quantity: '',
    notes: ''
  });
  const [requestMessage, setRequestMessage] = useState('');


  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://burnix-website.onrender.com/api/donations/assigned-to-me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDonations(res.data);
      setLoading('');
    } catch (err) {
      console.error(err);
      setLoading('');
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setRequestMessage('Sending request...');

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://burnix-website.onrender.com/api/beneficiary-requests', request, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequestMessage('Request submitted successfully!');
      setRequest({ item: '', quantity: '', notes: '' });
    } catch (err) {
      console.error(err);
      setRequestMessage('Failed to submit request.');
    }
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: 'linear-gradient(to right, #e6f0ff, #ffffff)',
        paddingBottom: '3rem',
      }}
    >
      <div className="container">
        <h2 className='text-center mb-4 text-primary fw-bold'>Beneficiary Dashboard</h2>

        {loading && <div className='alert alert-info'>{loading}</div>}

        <div className='text-center mb-4'>
          <button className='btn btn-outline-primary' onClick={() => setShowRequestForm(!showRequestForm)}>
            {showRequestForm ? 'Hide Request Form' : 'Request New Item'}
          </button>
        </div>

        {showRequestForm && (
          <div className='card p-4 mb-4 shadow-sm'>
            <h4 className='mb-3'>Request an Item</h4>
            <form onSubmit={handleRequestSubmit}>
              <div className='mb-3'>
                <label>Item Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='item'
                  value={request.item}
                  onChange={handleRequestChange}
                  required
                />
              </div>
              <div className='mb-3'>
                <label>Quantity</label>
                <input
                  type='number'
                  className='form-control'
                  name='quantity'
                  value={request.quantity}
                  onChange={handleRequestChange}
                  required
                />
              </div>
              <div className='mb-3'>
                <label>Additional Notes</label>
                <textarea
                  className='form-control'
                  name='notes'
                  value={request.notes}
                  onChange={handleRequestChange}
                  rows='3'
                />
              </div>
              <button type='submit' className='btn btn-success'>Submit Request</button>
              {requestMessage && <div className='mt-3 alert alert-info'>{requestMessage}</div>}
            </form>
          </div>
        )}

        {/* Assigned Donations */}
        <div className='row'>
          {donations.map((donation) => (
            <div className='col-md-6 mb-4' key={donation._id}>
              <div className='card shadow-sm border-left-primary'>
                <div className='card-body'>
                  <h5 className='card-title text-primary'>Donation: {donation.type}</h5>
                  <p><strong>Quantity:</strong> {donation.quantity}</p>
                  {donation.description && <p><strong>Description:</strong> {donation.description}</p>}
                  <p><strong>Status:</strong> 
                    <span className={`badge ms-2 bg-${donation.status === 'delivered' ? 'success' : donation.status === 'reserved' ? 'warning' : 'secondary'}`}>
                      {donation.status.toUpperCase()}
                    </span>
                  </p>
                  <small className='text-muted'>Assigned on: {new Date(donation.updatedAt).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenDashboard;
