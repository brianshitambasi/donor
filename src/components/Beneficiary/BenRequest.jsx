import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BenRequest = () => {
  const [donations, setDonations] = useState([]);
  const [requestedIds, setRequestedIds] = useState([]);
  const { token } = useContext(AuthContext);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch all donations
  const fetchDonations = useCallback(async () => {
    try {
      toast.info("Loading available donations...");
      const res = await axios.get(
        "https://burnix-website.onrender.com/api/donation", // ✅ corrected endpoint
        authHeader
      );
      setDonations(res.data);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(
        error.response?.data?.message || "Failed to load donations"
      );
    }
  }, [authHeader]);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  // Send request
  const handleRequest = async (donationId) => {
    if (requestedIds.includes(donationId)) {
      toast.warning("You have already requested this product.");
      return;
    }

    // Ask beneficiary for quantity & notes
    const quantity = prompt("Enter quantity you need:");
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    const notes = prompt("Any notes for this request? (optional)") || "";

    try {
      toast.info("Sending request...");
      await axios.post(
        "https://burnix-website.onrender.com/api/requests", // ✅ corrected endpoint
        { donation: donationId, quantity: Number(quantity), notes },
        authHeader
      );

      setRequestedIds((prev) => [...prev, donationId]);
      toast.dismiss();
      toast.success("Request sent successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error(
        error.response?.data?.message || "Failed to send request"
      );
    }
  };

  return (
    <div className="container mt-3">
      <ToastContainer position="top-right" autoClose={3000} />

      <h4 className="fw-bold text-primary mb-4">
        <i className="bi bi-box-seam me-2"></i>Available Donations
      </h4>

      {donations.length === 0 ? (
        <div className="alert alert-warning text-center">
          <i className="bi bi-exclamation-circle me-2"></i>
          No donations available right now.
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
                    {donation.description || "No description available"}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-box-seam me-2 text-primary"></i>
                    <strong>Quantity:</strong> {donation.quantity}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-person-fill me-2 text-secondary"></i>
                    Donor: {donation.donor?.name || "Unknown"}
                  </p>
                  <span
                    className={`badge ${
                      donation.status === "available"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {donation.status?.toUpperCase()}
                  </span>
                </div>

                <div className="card-footer bg-white border-top-0 d-flex justify-content-end">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    disabled={
                      donation.status !== "available" ||
                      requestedIds.includes(donation._id)
                    }
                    onClick={() => handleRequest(donation._id)}
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    {requestedIds.includes(donation._id)
                      ? "Requested"
                      : "Add Request"}
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

export default BenRequest;
