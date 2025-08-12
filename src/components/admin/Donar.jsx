import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Prepare auth header
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };
// console.log(fetchDonors);
  const fetchDonors = async () => {
    try {
    
      toast.info('Loading donors...');
      const res=await axios.get('https://schoolapi-92n6.onrender.com/api/classroom',authHeader)
      setDonors(res.data);
      console.log(res.data);
      console.log(donors);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Failed to load donors');
    } 
  };

  useEffect(() => {
    fetchDonors();
  }, []);
// delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this donor?')) {
      try {
        toast.warning('Deleting donor...');
                      const res=await axios.delete(`https://schoolapi-92n6.onrender.com/api/classroom/${id}`,authHeader)

      toast.info(res.data.message);
      
        fetchDonors();
      } catch (error) {
        toast.dismiss();
        toast.error(error.response?.data?.message || 'Failed to delete donor');
      }
    }
  };
// handleEdit function
  const handleEdit = (donorData) => {
    navigate('/admin/donors/edit', { state: { donorData } });
  };

  return (
    <div className="container mt-2">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold">
            <Link to="/admin">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Donors
          </li>
        </ol>
      </nav>

      {/* Card */}
      <div className="card p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-success">
            <i className="bi bi-building me-2"></i>Donor Management
          </h5>

          <button
            className="btn btn-success"
            onClick={() => navigate('/admin-dashboard/donors/add')}
          >
            <i className="bi bi-plus-circle"></i> Add Donor
          </button>
        </div>

        {/* Donors list */}
        <div className="table-responsive">
          {donors.length ===0? (
            <div className="alert alert-warning text-center">
              <div className="bi bi-exclamation-circle me-2" >
                <i>No Donors Found !!</i>
              </div>
            </div>
          ) : donors.length === 0 ? (
            <div className="alert alert-info text-center">
              <i className="bi bi-info-circle me-2"></i>No Donors Found!
            </div>
          ) : (
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Donation Type</th>
                  <th>Total Donations</th>
                  <th>Last Donation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor, index) => (
                  <tr key={donor._id}>
                    <td>{index + 1}</td>
                    <td>{donor.name || 'N/A'}</td>
                    <td>{donor.email || 'N/A'}</td>
                    <td>{donor.phone || 'N/A'}</td>
                    <td>{donor.donationType || 'N/A'}</td>
                    <td>
                      $
                      {donor.totalDonations
                        ? donor.totalDonations.toFixed(2)
                        : '0.00'}
                    </td>
                    <td>
                      {donor.lastDonationDate
                        ? new Date(
                            donor.lastDonationDate
                          ).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(donor)}
                        title="Edit"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(donor._id)}
                        title="Delete"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Donors;
