import React, { useEffect, useState } from "react";
import { AxiosRequest } from '../../AxiosRequest/AxiosRequest';
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/emailSlice";
import { Card, CardHeader, CardBody, Typography, Button, IconButton, Avatar, Spinner } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const fetchedEmail = useSelector(selectEmail);
  const email = fetchedEmail;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await AxiosRequest.get(`/api/cart/get-cart/${email}`);
        setCart(res.data.updatedCart);
        setTotalPrice(res.data.totalPrice);
      } catch (error) {
        console.error('Error fetching cart:', error);
        // toast.error('Error fetching cart. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchCart();
    }
  }, [email]);

  const handleClearCart = async () => {
    try {
      const res = await AxiosRequest.delete(`/api/cart/clear-cart/${email}`);
      if (res.status === 200) {
        toast.success('Cart cleared successfully');
        setCart(null); // Clear the cart in the state
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Error clearing cart. Please try again later.');
    }
  };

  const handleCheckout = ()=>{
    navigate('/checkout');
  }

  const handleDeleteProduct = async (productId) => {
    try {
      const res = await AxiosRequest.delete(`/api/cart/delete-product/${email}/${productId}`);
      if (res.status === 200) {
        toast.success('Product removed from cart successfully');
        // Update the cart in the state by removing the deleted product
        setCart(prevCart => ({
          ...prevCart,
          products: prevCart.products.filter(item => item.product._id !== productId)
        }));
        setTotalPrice(res.data.totalPrice);
        console.log('Delete Response',res.data);
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
      toast.error('Error removing product from cart. Please try again later.');
    }
  };

  return (
    <>
      <header className="w-full bg-red-500 text-white py-6 mt-[2vh] mb-[4vh] shadow-md bg-opacity-90">
        <h1 className="text-3xl text-center font-bold">Your Cart</h1>
      </header>
      <div className="flex justify-center items-start h-screen">
        <div className="container mx-auto text-center">
          {loading ? (
                  <div className="flex items-center justify-center min-h-screen bg-[#F6F1EE] font-poppins">
                          <Spinner color='white' className="h-12 w-12 text-black" />
                </div>
          ) : cart && cart.products && cart.products.length > 0 ? (
            <div className="mt-[4vh] mb-[4vh]">
  {cart.products.map((item) => (
  <Card
    key={item.product._id}
    className="mb-[8vh] shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
  >
    <CardHeader className="relative mt-2 bg-red-500 p-6 flex items-center justify-between">
      <Typography variant="h5" color="white" className="ml-4 font-semibold">
        {item.product.name}
      </Typography>
      <IconButton
        color="white"
        size="md"
        onClick={() => handleDeleteProduct(item.product._id)}
        className="hover:bg-black rounded-full"
      >
        <FaTrash className="text-red-600 transition-colors duration-300" />
      </IconButton>
    </CardHeader>
    <CardBody className="flex items-center space-x-6 p-6 bg-gray-50">
      <Avatar
        src={item.product.image}
        size="xxl"
        alt={item.product.name}
        className="shadow-md rounded-full"
      />
      <div className="flex flex-col ml-4">
        <Typography variant="subtitle1" color="gray-700" className="mb-2">
          <span className="font-semibold">Price:</span>{" "}
          <span className="text-gray-900">Rs {item.product.price}</span>
        </Typography>
        <Typography variant="subtitle1" color="gray-700">
          <span className="font-semibold">Quantity:</span>{" "}
          <span className="text-gray-900">{item.quantity}</span>
        </Typography>
      </div>
    </CardBody>
  </Card>
))}
 <div className="flex justify-between items-center bg-gray-100 p-4 mt-8 rounded-lg shadow-md">
                <Typography variant="h6" color="gray-800" className="font-bold">
                  Total Price:
                </Typography>
                <Typography variant="h6" color="red-600" className="font-bold">
                  Rs {totalPrice}
                </Typography>
              </div>

              <div className="flex justify-center space-x-4 mt-8">
                <Button color="red" size="lg" onClick={handleClearCart}>Clear Cart</Button>
                <Button color="black" size="lg" onClick={handleCheckout}>Checkout</Button>

              </div>
            </div>
          ) : (
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
              <p className="text-lg text-gray-600">Your cart is empty</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;

