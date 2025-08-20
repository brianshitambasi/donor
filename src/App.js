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
import Volunteers from './components/admin/Volunteers';
import VolunteerEdit from './components/admin/forms/VolunteerEdit';
import VolunteerAdd from './components/admin/forms/VolunteerAdd';
import Donor from './components/admin/Donor';
import DonorAdd from './components/admin/forms/DonorAdd';
import DonorEdit from './components/admin/forms/DonorEdit';
import Request from './components/admin/Request';

// Donor
import DonorDashboard from './components/donor/DonorDashboard';
import DonorLayout from './components/donor/DonorLayout';

// Volunteer
import VolunteerDashboard from './components/volunteer/VolunteerDashboard';
import VolunteerLayout from './components/volunteer/VolunteerLayout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<HomeComponent />} />
          <Route path="/about" element={<AboutComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/not-found" element={<NotFound />} />

          {/* Admin Protected Routes */}
          <Route
            path="/donor-dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="donors" element={<Donor />} />
            <Route path="donor/add" element={<DonorAdd />} />
            <Route path="donor/edit/:id" element={<DonorEdit />} />
            <Route path="volunteers" element={<Volunteers />} />
            <Route path="volunteer/add" element={<VolunteerAdd />} />
            <Route path="volunteer/edit/:id" element={<VolunteerEdit />} />
            <Route path="request" element={<Request />} />
          </Route>

          {/* Donor Protected Routes */}
          {/* <Route
            path="/donor-dashboard"
            element={
              <ProtectedRoute allowedRoles={['donor']}>
                <DonorLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DonorDashboard />} />
            {/* Add more donor routes here if needed *
          </Route> */}

          {/* Benefeciary Protected Routes */}
          <Route
            path="/beneficiary-dashboard"
            element={
              <ProtectedRoute allowedRoles={['beneficiary']}>

                
                <VolunteerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<VolunteerDashboard />} />
            {/* Add more volunteer routes here if needed */}
          </Route>


          {/* Volunteer Protected Routes */}
          <Route
            path="/volunteer-dashboard"
            element={
              <ProtectedRoute allowedRoles={['volunteer']}>
                <VolunteerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<VolunteerDashboard />} />
            {/* Add more volunteer routes here if needed */}
          </Route>

          {/* Catch-all for undefined routes */}
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
