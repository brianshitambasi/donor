import React from 'react'


import { Outlet } from 'react-router-dom'
import DashboardNavbar from '../DashboardNavbar'
import SideBar from './Sidebar'



const AdminLayout = () => {
  return (
    <div className='d-flex'>
        <SideBar/>
        <div className="flex-grow-1">
              <DashboardNavbar/>
            <main className='p-4 vh-100'>
                {/* outlet renders the matched child route's element */}
                <Outlet/>
            </main>
        </div>

    </div>
  )
}

export default AdminLayout