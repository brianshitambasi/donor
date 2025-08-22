import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          "https://burnix-website.onrender.com/api/admin/requests",
          authHeader
        );
        setRequests(res.data || []);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-muted">
        <div className="spinner-border text-primary me-2" role="status"></div>
        Loading requests...
      </div>
    );

  return (
    <div className="container py-4">
      <h3 className="mb-4">All Requests</h3>
      {requests.length === 0 ? (
        <p className="text-muted">No requests available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Beneficiary</th>
                <th>Request Type</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, i) => (
                <tr key={i}>
                  <td>{req.beneficiary?.name}</td>
                  <td>{req.type}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        req.status === "completed" ? "success" : "warning"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Requests;
