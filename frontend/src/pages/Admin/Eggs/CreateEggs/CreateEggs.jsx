import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import { AxiosRequest } from '../../../../AxiosRequest/AxiosRequest'; // Adjust path as per your project structure
import { useSelector } from 'react-redux';
import { selectToken } from '../../../../redux/tokenSlice';
import { uploadImageToCloudinary } from '../../../../utility/uploadImageToCloudinary';

const CreateEggs = () => {
  const [formData, setFormData] = useState({
    eggType: '',
    description: '',
    quantity: '',
    supplier: '',
    productionDate: '',
    expiryDate: '',
    image: '',
    pricePerDozen: '',
  });

  const token = useSelector(selectToken) || localStorage.getItem('token');
  const [uploaded, setUploaded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUploadProfileImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }

    try {
      const imageUrl = await uploadImageToCloudinary(file);
      setFormData({ ...formData, image: imageUrl });
      setUploaded(true);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Error uploading image');
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosRequest.post('/api/eggs/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Eggs and product created successfully!');
      console.log('Created Eggs:', response.data);

      // Reset form data after successful submission
      setFormData({
        eggType: '',
        description: '',
        quantity: '',
        supplier: '',
        productionDate: '',
        expiryDate: '',
        image: '',
        pricePerDozen: '',
      });
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Failed to create eggs entry');
    }
  };

  return (
    <div className="flex items-center justify-center text-center min-h-screen bg-[#f0ebe4] font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-md w-full"
      >
<Card className="p-8 md:-ml-40 lg:-ml-40 max-w-3xl md:w-[70rem] lg:w-[70rem] xl:w-[70rem]  shadow-lg shadow-black rounded-lg bg-white transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
<Typography variant="h4" className="mb-6 text-black">
            Create Eggs Entry
          </Typography>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Egg Type"
              type="text"
              name="eggType"
              value={formData.eggType}
              onChange={handleChange}
              required
              className="focus:!ring-0"
            />
            <Input
              label="Description"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="focus:!ring-0"
            />
            <Input
              label="Quantity (Dozens)"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="focus:!ring-0"
            />
            <Input
              label="Supplier"
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
              className="focus:!ring-0"
            />
            <Input
              label="Production Date"
              type="date"
              name="productionDate"
              value={formData.productionDate}
              onChange={handleChange}
              required
              className="focus:!ring-0"
            />
            <Input
              label="Expiry Date"
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
              className="focus:!ring-0"
            />
            <Input
              label="Upload Image"
              type="file"
              accept="image/*"
              onChange={handleUploadProfileImage}
              className="focus:!ring-0"
            />
            <Input
              label="Price per Dozen"
              type="number"
              name="pricePerDozen"
              value={formData.pricePerDozen}
              onChange={handleChange}
              required
              className="focus:!ring-0"
            />
            <Button
              type="submit"
              className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
            >
              Create Eggs Entry
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateEggs;
