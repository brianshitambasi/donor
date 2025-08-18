import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoutes';
import AdminDashboard from './components/admin/AdminDashboard';
import Volunteers from './components/admin/Volunteers';
import VolunteerEdit from './components/admin/forms/VolunteerEdit';
import VolunteerAdd from './components/admin/forms/VolunteerAdd';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import NotAuthorized from './components/NotAuthorized';
import NotFound from './components/NotFound';
import DonorAdd from './components/admin/forms/DonorAdd';
import DonorEdit from './components/admin/forms/DonorEdit';
import DonorDashboard from './components/donor/DonorDashboard';
import DonorLayout from './components/donor/DonorLayout';
import VolunteerDashboard from './components/volunteer/VolunteerDashboard';
import AdminLayout from './components/admin/AdminLayout';
import Donor from './components/admin/Donor';
import Request from './components/admin/Request';
import RequestProduct from './components/admin/Request';

function App() {
  return (
    <Router>
       {/* we wrap all routes inside the authprovider */}
      <AuthProvider>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<HomeComponent />} />
          
          {/* Admin Protected Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            {/* Donors */}
            <Route path="donors" element={<Donor />} />
            <Route path="donor/add" element={<DonorAdd />} />
            <Route path="donor/edit/:id" element={<DonorEdit />} />
            {/* Volunteers */}
            <Route path="volunteers" element={<Volunteers />} />
            <Route path="volunteer/add" element={<VolunteerAdd />} />
            <Route path="volunteer/edit" element={<VolunteerEdit />} />
            {/* request */}
            <Route path="request" element={<RequestProduct />} />

            


          </Route>

          {/* Donor Protected Routes */}
          <Route
            path="/donor-dashboard"
            element={
              <ProtectedRoute allowedRoles={['donor']}>
                <DonorLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DonorDashboard />} />
          </Route>

          {/* Volunteer Protected Routes */}
          <Route
            path="/volunteer-dashboard"
            element={
              <ProtectedRoute allowedRoles={['volunteer']}>
                <VolunteerDashboard />
              </ProtectedRoute>
            }
          />    
          <Route path="/about" element={<AboutComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/not-found" element={<NotFound />} />


          {/* Catch-all for undefined routes */}
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
