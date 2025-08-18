import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const Volunteers = () => {
    const [volunteers, setVolunteers] = useState([])
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()
    
    // Prepare auth header
    const authHeader = {
        headers: { Authorization: `Bearer ${token}` }
    }

    const fetchVolunteers = async () => {
        try {
            toast.info("Loading volunteers...")
            const res = await axios.get('https://burnix-website.onrender.com/api/donors/volunteer', authHeader)
            setVolunteers(res.data)
            toast.dismiss()
        } catch (error) {
            toast.dismiss()
            toast.error(error.response?.data?.message || 'Failed to load volunteers')
        }    
    }
    
    useEffect(() => {
        fetchVolunteers()
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this volunteer?')) {
            try {
                toast.warning('Deleting volunteer...')
                const res = await axios.delete(`https://burnix-website.onrender.com/api/volunteer/${id}`, authHeader)
                toast.info(res.data.message)
                fetchVolunteers()
            } catch (error) {
                toast.dismiss()
                toast.error(error.response?.data?.message)
            }            
        }        
    }

    const handleEdit = (volunteerData) => {
        navigate("/admin-dashboard/volunteers/edit", { state: { volunteerData } })
    }

    return (
        <div className='container mt-2'>
            <ToastContainer position='top-right' autoClose={3000}/>

            {/* Breadcrumbs */}
            <nav aria-label='breadcrumb' className='mb-3'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item fw-bold'>
                        <Link to='/admin-dashboard'>Dashboard</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-label='page'> / Volunteers</li>
                </ol>
            </nav>

            {/* Card */}
            <div className="card p-4 shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className='text-info'> 
                        <i className='bi bi-people-fill me-2'></i>Volunteers List
                    </h5>

                    <button 
                        className='btn btn-info text-white'  
                        onClick={() => navigate('/admin-dashboard/volunteer/add')}
                    >
                        <i className='bi bi-plus-circle'></i> Add Volunteer
                    </button>
                </div>
                
                {/* Volunteers list */}
                <div className="table-responsive">
                    {volunteers.length === 0 ? (
                        <div className="alert alert-warning text-center">
                            <i className='bi bi-exclamation-circle me-2'></i>No Volunteers Found!
                        </div>
                    ) : (
                        <table className='table table-striped table-hover table-bordered'>
                            <thead className='table-info'>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Skills</th>
                                    <th>Availability</th>
                                    <th>Join Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {volunteers.map((volunteer, index) => (
                                    <tr key={volunteer._id}>
                                        <td>{index + 1}</td>
                                        <td>{volunteer.name}</td>
                                        <td>{volunteer.email}</td>
                                        <td>{volunteer.phone}</td>
                                        <td>{volunteer.skills?.join(', ') || 'N/A'}</td>
                                        <td>{volunteer.availability || 'N/A'}</td>
                                        <td>{new Date(volunteer.joinDate).toLocaleDateString()}</td>
                                        <td>
                                            <button 
                                                className='btn btn-sm btn-warning me-2' 
                                                onClick={() => handleEdit(volunteer)}
                                            >
                                                <i className='bi bi-pencil-square'></i>
                                            </button>

                                            <button 
                                                className='btn btn-sm btn-danger me-2'
                                                onClick={() => handleDelete(volunteer._id)}
                                            >
                                                <i className='bi bi-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Volunteers