import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const { token } = useContext(AuthContext);

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchStats = async () => {
    try {
      toast.info("Loading admin dashboard...");
      const res = await axios.get(
        "https://burnix-website.onrender.com/api/admin",
        authHeader
      );
      setStats(res.data);
      toast.dismiss();
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Failed to load admin stats");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatNumber = (num) =>
    typeof num === "number" ? num.toLocaleString() : "0";

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date) ? "" : date.toLocaleDateString();
  };

  if (!stats)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-muted">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="spinner-border text-primary me-2" role="status"></div>
        Loading dashboard...
      </div>
    );

  return (
    <div className="container py-4">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold">Dashboard</li>
          <li className="breadcrumb-item active" aria-current="page">
            Admin
          </li>
        </ol>
      </nav>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 h-100 bg-light">
            <div className="card-body text-center">
              <i className="bi bi-cash-stack display-6 text-success"></i>
              <h6 className="mt-2 text-muted">Total Donations</h6>
              <p className="fs-3 fw-bold text-success">
                ksh {formatNumber(stats.totalDonations)}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0 h-100 bg-light">
            <div className="card-body text-center">
              <i className="bi bi-people-fill display-6 text-info"></i>
              <h6 className="mt-2 text-muted">Total Donors</h6>
              <p className="fs-3 fw-bold text-info">{stats.totalDonors}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0 h-100 bg-light">
            <div className="card-body text-center">
              <i className="bi bi-megaphone display-6 text-warning"></i>
              <h6 className="mt-2 text-muted">Active Campaigns</h6>
              <p className="fs-3 fw-bold text-warning">{stats.totalCampaigns}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0 h-100 bg-light">
            <div className="card-body text-center">
              <i className="bi bi-calendar-check display-6 text-primary"></i>
              <h6 className="mt-2 text-muted">This Month</h6>
              <p className="fs-3 fw-bold text-primary">
                ksh {formatNumber(stats.monthlyAmount)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Donations */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">
            <i className="bi bi-cash-coin me-2"></i> Recent Donations
          </h5>
        </div>
        <div className="card-body">
          {stats.recentDonations?.length === 0 ? (
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
                  {stats.recentDonations?.map((donation, i) => (
                    <tr key={i}>
                      <td>{donation.donorName || "Anonymous"}</td>
                      <td>ksh {formatNumber(donation.amount)}</td>
                      <td>{donation.campaign || "-"}</td>
                      <td>{formatDate(donation.date)}</td>
                      <td>
                        <span
                          className={`badge bg-${
                            donation.status === "Completed"
                              ? "success"
                              : "warning"
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

      {/* Top Donors */}
      <div className="card shadow-sm">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">
            <i className="bi bi-trophy-fill me-2"></i> Top Donors
          </h5>
        </div>
        <div className="card-body">
          {stats.topDonors?.length === 0 ? (
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
                  {stats.topDonors?.map((donor, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{donor.name}</td>
                      <td>ksh {formatNumber(donor.totalAmount)}</td>
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
  );
};

export default AdminDashboard;
