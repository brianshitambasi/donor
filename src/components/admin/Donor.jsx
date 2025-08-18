import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Prepare auth header
  const authHeader = {
    headers: { Authorization: `Bearer ${user?.token}` }
  };

  const fetchDonors = async () => {
    try {
      setLoading(true);
      toast.info('Loading donors...');
      const res = await axios.get('https://burnix-website.onrender.com/api/donors', authHeader);
      setDonors(res.data);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Failed to load donors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this donor?')) {
      try {
        toast.warning('Deleting donor...');
        const res = await axios.delete(`https://burnix-website.onrender.com/api/donors/${id}`, authHeader);
        toast.success(res.data.message);
        fetchDonors();
      } catch (error) {
        toast.dismiss();
        toast.error(error.response?.data?.message || 'Failed to delete donor');
      }
    }
  };

  const handleEdit = (donorData) => {
    navigate('/admin/donors/edit', { state: { donorData } });
  };

  const handleAddDonor = () => {
    navigate('/admin/donors/add');
  };

  return (
    <div className=' container mt-2'>
        <ToastContainer position='top-right' autoClose={3000}/>

        {/* breadcrums provide ease in path location */}
        <nav aria-label='breadcrumb' className='mb-3'>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item fw-bold'><Link to='/admin-dashboard'>Dashboard </Link></li>
                <li className='breadcrumb-item- active' aria-label='page'> /Donors</li>
            </ol>
        </nav>

        {/* card */}
        <div className="card p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className='text-success '> 
                    <i className='bi bi-building me-2'></i>Donors list
                </h5>

                <button className='btn btn-success'  
                    onClick={()=>navigate('/admin-dashboard/donor/add')}>
                    <i className='bi bi-plus-circle'></i>Add Donor
                </button>
            </div>
            {/* list of the Donor */}
            <div className="table-responsive">
                {Donors.length ===0?(
                    <div className="alert alert-warning text-center">
                        <i className='bi bi-exclamation-circle me-2'></i>No Donor Found!!
                    </div>
                ):(
                    <table className='table table-striped table-hover table-bordered'>
                        <thead className='table-success'>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Adm No</th>
                                <th>Gender</th>
                                <th>DOB</th>
                                <th>Request</th>
                                <th>Donor</th>
                                <th>Photo</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {Donors.map((Donor,index)=>(
                                <tr key={Donor._id}>
                                    <td>{index+1}</td>
                                    <td>{Donor.name}</td>
                                    <td>{Donor.gender}</td>
                                    <td>{new Date(Donor.dateOfBirth).toLocaleDateString()}</td>
                                    <td>{`${Donor.Request?.gradeLevel},${Donor.Request.name}`||''}</td>
                                    <td>{`${Donor.volunteer?.name},${Donor.volunteer.phone}`||''}</td>
                                    

                                    <td>{Donor.Donor}</td>
                                    <td>{Donor.address}</td>
                                    <td>

                                     {Donor.photo ? (
                                      <img src={`https://burnix-website.onrender.com/api/donors/photo/${Donor._id}?${new Date().getTime()}`} 
                                       alt="Donor"
                                       width={80}
                                        height={80}
                                        style={{objectFit:"cover",borderRadius:'50%'}}
                                       />
                                     ):(
                                      'No Photo'
                                     )}
                                        <button className='btn btn-sm btn-warning me-2' 
                                        onClick={()=>handleEdit(Donor)}>
                                            
                                            <i className='bi bi-pencil-square'></i>
                                        </button>

                                        <button className='btn btn-sm btn-danger me-2'
                                        onClick={()=>handleDelete(Donor._id)}
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
};

export default Donors;