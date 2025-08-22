import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get(
          "https://burnix-website.onrender.com/api/admin/donors",
          authHeader
        );
        setDonors(res.data || []);
      } catch (err) {
        console.error("Failed to fetch donors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-muted">
        <div className="spinner-border text-primary me-2" role="status"></div>
        Loading donors...
      </div>
    );

  return (
    <div className="container py-4">
      <h3 className="mb-4">All Donors</h3>
      {donors.length === 0 ? (
        <p className="text-muted">No donors available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Total Donated</th>
                <th>Last Donation</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{donor.name}</td>
                  <td>{donor.email}</td>
                  <td>{donor.totalAmount}</td>
                  <td>{new Date(donor.lastDonation).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Donors;
