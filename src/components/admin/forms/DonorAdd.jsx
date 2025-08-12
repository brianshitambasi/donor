import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const DonorAdd = () => {
  const { user } = useContext(AuthContext)
  const [donor, setDonor] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    food: '',
    clothes: '',
    money: '',
    medicines: ''
  })
  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const[phone, setPhone] = useState('')
  const[address, setAddress] = useState('')
  const[city, setCity] = useState('')
  const[state, setState] = useState('')
  const [food, setFood] = useState('')
  const [clothes, setClothes] = useState('')
  const [money, setMoney] = useState('')
  const [medicines, setMedicines] = useState('')

  // we prepare our authorization header
  const authHeader={
    headers: {Authorization:`Bearer ${user?.token}` }
}

const FetchDonors=async () => {
  try {
      toast.info('Loaading donors.at.apply...')

      const res = await axios.get('https://schoolapi-92n6.onrender.com/api/teacher', authHeader)
      toast.dismiss()
      console.log("Donor get ",res.data)
      setDonor(res.data)
  } catch (error) {
      toast.dismiss()
      toast.error(error.response?.data?.message || "Failed to load donors")
  }        
}
// use effect to fetch donors when component mounts
  useEffect(() => {
    FetchDonors()
  }
, [])
// handle submit function
const handleSubmit=async (e) => {
  e.preventDefault()
  try {
      toast.info("Submitting...")
      const data={name,email,phone,address,city,state,food,clothes,money,medicines}
      const res= await axios.post('https://schoolapi-92n6.onrender.com/api/classroom',data,authHeader)
      toast.dismiss()
      toast.success(res.data?.message || 'Class added Successfully')
      setName('')
      setEmail('')
      setAddress('')
      setCity('')
      setState('')
      setPhone('')
      setFood('')
      setClothes('')
      setMoney('')
      setMedicines('')
  } catch (error) {
      toast.dismiss()
      toast.error(error.response?.data?.message  || 'Error submitting') 
  }        
}
}
export default DonorAdd