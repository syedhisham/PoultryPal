import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Card, Input, Button, Typography, Select, Option,Spinner } from '@material-tailwind/react';
import {AxiosRequest} from '../../../AxiosRequest/AxiosRequest';
import { motion } from 'framer-motion';
import '@fontsource/poppins'; 
import { useSelector } from 'react-redux';
import {FaEye,FaEyeSlash } from 'react-icons/fa';
import { selectToken } from '../../../redux/tokenSlice';
import { uploadImageToCloudinary } from '../../../utility/uploadImageToCloudinary';
import { selectRole } from '../../../redux/roleSlice';
import { useNavigate } from 'react-router-dom';


const AddEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const[lastName,setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [payment, setPayment] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [role, setRole] = useState('');
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const [showPassword, setShowPassword] = useState(false);
  const [uploaded,setUploaded] = useState(false);
  const fetchedRole = useSelector(selectRole);
  const isAdmin= fetchedRole === 'Admin';
  const navigate = useNavigate();


const handleHome = () => {
    navigate('/home')
};

if (!isAdmin) {
    return (
        <div className="flex text-center items-center justify-center min-h-screen bg-[#f0ebe4] font-poppins">
            <Card className="p-8 items-center shadow-lg rounded-lg bg-white">
                <Typography variant="h4" className="mb-6 text-black">Insufficient Privileges</Typography>
                <Typography variant="body1" className="text-gray-600 mb-4">
                    You do not have the required permissions to access this page. Please contact the administrator if you believe this is an error.
                </Typography>
                <Button
                    variant="contained" // Consider using 'contained' instead of 'filled'
                    onClick={handleHome}
                    className="max-w-md bg-black shadow-none hover:shadow-black hover:shadow-md"
                >
                    Go To Home
                </Button>
            </Card>
        </div>
    );
}


  const handleUploadProfileImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      const imageUrl = await uploadImageToCloudinary(file);
      setImage(imageUrl);
      setUploaded(true);
      console.log("Image URL", imageUrl);
    } catch (error) {
      console.error("Error uploading image to Cloudinary", error);
    }
  };

  const handleNumberChange = (e) => {
    const { value } = e.target;
    const newValue = value && Number(value) >= 0 ? Number(value) : "";
    setPayment(newValue);
  };  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosRequest.post('/api/employee/addEmployee', {
        firstName,
        lastName,
        email,
        password,
        image,
        payment,
        role,
      },{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success('Employee added successfully');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPayment('');
      setImage('');
      setRole('');
      setUploaded(false);
    } catch (err) {
      toast.error(err.response.data.msg || err.response.data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

  return (
    <div className="flex items-center justify-center text-center min-h-screen bg-[#f0ebe4] font-poppins">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="p-4 max-w-md w-screen"
      >
<Card className="p-8 md:-ml-40 lg:-ml-40 max-w-3xl md:w-[70rem] lg:w-[70rem] xl:w-[70rem]  shadow-lg shadow-black rounded-lg bg-white transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
<Typography variant="h4" className="mb-6 text-black">Add Employee</Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                label="First Name"
                type="text"
                color="black"
                className="focus:!ring-0"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <Input
                label="Last Name"
                type="text"
                color="black"
                className="focus:!ring-0"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <Input
                label="Email"
                type="email"
                color="black"
                className="focus:!ring-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6 relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                color="black"
                className="focus:!ring-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
               <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash color='black'/> : <FaEye color='black'/>} 
             </div>
            </div>
            <div className="mb-6">
              <Input
                label="Pay"
                type="text"
                color="black"
                className="focus:!ring-0"
                value={payment}
                min={0}
                onChange={(e) => handleNumberChange(e)}
                required
              />
            </div>
            <div className="mb-6">
            <Input
                type="file"
                label='Profile Image'
                accept="image/*"
                color="black"
                className="focus:!ring-0"
                onChange={handleUploadProfileImage}
                required
              />
            </div>
            <div className="mb-6">
            <Select
      label="Role"
      color="black"
      variant="outlined"
      className="focus:!ring-0"
      value={role}
      onChange={(value) => setRole(value)}
      required
    >
      <Option className="text-black" value="Admin">Admin</Option>
      <Option className="text-black" value="Employee">Employee</Option>
    </Select>
            </div>
            <Button 
              type="submit" 
              disabled={!uploaded}  // Disable submit button until image is uploaded and URL is set
              className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
            >
              Add User
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddEmployee;

