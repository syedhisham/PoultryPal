import React, { useEffect, useState } from 'react';
import { Card, Typography, Avatar, Spinner, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import { AxiosRequest } from '../../../../AxiosRequest/AxiosRequest';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import { useSelector } from 'react-redux';
import { FaTimes} from 'react-icons/fa';
import { selectToken } from '../../../../redux/tokenSlice';
import { uploadImageToCloudinary } from '../../../../utility/uploadImageToCloudinary';

const AllSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newImage, setNewImage] = useState('');

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
    setUploaded(true);
      const imageUrl = await uploadImageToCloudinary(file);
      setNewImage(imageUrl);
      console.log("Image URL", imageUrl);
    } catch (error) {
      console.error("Error uploading image to Cloudinary", error);
    }finally {
    setUploaded(false);
    }
  };


  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await AxiosRequest.get('/api/supplier/all-suppliers', config);
        setSuppliers(response.data);
        setLoading(false);
      } catch (err) {
        toast.error(err.response.data.msg || err.response.data.message);
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [token]);

  const handleDelete = async (supplierId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await AxiosRequest.delete(`/api/supplier/delete/${supplierId}`, config);
      setSuppliers(suppliers.filter(supplier => supplier._id !== supplierId));
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.msg || err.response.data.message);
    }
  };

  const handleUpdateSupplier = (supplierId) => {
    const supplier = suppliers.find(supplier => supplier._id === supplierId);
    setSelectedSupplierId(supplierId);
    setNewName(supplier.name);
    setNewPhoneNumber(supplier.phoneNumber);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedSupplierId(null);
    setNewName('');
    setNewPhoneNumber('');
    setNewImage('');
    setUploaded(false);
  };

  const handleNumberChange = (e) => {
    const { value } = e.target;
  
    // Allow input to contain only digits, "+" at the start, or spaces
    const cleanedValue = value.replace(/[^0-9+]/g, '');
  
    setNewPhoneNumber(cleanedValue);
  };
  
  const validatePhoneNumber = () => {
    const regex = /^(?:\+92|0)?3[0-9]{9}$/;
  
    if (!regex.test(newPhoneNumber)) {
      toast.error('Invalid phone number. Use +923XXXXXXXXX or 03XXXXXXXXX format.');
    }
  };


const handleUpdateSupplierSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Create the payload, including the image only if it's provided
      const payload = {
        name: newName,
        phoneNumber: newPhoneNumber,
        ...(newImage && { image: newImage }), // Include 'image' only if 'newImage' is truthy
      };
  
      const response = await AxiosRequest.put(
        `/api/supplier/update/${selectedSupplierId}`,
        payload,
        config
      );
  
      // Update the user in the state
      setSuppliers(suppliers.map(supplier =>
        supplier._id === selectedSupplierId
          ? { ...supplier, ...payload }
          : supplier
      ));
  
      toast.success(response.data.message);
      handleDialogClose();
    } catch (err) {
      toast.error(err.response.data.msg || err.response.data.message);
    }
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f0ebe4] font-poppins">
        <Spinner color='white' className="h-12 w-12 text-black" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0ebe4] py-10 font-poppins">
      <div className="container mx-auto px-4">
        <Typography variant="h3" className="text-black mb-8 text-center">
          All Suppliers
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {suppliers.map(supplier => (
            <motion.div 
              key={supplier._id} 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 flex flex-col gap-1 items-center text-center bg-white shadow-lg shadow-black rounded-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
                <Avatar src={supplier.image} alt={`${supplier.name}`} size="lg" />
                <Typography variant="h5" className="text-black">{`${supplier.name}`}</Typography>
                <Typography variant="subtitle1" className="text-gray-600">{supplier.phoneNumber}</Typography>
                <Button className="w-full bg-red-500 mt-2 shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleDelete(supplier._id)}>
                  Delete
                </Button>
                <Button className="w-full bg-black mt-2 shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleUpdateSupplier(supplier._id)}>
                  Update
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${
          dialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
          <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleDialogClose}>
            <FaTimes className="text-black text-xl" />
          </div>
          <div className='flex flex-col items-center justify-center text-center'>
            <DialogHeader>Update User</DialogHeader>
            <DialogBody>
              <div className="mb-6">
                <Input
                  label="New Name"
                  type='text'
                  color="black"
                  className="focus:!ring-0"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <Input
                  label="New Phone Number"
                  type='text'
                  color="black"
                  className="focus:!ring-0"
                  min={0}
                value={newPhoneNumber}
                onChange={handleNumberChange}
                onBlur={validatePhoneNumber}
                />
              </div>
              <div className="mb-6">
              <Input
                type="file"
                label='New Supplier Image'
                accept="image/*"
                color="black"
                className="focus:!ring-0"
                onChange={handleUploadProfileImage}
                required
              />
              </div>
            </DialogBody>
            <DialogFooter>
            <Button 
    variant="filled" 
    className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800" 
    onClick={handleUpdateSupplierSubmit}
    disabled={uploaded}
  >
    {uploaded ? 'Uploading...' : 'Update'} {/* Show appropriate text */}
  </Button>
            </DialogFooter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSuppliers;
