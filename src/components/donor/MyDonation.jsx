import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchDonations = async () => {
    try {
      const res = await axios.get(
        "https://burnix-website.onrender.com/donation",
        authHeader
      );
      setDonations(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load donations");
    }
  };

  // ✅ DELETE Donation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donation?")) return;

    try {
      const res = await axios.delete(
        `https://burnix-website.onrender.com/donation/${id}`,
        authHeader
      );
      toast.success(res.data.message || "Donation deleted successfully");

      // refresh after delete
      setDonations(donations.filter((don) => don._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete donation");
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div className="container mt-3">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-success">
          <i className="bi bi-gift-fill me-2"></i> My Donations
        </h4>
        <button
          className="btn btn-success"
          onClick={() => navigate("/donor-dashboard/add-donation")}
        >
          <i className="bi bi-plus-circle me-1"></i> Add Donation
        </button>
      </div>

      {donations.length === 0 ? (
        <div className="alert alert-warning text-center">
          <i className="bi bi-exclamation-circle me-2"></i>No donations yet.
        </div>
      ) : (
        <div className="row g-3">
          {donations.map((donation) => (
            <div className="col-md-4" key={donation._id}>
              <div className="card shadow-sm h-100">
                {donation.photo ? (
                  <img
                    src={`https://burnix-website.onrender.com/${donation.photo}`}
                    alt="Donation"
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center bg-light"
                    style={{ height: "200px" }}
                  >
                    <i className="bi bi-image text-muted fs-1"></i>
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">
                    {donation.type}
                  </h5>
                  <p className="card-text small text-muted">
                    {donation.description}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-box-seam me-2 text-primary"></i>
                    <strong>Quantity:</strong> {donation.quantity}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-calendar-event me-2 text-secondary"></i>
                    {new Date(donation.date).toLocaleDateString()}
                  </p>
                  <span
                    className={`badge ${
                      donation.status === "available"
                        ? "bg-success"
                        : donation.status === "assigned"
                        ? "bg-warning"
                        : "bg-secondary"
                    }`}
                  >
                    {donation.status}
                  </span>
                </div>
                <div className="card-footer bg-white border-top-0 d-flex justify-content-end">
                  {/* ✅ Call delete function */}
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(donation._id)}
                  >
                    <i className="bi bi-trash me-1"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonations;
