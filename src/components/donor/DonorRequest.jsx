import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const DonorRequests = () => {
  const { token } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3002/api/donor/requests/my-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
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
        `http://localhost:3002/api/donor/requests/${id}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log(`✅ Request ${action} successful:`, res.data);
  
      // Optionally show success to the user
      alert(`Request ${action}d: ${res.data.message || "Success"}`);
  
      // refresh requests
      fetchRequests();
    } catch (err) {
      console.error(`Error while trying to ${action} request:`, err.response?.data || err.message);
      alert(`Error: Could not ${action} request`);
    }
  };
  

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p>Loading requests...</p>;

  if (requests.length === 0) return <p>No requests on your donations yet.</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold text-primary">Requests on My Donations</h2>
      <div className="row g-4">
        {requests.map((req) => (
          <div key={req._id} className="col-md-6 col-lg-4">
            <div className="card shadow-sm border-0 h-100 rounded-3">
              <div className="card-body d-flex flex-column">
                <h5 className="fw-bold text-success">{req.donation?.type}</h5>
                <p className="text-muted">{req.notes}</p>
                <p>
                  <strong>Beneficiary:</strong>{" "}
                  {req.beneficiary && typeof req.beneficiary === "object"
                    ? `${req.beneficiary.name} (${req.beneficiary.email})`
                    : req.beneficiary}
                </p>
                <p>
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
                {req.status === "pending" && (
                  <div className="mt-3 d-flex gap-2">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleAction(req._id, "approve")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleAction(req._id, "reject")}
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
