const Order = require('../../Models/Order/OrderModel');
const CartController = require('../../Controllers/Cart/CartController');
const sendEmail = require('../../mail/sendEmail');


exports.createOrder = async (req, res) => {
  const { products, address, city, zipcode, phoneNumber, totalPrice, paymentMethod, sessionId } = req.body;
  const userId = req.user._id;
  const userEmail = req.user.email;
  const userName = `${req.user.firstName} ${req.user.lastName}`;

  try {
    let paymentStatus = "Pending";
    if (paymentMethod === "Debit Card") {
      paymentStatus = "Completed";
    }

    const formattedProducts = products.map((product) => ({
      productId: product.product,
      quantity: product.quantity,
      price: product.product.price,
    }));

    const newOrder = new Order({
      user: userId,
      products: formattedProducts,
      address,
      city,
      zipcode,
      phoneNumber,
      totalPrice,
      paymentMethod,
      paymentStatus,
      sessionId: paymentMethod === "Debit Card" ? sessionId : undefined,
      orderDate: Date.now(),
    });

    await newOrder.save();

    const orderDetails = {
      products: formattedProducts,
      address,
      city,
      zipcode,
      phoneNumber,
      totalPrice,
      paymentMethod,
      paymentStatus,
    };

    await sendEmail({
      email: userEmail,
      subject: 'Order Confirmation',
      type: 'createOrder',
      name: userName,
      orderDetails, // Pass orderDetails here
    });

    await CartController.clearCartInternal(userEmail);

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fetch All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products.productId');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update Order Status
exports.updateOrderStatus = async (req, res) => {
  const { orderId, orderStatus,paymentStatus } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus,paymentStatus },
      { new: true }
    ).populate('user').populate('products.productId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await sendEmail({
      email:order.user.email,
      orderId,
      subject: 'Order Status',
      type: 'orderStatus',
      orderStatus,
      name: `${order.user.firstName} ${order.user.lastName}`,
    });
    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a specific order by ID
exports.GetOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('user').populate('products.productId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error('Error fetching order by ID:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Cancel an order
exports.CancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const canceledOrder = await Order.findByIdAndUpdate(orderId, { orderStatus: 'Canceled' }, { new: true });

    if (!canceledOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order canceled successfully', order: canceledOrder });
  } catch (err) {
    console.error('Error canceling order:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete an order
exports.DeleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fetch Orders for the Logged-in User
exports.getUserOrders = async (req, res) => {
  const userId = req.user._id; 

  try {
    const userOrders = await Order.find({ user: userId }).populate('user').populate('products.productId');

    if (!userOrders || userOrders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json(userOrders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};