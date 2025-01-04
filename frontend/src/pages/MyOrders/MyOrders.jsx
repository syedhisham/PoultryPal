import React, { useState, useEffect, useCallback } from "react";
import { AxiosRequest } from "../../AxiosRequest/AxiosRequest";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/tokenSlice";
import { Spinner, Typography, Card, Button, DialogHeader, DialogBody, Textarea, DialogFooter, Avatar } from "@material-tailwind/react";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from 'framer-motion';
import Swal from "sweetalert2";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewDialogOpen, setViewDialogOpen] = useState(false); // For viewing order details
  const [refundDialogOpen, setRefundDialogOpen] = useState(false); // For refund request
  const [orderDetails, setOrderDetails] = useState(null);
  const [refundReason, setRefundReason] = useState(""); // For refund reason
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  const fetchOrders = useCallback(async () => {
    setLoading(true);

    try {
      const response = await AxiosRequest.get("/api/orders/own-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.length > 0) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.response.data.message, {
        id: 'orders-error',
      });
    } finally {
      setLoading(false);
    }
  }, [token]);

  const cancelOrder = async (orderId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to cancel this order?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it',
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await AxiosRequest.patch(`/api/orders/cancel/${orderId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success(response.data.message, {
          id: 'order-canceled',
        });

        fetchOrders();

        Swal.fire(
          'Canceled!',
          'Your order has been canceled.',
          'success'
        );
        handleDialogClose();

      } else {
        Swal.fire(
          'Not Cancelled',
          'Your order is safe!',
          'info'
        );
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      toast.error(error.response.data.message, {
        id: 'cancel-error',
      });

      Swal.fire(
        'Error!',
        'Something went wrong. Please try again.',
        'error'
      );
    }
  };

  const requestRefund = async (orderId,refundAmount) => {
    try {
      if (!refundReason.trim()) {
        toast.error("Please provide a reason for the refund.");
        return;
      }

      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to request a refund for this order?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, request refund!',
        cancelButtonText: 'No, keep it',
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await AxiosRequest.post(`/api/refunds/process`, {
          orderId,
          reason:refundReason,
          refundAmount
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success(response.data.message, {
          id: 'refund-requested',
        });

        fetchOrders();

        Swal.fire(
          'Refund Requested!',
          'Your refund request has been submitted.',
          'success'
        );
        handleDialogClose();

      } else {
        Swal.fire(
          'Not Requested',
          'Your refund request was not submitted.',
          'info'
        );
      }
    } catch (error) {
      console.error("Error requesting refund:", error);
      toast.error(error.response.data.message, {
        id: 'refund-error',
      });

      Swal.fire(
        'Error!',
        'Something went wrong. Please try again.',
        'error'
      );
    }
  };

  const handleViewOrderDetails = (orderId) => {
    const order = orders.find((order) => order._id === orderId);
    setOrderDetails(order);
    setViewDialogOpen(true);
  };

  const handleDialogClose = () => {
    setViewDialogOpen(false);
    setRefundDialogOpen(false);
    setOrderDetails(null);
    setRefundReason("");
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color='white' className="h-12 w-12 text-black" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 font-poppins">
      <Typography variant="h4" className="text-center mb-6">
        My Orders
      </Typography>

      {orders.length > 0 ? (
        <div className="flex items-center justify-center">
          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 flex flex-col gap-1 items-center text-center bg-white shadow-lg shadow-black rounded-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
                {order.refundRequest === 'Completed' && (
              <div className="absolute top-0 left-0 bg-green-500 text-white px-3 py-1 rounded-br-lg">
                Refunded
              </div>
            )}
            {order.orderStatus === 'Canceled' && (
              <div className="absolute top-0 left-0 bg-blue-500 text-white px-3 py-1 rounded-br-lg">
                Canceled
              </div>
            )}
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
                  <Typography variant='small' className="mb-1">Total Price: {order.totalPrice}</Typography>
                  <Typography variant='small' className="mb-1">Order Status: {order.orderStatus}</Typography>
                  <Typography variant='small' className="mb-1">Payment Method: {order.paymentMethod}</Typography>
                  <Typography variant='small' className="mb-1">Payment Status: {order.paymentStatus}</Typography>
                  <Typography variant='small' className="mb-1">Order Date: {new Date(order.orderDate).toLocaleString()}</Typography>
                  <Typography variant="subtitle2" className="text-gray-500">
                    Products: {order.products.length}
                  </Typography>
                  <Button
                    className="mt-4 w-full bg-black text-white"
                    onClick={() => handleViewOrderDetails(order._id)}
                  >
                    View Details
                  </Button>
                  {(order.orderStatus === 'Pending' && order.paymentStatus !== 'Completed') && (
                    <Button
                      className="mt-4 w-full bg-red-600 text-white"
                      onClick={() => cancelOrder(order._id)}
                    >
                      Cancel Order
                    </Button>
                  )}
                  {order.paymentStatus === 'Completed' && order.orderStatus !== 'Pending' && order.refundRequest === 'Not Started' &&  (
                  <Button
                    className="mt-4 w-full bg-blue-600 text-white"
                    onClick={() => {
                      setOrderDetails(order);
                      setRefundDialogOpen(true);
                    }}
                  >
                    Request Refund
                  </Button>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <Typography className="text-center mt-4">No orders found.</Typography>
      )}

      {/* View Order Details Dialog */}
      <div
        className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${
          viewDialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
          <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleDialogClose}>
            <FaTimes className="text-black text-xl" />
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <DialogHeader>Order Details</DialogHeader>
            <DialogBody style={{ maxHeight: '300px', overflowY: 'auto' }} className="dashboard-1-scrollbar">
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
                </>
              )}
            </DialogBody>
          </div>
        </div>
      </div>

      {/* Refund Dialog */}
      <div
        className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${
          refundDialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative mx-auto flex w-full max-w-[24rem] flex-col items-center justify-center rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
          <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleDialogClose}>
            <FaTimes className="text-black text-xl" />
          </div>
          <DialogHeader>Request Refund</DialogHeader>
          <DialogBody style={{ maxHeight: '300px', overflowY: 'auto' }} className="dashboard-1-scrollbar">
            <Textarea
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              label="Refund Reason"
              rows={4}
              resize={true}
              className="w-full focus:ring-0"
            />
          </DialogBody>
          <DialogFooter>
            <Button size="md" onClick={() => requestRefund(orderDetails._id,orderDetails.totalPrice)} className="bg-red-500 text-white">
              Submit Refund Request
            </Button>
          </DialogFooter>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;

