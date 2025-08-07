import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

const Sidebar = () => {
  return (
    <div
      className="text-white flex flex-col p-3 h-screen"
      style={{
        width: '250px',
        background: 'linear-gradient(135deg, rgb(12,79,46), rgb(54,66,159))',
      }}
    >
      <h4 className="text-center mb-4">
        <i className="bi bi-heart-fill me-3"></i>DonorSync
      </h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? 'nav-link bg-green-500 text-white font-bold'
                : 'nav-link text-white'
            }
          >
            <i className="bi bi-grid me-2"></i>Home
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/donors"
            end
            className={({ isActive }) =>
              isActive
                ? 'nav-link bg-green-500 text-white font-bold'
                : 'nav-link text-white'
            }
          >
            <i className="bi bi-person-badge me-2"></i>Donors
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/volunteers"
            end
            className={({ isActive }) =>
              isActive
                ? 'nav-link bg-green-500 text-white font-bold'
                : 'nav-link text-white'
            }
          >
            <i className="bi bi-journal-bookmark me-2"></i>Volunteers
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/users"
            end
            className={({ isActive }) =>
              isActive
                ? 'nav-link bg-green-500 text-white font-bold'
                : 'nav-link text-white'
            }
          >
            <i className="bi bi-person-lines-fill me-2"></i>Users
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/parents"
            end
            className={({ isActive }) =>
              isActive
                ? 'nav-link bg-green-500 text-white font-bold'
                : 'nav-link text-white'
            }
          >
            <i className="bi bi-people-fill me-2"></i>Parents
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const LandingPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registration submitted! We’ll get back to you soon.');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="gradient-bg text-white py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <i className="bi bi-heart-fill mr-2"></i>DonorSync
            </h1>
            <nav className="space-x-4">
              <a href="#home" className="hover:text-green-300">
                Home
              </a>
              <a href="#about" className="hover:text-green-300">
                About
              </a>
              <a href="#register" className="hover:text-green-300">
                Register
              </a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section
          id="home"
          className="hero-bg text-white py-20"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Make a Difference Today
            </h2>
            <p className="text-lg md:text-xl mb-6">
              Join our community of donors and help transform lives through your generosity.
            </p>
            <a
              href="#register"
              className="inline-block bg-green-500 text-white py-3 px-6 rounded-full hover:bg-green-600 transition"
            >
              Become a Donor
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Why Donate?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <i className="bi bi-heart text-4xl text-green-600 mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">Support Causes</h3>
                <p>Your donations fund essential programs for education, health, and welfare.</p>
              </div>
              <div className="text-center">
                <i className="bi bi-people text-4xl text-blue-600 mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">Build Community</h3>
                <p>Connect with like-minded donors and make a collective impact.</p>
              </div>
              <div className="text-center">
                <i className="bi bi-globe text-4xl text-purple-600 mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                <p>Your contribution helps people across the globe, creating lasting change.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section id="register" className="py-16 gradient-bg text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Join Us as a Donor</h2>
            <div className="max-w-md mx-auto bg-white text-gray-800 p-6 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="donation">
                    Donation Type
                  </label>
                  <select
                    id="donation"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select Donation Type</option>
                    <option value="one-time">One-Time Donation</option>
                    <option value="monthly">Monthly Donation</option>
                    <option value="annual">Annual Donation</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 DonorSync. All rights reserved.</p>
            <div className="mt-2">
              <a href="#" className="mx-2 hover:text-green-300">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="mx-2 hover:text-green-300">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="mx-2 hover:text-green-300">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const DonorsPage = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold">Donors Page</h2>
      <p>Manage donor information here.</p>
    </div>
  </div>
);

const VolunteersPage = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold">Volunteers Page</h2>
      <p>Manage volunteer information here.</p>
    </div>
  </div>
);

const UsersPage = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold">Users Page</h2>
      <p>Manage user information here.</p>
    </div>
  </div>
);

const ParentsPage = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold">Parents Page</h2>
      <p>Manage parent information here.</p>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/donors" element={<DonorsPage />} />
        <Route path="/volunteers" element={<VolunteersPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/parents" element={<ParentsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
