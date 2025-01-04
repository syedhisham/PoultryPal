import React, {useState} from 'react';
import toast from 'react-hot-toast';
import { Card, Input, Button, Typography} from '@material-tailwind/react';
import {AxiosRequest} from '../../../../AxiosRequest/AxiosRequest';
import { motion } from 'framer-motion';
import '@fontsource/poppins'; 
import { useSelector } from 'react-redux';
import { selectToken } from '../../../../redux/tokenSlice';
import { uploadImageToCloudinary } from '../../../../utility/uploadImageToCloudinary';


const AddSupplier = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const [uploaded,setUploaded] = useState(false);

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
  
    // Allow input to contain only digits, "+" at the start, or spaces
    const cleanedValue = value.replace(/[^0-9+]/g, '');
  
    setPhoneNumber(cleanedValue);
  };
  
  const validatePhoneNumber = () => {
    const regex = /^(?:\+92|0)?3[0-9]{9}$/;
  
    if (!regex.test(phoneNumber)) {
      toast.error('Invalid phone number. Use +923XXXXXXXXX or 03XXXXXXXXX format.');
    }
  };
    
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosRequest.post('/api/supplier/add-supplier', {
        name,
        image,
        phoneNumber,
      },{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      setName('');
      setImage('');
      setPhoneNumber('');
      setUploaded(false);
    } catch (err) {
      toast.error(err.response.data.msg || err.response.data.message);
    }
  };


  return (
    <div className="flex items-center justify-center text-center min-h-screen bg-[#f0ebe4] font-poppins">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="p-4 max-w-md w-screen"
      >
<Card className="p-8 md:-ml-40 lg:-ml-40 max-w-3xl md:w-[70rem] lg:w-[70rem] xl:w-[70rem] shadow-lg shadow-black rounded-lg bg-white transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
<Typography variant="h4" className="mb-6 text-black">Add Supplier</Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                label="Name"
                type="text"
                color="black"
                className="focus:!ring-0"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <Input
                label="Phone Number"
                type="text"
                color="black"
                className="focus:!ring-0"
                min={0}
                value={phoneNumber}
                onChange={handleNumberChange}
                onBlur={validatePhoneNumber}
                required
              />
            </div>
            <div className="mb-6">
            <Input
                type="file"
                label='Supplier Image'
                accept="image/*"
                color="black"
                className="focus:!ring-0"
                onChange={handleUploadProfileImage}
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={!uploaded} 
              className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
            >
              Add Supplier
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddSupplier;

