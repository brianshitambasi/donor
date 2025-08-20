// src/components/Beneficiary/BenLayout.jsx
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const BenLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        <nav className="col-md-3 col-lg-2 bg-success text-white p-3">
          <h3 className="mb-4">Beneficiary Panel</h3>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="/Beneficiary-dashboard" className="nav-link text-white">
                Dashboard
              </Link>
            </li>
            <li className="nav-item mt-4">
              <button
                className="btn btn-outline-light w-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
        <main className="col-md-9 col-lg-10 p-4 bg-light">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BenLayout;
