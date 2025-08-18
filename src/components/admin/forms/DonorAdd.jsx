import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const DonorAdd = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    donationType: '',
    amount: '',
    lastDonationDate: ''
  });

  const authHeader = {
    headers: { Authorization: `Bearer ${user?.token}` }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.info("Adding donor...");
      const res = await axios.post(
        'https://burnix-website.onrender.com/api/donors', 
        formData, 
        authHeader
      );
      toast.success(res.data?.message || 'Donor added successfully');
      navigate('/admin/donors'); // Redirect to donors list after success
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding donor');
    }
  };

  return (
    <div className='container mt-2'>
      <ToastContainer position='top-right' autoClose={3000} />

      <nav aria-label='breadcrumb' className='mb-3'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item fw-bold'><Link to='/admin'>Dashboard</Link></li>
          <li className='breadcrumb-item fw-bold'><Link to='/admin/donors'>Donors</Link></li>
          <li className='breadcrumb-item active'>Add Donor</li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className='text-success'>
            <i className='bi bi-person-plus me-2'></i> Add New Donor
          </h5>

          <Link className='btn btn-success' to='/admin/donors'>
            <i className='bi bi-arrow-left-circle-fill me-2'></i>Back
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-md-6 mb-3'>
              <input 
                type="text" 
                className='form-control' 
                placeholder='Full Name' 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>

            <div className='col-md-6 mb-3'>
              <input 
                type="email" 
                className='form-control' 
                placeholder='Email' 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            <div className='col-md-6 mb-3'>
              <input 
                type="tel" 
                className='form-control' 
                placeholder='Phone Number' 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required 
              />
            </div>

            <div className='col-md-6 mb-3'>
              <input 
                type="text" 
                className='form-control' 
                placeholder='Address' 
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className='col-md-6 mb-3'>
              <input 
                type="text" 
                className='form-control' 
                placeholder='City' 
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className='col-md-6 mb-3'>
              <input 
                type="text" 
                className='form-control' 
                placeholder='State' 
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className='col-md-6 mb-3'>
              <select
                className='form-control'
                name="donationType"
                value={formData.donationType}
                onChange={handleChange}
              >
                <option value="">Select Donation Type</option>
                <option value="food">Food</option>
                <option value="clothes">Clothes</option>
                <option value="money">Money</option>
                <option value="medicines">Medicines</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className='col-md-6 mb-3'>
              <input 
                type="number" 
                className='form-control' 
                placeholder='Amount (if applicable)' 
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="1"
              />
            </div>

            <div className='col-md-6 mb-3'>
              <input 
                type="date" 
                className='form-control' 
                name="lastDonationDate"
                value={formData.lastDonationDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type='submit' className='btn btn-success'>
            <i className='bi bi-save me-2'></i>Save Donor
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorAdd;