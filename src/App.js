import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import NavbarComponent from './components/NavbarComponent';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoutes';
function App() {
  return (
    <Router>
      <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          {/* admin protected routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div>Admin Dashboard</div>
            </ProtectedRoute>
          } />

          {/* donor protected routes */}
          <Route path="/donor" element={
            <ProtectedRoute allowedRoles={['donor']}>
              <div>Donor Dashboard</div>
            </ProtectedRoute>
          } />

          {/* user protected routes */}
          <Route path="/user" element={
            <ProtectedRoute allowedRoles={['user']}>
              <div>User Dashboard</div>
            </ProtectedRoute>
          } />



          <Route path="/login" element={<div>Not Authorized</div>} />  
          <Route path="/register" element={<div>Not Authorized</div>} />
          {/* not authorized route */}
          <Route path="/not-authorized" element={<div>Not Authorized</div>} />

          
          {/* 404 route */}
          <Route path="*" element={<div>404 Not Found</div>} /> 

          
        </Routes>

        {/* Footer can be added here if needed */}

      </div>
      </AuthProvider>
    </Router>
  );
}
export default App;