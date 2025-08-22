import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get(
          "https://burnix-website.onrender.com/api/admin/donations",
          authHeader
        );
        setDonations(res.data || []);
      } catch (err) {
        console.error("Failed to fetch donations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-muted">
        <div className="spinner-border text-primary me-2" role="status"></div>
        Loading donations...
      </div>
    );

  return (
    <div className="container py-4">
      <h3 className="mb-4">All Donations</h3>
      {donations.length === 0 ? (
        <p className="text-muted">No donations available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Donor</th>
                <th>Amount</th>
                <th>Campaign</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, i) => (
                <tr key={i}>
                  <td>{donation.donor?.name || "Anonymous"}</td>
                  <td>{donation.amount}</td>
                  <td>{donation.campaign || "-"}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        donation.status === "Completed" ? "success" : "warning"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                  <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Donations;
