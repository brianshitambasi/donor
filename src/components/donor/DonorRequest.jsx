import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const DonorRequests = () => {
  const { token } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3002/api/donor/requests/my-requests", // ✅ your backend for fetching requests
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequests(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching donor requests:", err);
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const res = await axios.put(
        `http://localhost:3002/api/requests/${id}/status`, // ✅ correct backend endpoint
        { status: action }, // send status in body
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message || `Request ${action}d successfully`);
      fetchRequests(); // refresh after action
    } catch (err) {
      console.error(`Error while trying to ${action} request:`, err);
      alert(`Error: Could not ${action} request`);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  if (requests.length === 0)
    return (
      <p className="text-center text-muted">
        No requests on your donations yet.
      </p>
    );

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold text-primary text-center">
        📦 Requests on My Donations
      </h2>

      <div className="row g-4">
        {requests.map((req) => (
          <div key={req._id} className="col-md-6 col-lg-4">
            <div className="card shadow-sm border-0 h-100 rounded-3">
              <div className="card-body d-flex flex-column">
                <h5 className="fw-bold text-success">{req.donation?.type}</h5>
                <p className="text-muted small mb-2">
                  {req.notes || "No notes provided"}
                </p>

                <p className="mb-1">
                  <strong>Beneficiary:</strong>{" "}
                  {req.beneficiary && typeof req.beneficiary === "object"
                    ? `${req.beneficiary.name} (${req.beneficiary.email})`
                    : req.beneficiary}
                </p>
                <p className="mb-1">
                  <strong>Quantity:</strong> {req.quantity}
                </p>
                <p className="mb-1">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      req.status === "pending"
                        ? "bg-warning text-dark"
                        : req.status === "approved"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>
                <p className="text-muted small">
                  Created: {new Date(req.createdAt).toLocaleDateString()}
                </p>

                {req.status === "pending" && (
                  <div className="mt-3 d-flex gap-2">
                    <button
                      className="btn btn-sm btn-success flex-fill"
                      onClick={() => handleAction(req._id, "approved")} // ✅ send approved
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger flex-fill"
                      onClick={() => handleAction(req._id, "rejected")} // ✅ send rejected
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorRequests;
