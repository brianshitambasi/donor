import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VolunteerDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState('Loading your tasks...');
  const [error, setError] = useState('');
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    size: '',
    photo: null,
  });
  const [uploadMessage, setUploadMessage] = useState('');

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://burnix-website.onrender.com/api/volunteer-tasks/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data.tasks);
      setLoading('');
    } catch (err) {
      console.error(err);
      setError('Failed to load tasks');
      setLoading('');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (taskId, newStatus) => {
    try {
      setUpdatingTaskId(taskId);
      const token = localStorage.getItem('token');
      await axios.put(
        `https://burnix-website.onrender.com/api/volunteer-tasks/${taskId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Failed to update task status');
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const handleProductChange = (e) => {
    const { name, value, files } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setUploadMessage('Uploading...');

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('size', product.size);
      formData.append('photo', product.photo);

      await axios.post('https://burnix-website.onrender.com/api/donations', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadMessage('Product donated successfully!');
      setProduct({ name: '', description: '', size: '', photo: null });
      fetchTasks();
    } catch (err) {
      console.error(err);
      setUploadMessage('Error uploading product');
    }
  };

  return (
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>Volunteer Dashboard</h2>

      {loading && <div className='alert alert-info'>{loading}</div>}
      {error && <div className='alert alert-danger'>{error}</div>}

      <div className='text-center mb-4'>
        <button className='btn btn-primary' onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Hide Donation Form' : 'Donate a Product'}
        </button>
      </div>

      {showForm && (
        <div className='card p-4 mb-4 shadow-sm'>
          <h4>Donate Product</h4>
          <form onSubmit={handleProductSubmit}>
            <div className='mb-3'>
              <label>Product Name</label>
              <input type='text' className='form-control' name='name' value={product.name} onChange={handleProductChange} required />
            </div>
            <div className='mb-3'>
              <label>Description</label>
              <textarea className='form-control' name='description' value={product.description} onChange={handleProductChange} rows="3" required maxLength="200" />
            </div>
            <div className='mb-3'>
              <label>Size</label>
              <select className='form-control' name='size' value={product.size} onChange={handleProductChange} required>
                <option value=''>--Select Size--</option>
                <option value='XS'>XS</option>
                <option value='S'>S</option>
                <option value='M'>M</option>
                <option value='L'>L</option>
                <option value='XL'>XL</option>
              </select>
            </div>
            <div className='mb-3'>
              <label>Product Photo</label>
              <input type='file' className='form-control' name='photo' onChange={handleProductChange} accept="image/*" required />
            </div>
            <button type='submit' className='btn btn-success'>Submit Donation</button>
            {uploadMessage && <div className='mt-3 alert alert-info'>{uploadMessage}</div>}
          </form>
        </div>
      )}

      <h4 className='mb-3'>My Tasks</h4>

      {tasks.length === 0 ? (
        <div className='alert alert-warning text-center'>No tasks assigned yet.</div>
      ) : (
        <div className='row'>
          {tasks.map((task) => (
            <div className='col-md-6 mb-4' key={task._id}>
              <div className='card shadow'>
                <div className='card-body'>
                  <h5 className='card-title'>Task ID: {task._id}</h5>
                  <p className='card-text'><strong>Status:</strong> {task.status}</p>
                  <div className="progress mb-3" style={{ height: '10px' }}>
                    <div
                      className={`progress-bar bg-${task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'warning' : 'secondary'}`}
                      role="progressbar"
                      style={{ width: task.status === 'pending' ? '33%' : task.status === 'in-progress' ? '66%' : '100%' }}
                    ></div>
                  </div>
                  {task.donation && (
                    <p className='card-text'><strong>Donation:</strong> {task.donation.title || task.donation._id}</p>
                  )}
                  {task.request && (
                    <p className='card-text'><strong>Request:</strong> {task.request.title || task.request._id}</p>
                  )}

                  <div className='form-group mt-3'>
                    <label>Update Status:</label>
                    <select
                      className='form-control'
                      value={task.status}
                      onChange={(e) => updateStatus(task._id, e.target.value)}
                      disabled={updatingTaskId === task._id}
                    >
                      <option value='pending'>Pending</option>
                      <option value='in-progress'>In Progress</option>
                      <option value='completed'>Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VolunteerDashboard;
