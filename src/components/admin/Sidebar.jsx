import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column p-3 vh-100 shadow"
      style={{
        width: "250px",
        background: "linear-gradient(135deg, rgb(79, 12, 62), rgb(152, 159, 54))",
      }}
    >
      {/* Logo / Title */}
      <div className="text-center mb-4">
        <i className="bi bi-speedometer2 fs-1 text-light"></i>
        <h4 className="fw-bold text-light mt-2">Admin Panel</h4>
      </div>

      <hr className="text-light" />

      {/* Navigation Links */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <NavLink
            to="/admin-dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-success text-light fw-bold rounded"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-grid me-2"></i> Dashboard
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/admin-dashboard/donors"
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-success text-light fw-bold rounded"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-person-lines-fill me-2"></i> Donors
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/admin-dashboard/requests"
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-success text-light fw-bold rounded"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-person-badge me-2"></i> Requests
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/admin-dashboard/donations"
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-success text-light fw-bold rounded"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-gift-fill me-2"></i> Donations
          </NavLink>
        </li>
      </ul>

      <hr className="text-light mt-auto" />

    
    </div>
  );
};

export default Sidebar;
