import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import { AxiosRequest } from '../../../../AxiosRequest/AxiosRequest'; // Adjust path as per your project structure
import { useSelector } from 'react-redux';
import { selectToken } from '../../../../redux/tokenSlice';
import { uploadImageToCloudinary } from '../../../../utility/uploadImageToCloudinary';

const CreateFeedManagement = () => {
  const [formData, setFormData] = useState({
    feedType: '',
    description: '',
    quantity: '',
    unit: '',
    threshold: '',
    supplier: '',
    lastOrderDate: '',
    nextOrderDate: '',
    image: '',
    perUnit: '',
    price: ''
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
      setFormData({ ...formData, image: imageUrl }); // Fix: Update formData correctly
      setUploaded(true);
      toast.success('Image uploaded successfully');
      console.log('Image URL:', imageUrl);
    } catch (error) {
      toast.error('Error uploading image');
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosRequest.post('/api/feed/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Feed entry created successfully!');
      console.log('Created Feed:', response.data);

      // Reset form data after successful submission
      setFormData({
        feedType: '',
        description: '',
        quantity: '',
        unit: '',
        threshold: '',
        supplier: '',
        lastOrderDate: '',
        nextOrderDate: '',
        image: '',
        perUnit: '',
        price: ''
      });
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Failed to create feed entry');
    }
  };

  return (
    <div className="flex items-center justify-center text-center min-h-screen bg-[#f0ebe4] font-poppins w-full ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-md w-full"
      >
<Card className="p-8 md:-ml-40 lg:-ml-40 max-w-3xl md:w-[70rem] lg:w-[70rem] xl:w-[70rem]  shadow-lg shadow-black rounded-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
<Typography variant="h4" className="mb-6 text-black">
            Create Feed Entry
          </Typography>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Feed Type"
              type="text"
              name="feedType"
              value={formData.feedType}
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
              label="Total Quantity"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="focus:!ring-0"
            />
            <Input
              label="Unit (e.g., kg, lb)"
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
              className="focus:!ring-0"
            />
            <Input
              label="Threshold (Min Quantity for Reorder)"
              type="number"
              name="threshold"
              value={formData.threshold}
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
              className="focus:!ring-0"
            />
            <Input
              label="Last Order Date"
              type="date"
              name="lastOrderDate"
              value={formData.lastOrderDate}
              onChange={handleChange}
              className="focus:!ring-0"
            />
            <Input
              label="Next Order Date"
              type="date"
              name="nextOrderDate"
              value={formData.nextOrderDate}
              onChange={handleChange}
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
              label="Price per Unit Size (e.g., price per 50kg)"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="focus:!ring-0"
            />
            <Input
              label="Unit Size (e.g., 50 for 50kg)"
              type="number"
              name="perUnit"
              value={formData.perUnit}
              onChange={handleChange}
              required
              className="focus:!ring-0"
            />
            <Button
              type="submit"
              className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
            >
              Create Feed Entry
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateFeedManagement;
