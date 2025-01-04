const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require('http');
const path = require('path');
const { initializeSocket } = require('./SocketInstance/Socket'); 
const mongoose = require("mongoose");
const UserRoutes = require('./Routes/User/UserRoutes');
const EmployeeRoutes = require('./Routes/Employee/EmployeeRoutes');
const ProductRoutes = require('./Routes/Products/ProductsRoutes');
const CartRoutes = require('./Routes/Cart/CartRoutes');
const FeedRoutes = require('./Routes/Feed/FeedRoutes');
const FlockRoutes = require('./Routes/Flock/FlockRoutes');
const EggRoutes = require('./Routes/Eggs/EggRoutes');
const OrderRoutes = require('./Routes/Order/OrderRoutes');
const RefundRoutes = require('./Routes/Refund/RefundRoutes');
const ScheduleRoutes = require('./Routes/Schedule/ScheduleRoutes');
const AnnouncementRoutes = require('./Routes/Announcements/Announcements');
const PaymentRoutes = require('./Routes/Payment/Payment');
const SupplierRoutes = require('./Routes/Supplier/Supplier');

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
// Initialize Socket.IO
initializeSocket(server);

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // Exit process on MongoDB connection failure
});

// Routes
app.use('/api/user', UserRoutes);
app.use('/api/employee', EmployeeRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/cart', CartRoutes);
app.use('/api/feed', FeedRoutes);
app.use('/api/flock', FlockRoutes);
app.use('/api/eggs', EggRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/refunds', RefundRoutes);
app.use('/api/schedule', ScheduleRoutes);
app.use('/api/announcements', AnnouncementRoutes);
app.use('/files', express.static(path.join(__dirname, 'uploads')));
app.use('/api/payment', PaymentRoutes);
app.use('/api/supplier', SupplierRoutes);

app.get('/', async (req, res) => {
  res.send("Server is running");
});

// Start server
const serverInstance = server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

