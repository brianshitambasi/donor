import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const RegisterComponent = () => {

    // setting our hooks usestate
    const [name, setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [address,setAddress]=useState('')
    const [role,setRole]=useState('')

    // user interaction
    const [error, setError]=useState('')
    const [success,setSuccess]=useState("")
    const [loading,setLoading]=useState('')
    const navigate=useNavigate()

    // function to handle the submission
    const handleSubmit=async (e)=>{
        e.preventDefault()
        setError("")
        setLoading("Registering  Account.. ")
        try {
            const data={name,email,password, address, role}
            const res= await axios.post("https://burnix-website.onrender.com/user/Auth/register",data)
            console.log("Error Response:", error?.response);

            if(res.data.newUser){
                setLoading("")
                setSuccess(res.data.message)
                alert("Registration Successful ! You will be redirected to login")
                navigate('/login')
            }
            setLoading("")
            setError(res.data.message)

        } catch (error) {
            console.log(error)
            setError(error.message)
            setLoading("")
        }
    }
  return (
    <div className='container mt-5' style={{maxWidth:'500px'}}>
        <form onSubmit={handleSubmit} className='card shadow p-4 bg-light rounded'>
            <h1 className='text-center text-success'>Donation</h1>
            <h2 className='text-center mb-4 text-success'>Register </h2>

            {/* alerts */}
            {error? <div className='alert alert-danger'>{error}</div> : null}
            {success? <div className='alert alert-success'>{success}</div> : null}
            {loading? <div className='alert alert-info'>{loading}</div> : null}

            {/* inputs */}
            <input type="text" className='form-control mb-3'  placeholder='Enter Your Name' value={name} onChange={(e)=>setName(e.target.value)} required/>
            {name}
            <input type="email"  className='form-control mb-3' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            {email}
            <input type="password" className='form-control  mb-3' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            {password}
            <input type="text" className='form-control  mb-3' placeholder='address' value={address} onChange={(e)=>setAddress(e.target.value)} required/>
            {address}
            {/* Role Dropdown */}
            <select
                    className="form-control mb-3"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="donor">Donor</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="beneficiary">Beneficiary</option>
                </select>
          
            <div className="d-grid mb-3">
                <button type='submit' className='btn btn-success'>Register</button>
            </div>
            <div className="text-center">
                <p>Already have an account? {''}
                    <Link to='/login'  className='text-decoration-none'>Login</Link>
                </p>
            </div>
        </form>
        
    </div>
  )
}

export default RegisterComponent