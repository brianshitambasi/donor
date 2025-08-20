import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='text-light d-flex flex-column p-3' 
    style={{width:'250px',
        background:'linear-gradient(135deg, rgb(79, 12, 62) ,rgb(152, 159, 54))'
    }}>
        <h4 className='text-center mb-4'>
            <i className='bi bi-speedometer2 me-3'></i>Donor Panel
        </h4>
        <ul className='nav nav-pills flex-column mb-auto'>
            <li className='nav-item mb-3'>
                <NavLink 
                    to='/donor-dashboard' 
                    end 
                    className={({isActive})=> isActive? 'nav-link bg-success text-light fw-bold':'nav-link text-light'}>

                <i className='bi bi-grid me-2'></i>Dashboard
                </NavLink>
            </li> 

            <li className='nav-item mb-3'>
                <NavLink 
                    to='/donor-dashboard/my-donation' 
                    end 
                    className={({isActive})=> isActive? 'nav-link bg-success text-light fw-bold':'nav-link text-light'}>

                <i className='bi bi-person-lines-fill me-2'></i>Donation
                </NavLink>
            </li> 

            {/* <li className='nav-item mb-3'>
                <NavLink 
                    to='/donor-dashboard/volunteers' 
                    end 
                    className={({isActive})=> isActive? 'nav-link bg-success text-light fw-bold':'nav-link text-light'}>

                <i className='bi bi-people-fill me-2'></i>Volunteer
                </NavLink>
            </li>  */}

            <li className='nav-item mb-3'>
                <NavLink 
                    to='/donor-dashboard/request' 
                    end 
                    className={({isActive})=> isActive? 'nav-link bg-success text-light fw-bold':'nav-link text-light'}>

                <i className='bi bi-person-badge me-2'></i>Request
                </NavLink>
            </li> 
        
        </ul>


    </div>
  )
}

export default SideBar