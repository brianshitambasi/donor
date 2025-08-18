import React, { useContext, useState } from 'react';
// import { AuthContext } from '../../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const RequestProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    phone: '',
    deliveryAddress: '',
    city: '',
    paymentMethod: 'mpesa'
  });

  const [cart, setCart] = useState([]);
  
  const authHeader = {
    headers: { Authorization: `Bearer ${user?.token}` }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      toast.info("Adding to cart...");
      const res = await axios.post(
        'https://burnix-website.onrender.com/api/cart',
        { ...formData, userId: user?.id },
        authHeader
      );
      setCart([...cart, formData]);
      toast.success(res.data?.message || 'Product added to cart');
      setFormData({
        productName: '',
        quantity: '',
        phone: '',
        deliveryAddress: '',
        city: '',
        paymentMethod: 'mpesa'
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding to cart');
    }
  };

  const handleMpesaPayment = async () => {
    try {
      toast.info("Initiating M-Pesa payment...");
      const res = await axios.post(
        'https://burnix-website.onrender.com/api/payments/mpesa',
        {
          phone: formData.phone,
          amount: calculateTotal(),
          cartItems: cart
        },
        authHeader
      );
      toast.success(res.data?.message || 'Payment initiated successfully');
      navigate('/requests/success');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error processing payment');
    }
  };

  const calculateTotal = () => {
    // Placeholder for total calculation logic
    // In a real app, this would calculate based on product prices
    return cart.reduce((total, item) => total + (parseInt(item.quantity) * 100), 0); // Example: $100 per item
  };

  return (
    <div className='container mt-2'>
      <ToastContainer position='top-right' autoClose={3000} />

      <nav aria-label='breadcrumb' className='mb-3'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item fw-bold'><Link to='/'>Home</Link></li>
          <li className='breadcrumb-item fw-bold'><Link to='/requests'>Requests</Link></li>
          <li className='breadcrumb-item active'>Request Product</li>
        </ol>
      </nav>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className='text-success'>
            <i className='bi bi-cart-plus me-2'></i> Request New Product
          </h5>
          <Link className='btn btn-success' to='/requests'>
            <i className='bi bi-arrow-left-circle-fill me-2'></i>Back 
          </Link>
        </div>

        <form onSubmit={handleAddToCart}>
          <div className='row'>
            <div className='col-md-6 mb-3'>
              <input 
                type="text" 
                className='form-control' 
                placeholder='Product Name' 
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required 
              />
            </div>

            <div className='col-md-6 mb-3'>
              <input 
                type="number" 
                className='form-control' 
                placeholder='Quantity' 
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                required 
              />
            </div>

            <div className='col-md-6 mb-3'>
              <input 
                type="tel" 
                className='form-control' 
                placeholder='Phone Number (M-Pesa)' 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required 
              />
            </div>

            <div className='col-md-6 mb-3'>
              <input 
                type="text" 
                className='form-control' 
                placeholder='Delivery Address' 
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                required 
              />
            </div>

            <div className='col-md-6 mb-3'>
              <input 
                type="text" 
                className='form-control' 
                placeholder='City' 
                name="city"
                value={formData.city}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <button type='submit' className='btn btn-success me-2'>
            <i className='bi bi-cart-plus me-2'></i>Add to Cart
          </button>
        </form>

        {cart.length > 0 && (
          <div className='mt-4'>
            <h6>Cart Items</h6>
            <ul className='list-group mb-3'>
              {cart.map((item, index) => (
                <li key={index} className='list-group-item'>
                  {item.productName} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
            <h6>Total: ${calculateTotal()}</h6>
            <button 
              className='btn btn-primary' 
              onClick={handleMpesaPayment}
              disabled={!formData.phone}
            >
              <i className='bi bi-credit-card me-2'></i>Pay with M-Pesa
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestProduct;