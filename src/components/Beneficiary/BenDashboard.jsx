import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";

const BenDashboard = () => {
  const [stats, setStats] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [request, setRequest] = useState({ item: "", quantity: "", notes: "" });
  const { token } = useContext(AuthContext);


  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchDashboard = async () => {
    try {
      // console.log("token",token)
      toast.info("Loading beneficiary dashboard...");
      const res = await axios.get(
        "https://burnix-website.onrender.com/api/beneficiaries/dash",
        authHeader
      );
      setStats(res.data.stats);
      toast.dismiss();
    } catch (err) {
      toast.dismiss();
      toast.error(
        err.response?.data?.message || "Failed to load beneficiary dashboard"
      );
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    toast.info("Submitting request...");

    try {
      await axios.post(
        "https://burnix-website.onrender.com/api/beneficiary-requests",
        request,
        authHeader
      );
      toast.dismiss();
      toast.success("Request submitted successfully!");
      setRequest({ item: "", quantity: "", notes: "" });
      fetchDashboard(); // refresh stats after request
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Failed to submit request");
    }
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
            Beneficiary
          </li>
        </ol>
      </nav>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 h-100 bg-light">
            <div className="card-body text-center">
              <i className="bi bi-journal-text display-6 text-warning"></i>
              <h6 className="mt-2 text-muted">Total Requests</h6>
              <p className="fs-3 fw-bold text-warning">{stats.totalRequests}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0 h-100 bg-light">
            <div className="card-body text-center">
              <i className="bi bi-hourglass-split display-6 text-secondary"></i>
              <h6 className="mt-2 text-muted">Pending Requests</h6>
              <p className="fs-3 fw-bold text-secondary">{stats.pendingRequests}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0 h-100 bg-light">
            <div className="card-body text-center">
              <i className="bi bi-gift-fill display-6 text-primary"></i>
              <h6 className="mt-2 text-muted">Assigned Donations</h6>
              <p className="fs-3 fw-bold text-primary">{stats.assignedDonations}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0 h-100 bg-light">
            <div className="card-body text-center">
              <i className="bi bi-check2-circle display-6 text-success"></i>
              <h6 className="mt-2 text-muted">Completed Donations</h6>
              <p className="fs-3 fw-bold text-success">{stats.completedDonations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Request Form Toggle */}
      <div className="text-center mb-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowRequestForm(!showRequestForm)}
        >
          {showRequestForm ? "Hide Request Form" : "Request New Item"}
        </button>
      </div>

      {/* Request Form */}
      {showRequestForm && (
        <div className="card p-4 mb-4 shadow-sm">
          <h4 className="mb-3">Request an Item</h4>
          <form onSubmit={handleRequestSubmit}>
            <div className="mb-3">
              <label>Item Name</label>
              <input
                type="text"
                className="form-control"
                name="item"
                value={request.item}
                onChange={handleRequestChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={request.quantity}
                onChange={handleRequestChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Additional Notes</label>
              <textarea
                className="form-control"
                name="notes"
                value={request.notes}
                onChange={handleRequestChange}
                rows="3"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit Request
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BenDashboard;
