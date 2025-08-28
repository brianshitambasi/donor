import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BenRequest = () => {
  const { token } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRequests = async () => {
    try {
      const res = await axios.get(
        "https://burnix-website.onrender.com/requests/my",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequests(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching my requests:", err);
      toast.error("Failed to fetch your requests");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this request?")) return;
    try {
      await axios.delete(`https://burnix-website.onrender.com/requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(requests.filter((r) => r._id !== id));
      toast.success("Request cancelled successfully");
    } catch (err) {
      console.error("Error deleting request:", err);
      toast.error("Failed to cancel request");
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 fw-semibold">Loading your requests...</p>
      </div>
    );

  if (requests.length === 0)
    return (
      <div className="alert alert-info text-center mt-4">
        <i className="bi bi-inbox me-2"></i>
        You haven’t made any requests yet.
      </div>
    );

  return (
    <div className="container py-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="mb-4 fw-bold text-primary">
        <i className="bi bi-list-check me-2"></i> My Requests
      </h2>

      <div className="row g-4">
        {requests.map((req) => (
          <div key={req._id} className="col-md-6 col-lg-4">
            <div className="card shadow-sm border-0 h-100 rounded-3">
              <div className="card-body">
                <h5 className="fw-bold text-success">
                  <i className="bi bi-gift-fill me-2"></i>
                  {req.donation ? req.donation.type : "Donation Removed"}
                </h5>

                <p className="text-muted small">
                  {req.donation
                    ? req.donation.description
                    : "No description available"}
                </p>

                <form className="mt-3">
                  <div className="mb-2">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-box-seam me-2 text-primary"></i>{" "}
                      Quantity
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={req.quantity}
                      disabled
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-sticky me-2 text-warning"></i> Notes
                    </label>
                    <textarea
                      className="form-control"
                      value={req.notes || "None"}
                      disabled
                      rows="2"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-calendar-event me-2 text-secondary"></i>
                      Requested On
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={new Date(req.createdAt).toLocaleDateString()}
                      disabled
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-flag me-2 text-info"></i>Status
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        req.status === "approved"
                          ? "text-success"
                          : req.status === "rejected"
                          ? "text-danger"
                          : "text-warning"
                      }`}
                      value={req.status || "pending"}
                      disabled
                    />
                  </div>
                </form>
              </div>

              <div className="card-footer bg-white border-0 d-flex justify-content-end">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(req._id)}
                >
                  <i className="bi bi-trash me-1"></i> Cancel Request
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenRequest;
