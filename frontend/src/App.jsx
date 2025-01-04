import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import './index.css';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';
import Lorem from './pages/Lorem.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NewProduct from './pages/NewProduct.jsx';
import Layout from './Layout/Layout.jsx';
import SignUp from './pages/SignUp.jsx';
import Cart from './components/Cart/Cart.jsx';
import Achievements from './components/Achievements.jsx';
import Services from './pages/Services.jsx';
import Blogs from './pages/Blogs.jsx';
import Faqs from './pages/Faqs.jsx';
import Home2 from './pages/Home2.jsx';
import Product from './pages/Product.jsx';
import Login from './pages/Login.jsx';
import ProtectedLayout from './Layout/ProtectedLayout.jsx';
import AddUser from './pages/Admin/Users/AddUser/AddUser.jsx';
import { Toaster } from 'react-hot-toast';
import AllCustomers from './pages/Admin/Users/AllCustomers/AllCustomers.jsx';
import CreateFeedManagement from './pages/Admin/FeedManagement/CreateFeedManagement/CreateFeedManagement.jsx';
import CreateFlock from './pages/Admin/Flock/CreateFlock/CreateFlock.jsx';
import CreateEggs from './pages/Admin/Eggs/CreateEggs/CreateEggs.jsx';
import FlockDataGraph from './pages/Admin/Flock/FlockDataGraph/FlockDataGraph.jsx';
import EggDataGraph from './pages/Admin/Eggs/EggDataGraph/EggDataGraph.jsx';
import FeedDataGraph from './pages/Admin/FeedManagement/FeedDataGraph/FeedDataGraph.jsx';
import AdminHeader from './components/AdminHeader/AdminHeader.jsx';
import CheckoutCard from './components/CheckoutCard/CheckoutCard.jsx';
import AllOrders from './pages/Admin/AllOrders/AllOrders.jsx';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';
import MyOrders from './pages/MyOrders/MyOrders.jsx';
import AllRefunds from './pages/Admin/AllRefunds/AllRefunds.jsx';
import ProfileSettings from './components/ProfileSettings/ProfileSettings.jsx';
import AddEmployee from './pages/Admin/AddEmployee/AddEmployee.jsx';
import AllEmployees from './pages/Admin/AllEmployees/AllEmployees.jsx';
import CreateSchedule from './pages/Admin/CreateSchedule/CreateSchedule.jsx';
import Notifications from './pages/Notifications/Notifications.jsx';
import EmployeeSchedule from './components/EmployeeSchedule/EmployeeSchedule.jsx';
import AllSchedules from './pages/Admin/AllSchedules/AllSchedules.jsx';
import CreateAnnouncement from './pages/Admin/CreateAnnouncement/CreateAnnouncement.jsx';
import AddSupplier from './pages/Admin/Supplier/AddSupplier/AddSupplier.jsx';
import AllSuppliers from './pages/Admin/Supplier/AllSuppliers/AllSuppliers.jsx';


function App() {
  return (
    <div>
      <Toaster/>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={
          <Layout>
          <Routes>
          <Route index element={<Navigate to="home" />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="lorem" element={<Lorem />} />
          <Route path="newProduct" element={<NewProduct />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckoutCard />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="services" element={<Services />} />
          <Route path="product" element={<Product/>} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="profile-settings" element={<ProfileSettings />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="employee-schedule" element={<EmployeeSchedule />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="home" element={<Home2 />} />
          <Route path="home2" element={<Home />} />
          </Routes>
          </Layout>
        }/>
  <Route path="/add-employee" element={
    <ProtectedLayout>
    <AddEmployee />
    </ProtectedLayout>
    } />
    <Route path="/employees" element={
    <ProtectedLayout>
    < AllEmployees/>
    </ProtectedLayout>
    } />
    <Route path="/customers" element={
    <ProtectedLayout>
    < AllCustomers/>
    </ProtectedLayout>
    } />
    <Route path="/add-feed" element={
    <ProtectedLayout>
    <CreateFeedManagement />
    </ProtectedLayout>
    } />
     <Route path="/add-flock" element={
    <ProtectedLayout>
    <CreateFlock />
    </ProtectedLayout>
    } />
      <Route path="/add-eggs" element={
    <ProtectedLayout>
    <CreateEggs />
    </ProtectedLayout>
    } />
    <Route path="/flocks" element={
    <ProtectedLayout>
    <FlockDataGraph />
    </ProtectedLayout>
    } />
        <Route path="/eggs" element={
    <ProtectedLayout>
    <EggDataGraph />
    </ProtectedLayout>
    } />
   <Route path="/feeds" element={
    <ProtectedLayout>
    <FeedDataGraph />
    </ProtectedLayout>
    } />
       <Route path="/all-orders" element={
    <ProtectedLayout>
    <AllOrders />
    </ProtectedLayout>
    } />
    <Route path="/all-refunds" element={
    <ProtectedLayout>
    <AllRefunds />
    </ProtectedLayout>
    } />
     <Route path="/create-schedule" element={
    <ProtectedLayout>
    <CreateSchedule />
    </ProtectedLayout>
    } />
    <Route path="/all-schedules" element={
    <ProtectedLayout>
    <AllSchedules />
    </ProtectedLayout>
    } />
    <Route path="/create-announcement" element={
    <ProtectedLayout>
    <CreateAnnouncement />
    </ProtectedLayout>
    } />
      <Route path="/add-supplier" element={
    <ProtectedLayout>
    <AddSupplier />
    </ProtectedLayout>
    } />
        <Route path="/all-suppliers" element={
    <ProtectedLayout>
    <AllSuppliers />
    </ProtectedLayout>
    } />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
