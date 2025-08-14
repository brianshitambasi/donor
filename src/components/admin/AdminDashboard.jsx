import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalDonors: 0,
    totalCampaigns: 0,
    monthlyAmount: 0,
    recentDonations: [],
    topDonors: []
  });

  const { token } = useContext(AuthContext);

  const authHeader = {
    headers: { Authorization: `Bearerksh{token}` }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        'https://schoolapi-92n6.onrender.com/api/admindash/',
        authHeader
      );
      // Ensure all fields exist and have defaults
      setStats({
        totalDonations: res.data.totalDonations ?? 0,
        totalDonors: res.data.totalDonors ?? 0,
        totalCampaigns: res.data.totalCampaigns ?? 0,
        monthlyAmount: res.data.monthlyAmount ?? 0,
        recentDonations: Array.isArray(res.data.recentDonations)
          ? res.data.recentDonations
          : [],
        topDonors: Array.isArray(res.data.topDonors)
          ? res.data.topDonors
          : []
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Helper to format numbers safely
  const formatNumber = (num) =>
    typeof num === 'number' ? num.toLocaleString() : '0';

  // Helper to format dates safely
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date) ? '' : date.toLocaleDateString();
  };

  return (
    <div className="container my-2" backgroundColor="#fb8f9fa">
      <h2 className="text-center text-success mb-2">
        Donation Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {/* Total Donations */}
        <div className="col">
          <div className="card h-100 shadow-lg rounded-4 bg-light hover-card">
            <div className="card-body text-center">
              <div className="icon-circle bg-primary text-white mb-3">
                <i className="bi bi-cash-stack fs-3"></i>
              </div>
              <h6 className="text-muted">Total Donations</h6>
              <h2 className="fw-bold text-dark">
               ksh <br />{formatNumber(stats.totalDonations)}
              </h2>
            </div>
          </div>
        </div>

        {/* Total Donors */}
        <div className="col">
          <div className="card h-100 shadow-lg rounded-4 bg-light hover-card">
            <div className="card-body text-center">
              <div className="icon-circle bg-info text-white mb-3">
                <i className="bi bi-people-fill fs-3"></i>
              </div>
              <h6 className="text-muted">Total Donors</h6>
              <h2 className="fw-bold text-dark">{stats.totalDonors}</h2>
            </div>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="col">
          <div className="card h-100 shadow-lg rounded-4 bg-light hover-card">
            <div className="card-body text-center">
              <div className="icon-circle bg-warning text-white mb-3">
                <i className="bi bi-megaphone fs-3"></i>
              </div>
              <h6 className="text-muted">Active Campaigns</h6>
              <h2 className="fw-bold text-dark">{stats.totalCampaigns}</h2>
            </div>
          </div>
        </div>

        {/* Monthly Amount */}
        <div className="col">
          <div className="card h-100 shadow-lg rounded-4 bg-light hover-card">
            <div className="card-body text-center">
              <div className="icon-circle bg-success text-white mb-3">
                <i className="bi bi-calendar-check fs-3"></i>
              </div>
              <h6 className="text-muted">This Month</h6>
              <h2 className="fw-bold text-dark">
               ksh <br />{formatNumber(stats.monthlyAmount)}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Donations */}
      <div className="mt-5">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white">
            <h5>
              <i className="bi bi-cash-coin me-2"></i> Recent Donations
            </h5>
          </div>
          <div className="card-body">
            {stats.recentDonations.length === 0 ? (
              <p className="text-muted">No recent donations.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Donor</th>
                      <th>Amount</th>
                      <th>Campaign</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentDonations.map((donation, index) => (
                      <tr key={index}>
                        <td>{donation.donorName || ''}</td>
                        <td>${formatNumber(donation.amount)}</td>
                        <td>{donation.campaign || ''}</td>
                        <td>{formatDate(donation.date)}</td>
                        <td>
                          <span
                            className={`badge bg-${
                              donation.status === 'Completed'
                                ? 'success'
                                : 'warning'
                            }`}
                          >
                            {donation.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Donors */}
      <div className="mt-4 mb-5">
        <div className="card shadow-lg">
          <div className="card-header bg-info text-white">
            <h5>
              <i className="bi bi-trophy-fill me-2"></i> Top Donors
            </h5>
          </div>
          <div className="card-body">
            {stats.topDonors.length === 0 ? (
              <p className="text-muted">No donor data available.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Donor</th>
                      <th>Total Donated</th>
                      <th>Last Donation</th>
                      <th>Donations Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.topDonors.map((donor, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{donor.name || ''}</td>
                        <td>${formatNumber(donor.totalAmount)}</td>
                        <td>{formatDate(donor.lastDonation)}</td>
                        <td>{donor.donationCount ?? 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
