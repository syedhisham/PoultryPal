const socketIo = require('socket.io');
const CartModel = require('../Models/Cart/CartModel');
const Announcement = require('../Models/Announcement/Announcement');

let io;
let connectedSockets = {}; // Object to store connected sockets

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on("connection", (socket) => {
    // When a client connects, store the socket in the connectedSockets object
    console.log("Client Connected!", socket.id);
    socket.emit('connection', 'connected');

    // Store the connected socket with its ID
    connectedSockets[socket.id] = socket;

    // Register events for this socket connection
    registerSocketEvents(socket);

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      delete connectedSockets[socket.id]; // Remove the socket when disconnected
    });
  });
};

// Function to get the Socket.IO instance
const getIoInstance = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

// Function to register additional event handlers
const registerSocketEvents = (socket) => {
  socket.on('GET_CART', async ({ userEmail }) => {
    try {
      const cart = await CartModel.findOne({ userEmail }).populate('products.product');
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

  socket.on('COUNT_ANNOUNCEMENTS_FOR_RECIPIENT_EMAIL', async ({ recipientEmail }) => {
    try {
      // Find the recipients that match the email
      const announcements = await Announcement.find()
        .populate('recipients', 'email') // Populate recipients to get their emails
        .exec();

      // Filter and count announcements where the recipient's email matches
      const count = announcements.filter(announcement =>
        announcement.recipients.some(recipient => recipient.email === recipientEmail)
      ).length;

      // Send the count as a response
      socket.emit('ANNOUNCEMENT_COUNT_RESPONSE', { count, status: 200 });
    } catch (error) {
      console.error('Error counting announcements:', error);
      socket.emit('ANNOUNCEMENT_COUNT_RESPONSE', { message: 'Internal Server Error', status: 500 });
    }
  });
};

module.exports = { initializeSocket, getIoInstance };
