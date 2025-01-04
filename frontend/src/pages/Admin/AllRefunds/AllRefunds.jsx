import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Typography,
  Avatar,
  Spinner,
  Button,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option
} from '@material-tailwind/react';
import { AxiosRequest } from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { selectToken } from '../../../redux/tokenSlice';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { selectRole } from '../../../redux/roleSlice';
import { useNavigate } from 'react-router-dom';

const AllRefunds = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [newRefundStatus, setNewRefundStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRefunds, setFilteredRefunds] = useState([]);
  const [updatingRefund, setUpdatingRefund] = useState(false);


  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const role = useSelector(selectRole);
  const isAdmin= role === 'Admin';
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

  const fetchRefunds = useCallback(async () => {
    try {
      const { data } = await AxiosRequest.get('/api/refunds/all-refunds', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRefunds(data);
      setFilteredRefunds(data); // Initialize filteredRefunds with all refunds
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to fetch refunds');
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchRefunds();
  }, [fetchRefunds]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = refunds.filter(
        (refund) =>
          refund._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          refund.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          `${refund.user?.firstName} ${refund.user?.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRefunds(filtered);
    } else {
      setFilteredRefunds(refunds); // Reset filtered refunds when search query is cleared
    }
  }, [searchTerm, refunds]);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedRefund(null);
    setNewRefundStatus('');
  };

  const handleRefundClick = (refund) => {
    setSelectedRefund(refund);
    setNewRefundStatus(refund.status); // Set the initial status in the dialog
    setDialogOpen(true);
  };

  // const handleUpdateRefundStatus = async () => {
  //   setUpdatingRefund(true); 
  //   try {
  //     await AxiosRequest.patch(`/api/refunds/update/${selectedRefund._id}`, { status: newRefundStatus }, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     toast.success('Refund status updated successfully');
  //     handleDialogClose();
  //     fetchRefunds(); // Refresh the refunds list after the update
  //   } catch (error) {
  //       console.error(error);
  //     toast.error(error.response?.data?.msg || 'Failed to update refund status');
  //   } finally {
  //       setUpdatingRefund(false); 
  //     }
  // };

  const handleUpdateRefundStatus = async () => {
    setUpdatingRefund(true);
    try {
      if (newRefundStatus === 'Completed') {
        // Step 1: Call refundSession API
        await AxiosRequest.post(
          `/api/payment/refund-session`,
          { session_id: selectedRefund.orderId.sessionId }, // Adjust according to your API's requirements
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('Refund session processed successfully');
      }
  
      // Step 2: Update refund status
      await AxiosRequest.patch(
        `/api/refunds/update/${selectedRefund._id}`,
        { status: newRefundStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Refund status updated successfully');
      handleDialogClose();
      fetchRefunds(); // Refresh the refunds list after the update
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || 'Failed to process the refund');
    } finally {
      setUpdatingRefund(false);
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
          All Refunds
        </Typography>

        <div className="mb-8 flex justify-center">
          <Input
            type="text"
            label="Search by Refund ID, Email, or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 bg-white focus:ring-0 text-base sm:text-sm md:text-base lg:text-base"
          />
        </div>

        {filteredRefunds.length === 0 ? (
          <Typography variant="h5" className="text-center text-gray-500">
            No Refunds Found
          </Typography>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRefunds.map((refund) => (
              <motion.div
                key={refund._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 flex flex-col gap-1 items-center text-center bg-white shadow-lg shadow-black rounded-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
                  <Avatar
                    src={refund.user?.image}
                    alt={`${refund.user?.firstName} ${refund.user?.lastName}`}
                    size="lg"
                  />
                  <Typography variant="h5" className="text-black">
                    {`${refund.user?.firstName} ${refund.user?.lastName}`}
                  </Typography>
                  <Typography variant="subtitle1" className="text-gray-600">
                    {refund.user?.email}
                  </Typography>
                  <Typography variant="subtitle2" className="text-gray-600">
                    {refund.orderId.phoneNumber}
                  </Typography>
                  <Typography variant='small' className="mb-1">Total Price: {refund.orderId.totalPrice}</Typography>
                  <Typography variant='small' className="mb-1">Refund Status: {refund.status}</Typography>
                  <Typography variant="subtitle2" className="text-gray-500">
                    Products: {refund.orderId.products.length}
                  </Typography>
                  <Button
                    className="w-full bg-black mt-2 shadow-none hover:shadow-md hover:shadow-gray-800"
                    onClick={() => handleRefundClick(refund)}
                  >
                    View Details
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Refund Details Dialog */}
      <div
        className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${dialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
          <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleDialogClose}>
            <FaTimes className="text-black text-xl" />
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <DialogHeader>Refund Details</DialogHeader>
            <DialogBody style={{ maxHeight: '300px', overflowY: 'auto',overflowX: 'hidden',width: '100%' }} className="dashboard-1-scrollbar">
              {selectedRefund && (
                <>
                  <Typography className="mb-4">Refund ID: {selectedRefund._id}</Typography>
                  <Typography className="mb-4">Total Price: {selectedRefund.orderId.totalPrice}</Typography>
                  <Typography className="mb-4">Reason: {selectedRefund.reason}</Typography>
                  <Typography className="mb-4">Address: {selectedRefund.orderId.address}</Typography>
                  <Typography className="mb-4">City: {selectedRefund.orderId.city}</Typography>
                  <Typography className="mb-4">Zip Code: {selectedRefund.orderId.zipcode}</Typography>
                  <Typography className="mb-4">Products:</Typography>
                  {selectedRefund.orderId.products.map((product, index) => (
                    <div key={index} className="mb-2 grid grid-cols-3 gap-4 items-center">
                      <img
                        src={product.productId.image}
                        alt={product.productId.name}
                        className="w-16 h-16 object-cover col-span-1"
                      />
                      <div className="col-span-2">
                        <Typography className="text-gray-700">{product.productId.name}</Typography>
                        <Typography className="text-gray-700">Price: {product.productId.price}</Typography>
                        <Typography className="text-gray-700">Quantity: {product.quantity}</Typography>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <Select
                      value={newRefundStatus}
                      onChange={(e) => setNewRefundStatus(e)}
                      color='black'
                      label='Refund Status'
                      className="w-full p-2 focus:ring-0 rounded-lg"
                    >
                      <Option value="Requested">Requested</Option>
                      <Option value="Approved">Approved</Option>
                      <Option value="Denied">Denied</Option>
                      <Option value="Processing">Processing</Option>
                      <Option value="Completed">Completed</Option>
                    </Select>
                  </div>
                </>
              )}
            </DialogBody>
            <DialogFooter>
              <Button
                onClick={handleUpdateRefundStatus}
                loading={updatingRefund}
                className="w-full bg-black mt-2 shadow-none hover:shadow-md hover:shadow-gray-800"
              >
                Update Refund
              </Button>
            </DialogFooter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRefunds;
