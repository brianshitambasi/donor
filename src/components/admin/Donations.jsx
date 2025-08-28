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

      console.log("Requests:", res.data);
      setRequests(res.data); // since API returns an array
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

  if (loading) return <p>Loading requests...</p>;

  return (
    <div className="container py-4">
      <ToastContainer />
      <h2 className="mb-4 fw-bold">All donations</h2>

      <table className="table table-striped table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Status</th>
            <th>Beneficiary</th>
            <th>Donation Type</th>
            <th>Quantity</th>
            <th>Notes</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.status}</td>
              <td>{req.beneficiary ? req.beneficiary.name : "N/A"}</td>
              <td>{req.donation ? req.donation.type : "N/A"}</td>
              <td>{req.quantity}</td>
              <td>{req.notes}</td>
              <td>{new Date(req.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
