import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("https://burnix-website.onrender.com/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching requests:", err);
      toast.error("Failed to load requests");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-50">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  return (
    <div className="container py-5">
      <ToastContainer />
      <h2 className="mb-4 fw-bold text-center">📋 Requests Dashboard</h2>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle table-striped">
          <thead className="table-dark">
            <tr>
              <th>Beneficiary</th>
              <th>Donation Type</th>
              <th>Quantity</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.beneficiary ? req.beneficiary.name : "N/A"}</td>
                <td>{req.donation ? req.donation.type : "N/A"}</td>
                <td>{req.quantity}</td>
                <td>{req.notes || "—"}</td>
                <td>
                  <span
                    className={`badge rounded-pill ${
                      req.status === "approved"
                        ? "bg-success"
                        : req.status === "rejected"
                        ? "bg-danger"
                        : "bg-warning text-dark"
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
    </div>
  );
};

export default Requests;
