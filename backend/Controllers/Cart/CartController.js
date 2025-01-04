const { getIoInstance } = require('../../SocketInstance/Socket'); // Adjust the path as needed
const Cart = require('../../Models/Cart/CartModel'); // Adjust path as needed
const Products = require('../../Models/Products/ProductsModel'); // Adjust path as needed

  
  exports.GetSpecificCart = async (req, res) => {
    try {
      const { userEmail } = req.params;
  
      // Find the user's cart
      const cart = await Cart.findOne({ userEmail }).populate('products.product');
      console.log('products found',cart.products);
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Map through products to add additional info and calculate total price
      const populatedProducts = cart.products.map(async (cartItem) => {
        const product = await Products.findById(cartItem.product._id);
        return {
          ...cartItem.toJSON(),
          product: {
            ...product.toJSON(),
          }
        };
      });

      // Resolve all promises
      const productsWithInfo = await Promise.all(populatedProducts);
      const totalPrice = productsWithInfo.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);

  
      // Update cart with products containing additional info
      const updatedCart = { ...cart.toJSON(), products: productsWithInfo};
  
      res.status(200).json({updatedCart,totalPrice});
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.setupCartSocketEvents = () => {
    const io = getIoInstance(); // Get the Socket.IO instance

    io.on('connection', (socket) => {
      console.log('A user connected for cart:', socket.id);
  
      // Handle GET_CART event
      socket.on('GET_CART', async ({ userEmail }) => {
        try {
          const cart = await Cart.findOne({ userEmail }).populate('products.product');
          if (!cart) {
            socket.emit('CART_RESPONSE', { message: 'Cart not found', status: 404 });
          } else {
            socket.emit('CART_RESPONSE', { data: cart, status: 200 });
          }
        } catch (error) {
          console.error('Error fetching cart:', error);
          socket.emit('CART_RESPONSE', { message: 'Internal Server Error', status: 500 });
        }
      });
  
      // Add any additional cart-related socket events here
  
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
  };

  exports.addToCart= async (req, res) => {
    try {
      const { userEmail, products } = req.body;
      let cart = await Cart.findOne({ userEmail });
  
      if (!cart) {
        cart = new Cart({ userEmail, products: [] });
      }
  
      for (let item of products) {
        const { product, quantity } = item;
        const existingProduct = cart.products.find(p => p.product.toString() === product._id);
  
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.products.push({ product: product._id, quantity });
        }
      }
  
      await cart.save();
  
      // Fetch the updated cart with populated product details
      const updatedCart = await Cart.findOne({ userEmail }).populate('products.product');
  
      const io = getIoInstance(); // Get the Socket.IO instance

      // Emit the updated cart to all connected clients
      io.emit('CART_UPDATED', { data: updatedCart });
  
      res.status(200).json({ message: 'Products added to cart', cart: updatedCart });
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.clearCart = async (req, res) => {
    try {
      const { userEmail } = req.params;
      await exports.clearCartInternal(userEmail);
      return res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };



  exports.clearCartInternal = async (userEmail) => {
    try {
      if (!userEmail) {
        throw new Error('User email is required');
      }
  
      // Find the cart by user email
      const cart = await Cart.findOne({ userEmail });
  
      if (!cart) {
        throw new Error('Cart not found');
      }
  
      // Clear the products array
      cart.products = [];
  
      // Save the updated cart
      await cart.save();
  
      const io = getIoInstance(); // Get the Socket.IO instance
  
      // Emit an event to notify clients that the cart has been cleared
      io.emit('CART_UPDATED', { data: { userEmail, products: [] } });
  
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error; // Propagate the error to be handled by the calling function
    }
  };
  

  exports.deleteSpecificProductFromCart = async (req, res) => {
    try {
      const { userEmail, productId } = req.params;
  
      if (!userEmail || !productId) {
        return res.status(400).json({ message: 'User email and product ID are required' });
      }
  
      // Find the cart by user email
      const cart = await Cart.findOne({ userEmail }).populate('products.product');
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Remove the specific product from the cart
      cart.products = cart.products.filter(item => item.product._id.toString() !== productId);
  console.log('In delete specific',cart.products);

      // Recalculate the total price
      const totalPrice = cart.products.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);
  
      console.log('Total price:', totalPrice);
 
      // Save the updated cart
      await cart.save();

      const io = getIoInstance(); // Get the Socket.IO instance
  
      // Emit an event to notify clients that a product has been removed from the cart
      io.emit('CART_UPDATED', { data: cart });
  
      return res.status(200).json({ message: 'Product removed from cart successfully',totalPrice});
    } catch (error) {
      console.error('Error removing product from cart:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }; 