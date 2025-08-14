import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { NavLink } from 'react-router-dom'
import Settings from './Settings'



const DashboardNavbar = () => {
    const {user,logout}=useContext(AuthContext)
  return (
    <nav className='navbar navbar-expand-lg bg-light shadow-sm px-4 py-2 mb-3 rounded'>
        <div className="container-fluid d-flex justify-content-between align-items-center">
            <span className='navbar-brand fw-bold text-success fs-4'>
                <i className='bi bi-building me-2'></i>Donation
            </span>
            <div className="d-flex align-items-center">
                <span className='me-3 text-muted'>
                    <i className='bi bi-person-circle me-1'></i>
                    <strong>{user?.name}</strong>
                    <small className='text-muted'>({user?.role})</small>
                </span>

                {/* logout */}
                <button className='btn btn-sm btn-outline-danger d-flex align-items-center' onClick={logout}>
                    <i className='bi bi-box-arrow-right'></i>Logout
                </button>
                {/* settings */}
              <button className='btn btn-sm btn-outline-success d-flex align-items-center ms-2' onClick={Settings}>  
                <i className='bi bi-gear'></i>Settings
              <li>
            <NavLink 

                    to='/admin-dashboard/settings' 
                    end 
                    className={({isActive})=> isActive? 'nav-link bg-success text-light fw-bold':'nav-link text-light'}>

            
                </NavLink>
            </li>
                </button> 
           


            </div>
        </div>
    </nav>
  )
}

export default DashboardNavbar