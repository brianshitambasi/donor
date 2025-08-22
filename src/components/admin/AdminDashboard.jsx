import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const { token } = useContext(AuthContext);

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchStats = async () => {
    try {
      toast.info("Loading admin dashboard...");
      const res = await axios.get(
        "https://burnix-website.onrender.com/api/admin/dashboard",
        authHeader
      );
      setDashboard(res.data);
      toast.dismiss();
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.error || "Failed to load admin stats");
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

  if (!dashboard)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-muted">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="spinner-border text-primary me-2" role="status"></div>
        Loading dashboard...
      </div>
    );

  const { stats, recent } = dashboard;

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
                {formatNumber(stats.totalDonations)}
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
              <i className="bi bi-person-check-fill display-6 text-warning"></i>
              <h6 className="mt-2 text-muted">Active Users</h6>
              <p className="fs-3 fw-bold text-warning">{stats.activeUsers}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0 h-100 bg-light">
            <div className="card-body text-center">
              <i className="bi bi-hand-thumbs-up-fill display-6 text-primary"></i>
              <h6 className="mt-2 text-muted">Total Requests</h6>
              <p className="fs-3 fw-bold text-primary">
                {formatNumber(stats.totalRequests)}
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
          {recent.donations?.length === 0 ? (
            <p className="text-muted">No recent donations.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Donor</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.donations?.map((donation, i) => (
                    <tr key={i}>
                      <td>{donation.donor?.name || "Anonymous"}</td>
                      <td>{formatDate(donation.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Recent Requests */}
      <div className="card shadow-sm">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">
            <i className="bi bi-list-check me-2"></i> Recent Requests
          </h5>
        </div>
        <div className="card-body">
          {recent.requests?.length === 0 ? (
            <p className="text-muted">No requests yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Beneficiary</th>
                    <th>Donation</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.requests?.map((req, i) => (
                    <tr key={i}>
                      <td>{req.beneficiary?.name}</td>
                      <td>{req.donation?.type}</td>
                      <td>
                        <span
                          className={`badge bg-${
                            req.donation?.status === "completed"
                              ? "success"
                              : "warning"
                          }`}
                        >
                          {req.donation?.status}
                        </span>
                      </td>
                      <td>{formatDate(req.createdAt)}</td>
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
