import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const { token } = useContext(AuthContext);

  const fetchDonations = async () => {
    try {
      const res = await axios.get("https://burnix-website.onrender.com/donation");
      setDonations(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching donations:", err);
      toast.error("Failed to load donations");
      setLoading(false);
    }
  };

  const makeRequest = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3002/api/requests/${selectedDonation._id}`,
        { quantity, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Request created successfully!");
      setSelectedDonation(null);
      setQuantity(1);
      setNotes("");
      fetchDonations();
    } catch (err) {
        console.log("error",err)
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to make request");
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  if (loading) return <p>Loading donations...</p>;

  return (
    <div className="container py-4">
      <ToastContainer />
      <h2 className="mb-4 fw-bold">Available Donations</h2>

      <div className="row g-4">
        {donations.map((donation) => (
          <div key={donation._id} className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              {donation.photo && (
                <img
                  src={`https://burnix-website.onrender.com/${donation.photo}`}
                  className="card-img-top"
                  alt={donation.type}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5>{donation.type}</h5>
                <p>{donation.description}</p>
                <p><strong>Quantity:</strong> {donation.quantity}</p>
                <p><strong>Status:</strong> {donation.status}</p>
                <button
                  className="btn btn-primary w-100 mt-2"
                  disabled={donation.status !== "available"}
                  onClick={() => setSelectedDonation(donation)}
                >
                  Make Request
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDonation && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Request {selectedDonation.type}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedDonation(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max={selectedDonation.quantity}
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Notes</label>
                  <textarea
                    className="form-control"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedDonation(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={makeRequest}>
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donations;
