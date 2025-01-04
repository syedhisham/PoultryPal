import React,{ useState,useEffect,useCallback } from "react";
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import toast from 'react-hot-toast';
import { AxiosRequest } from '../../AxiosRequest/AxiosRequest';
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/emailSlice";
import { selectToken } from '../../redux/tokenSlice';
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";



export default function CheckoutCard() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cartData, setCartData] = useState({ totalPrice: 0, products: [] });
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    zipcode: '',
    phoneNumber: '',
  });
  const fetchedEmail = useSelector(selectEmail);
  const email = fetchedEmail;
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);  // State to control dialog
  const [status, setStatus] = useState(null);  // Payment status
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false); // To track if the order is submitted
  const [sessionId, setSessionId] = useState('');


  useEffect(() => {
    // Check if there are saved order details in localStorage
    const savedOrderDetails = localStorage.getItem('orderDetails');
    
    if (savedOrderDetails) {
      const { cartData: savedCartData, formData: savedFormData, paymentMethod: savedPaymentMethod } = JSON.parse(savedOrderDetails);
      
      // Restore cartData, formData, and paymentMethod from localStorage
      setCartData(savedCartData);
      setFormData(savedFormData);
      setPaymentMethod(savedPaymentMethod);
  
      // Clear the saved data from localStorage after it's retrieved
      localStorage.removeItem('orderDetails');
    }
  }, []);

  useEffect(() => {
    // Check if the URL has 'payment-cancelled' parameter without any value
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paymentCancelled = urlParams.has('payment-cancelled');  // Check if 'payment-cancelled' exists
  
    // If 'payment-cancelled' is present, clear the local storage
    if (paymentCancelled) {
      localStorage.removeItem('orderDetails');
      // setFormData(
      //   {
      //     address: '',
      //     city: '',
      //     zipcode: '',
      //     phoneNumber: '',
      //   }
      // );
      setPaymentMethod("");
      console.log("Order details removed from localStorage due to payment cancellation");
    }
  }, []);
  
  

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');
  
    if (sessionId) {
      AxiosRequest.get(`/api/payment/session-status?session_id=${sessionId}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          const { status} = response.data;
          setStatus(status);
        })
        .catch((error) => {
          console.error('Error fetching session status:', error);
          // toast.error(error.response.data.message);
        });
    }
  }, []);

  useEffect(() => {
    if (status === 'complete' && !isOrderSubmitted) {
      const sessionId = new URLSearchParams(window.location.search).get('session_id');
  
      if (sessionId) {
        completeSession(sessionId); // Only sets sessionId
      } else {
        toast.error('Session ID not found!');
      }
    }
  }, [status, isOrderSubmitted]);
  

  // useEffect(() => {
  //   if (status === 'complete' && !isOrderSubmitted) {
  //     const sessionId = new URLSearchParams(window.location.search).get('session_id');
      
  //     if (sessionId) {
  //       // First, call complete session
  //       completeSession(sessionId).then(() => {
  //         // After completing the session, handle the order submission
  //         if (cartData.products.length > 0 && formData.address && formData.city && formData.zipcode && formData.phoneNumber && paymentMethod) {
  //           handleSubmitOrder(); // Submit the order after the session is complete
  //           setIsOrderSubmitted(true); // Mark the order as submitted
  //         } else {
  //           return;
  //         }
  //       });
  //     } else {
  //       toast.error("Session ID not found!");
  //     }
  //   }
  // }, [status, cartData, formData, paymentMethod,isOrderSubmitted]);

  useEffect(() => {
    if (sessionId && status === 'complete' && !isOrderSubmitted) {
      // Proceed to handle the order only if sessionId is set
      if (cartData.products.length > 0 && formData.address && formData.city && formData.zipcode && formData.phoneNumber && paymentMethod) {
        handleSubmitOrder();
        setIsOrderSubmitted(true); // Mark the order as submitted
      }
    }
  }, [sessionId, status, cartData, formData, paymentMethod, isOrderSubmitted]);
  
  
  // The completeSession function can be modified to return a promise
  const completeSession = async (sessionId) => {
    try {
      const response = await AxiosRequest.post('/api/payment/complete-session', {
        session_id: sessionId,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Session completed:', response.data.message);
      setSessionId(sessionId);
    } catch (error) {
      console.error('Error completing session:', error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await AxiosRequest.get(`/api/cart/get-cart/${email}`);
        const { totalPrice, updatedCart } = response.data;
        
        setCartData({ totalPrice, products: updatedCart.products });
      } catch (error) {
        console.error('Error fetching cart:', error);
        toast.error("Failed to load cart details");
      }
    };

    fetchCartData();
  }, [email]);

  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleNumberChange = (e, field) => {
    const { value } = e.target;
    const newValue = value && Number(value) >= 0 ? Number(value) : "";
    setFormData({ ...formData, [field]: newValue });
  };  

  const handleSubmitOrder = async () => {
    const { address, city, zipcode,phoneNumber } = formData;
    if ( !address || !city || !zipcode || !phoneNumber || !paymentMethod) {
      toast.error('Please fill in all the fields.');
      return;
    }
      // Ensure sessionId is set for Debit Card payment method
  if (paymentMethod === 'Debit Card' && !sessionId) {
    toast.error('Session ID is required for Debit Card payments. Please complete the payment process.');
    return;
  }
    try {
      const response = await AxiosRequest.post('/api/orders/create-order', {
        products: cartData.products,
        address,
        city,
        zipcode,
        phoneNumber,
        totalPrice: cartData.totalPrice,
        paymentMethod,
        sessionId
      },{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success('Order placed successfully');
      console.log('Order created:', response.data);
      setFormData(
        {
          address: '',
          city: '',
          zipcode: '',
          phoneNumber: '',
        }
      );
      setDialogOpen(true);
      
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create the order');
    }
  };

  const handlePaymentWithStripe = async()=>{
    // Save cart data and form data to localStorage
    const { address, city, zipcode,phoneNumber } = formData;
    if ( !address || !city || !zipcode || !phoneNumber || !paymentMethod) {
      toast.error('Please fill in all the fields.');
      return;
    }
  localStorage.setItem('orderDetails', JSON.stringify({
    cartData,
    formData,
    paymentMethod,
  }));
    const sessionResponse = await AxiosRequest.post('/api/payment/create-checkout-session', {
      amount: cartData.totalPrice,
    },{
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const { sessionId } = sessionResponse.data;

    // Redirect to the Stripe Checkout page
    const stripe = window.Stripe("pk_test_51QY8ceGjkBvIbb1t44yllQOTlsvJ80ErOy1BXV3s4LIRVJEYnWwY10MY5Hmj8K2waRSEXkOlqwr5TSxO6fDqG5nn00PAMYNaIc"); // Your Stripe public key
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error('Error redirecting to Stripe Checkout:', error);
      toast.error('Payment failed. Please try again.');
    }
  }

  const handleCancel =()=>{
    navigate('/cart');
  }

  const handleDialogClose = () => {
    navigate("/home"); 
  };

  return (
    <div className="flex items-center justify-center text-center min-h-screen font-poppins">
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="p-4 max-w-md w-screen"
    >
    <Card className="w-[400px] shadow-lg shadow-black rounded-lg bg-white transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
      <CardHeader>
        <CardTitle className='text-center'>Checkout</CardTitle>
        <CardDescription className='text-center'>Complete your order details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Main St" value={formData.address} onChange={handleInputChange}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="New York" value={formData.city} onChange={handleInputChange}/>
            </div>
                     <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="zipcode">Zip Code</Label>
                  <Input
                    id="zipcode"
                    type="number"
                    placeholder="10001"
                    value={formData.zipcode}
                    onChange={(e) => handleNumberChange(e, "zipcode")}
                    min={0}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="number"
                    placeholder="1234567890"
                    value={formData.phoneNumber}
                    onChange={(e) => handleNumberChange(e, "phoneNumber")}
                    min={0}
                    className="w-full"
                  />
                </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="payment">Payment Method</Label>
              <Select onValueChange={(value) => setPaymentMethod(value)}>
                <SelectTrigger id="payment">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Debit Card">Debit Card</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
        {paymentMethod === "Debit Card" ? (
    <Button onClick={handlePaymentWithStripe}>Go to Payment</Button> // Show "Go to Payment" button for Debit Card
  ) : (
    <Button disabled={!paymentMethod} onClick={handleSubmitOrder}>Complete Order</Button> // Show "Complete Order" button for other payment methods
  )}
      </CardFooter>
    </Card>
    </motion.div>
    <ConfirmationDialog isOpen={dialogOpen} onClose={handleDialogClose}/>
    </div>
  )
}