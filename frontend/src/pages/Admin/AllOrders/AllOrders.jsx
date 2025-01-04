import React, { useEffect, useState, useCallback } from 'react';
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
import toast from 'react-hot-toast';
import { AxiosRequest } from '../../../AxiosRequest/AxiosRequest';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import { useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { selectToken } from '../../../redux/tokenSlice';
import { selectRole } from '../../../redux/roleSlice';
import { useNavigate } from 'react-router-dom';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [newOrderStatus, setNewOrderStatus] = useState('');
  const [newPaymentStatus, setNewPaymentStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Added search query state
  const [filteredOrders, setFilteredOrders] = useState([]); // Added filtered orders state
  const [updatingOrder, setUpdatingOrder] = useState(false);
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


  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  const fetchOrders = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await AxiosRequest.get('/api/orders/all-order', config);
      setOrders(response.data);
      setFilteredOrders(response.data); // Initialize filteredOrders with all orders
      console.log('Order data', response.data);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.msg || err.response.data.message);
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = orders.filter(
        (order) =>
          order._id.toLowerCase().includes(lowercasedQuery) ||
          order.user?.email.toLowerCase().includes(lowercasedQuery) ||
          `${order.user?.firstName} ${order.user?.lastName}`.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders); // Reset filtered orders when search query is cleared
    }
  }, [searchQuery, orders]);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedOrderId(null);
    setOrderDetails(null);
    setNewOrderStatus('');
    setNewPaymentStatus('');
  };

  const newOrderStatusChange=(e)=>{
setNewOrderStatus(e);
  }

  const newPaymentStatusChange=(e)=>{
    setNewPaymentStatus(e);
  }

  const handleViewOrderDetails = (orderId) => {
    const order = orders.find((order) => order._id === orderId);
    setSelectedOrderId(orderId);
    setOrderDetails(order);
    setDialogOpen(true);
    setNewOrderStatus(order.orderStatus);
    setNewPaymentStatus(order.paymentStatus);
  };

  const handleUpdateOrderStatus = async () => {
    setUpdatingOrder(true);
    try {
      const response = await AxiosRequest.patch(
        '/api/orders/update-order-status',
        {
          orderId: selectedOrderId,
          orderStatus: newOrderStatus,
          paymentStatus: newPaymentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      handleDialogClose();
      fetchOrders();
    } catch (err) {
      toast.error(err.response.data.msg || err.response.data.message);
    }finally{
      setUpdatingOrder(false);
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
          All Orders
        </Typography>

        <div className="mb-8 flex justify-center">
          <Input
            type="text"
            label="Search by Order ID, Email, or Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 bg-white focus:ring-0 text-base sm:text-sm md:text-base lg:text-base"
          />
        </div>

        {filteredOrders.length === 0 ? (
          <Typography variant="h5" className="text-center text-gray-500">
            No Orders Found
          </Typography>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOrders.map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 flex flex-col gap-1 items-center text-center bg-white shadow-lg shadow-black rounded-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
                  <Avatar
                    src={order.user?.image}
                    alt={`${order.user?.firstName} ${order.user?.lastName}`}
                    size="lg"
                  />
                  <Typography variant="h5" className="text-black">
                    {`${order.user?.firstName} ${order.user?.lastName}`}
                  </Typography>
                  <Typography variant="subtitle1" className="text-gray-600">
                    {order.user?.email}
                  </Typography>
                  <Typography variant="subtitle2" className="text-gray-600">
                    {order.phoneNumber}
                  </Typography>
                  <Typography variant='small' className="mb-1">Total Price: {order.totalPrice}</Typography>
                  <Typography variant='small' className="mb-1">Order Status: {order.orderStatus}</Typography>
                  <Typography variant='small' className="mb-1">Payment Method: {order.paymentMethod}</Typography>
                  <Typography variant='small' className="mb-1">Payment Status: {order.paymentStatus}</Typography>
                  <Typography variant='small' className="mb-1">Order Date: {new Date(order.orderDate).toLocaleString()}</Typography>
                  <Typography variant="subtitle2" className="text-gray-500">
                    Products: {order.products.length}
                  </Typography>
                  <Button
                    className="w-full bg-black mt-2 shadow-none hover:shadow-md hover:shadow-gray-800"
                    onClick={() => handleViewOrderDetails(order._id)}
                  >
                    View Details
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Dialog */}
      <div
        className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${
          dialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
          <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleDialogClose}>
            <FaTimes className="text-black text-xl" />
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <DialogHeader>Order Details</DialogHeader>
            <DialogBody style={{ maxHeight: '300px', overflowY: 'auto',overflowX: 'hidden',width: '100%' }} className="dashboard-1-scrollbar">
              {orderDetails && (
                <>
                  <Typography className="mb-4">Order ID: {orderDetails._id}</Typography>
                  <Typography className="mb-4">Address: {orderDetails.address}</Typography>
                  <Typography className="mb-4">City: {orderDetails.city}</Typography>
                  <Typography className="mb-4">Zip Code: {orderDetails.zipcode}</Typography>
                  <Typography className="mb-4">Products:</Typography>
                  {orderDetails.products.map((product, index) => (
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
                      value={newOrderStatus}
                      onChange={newOrderStatusChange}
                      color='black'
                      label='Order Status'
                      className="w-full p-2 focus:ring-0  rounded-lg"
                    >
                      <Option value="Pending">Pending</Option>
                      <Option value="Processing">Processing</Option>
                      <Option value="Shipped">Shipped</Option>
                      <Option value="Delivered">Delivered</Option>
                      <Option value="Canceled">Canceled</Option>
                    </Select>
                  </div>
                  <div className="mt-4">
                    <Select
                      value={newPaymentStatus}
                      onChange={newPaymentStatusChange}
                      label='Payment Status'
                      color='black'
                      className="w-full p-2 focus:ring-0  rounded-lg"
                    >
                      <Option value="Pending">Pending</Option>
                      <Option value="Completed">Completed</Option>
                      <Option value="Failed">Failed</Option>
                    </Select>
                  </div>
                </>
              )}
            </DialogBody>
            <DialogFooter>
              <Button
                onClick={handleUpdateOrderStatus}
                loading={updatingOrder}
                className="w-full bg-black mt-2 shadow-none hover:shadow-md hover:shadow-gray-800"
              >
                Update Order
              </Button>
            </DialogFooter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
