import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddDonation = () => {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    type: "",
    quantity: "",
    description: "",
    photo: null,
  });
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
  };

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setForm({ ...form, photo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.info("Submitting donation...");
      const formData = new FormData();
      formData.append("type", form.type);
      formData.append("quantity", form.quantity);
      formData.append("description", form.description);
      if (form.photo) formData.append("photo", form.photo);

      const res = await axios.post(
        "https://burnix-website.onrender.com/donation",
        formData,
        authHeader
      );

      toast.success(res.data.message);
      navigate("/donor-dashboard/my-donation");
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to create donation");
    }
  };

  return (
    <div className="container mt-3">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="card shadow-sm p-4">
        <h4 className="text-success mb-3">
          <i className="bi bi-plus-circle me-2"></i> Add Donation
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Type</label>
            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., Food, Clothes, Medicine"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter quantity"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="form-control"
              rows="3"
              placeholder="Brief description of donation"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Photo (optional)</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            <i className="bi bi-check-circle me-2"></i> Submit Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDonation;
