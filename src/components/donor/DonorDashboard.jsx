import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DonorDashboard = () => {
  const [stats, setStats] = useState(null);
  const { token } = useContext(AuthContext);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchDashboard = async () => {
    try {
      toast.info("Loading dashboard stats...");
      const res = await axios.get(
        "https://burnix-website.onrender.com/donor/dash",
        authHeader
      );
      setStats(res.data.stats);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(
        error.response?.data?.message || "Failed to load dashboard stats"
      );
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!stats)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-muted">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="spinner-border text-primary me-2" role="status"></div>
        Loading dashboard...
      </div>
    );

  return (
    <div className="container py-4" >
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold">Dashboard</li>
          <li className="breadcrumb-item active" aria-current="page">
            Donor
          </li>
        </ol>
      </nav>

      {/* Stats Cards */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 bg-light">
            <div className="card-body text-center">
              <i className="bi bi-box-seam display-6 text-primary"></i>
              <h6 className="mt-2 text-muted">Total Donations</h6>
              <p className="fs-3 fw-bold text-primary">
                {stats.totalDonations}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 bg-light">
            <div className="card-body text-center">
              <i className="bi bi-bag-check-fill display-6 text-success"></i>
              <h6 className="mt-2 text-muted">Available Donations</h6>
              <p className="fs-3 fw-bold text-success">
                {stats.availableDonations}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 bg-light">
            <div className="card-body text-center">
              <i className="bi bi-person-lines-fill display-6 text-warning"></i>
              <h6 className="mt-2 text-muted">Assigned Donations</h6>
              <p className="fs-3 fw-bold text-warning">
                {stats.assignedDonations}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100 bg-light">
            <div className="card-body text-center">
              <i className="bi bi-check-circle-fill display-6 text-info"></i>
              <h6 className="mt-2 text-muted">Completed Donations</h6>
              <p className="fs-3 fw-bold text-info">
                {stats.completedDonations}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100 bg-muted">
            <div className="card-body text-center">
              <i className="bi bi-journal-text display-6 text-secondary"></i>
              <h6 className="mt-2 text-muted">Total Requests</h6>
              <p className="fs-3 fw-bold text-secondary">
                {stats.totalRequests}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
