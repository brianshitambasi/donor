import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='text-light d-flex flex-column p-3' 
    style={{width:'250px',
        background:'linear-gradient(135deg, rgb(79, 12, 62) ,rgb(152, 159, 54))'
    }}>
        <h4 className='text-center mb-4'>
            <i className='bi bi-speedometer2 me-3'></i>Beneficiary Panel
        </h4>
        <ul className='nav nav-pills flex-column mb-auto'>
            <li className='nav-item mb-3'>
                <NavLink 
                    to='/beneficiary-dashboard' 
                    end 
                    className={({isActive})=> isActive? 'nav-link bg-success text-light fw-bold':'nav-link text-light'}>

                <i className='bi bi-grid me-2'></i>Dashboard
                </NavLink>
            </li> 

            
            <li className='nav-item mb-3'>
                <NavLink 
                    to='/beneficiary-dashboard/donations' 
                    end 
                    className={({isActive})=> isActive? 'nav-link bg-success text-light fw-bold':'nav-link text-light'}>

                <i className='bi bi-person-badge me-2'></i>Donations
                </NavLink>
            </li>
            <li className='nav-item mb-3'>
                <NavLink 
                    to='/beneficiary-dashboard/my-request' 
                    end 
                    className={({isActive})=> isActive? 'nav-link bg-success text-light fw-bold':'nav-link text-light'}>

                <i className='bi bi-person-badge me-2'></i>Beneficiary Request
                </NavLink>
            </li>


  
        </ul>


    </div>
  )
}

export default SideBar