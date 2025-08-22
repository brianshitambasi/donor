import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const BenRequest = () => {
  const { token } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRequests = async () => {
    try {
      const res = await axios.get("https://burnix-website.onrender.com/requests/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching my requests:", err);
      setLoading(false);
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
      <h2 className="mb-4 fw-bold text-primary">
        <i className="bi bi-list-check me-2"></i> My Requests
      </h2>

      <div className="row g-4">
        {requests.map((req) => (
          <div key={req._id} className="col-md-6 col-lg-4">
            <div className="card shadow-sm border-0 h-100 rounded-3">
              <div className="card-body d-flex flex-column">
                <h5 className="fw-bold text-success">
                  {req.donation ? req.donation.type : "Donation Removed"}
                </h5>
                <p className="text-muted small mb-2">
                  {req.donation ? req.donation.description : "No description available"}
                </p>

                <ul className="list-unstyled flex-grow-1">
                  <li className="mb-1">
                    <i className="bi bi-box-seam me-2 text-primary"></i>
                    <strong>Quantity:</strong> {req.quantity}
                  </li>
                  <li className="mb-1">
                    <i className="bi bi-sticky me-2 text-warning"></i>
                    <strong>Notes:</strong> {req.notes || "None"}
                  </li>
                  <li className="mb-1">
                    <i className="bi bi-calendar me-2 text-secondary"></i>
                    <strong>Requested On:</strong>{" "}
                    {new Date(req.createdAt).toLocaleDateString()}
                  </li>
                </ul>

                <span
                  className={`badge align-self-start px-3 py-2 rounded-pill ${
                    req.donation ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {req.donation ? "Active" : "Unavailable"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenRequest;
