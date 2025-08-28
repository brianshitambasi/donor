import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoutes';

// Public Components
import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import NotAuthorized from './components/NotAuthorized';
import NotFound from './components/NotFound';

// Admin
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLayout from './components/admin/AdminLayout';
import Donors from './components/admin/Donors';
import Donations from './components/admin/Donations';
import Requests from './components/admin/Requests';

// Donor
import DonorDashboard from './components/donor/DonorDashboard';
import DonorLayout from './components/donor/DonorLayout';
import MyDonation from './components/donor/MyDonation';
import AddDonation from './components/donor/AddDonation';
import DonorRequests from './components/donor/DonorRequest';

// Beneficiary
import BenDashboard from './components/Beneficiary/BenDashboard';
import BenLayout from './components/Beneficiary/BenLayout';
import BenRequest from './components/Beneficiary/BenRequest';
import DonationsBeneficiary from './components/Beneficiary/Donations';

// Volunteer
import VolunteerDashboard from './components/volunteer/VolunteerDashboard';
import VolunteerLayout from './components/volunteer/VolunteerLayout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          {/* 🌍 Public Routes */}
          <Route path="/" element={<HomeComponent />} />
          <Route path="/about" element={<AboutComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/not-found" element={<NotFound />} />

          {/* 👤 Donor Protected Routes */}
          <Route
            path="/donor-dashboard"
            element={
              <ProtectedRoute allowedRoles={['donor']}>
                <DonorLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DonorDashboard />} />
            <Route path="my-donation" element={<MyDonation />} />
            <Route path="add-donation" element={<AddDonation />} />
            <Route path="requests" element={<DonorRequests />} />
          </Route>

          {/* 🎯 Beneficiary Protected Routes */}
          <Route
            path="/beneficiary-dashboard"
            element={
              <ProtectedRoute allowedRoles={['beneficiary']}>
                <BenLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<BenDashboard />} />
            <Route path="donations" element={<DonationsBeneficiary />} />
            <Route path="my-request" element={<BenRequest />} /> {/* ✅ fixed */}
          </Route>

          {/* 🛠️ Admin Protected Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="donors" element={<Donors />} />
            <Route path="donations" element={<Donations />} />
            <Route path="requests" element={<Requests />} />
          </Route>

          {/* 🤝 Volunteer Protected Routes */}
          <Route
            path="/volunteer-dashboard"
            element={
              <ProtectedRoute allowedRoles={['volunteer']}>
                <VolunteerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<VolunteerDashboard />} />
          </Route>

          {/* ❌ Catch-all for undefined routes */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
